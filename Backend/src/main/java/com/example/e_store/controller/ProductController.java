package com.example.e_store.controller;

import com.example.e_store.dto.*;
import com.example.e_store.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
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
            @RequestPart("imageFile") MultipartFile image) {
        productService.save(productRequest, image);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/all"
    )
    public ResponseEntity<List<ProductSpecificDetails>> getAllProducts() {
        log.info("Getting All Products .. ");
        return ResponseEntity.ok().body(productService.getAllProducts());
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/{id}"
    )
    public ResponseEntity<ProductResponse> getSpecificProduct(@PathVariable Long id) {
        log.info("Getting Specific Product .. ");
        return ResponseEntity.ok().body(productService.getSpecificProduct(id));
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/{productId}/owner/{email}"
    )
    public ResponseEntity<ProductAllInfo> isUserTheOwnerOfThisProduct(@PathVariable Long productId, @PathVariable String email) {
        return new ResponseEntity<>(productService.productAllInfo(productId, email), HttpStatus.OK);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            consumes = {"application/json"},
            value = "/edit"
    )
    public ResponseEntity<?> editProduct(@RequestBody ProductEdit productEdit) {
        productService.editProduct(productEdit);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
