package com.example.e_store.service;

import com.example.e_store.dto.ProductRequest;
import com.example.e_store.model.Product;
import com.example.e_store.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.Instant;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final AuthService authService;

    public void save(ProductRequest productRequest, MultipartFile image) {
        try {
            Product product = new Product();
            product.setProductId(productRequest.getProductId());
            product.setTitle(productRequest.getTitle());
            product.setPrice(productRequest.getPrice());
            product.setCategory(productRequest.getCategory());
            product.setOwner(authService.getCurrentUser());
            product.setInStock(productRequest.getInStock());
            product.setDescription(productRequest.getDescription());
            product.setImage(image.getBytes());
            product.setCreatedDate(Instant.now());

            productRepository.save(product);
        } catch (IOException e) {
            log.error("Error when adding product: {}", e.getMessage());
        }
    }
}
