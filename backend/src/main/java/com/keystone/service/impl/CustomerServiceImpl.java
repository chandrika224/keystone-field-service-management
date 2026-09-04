package com.keystone.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keystone.dto.CustomerRequest;
import com.keystone.dto.CustomerResponse;
import com.keystone.entity.Customer;
import com.keystone.service.CustomerService;
import com.keystone.service.impl.helper.CustomerHelper;
import com.keystone.service.mapper.CustomerMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final CustomerHelper helper;
    private final CustomerMapper mapper;


    // =========================================================
    // CREATE CUSTOMER
    // =========================================================

    @Override
    public CustomerResponse saveCustomer(
            CustomerRequest request) {

        log.info(
                "Creating customer: email={}",
                request.getEmail()
        );

        // -----------------------------------------------------
        // VALIDATION
        // -----------------------------------------------------

        helper.validateCustomerName(
                request.getCustomerName()
        );

        helper.validateEmail(
                request.getEmail()
        );

        helper.validatePhone(
                request.getPhone()
        );

        helper.validateAddress(
                request.getAddress()
        );

        helper.validateEmailNotDuplicate(
                request.getEmail()
        );

        // -----------------------------------------------------
        // DTO -> ENTITY
        // -----------------------------------------------------

        Customer customer =
                mapper.mapToEntity(request);

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        Customer savedCustomer =
                helper.saveCustomer(customer);

        log.info(
                "Customer created successfully: customerId={}",
                savedCustomer.getCustomerId()
        );

        // -----------------------------------------------------
        // ENTITY -> RESPONSE
        // -----------------------------------------------------

        return mapper.mapToResponse(savedCustomer);
    }


    // =========================================================
    // GET ALL CUSTOMERS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public Page<CustomerResponse> getAllCustomers(
            Pageable pageable) {

        log.info(
                "Fetching all customers: page={}, size={}",
                pageable.getPageNumber(),
                pageable.getPageSize()
        );

        return helper
                .getAllCustomers(pageable)
                .map(mapper::mapToResponse);
    }


    // =========================================================
    // GET CUSTOMER BY ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public CustomerResponse getCustomerById(
            Long customerId) {

        log.info(
                "Fetching customer: customerId={}",
                customerId
        );

        // -----------------------------------------------------
        // VALIDATE ID
        // -----------------------------------------------------

        helper.validateCustomerId(customerId);

        // -----------------------------------------------------
        // FETCH CUSTOMER
        // -----------------------------------------------------

        Customer customer =
                helper.getCustomerById(customerId);

        // -----------------------------------------------------
        // ENTITY -> RESPONSE
        // -----------------------------------------------------

        return mapper.mapToResponse(customer);
    }


    // =========================================================
    // UPDATE CUSTOMER
    // =========================================================

    @Override
    public CustomerResponse updateCustomer(
            Long customerId,
            CustomerRequest request) {

        log.info(
                "Updating customer: customerId={}",
                customerId
        );

        // -----------------------------------------------------
        // VALIDATE CUSTOMER ID
        // -----------------------------------------------------

        helper.validateCustomerId(customerId);

        // -----------------------------------------------------
        // FETCH EXISTING CUSTOMER
        // -----------------------------------------------------

        Customer existingCustomer =
                helper.getCustomerById(customerId);

        helper.validateCustomerCanBeUpdated(
                existingCustomer
        );

        // -----------------------------------------------------
        // VALIDATION
        // -----------------------------------------------------

        helper.validateCustomerName(
                request.getCustomerName()
        );

        helper.validateEmail(
                request.getEmail()
        );

        helper.validatePhone(
                request.getPhone()
        );

        helper.validateAddress(
                request.getAddress()
        );

        helper.validateEmailNotDuplicate(
                request.getEmail(),
                customerId
        );

        // -----------------------------------------------------
        // UPDATE ENTITY
        // -----------------------------------------------------

        mapper.updateEntity(
                existingCustomer,
                request
        );

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        Customer updatedCustomer =
                helper.saveCustomer(existingCustomer);

        log.info(
                "Customer updated successfully: customerId={}",
                customerId
        );

        // -----------------------------------------------------
        // ENTITY -> RESPONSE
        // -----------------------------------------------------

        return mapper.mapToResponse(
                updatedCustomer
        );
    }


    // =========================================================
    // SEARCH CUSTOMERS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<CustomerResponse> searchCustomers(
            String customerName) {

        log.info(
                "Searching customers: customerName={}",
                customerName
        );

        // -----------------------------------------------------
        // VALIDATION
        // -----------------------------------------------------

        helper.validateCustomerName(
                customerName
        );

        // -----------------------------------------------------
        // SEARCH
        // -----------------------------------------------------

        return helper
                .searchCustomers(customerName)
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }


    // =========================================================
    // DELETE CUSTOMER
    // =========================================================

    @Override
    public void deleteCustomer(
            Long customerId) {

        log.info(
                "Deleting customer: customerId={}",
                customerId
        );

        // -----------------------------------------------------
        // VALIDATE ID
        // -----------------------------------------------------

        helper.validateCustomerId(customerId);

        // -----------------------------------------------------
        // FETCH CUSTOMER
        // -----------------------------------------------------

        Customer customer =
                helper.getCustomerById(customerId);

        // -----------------------------------------------------
        // BUSINESS VALIDATION
        // -----------------------------------------------------

        helper.validateCustomerCanBeDeleted(
                customer
        );

        // -----------------------------------------------------
        // DELETE
        // -----------------------------------------------------

        helper.deleteCustomer(customer);

        log.info(
                "Customer deleted successfully: customerId={}",
                customerId
        );
    }
}