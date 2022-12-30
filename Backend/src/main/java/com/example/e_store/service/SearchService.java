package com.example.e_store.service;

import com.example.e_store.dto.ProductSpecificDetails;
import com.example.e_store.model.Product;
import com.example.e_store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final ProductRepository productRepository;

    public List<ProductSpecificDetails> getProductsWhenSearchBy(String searchBy) {
        List<ProductSpecificDetails> res = new ArrayList<>();
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            if (contains(product.getTitle(), searchBy) || contains(product.getDescription(), searchBy) ||
                    contains(product.getPrice().toString(), searchBy) || contains(product.getCategory(), searchBy) ||
                    contains(product.getInStock().toString(), searchBy)) {
                log.info("HOHO: Marry Christmas ... Product #{} is Matching ...", product.getProductId());
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

    private boolean contains(String s1, String s2) {
        return Pattern.compile(Pattern.quote(s2), Pattern.CASE_INSENSITIVE).matcher(s1).find();
    }
}
