package com.example.e_store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private String title;
    private Double price;
    private String category;
    private Integer inStock;
    private String description;
    private String owner;
}
