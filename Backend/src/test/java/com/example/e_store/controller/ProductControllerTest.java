package com.example.e_store.controller;

import com.example.e_store.MainTest;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@SpringBootApplication
public class ProductControllerTest {


    @Autowired
    private MockMvc mvc;

    @Test
    void testCreateProductFromController() throws Exception {
        String url = "/api/product/create";
        MockMultipartFile employeeJson = new MockMultipartFile("product", null,
                "application/json", ("{\"title\": \"Lip Stick\", \"category\": \"Health & Beauty\", " +
                "\"price\": \"200.0\", \"inStock\": \"2\", \"description\": " +
                "\"Lip Stick For yourself Love and Care :)\", \"owner\": \"fareedaragab7@gmail.com\"}").getBytes());

        MockMultipartFile multipartFile_1 = new MockMultipartFile("img.png", "Lip Stick Photo".getBytes());
        mvc.perform(multipart(url)
                        .file(multipartFile_1)
                        .file(employeeJson))
                .andExpect(status().isCreated());
    }
}