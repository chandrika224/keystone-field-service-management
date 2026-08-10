package com.keystone.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.keystone.entity.Customer;

public interface CustomerService {

    Customer saveCustomer(Customer customer);

    Page<Customer> getAllCustomers(Pageable pageable);

    Customer getCustomerById(Long id);

    Customer updateCustomer(Long id, Customer customer);
    
    List<Customer> searchCustomers(String customerName);

    void deleteCustomer(Long id);
}