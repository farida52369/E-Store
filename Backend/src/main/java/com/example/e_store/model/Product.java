package com.example.e_store.model;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.Objects;

@Getter
@Setter
@ToString
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ownerId", referencedColumnName = "userId")
    @ToString.Exclude
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Product product = (Product) o;
        return productId != null && Objects.equals(productId, product.productId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
