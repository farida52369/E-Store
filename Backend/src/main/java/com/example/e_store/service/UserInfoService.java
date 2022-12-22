package com.example.e_store.service;

import com.example.e_store.dto.ProductResponse;
import com.example.e_store.dto.ProfileInfoResponse;
import com.example.e_store.model.Product;
import com.example.e_store.model.User;
import com.example.e_store.repository.ProductRepository;
import com.example.e_store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserInfoService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private User getCurrentUser(String email) {
        return userRepository.findByEmail(email).
                orElseThrow(() -> new UsernameNotFoundException("User Email not Found - " + email));
    }

    public ProfileInfoResponse getUserInfo(String email) {
        User user = getCurrentUser(email);
        return ProfileInfoResponse.builder().
                firstName(user.getFirstName()).
                lastName(user.getLastName()).
                email(user.getEmail()).
                phoneNumber(user.getPhoneNumber()).
                dateOfBirth(user.getDateOfBirth()).
                gender(user.getGender()).
                build();
    }

    public List<ProductResponse> getUserOwnerProducts(String email) {
        Optional<User> owner = userRepository.findByEmail(email);
        if (!owner.isPresent()) return null;
        List<Product> products = productRepository.findAllByOwner(owner.get());
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
