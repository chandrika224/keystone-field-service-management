package com.keystone.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.keystone.dto.CustomerRequest;
import com.keystone.dto.CustomerResponse;

public interface CustomerService {

    // =========================================================
    // CREATE CUSTOMER
    // =========================================================

    CustomerResponse saveCustomer(
            CustomerRequest request
    );


    // =========================================================
    // GET ALL CUSTOMERS
    // =========================================================

    Page<CustomerResponse> getAllCustomers(
            Pageable pageable
    );


    // =========================================================
    // GET CUSTOMER BY ID
    // =========================================================

    CustomerResponse getCustomerById(
            Long customerId
    );


    // =========================================================
    // UPDATE CUSTOMER
    // =========================================================

    CustomerResponse updateCustomer(
            Long customerId,
            CustomerRequest request
    );


    // =========================================================
    // SEARCH CUSTOMERS
    // =========================================================

    List<CustomerResponse> searchCustomers(
            String customerName
    );


    // =========================================================
    // DELETE CUSTOMER
    // =========================================================

    void deleteCustomer(
            Long customerId
    );
}