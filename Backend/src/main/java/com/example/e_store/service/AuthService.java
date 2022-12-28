package com.example.e_store.service;

import com.example.e_store.dto.AuthenticationResponse;
import com.example.e_store.dto.LoginRequest;
import com.example.e_store.dto.RefreshTokenRequest;
import com.example.e_store.dto.RegisterRequest;
import com.example.e_store.model.User;
import com.example.e_store.repository.UserRepository;
import com.example.e_store.security.JwtProvider;
import com.example.e_store.security.JwtUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final RefreshTokenService refreshTokenService;

    public AuthenticationResponse register(RegisterRequest registerRequest) {
        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setGender(registerRequest.getGender());
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setDateOfBirth(registerRequest.getDateOfBirth());
        user.setIsManager(registerRequest.getIsManager());

        userRepository.save(user);

        log.info("{} has registered to the DB", registerRequest.getEmail());
        return login(new LoginRequest(registerRequest.getEmail(), registerRequest.getPassword()));
    }

    public AuthenticationResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenService.generateRefreshToken().getToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .email(loginRequest.getEmail())
                .build();
    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
        String token = jwtProvider.generateTokenWithEMail(refreshTokenRequest.getEmail());
        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenRequest.getRefreshToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .email(refreshTokenRequest.getEmail())
                .build();
    }

    public boolean isManager(String email) {
        return userRepository.findByEmail(email).get().getIsManager();
    }

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        JwtUser principal = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(principal.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User Email not Found - " + principal.getEmail()));
    }
}
