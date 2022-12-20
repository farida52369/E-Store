package com.example.e_store.repository;

import com.example.e_store.model.Product;
import com.example.e_store.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByOwner(Optional<User> user);

    List<Product> findAllByCategory(String category);
}
