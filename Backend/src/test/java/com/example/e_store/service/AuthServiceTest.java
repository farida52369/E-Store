package com.example.e_store.service;

import com.example.e_store.dto.RegisterRequest;
import com.example.e_store.model.User;
import com.example.e_store.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.TransactionSystemException;

import javax.persistence.PersistenceException;
import javax.persistence.RollbackException;
import javax.validation.ConstraintViolationException;
import java.util.Optional;

@SpringBootTest
// @DataJpaTest
// @AutoConfigureTestDatabase(replace = NONE)
class AuthServiceTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthService authService;

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
    public void testUserRegisterWhenNameConstraintsViolated() {
        userRepository.deleteAll();
        Assertions.assertEquals(0, userRepository.count());
        RegisterRequest registerRequest = new RegisterRequest(
                "  ", "Ragab", "123456789",
                "fareeeeda1@gmail.com", "1-1-2001",
                "+201095224876", "Female"
        );
        // authService.register(registerRequest);
        // authService.register(registerRequest);

        TransactionSystemException exception = Assertions.assertThrows(
                TransactionSystemException.class, () -> {
                    authService.register(registerRequest);
                }
        );
        Assertions.assertTrue(exception.getCause() instanceof RollbackException);
        Assertions.assertEquals(0, userRepository.count());
    }
}