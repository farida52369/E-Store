package com.example.e_store.controller;

import com.example.e_store.dto.CheckoutRequest;
import com.example.e_store.service.CheckoutService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/checkout")
@AllArgsConstructor
public class CheckoutController {

    private final CheckoutService checkoutService;

    @RequestMapping(
            method = RequestMethod.POST,
            consumes = {"application/json"}
    )
    public ResponseEntity<?> checkoutOrder(@RequestBody CheckoutRequest checkoutRequest) {
        log.info("Checking Out From User: {}", checkoutRequest.getCustomer());
        checkoutService.saveOrder(checkoutRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
