package com.example.e_store.controller;

import com.example.e_store.dto.ProductSpecificDetails;
import com.example.e_store.service.SearchService;
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
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/{by}"
    )
    public ResponseEntity<List<ProductSpecificDetails>> getAllProductsMatchWithBy(@PathVariable String by) {
        log.info("Getting All Products Match With {} .. ", by);
        return ResponseEntity.ok().body(searchService.getProductsWhenSearchBy(by));
    }
}
