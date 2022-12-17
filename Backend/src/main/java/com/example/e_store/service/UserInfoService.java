package com.example.e_store.service;

import com.example.e_store.dto.ProductResponse;
import com.example.e_store.dto.ProfileInfoResponse;
import com.example.e_store.model.Product;
import com.example.e_store.model.User;
import com.example.e_store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserInfoService {

    private final AuthService authService;
    private final ProductRepository productRepository;

    public ProfileInfoResponse getUserInfo() {
        User user = authService.getCurrentUser();
        return ProfileInfoResponse.builder().
                firstName(user.getFirstName()).
                lastName(user.getLastName()).
                phoneNumber(user.getPhoneNumber()).
                dateOfBirth(user.getDateOfBirth()).
                gender(user.getGender()).
                build();
    }

    public List<ProductResponse> getUserOwnerProducts() {
        List<Product> products = productRepository.findAllByOwner(authService.getCurrentUser());
        List<ProductResponse> productResponse = new ArrayList<>();
        for (Product product : products) {
            ProductResponse response = ProductResponse.builder().
                    productId(product.getProductId()).
                    title(product.getTitle()).
                    price(product.getPrice()).
                    category(product.getCategory()).
                    inStock(product.getInStock()).
                    description(product.getDescription()).
                    image(product.getImage()).
                    createdDate(product.getCreatedDate()).
                    build();
            productResponse.add(response);
        }
        return productResponse;
    }
}
