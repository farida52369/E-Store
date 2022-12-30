package com.example.e_store.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.io.Serializable;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
public class Checkout implements Serializable {
    @EmbeddedId
    private CompositeKey compositeKey;
    @Column(nullable = false)
    private Integer quantity;
}
