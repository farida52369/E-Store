package com.example.e_store.controller;

import com.example.e_store.dto.ProductRequest;
import com.example.e_store.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    @RequestMapping(
            method = RequestMethod.POST,
            consumes = {"multipart/form-data", "application/json"},
            value = "/create"
    )
    public ResponseEntity<?> createProduct(
            @RequestPart("product") ProductRequest productRequest,
            @RequestPart("image") MultipartFile image) {
        productService.save(productRequest, image);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
