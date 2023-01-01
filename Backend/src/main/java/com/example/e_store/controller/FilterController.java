package com.example.e_store.controller;

import com.example.e_store.dto.ProductSpecificDetails;
import com.example.e_store.service.FilterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/filter")
public class FilterController {

    private final FilterService filterService;

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/{category}"
    )
    public ResponseEntity<List<ProductSpecificDetails>> getAllProductsMatchWithBy(@PathVariable String category) {
        log.info("Getting All Products Match With Category {} .. ", category);
        return ResponseEntity.ok().body(filterService.getProductsByCategory(category));
    }
}
