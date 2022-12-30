package com.example.e_store.service;

import com.example.e_store.dto.ProductSpecificDetails;
import com.example.e_store.model.Product;
import com.example.e_store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FilterService {

    private final ProductRepository productRepository;

    public List<ProductSpecificDetails> getProductsByCategory(String category) {
        List<ProductSpecificDetails> res = new ArrayList<>();
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            if (product.getCategory().equalsIgnoreCase(category)) {
                log.info("HOHO: Marry Christmas ... Product #{} is Matching for Category Filtering ...", product.getProductId());
                ProductSpecificDetails productSpecificDetails = ProductSpecificDetails.builder().
                        productId(product.getProductId()).
                        title(product.getTitle()).
                        description(product.getDescription()).
                        price(product.getPrice()).
                        image(product.getImage()).
                        inStock(product.getInStock()).
                        build();
                res.add(productSpecificDetails);
            }
        }
        return res;
    }
}
