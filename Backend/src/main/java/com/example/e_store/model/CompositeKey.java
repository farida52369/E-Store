package com.example.e_store.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.time.Instant;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class CompositeKey implements Serializable {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customerId", referencedColumnName = "userId")
    private User customer;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId", referencedColumnName = "productId")
    private Product product;
    @Column(nullable = false)
    private String dateOfPurchase;
}
