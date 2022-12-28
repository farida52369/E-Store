package com.example.e_store.service;

import com.example.e_store.dto.AuthenticationResponse;
import com.example.e_store.dto.ProfileInfoResponse;
import com.example.e_store.dto.RegisterRequest;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
class UserInfoServiceTest {

    @Autowired
    AuthService authService;
    @Autowired
    UserInfoService userInfoService;

    /*
    @Test
    void testGettingUserPersonalInfo() {
        RegisterRequest registerRequest = new RegisterRequest(
                "Fareeda", "Ragab", "123456789@",
                "fareeda1@gmail.com", "1-1-2001", "+201095224876",
                "Female"
        );
        log.info("User {} Register to the DB", registerRequest.getEmail());
        AuthenticationResponse authenticationResponse = authService.register(registerRequest);
        Assertions.assertNotNull(authenticationResponse);

        log.info("Getting User Info From Service");
        ProfileInfoResponse profileInfoResponse = userInfoService.getUserInfo(registerRequest.getEmail());
        Assertions.assertEquals("Fareeda", profileInfoResponse.getFirstName());
        Assertions.assertEquals("Ragab", profileInfoResponse.getLastName());
        Assertions.assertEquals("fareeda1@gmail.com", profileInfoResponse.getEmail());
        Assertions.assertEquals("1-1-2001", profileInfoResponse.getDateOfBirth());
        Assertions.assertEquals("+201095224876", profileInfoResponse.getPhoneNumber());
        Assertions.assertEquals("Female", profileInfoResponse.getGender());
    }
    */
}