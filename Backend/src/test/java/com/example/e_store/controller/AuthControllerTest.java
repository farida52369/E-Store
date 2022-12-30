package com.example.e_store.controller;

import com.example.e_store.Main;
import com.example.e_store.config.SecurityConfig;
import com.example.e_store.dto.AuthenticationResponse;
import com.example.e_store.dto.RegisterRequest;
import com.example.e_store.model.Product;
import com.example.e_store.repository.ProductRepository;
import com.example.e_store.repository.RefreshTokenRepository;
import com.example.e_store.repository.UserRepository;
import com.example.e_store.security.JwtProvider;
import com.example.e_store.service.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.Instant;

@RunWith(SpringRunner.class)
@SpringBootTest
@SpringJUnitConfig
@ContextConfiguration(classes = {SecurityConfig.class, AuthService.class,
        MyUserDetailsService.class, ProductService.class, RefreshTokenService.class,
        UserInfoService.class, UserRepository.class, ProductRepository.class,
        RefreshTokenRepository.class, JwtProvider.class,
        Main.class})
class AuthControllerTest {

    MockMvc mockMvc;
    @Autowired
    WebApplicationContext webApplicationContext;

    @Autowired
    AuthService authService;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    /*
    @Test
    void testRegisteringNewUserController() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest(
                "Fareeda", "Ragab", "123456789",
                "fareeda1@gmail.com", "1-1-2001", "+201095224876",
                "Female"
        );

        String inputInJson = this.mapToJson(registerRequest);
        String URI = "/api/auth/register";


        String token = jwtProvider.generateToken(authentication);
        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenService.generateRefreshToken().getToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .email(loginRequest.getEmail())
                .build();


        Mockito.when(authService.register(registerRequest)).thenReturn(new AuthenticationResponse());

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post(URI)
                .accept(MediaType.APPLICATION_JSON).content(inputInJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        String outputInJson = response.getContentAsString();

        Assertions.assertEquals(outputInJson, inputInJson);
        Assertions.assertEquals(HttpStatus.CREATED.value(), response.getStatus());
    }

    private String mapToJson(Object object) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }
    */
}