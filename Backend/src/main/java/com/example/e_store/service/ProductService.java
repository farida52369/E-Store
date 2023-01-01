package com.example.e_store.service;

import com.example.e_store.dto.*;
import com.example.e_store.model.Product;
import com.example.e_store.model.User;
import com.example.e_store.repository.ProductRepository;
import com.example.e_store.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final AuthService authService;
    private final UserRepository userRepository;

    public void save(ProductRequest productRequest, MultipartFile image) {
        Optional<User> owner = userRepository.findByEmail(productRequest.getOwner());
        if (!owner.isPresent()) return;

        try {
            Product product = new Product();
            product.setTitle(productRequest.getTitle());
            product.setPrice(productRequest.getPrice());
            product.setCategory(productRequest.getCategory());
            product.setManager(owner.get());
            product.setInStock(productRequest.getInStock());
            product.setDescription(productRequest.getDescription());
            product.setImage(image.getBytes());
            product.setCreatedDate(Instant.now());

            productRepository.save(product);
            log.info("Manager {} Added Product #{} To The DB", owner.get().getEmail(), productRequest.getCategory());
        } catch (IOException e) {
            log.error("Error when adding product: {}", e.getMessage());
        }
    }

    public List<ProductSpecificDetails> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductSpecificDetails> res = new ArrayList<>();
        for (Product product : products) {
            if (product.getInStock() <= 0) continue;
            res.add(ProductSpecificDetails.builder().
                    productId(product.getProductId()).
                    title(product.getTitle()).
                    description(product.getDescription()).
                    price(product.getPrice()).
                    image(product.getImage()).
                    inStock(product.getInStock()).
                    build());
        }
        return res;
    }

    public ProductResponse getSpecificProduct(Long id) {
        Product product = productRepository.getById(id);
        return ProductResponse.builder().
                productId(product.getProductId()).
                title(product.getTitle()).
                description(product.getDescription()).
                price(product.getPrice()).
                inStock(product.getInStock()).
                category(product.getCategory()).
                image(product.getImage()).
                createdDate(product.getCreatedDate()).
                build();
    }

    public ProductAllInfo productAllInfo(Long productId, String email) {
        Product product = productRepository.getById(productId);
        return ProductAllInfo.builder().
                productId(productId).
                price(product.getPrice()).
                isOwner(product.getManager().getEmail().equalsIgnoreCase(email)).
                owner(email).
                image(product.getImage()).
                createdDate(product.getCreatedDate()).
                inStock(product.getInStock()).
                title(product.getTitle()).
                description(product.getDescription()).
                category(product.getCategory()).
                build();
    }

    public void editProduct(ProductEdit productEdit) {
        Product product = productRepository.getById(productEdit.getProductId());
        product.setInStock(productEdit.getInStock());
        product.setCategory(productEdit.getCategory());
        product.setPrice(productEdit.getPrice());
        product.setTitle(productEdit.getTitle());
        product.setDescription(productEdit.getDescription());
        productRepository.save(product);
    }
}
