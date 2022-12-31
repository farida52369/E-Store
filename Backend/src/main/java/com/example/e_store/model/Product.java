package com.example.e_store.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    @NotBlank(message = "Product title can't be blank")
    private String title;
    @NotNull(message = "Price for products can't be null")
    private Double price;
    @NotBlank(message = "Category for products can't be blank")
    private String category;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "managerId", referencedColumnName = "userId")
    private User manager;
    @NotNull(message = "Quantity in stock for products can't be null")
    private Integer inStock;
    @Lob
    @NotBlank(message = "Description for products can't be blank")
    private String description;
    @Lob
    // @Column(name = "productImage", length = 1000)
    private byte[] image;
    private Instant createdDate;
}
