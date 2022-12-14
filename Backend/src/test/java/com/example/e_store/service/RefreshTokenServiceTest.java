package com.example.e_store.service;

import com.example.e_store.exceptions.EStoreException;
import com.example.e_store.model.RefreshToken;
import com.example.e_store.repository.RefreshTokenRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

@DataJpaTest
@AutoConfigureTestDatabase(replace = NONE)
class RefreshTokenServiceTest {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    private RefreshTokenService refreshTokenService;

    @Test
    public void testValidateRefreshToken() {
        refreshTokenRepository.deleteAll();
        refreshTokenService = new RefreshTokenService(refreshTokenRepository);

        RefreshToken refreshToken = refreshTokenService.generateRefreshToken();
        refreshTokenService.validateRefreshToken(refreshToken.getToken());
        Assertions.assertEquals(1, refreshTokenRepository.count());

        Assertions.assertThrows(
                EStoreException.class, () -> refreshTokenService.validateRefreshToken("what a refresh token!")
        );
    }

    @Test
    public void testDeletionOfRefreshToken() {
        refreshTokenRepository.deleteAll();
        refreshTokenService = new RefreshTokenService(refreshTokenRepository);

        // Create Two RefreshTokens and Validate them
        RefreshToken refreshToken_1 = refreshTokenService.generateRefreshToken();
        refreshTokenService.validateRefreshToken(refreshToken_1.getToken());
        Assertions.assertEquals(1, refreshTokenRepository.count());

        RefreshToken refreshToken_2 = refreshTokenService.generateRefreshToken();
        refreshTokenService.validateRefreshToken(refreshToken_2.getToken());
        Assertions.assertEquals(2, refreshTokenRepository.count());

        // Delete The Two Refresh Tokens
        refreshTokenService.deleteRefreshToken(refreshToken_1.getToken());
        Assertions.assertEquals(1, refreshTokenRepository.count());

        refreshTokenService.deleteRefreshToken(refreshToken_2.getToken());
        Assertions.assertEquals(0, refreshTokenRepository.count());
    }
}