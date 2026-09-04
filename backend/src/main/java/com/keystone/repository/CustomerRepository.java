package com.keystone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keystone.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByEmail(String email);

    Optional<Customer> findByEmail(String email);

    List<Customer> findByCustomerNameContainingIgnoreCase(String customerName);

    Optional<Customer> findByUser_Id(Long userId);

    boolean existsByUser_Id(Long userId);
}