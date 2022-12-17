package com.example.e_store.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue
    private Long productId;
    @NotBlank(message = "Product title can't be blank")
    private String title;
    private Double price;
    private String category;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ownerId", referencedColumnName = "userId")
    private User owner;
    private Integer inStock;
    @Lob
    @NotBlank(message = "Description for products can't be blank")
    private String description;
    @Lob
    // @Column(name = "productImage", length = 1000)
    private byte[] image;
    private Instant createdDate;
}
