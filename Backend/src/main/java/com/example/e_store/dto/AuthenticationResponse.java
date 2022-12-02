package com.example.e_store.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String authenticationToken; // from Jwt Provider
    private String refreshToken; // from RefreshTokenService
    private Instant expiresAt;
    private String email;
}
