package com.example.e_store.repository;

import com.example.e_store.model.Product;
import com.example.e_store.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByManager(User user);
}
