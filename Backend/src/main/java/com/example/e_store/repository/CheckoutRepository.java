package com.example.e_store.repository;

import com.example.e_store.model.Checkout;
import com.example.e_store.model.CompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, CompositeKey> {

    @Query(value =
            "SELECT u.customer_id " +
                    "FROM checkout u " +
                    "WHERE u.date_of_purchase >= DATE_ADD(NOW(),INTERVAL-30 DAY)",
            nativeQuery = true
    )
    List<Long> getTop5CustomersInLast3Months();
}
