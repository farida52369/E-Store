package com.example.e_store.service;

import com.example.e_store.dto.ProductRequest;
import com.example.e_store.dto.ProductResponse;
import com.example.e_store.dto.RegisterRequest;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@SpringBootTest
class ProductServiceTest {

    @Autowired
    AuthService authService;

    @Autowired
    ProductService productService;

    @Test
    void testSavingNewProductForAuthorizedUser() {
        RegisterRequest registerRequest = new RegisterRequest(
                "Fareeda", "Ragab", "123456789",
                "fareeda1@gmail.com", "1-1-2001", "+201095224876",
                "Female"
        );
        authService.register(registerRequest);

        log.info("Creating First New Product ...");
        ProductRequest productRequest_1 = new ProductRequest(
                "Lip Stick", 200.0, "Health & Beauty", 2,
                "Lip Stick For yourself Love and Care :)",
                "fareeda1@gmail.com");
        MultipartFile multipartFile_1 = new MockMultipartFile("img.png", "Lip Stick Photo".getBytes());
        productService.save(productRequest_1, multipartFile_1);
        Assertions.assertEquals(1, productService.getAllProducts().length);

        log.info("Testing First Created Product ...");
        ProductResponse response_1 = productService.getSpecificProduct(1L);
        Assertions.assertEquals("Lip Stick", response_1.getTitle());
        Assertions.assertEquals("Health & Beauty", response_1.getCategory());
        Assertions.assertEquals(200.0, response_1.getPrice());
        Assertions.assertEquals(2, response_1.getInStock());
        Assertions.assertEquals("Lip Stick For yourself Love and Care :)", response_1.getDescription());

        log.info("Creating Second New Product ...");
        ProductRequest productRequest_2 = new ProductRequest(
                "Maybelline Instant Age Rewind Eraser Dark Circles Treatment Multi-Use Concealer",
                300.0, "Health & Beauty", 5,
                "Erase the look of dark circles, correct the appearance of redness and brighten " +
                        "the look of dull skin with Instant Age Rewind Eraser multi-use concealer MAX OUT THOSE " +
                        "LASHES: Designed to max out every lash, Lash Blast Volume Mascara creates 10 times " +
                        "more volume instantly",
                "fareeda1@gmail.com");
        MultipartFile multipartFile_2 = new MockMultipartFile("img.png", "Eraser Dark Circles Treatment".getBytes());
        productService.save(productRequest_2, multipartFile_2);
        Assertions.assertEquals(2, productService.getAllProducts().length);

        log.info("Testing Second Created Product ...");
        ProductResponse response_2 = productService.getSpecificProduct(2L);
        Assertions.assertEquals("Maybelline Instant Age Rewind Eraser Dark Circles Treatment Multi-Use " +
                "Concealer", response_2.getTitle());
        Assertions.assertEquals("Health & Beauty", response_2.getCategory());
        Assertions.assertEquals(300.0, response_2.getPrice());
        Assertions.assertEquals(5, response_2.getInStock());
        Assertions.assertEquals("Erase the look of dark circles, correct the appearance of redness and brighten " +
                "the look of dull skin with Instant Age Rewind Eraser multi-use concealer MAX OUT THOSE " +
                "LASHES: Designed to max out every lash, Lash Blast Volume Mascara creates 10 times " +
                "more volume instantly", response_2.getDescription());

        log.info("Creating Third New Product ...");
        ProductRequest productRequest_3 = new ProductRequest(
                "Self stirring mug",
                150.0, "Health & Beauty", 3,
                "Don't get tired!",
                "fareeda1@gmail.com");
        MultipartFile multipartFile_3 = new MockMultipartFile("img.png", "Self stirring mug".getBytes());
        productService.save(productRequest_3, multipartFile_3);
        Assertions.assertEquals(3, productService.getAllProducts().length);

        log.info("Testing Third Created Product ...");
        ProductResponse response_3 = productService.getSpecificProduct(3L);
        Assertions.assertEquals("Self stirring mug", response_3.getTitle());
        Assertions.assertEquals("Health & Beauty", response_3.getCategory());
        Assertions.assertEquals(150.0, response_3.getPrice());
        Assertions.assertEquals(3, response_3.getInStock());
        Assertions.assertEquals("Don't get tired!", response_3.getDescription());
    }
}