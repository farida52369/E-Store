package com.example.e_store.controller;

import com.example.e_store.dto.ProductSpecificDetails;
import com.example.e_store.service.SortService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/sort")
public class SortController {

    private final SortService sortService;

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/price"
    )
    public ResponseEntity<List<ProductSpecificDetails>> getAllProductsSortedByPrice() {
        log.info("Getting All Products Sorted By Price ... ");
        return ResponseEntity.ok().body(sortService.getProductsSortedByPrice());
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/in-stock"
    )
    public ResponseEntity<List<ProductSpecificDetails>> getAllProductsSortedByQuantityInStock() {
        log.info("Getting All Products Sorted By Quantity In Stock ... ");
        return ResponseEntity.ok().body(sortService.getProductsSortedByQuantityInStock());
    }
}
