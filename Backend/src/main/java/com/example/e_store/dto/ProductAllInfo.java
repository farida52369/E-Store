package com.example.e_store.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductAllInfo {
    private Long productId;
    private String title;
    private Double price;
    private String category;
    private Integer inStock;
    private String description;
    private byte[] image;
    private Instant createdDate;
    private Boolean isOwner;
    private String owner;
}
