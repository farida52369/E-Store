package com.example.e_store.controller;

import com.example.e_store.dto.AuthenticationResponse;
import com.example.e_store.dto.LoginRequest;
import com.example.e_store.dto.RefreshTokenRequest;
import com.example.e_store.dto.RegisterRequest;
import com.example.e_store.service.AuthService;
import com.example.e_store.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @RequestMapping(
            method = RequestMethod.POST,
            value = "/register",
            consumes = {"application/json"}
    )
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest registerRequest) {
        log.info("Registering User Info {}", registerRequest);
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/auth/register").toUriString());
        return ResponseEntity.created(uri).body(authService.register(registerRequest));
    }

    @RequestMapping(
            method = RequestMethod.POST,
            value = "/login",
            consumes = {"application/json"}
    )
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest loginRequest) {
        log.info("Login User {}", loginRequest.getEmail());
        return new ResponseEntity<>(authService.login(loginRequest), OK);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            value = "/refresh/token",
            consumes = {"application/json"}
    )
    public AuthenticationResponse refreshTokens(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refreshToken(refreshTokenRequest);
    }

    @RequestMapping(
            method = RequestMethod.POST,
            value = "/logout",
            consumes = {"application/json"}
    )
    public ResponseEntity<String> logout(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        log.info("Logging the user out of the system ...");
        refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());
        return new ResponseEntity<>("Refresh Token deleted successfully", OK);
    }
}