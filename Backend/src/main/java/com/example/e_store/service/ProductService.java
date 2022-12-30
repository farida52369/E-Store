package com.example.e_store.service;

import com.example.e_store.dto.ProductRequest;
import com.example.e_store.dto.ProductResponse;
import com.example.e_store.dto.ProductSpecificDetails;
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
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
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

    public ProductSpecificDetails[] getAllProducts() {
        List<Product> products = productRepository.findAll();
        ProductSpecificDetails[] res = new ProductSpecificDetails[products.size()];
        for (int i = 0; i < products.size(); i++) {
            Product tempProduct = products.get(i);
            res[i] = ProductSpecificDetails.builder().
                    productId(tempProduct.getProductId()).
                    title(tempProduct.getTitle()).
                    description(tempProduct.getDescription()).
                    price(tempProduct.getPrice()).
                    image(tempProduct.getImage()).
                    inStock(tempProduct.getInStock()).
                    build();
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
}
