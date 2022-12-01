package com.example.e_store.controller;

import com.example.e_store.dto.AuthenticationResponse;
import com.example.e_store.dto.LoginRequest;
import com.example.e_store.dto.RefreshTokenRequest;
import com.example.e_store.dto.RegisterRequest;
import com.example.e_store.model.User;
import com.example.e_store.service.AuthService;
import com.example.e_store.service.RefreshTokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping(value = "/register", consumes = {"application/json"})
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        authService.register(registerRequest);
        return new ResponseEntity<>("User Registration Successful", OK);
    }

    @PostMapping(value = "/login", consumes = {"application/json"})
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest loginRequest) {
        return new ResponseEntity<>(authService.login(loginRequest), OK);
    }

    @PostMapping(value = "/refresh/token")
    public AuthenticationResponse refreshTokens(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refreshToken(refreshTokenRequest);
    }

    @PostMapping(value = "/logout", consumes = {"application/json"})
    public ResponseEntity<String> logout(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());
        return new ResponseEntity<>("Refresh Token deleted successfully", OK);
    }

    @GetMapping(value = "/current")
    public ResponseEntity<User> getCurrentUser() {
        return new ResponseEntity<>(authService.getCurrentUser(), OK);
    }
}