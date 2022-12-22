package com.example.e_store.controller;

import com.example.e_store.dto.ProductResponse;
import com.example.e_store.dto.ProfileInfoResponse;
import com.example.e_store.service.UserInfoService;
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
@RequestMapping("/api/user")
public class UserInfoController {

    private final UserInfoService userInfoService;

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/profile/{email}"
    )
    public ResponseEntity<ProfileInfoResponse> getUserInfo(@PathVariable String email) {
        log.info("Getting User Info {}" + email);
        return ResponseEntity.ok().body(userInfoService.getUserInfo(email));
    }

    @RequestMapping(
            method = RequestMethod.GET,
            value = "/owned/products/{email}"
    )
    public ResponseEntity<List<ProductResponse>> getUserOwnerProducts(@PathVariable String email) {
        log.info("Getting User Owned Products");
        return ResponseEntity.ok().body(userInfoService.getUserOwnerProducts(email));
    }
}
