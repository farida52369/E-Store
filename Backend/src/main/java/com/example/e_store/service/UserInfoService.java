package com.example.e_store.service;

import com.example.e_store.dto.ProductSpecificDetails;
import com.example.e_store.dto.ProfileInfoResponse;
import com.example.e_store.model.Product;
import com.example.e_store.model.User;
import com.example.e_store.repository.CheckoutRepository;
import com.example.e_store.repository.ProductRepository;
import com.example.e_store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserInfoService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CheckoutRepository checkoutRepository;

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

    public List<ProductSpecificDetails> getUserOwnerProducts(String email) {
        Optional<User> owner = userRepository.findByEmail(email);
        if (!owner.isPresent()) return new ArrayList<>();
        List<Product> products = productRepository.findAllByManager(owner.get());
        List<ProductSpecificDetails> productResponse = new ArrayList<>();
        for (Product product : products) {
            ProductSpecificDetails response = ProductSpecificDetails.builder().
                    productId(product.getProductId()).
                    title(product.getTitle()).
                    price(product.getPrice()).
                    inStock(product.getInStock()).
                    description(product.getDescription()).
                    image(product.getImage()).
                    build();
            productResponse.add(response);
        }
        return productResponse;
    }

    public List<ProductSpecificDetails> getUserPurchasedProducts(String email) {
        Optional<User> owner = userRepository.findByEmail(email);
        if (!owner.isPresent()) return new ArrayList<>();
        List<Long> products = checkoutRepository.findCustomerPurchases(owner.get().getUserId());
        log.info("Length of Purchased Products {}", products.size());
        List<ProductSpecificDetails> productResponse = new ArrayList<>();
        for (Long productId : products) {
            Product product = productRepository.getById(productId);
            ProductSpecificDetails response = ProductSpecificDetails.builder().
                    productId(product.getProductId()).
                    title(product.getTitle()).
                    price(product.getPrice()).
                    inStock(product.getInStock()).
                    description(product.getDescription()).
                    image(product.getImage()).
                    build();
            productResponse.add(response);
        }
        return productResponse;
    }
}
