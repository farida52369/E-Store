package com.example.e_store.service;

import com.example.e_store.dto.LoginRequest;
import com.example.e_store.dto.RegisterRequest;
import com.example.e_store.model.User;
import com.example.e_store.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.transaction.TransactionSystemException;

import javax.persistence.PersistenceException;
import java.util.Optional;

@SpringBootTest
// @DataJpaTest
// @AutoConfigureTestDatabase(replace = NONE)
class AuthServiceTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthService authService;

    /*
    @Test
    public void testUserRegisterWhenNoConstraintsViolated() {
        userRepository.deleteAll();
        Assertions.assertEquals(0, userRepository.count());
        RegisterRequest registerRequest = new RegisterRequest(
                "Fareeda", "Ragab", "123456789",
                "fareeda1@gmail.com", "1-1-2001", "+201095224876",
                "Female"
        );

        authService.register(registerRequest);
        Assertions.assertEquals(1, userRepository.count());
        Optional<User> user = userRepository.findByEmail("fareeda1@gmail.com");
        user.ifPresent(u -> {
            Assertions.assertEquals("Fareeda", u.getFirstName());
            Assertions.assertEquals("Ragab", u.getLastName());
            Assertions.assertEquals("1-1-2001", u.getDateOfBirth());
            Assertions.assertEquals("+201095224876", u.getPhoneNumber());
            Assertions.assertEquals("Female", u.getGender());
        });
    }

    @Test
    public void testUserRegisterConstraintNotBlankViolation() {
        userRepository.deleteAll();
        Assertions.assertEquals(0, userRepository.count());

        // First Name is Not allowed to be Blank
        RegisterRequest registerRequest = new RegisterRequest(
                "  ", "Ragab", "123456789",
                "fareeeeda1@gmail.com", "1-1-2001",
                "+201095224876", "Female"
        );

        Assertions.assertThrows(
                TransactionSystemException.class, () -> {
                    authService.register(registerRequest);
                }
        );
        Assertions.assertEquals(0, userRepository.count());

        // Second Name is Not allowed to be Blank
        registerRequest.setFirstName("Fareeda");
        registerRequest.setLastName("");
        Assertions.assertThrows(
                TransactionSystemException.class, () -> {
                    authService.register(registerRequest);
                }
        );
        Assertions.assertEquals(0, userRepository.count());

        // Phone Number is Not allowed to be Blank
        registerRequest.setLastName("Ragab");
        registerRequest.setPhoneNumber(" ");
        Assertions.assertThrows(
                TransactionSystemException.class, () -> {
                    authService.register(registerRequest);
                }
        );
        Assertions.assertEquals(0, userRepository.count());

        // Date Of Birth is Not allowed to be Blank
        registerRequest.setPhoneNumber("+201083447654");
        registerRequest.setDateOfBirth("");
        Assertions.assertThrows(
                TransactionSystemException.class, () -> {
                    authService.register(registerRequest);
                }
        );
        Assertions.assertEquals(0, userRepository.count());
    }

    @Test
    public void testUserRegisterConstraintUniqueEmailViolation() {
        userRepository.deleteAll();
        Assertions.assertEquals(0, userRepository.count());

        RegisterRequest registerRequest = new RegisterRequest(
                "Fareeda", "Ragab", "123456789",
                "fareeeeda1@gmail.com", "1-1-2001",
                "+201095224876", "Female"
        );
        authService.register(registerRequest);
        Assertions.assertEquals(1, userRepository.count());

        DataIntegrityViolationException exception = Assertions.assertThrows(
                DataIntegrityViolationException.class, () -> {
                    authService.register(registerRequest);
                }
        );
        Assertions.assertTrue(exception.getCause() instanceof PersistenceException);
        Assertions.assertEquals(1, userRepository.count());
    }

    @Test
    public void testLoginAuthenticationService() {
        userRepository.deleteAll();
        RegisterRequest registerRequest = new RegisterRequest(
                "Fareeda", "Ragab", "123456789",
                "fareeda1@gmail.com", "1-1-2001", "+201095224876",
                "Female"
        );
        authService.register(registerRequest);

        // Login Successfully
        LoginRequest loginRequest_1 = new LoginRequest("fareeda1@gmail.com", "123456789");
        Assertions.assertNotNull(authService.login(loginRequest_1));

        // Wrong Password or Email
        LoginRequest loginRequest_2 = new LoginRequest("fareeda1@gmail.com", "213456789");
        Assertions.assertThrows(
                BadCredentialsException.class, () -> {
                    authService.login(loginRequest_2);
                }
        );

        LoginRequest loginRequest_3 = new LoginRequest("fareeeda1@gmail.com", "123456789");
        Assertions.assertThrows(
                BadCredentialsException.class, () -> {
                    authService.login(loginRequest_3);
                }
        );
    }

    @Test
    public void testGetCurrentUserService() {
        userRepository.deleteAll();
        RegisterRequest registerRequest = new RegisterRequest(
                "Fareeda", "Ragab", "123456789",
                "fareeda1@gmail.com", "1-1-2001", "+201095224876",
                "Female"
        );
        authService.register(registerRequest);

        // There's No Current User in the System
        Assertions.assertThrows(
                NullPointerException.class, () -> {
                    authService.getCurrentUser();
                }
        );

        // Login Successfully
        LoginRequest loginRequest_1 = new LoginRequest("fareeda1@gmail.com", "123456789");
        Assertions.assertNotNull(authService.login(loginRequest_1));
    }
    */
}