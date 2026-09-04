package com.keystone.service.mapper;

import org.springframework.stereotype.Component;

import com.keystone.dto.CustomerRequest;
import com.keystone.dto.CustomerResponse;
import com.keystone.entity.Customer;

@Component
public class CustomerMapper {

    // =========================================================
    // REQUEST DTO -> ENTITY
    // =========================================================

    public Customer mapToEntity(
            CustomerRequest request) {

        if (request == null) {
            return null;
        }

        Customer customer = new Customer();

        customer.setCustomerName(
                request.getCustomerName()
        );

        customer.setEmail(
                request.getEmail()
        );

        customer.setPhone(
                request.getPhone()
        );

        customer.setAddress(
                request.getAddress()
        );

        return customer;
    }


    // =========================================================
    // ENTITY -> RESPONSE DTO
    // =========================================================

    public CustomerResponse mapToResponse(
            Customer customer) {

        if (customer == null) {
            return null;
        }

        CustomerResponse response =
                new CustomerResponse();

        response.setCustomerId(
                customer.getCustomerId()
        );

        response.setCustomerCode(
                customer.getCustomerCode()
        );

        response.setCustomerName(
                customer.getCustomerName()
        );

        response.setEmail(
                customer.getEmail()
        );

        response.setPhone(
                customer.getPhone()
        );

        response.setAddress(
                customer.getAddress()
        );

        // -----------------------------------------------------
        // USER
        // -----------------------------------------------------

        if (customer.getUser() != null) {

            response.setUserId(
                    customer.getUser().getId()
            );
        }

        return response;
    }


    // =========================================================
    // UPDATE ENTITY FROM REQUEST
    // =========================================================

    public void updateEntity(
            Customer customer,
            CustomerRequest request) {

        if (customer == null || request == null) {
            return;
        }

        customer.setCustomerName(
                request.getCustomerName()
        );

        customer.setEmail(
                request.getEmail()
        );

        customer.setPhone(
                request.getPhone()
        );

        customer.setAddress(
                request.getAddress()
        );
    }
}
