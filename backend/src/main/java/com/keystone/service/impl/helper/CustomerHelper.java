package com.keystone.service.impl.helper;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.keystone.entity.Customer;
import com.keystone.enums.ErrorCode;
import com.keystone.exception.KeystoneException;
import com.keystone.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomerHelper {

    private final CustomerRepository customerRepository;


    // =========================================================
    // GET CUSTOMER BY ID
    // =========================================================

    public Customer getCustomerById(Long customerId) {

        validateCustomerId(customerId);

        log.debug(
                "Fetching customer: customerId={}",
                customerId
        );

        return customerRepository.findById(customerId)
                .orElseThrow(() -> {

                    log.warn(
                            "Customer not found: customerId={}",
                            customerId
                    );

                    return new KeystoneException(
                            ErrorCode.CUSTOMER_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // GET CUSTOMER BY EMAIL
    // =========================================================

    public Customer getCustomerByEmail(String email) {

        validateEmail(email);

        log.debug(
                "Fetching customer by email={}",
                email
        );

        return customerRepository.findByEmail(email)
                .orElseThrow(() -> {

                    log.warn(
                            "Customer not found: email={}",
                            email
                    );

                    return new KeystoneException(
                            ErrorCode.CUSTOMER_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // GET CUSTOMER BY USER ID
    // =========================================================

    public Customer getCustomerByUserId(Long userId) {

        if (userId == null) {

            log.warn("User ID is null");

            throw new KeystoneException(
                    ErrorCode.CUSTOMER_NOT_FOUND
            );
        }

        log.debug(
                "Fetching customer by userId={}",
                userId
        );

        return customerRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> {

                    log.warn(
                            "Customer profile not found for userId={}",
                            userId
                    );

                    return new KeystoneException(
                            ErrorCode.CUSTOMER_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // VALIDATE CUSTOMER
    // =========================================================

    public void validateCustomer(Customer customer) {

        if (customer == null) {

            log.warn("Customer is null");

            throw new KeystoneException(
                    ErrorCode.CUSTOMER_NOT_FOUND
            );
        }
    }


    // =========================================================
    // VALIDATE CUSTOMER ID
    // =========================================================

    public void validateCustomerId(Long customerId) {

        if (customerId == null) {

            log.warn("Customer ID is null");

            throw new KeystoneException(
                    ErrorCode.CUSTOMER_NOT_FOUND
            );
        }
    }


    // =========================================================
    // VALIDATE CUSTOMER EMAIL
    // =========================================================

    public void validateEmail(String email) {

        if (email == null || email.isBlank()) {

            log.warn("Customer email is missing");

            throw new KeystoneException(
                    ErrorCode.CUSTOMER_EMAIL_REQUIRED
            );
        }
    }


    // =========================================================
    // VALIDATE CUSTOMER NAME
    // =========================================================

    public void validateCustomerName(
            String customerName) {

        if (customerName == null
                || customerName.isBlank()) {

            log.warn(
                    "Customer name is missing"
            );

            throw new KeystoneException(
                    ErrorCode.CUSTOMER_NAME_REQUIRED
            );
        }
    }


    // =========================================================
    // VALIDATE CUSTOMER PHONE
    // =========================================================

    public void validatePhone(String phone) {

        if (phone == null || phone.isBlank()) {

            log.warn(
                    "Customer phone is missing"
            );

            throw new KeystoneException(
                    ErrorCode.CUSTOMER_PHONE_REQUIRED
            );
        }

        if (!phone.matches("^[0-9]{10}$")) {

            log.warn(
                    "Invalid customer phone number"
            );

            throw new KeystoneException(
                    ErrorCode.INVALID_CUSTOMER_PHONE
            );
        }
    }


    // =========================================================
    // VALIDATE CUSTOMER ADDRESS
    // =========================================================

    public void validateAddress(String address) {

        if (address == null || address.isBlank()) {

            log.warn(
                    "Customer address is missing"
            );

            throw new KeystoneException(
                    ErrorCode.CUSTOMER_ADDRESS_REQUIRED
            );
        }
    }


    // =========================================================
    // CHECK DUPLICATE EMAIL
    // =========================================================

    public void validateEmailNotDuplicate(
            String email) {

        validateEmail(email);

        if (customerRepository.existsByEmail(email)) {

            log.warn(
                    "Customer email already exists: email={}",
                    email
            );

            throw new KeystoneException(
                    ErrorCode.DUPLICATE_CUSTOMER_EMAIL
            );
        }
    }


    // =========================================================
    // CHECK DUPLICATE EMAIL DURING UPDATE
    // =========================================================

    public void validateEmailNotDuplicate(
            String email,
            Long customerId) {

        validateEmail(email);
        validateCustomerId(customerId);

        Customer existingCustomer =
                customerRepository
                        .findByEmail(email)
                        .orElse(null);

        if (existingCustomer != null
                && !existingCustomer
                        .getCustomerId()
                        .equals(customerId)) {

            log.warn(
                    "Customer email already belongs to another customer: email={}, customerId={}",
                    email,
                    customerId
            );

            throw new KeystoneException(
                    ErrorCode.DUPLICATE_CUSTOMER_EMAIL
            );
        }
    }


    // =========================================================
    // CHECK CUSTOMER PROFILE FOR USER
    // =========================================================

    public void validateUserDoesNotHaveCustomerProfile(
            Long userId) {

        if (userId == null) {

            log.warn("User ID is null");

            throw new KeystoneException(
                    ErrorCode.CUSTOMER_NOT_FOUND
            );
        }

        if (customerRepository.existsByUser_Id(userId)) {

            log.warn(
                    "Customer profile already exists for userId={}",
                    userId
            );

            throw new KeystoneException(
                    ErrorCode.DUPLICATE_CUSTOMER_USER
            );
        }
    }


    // =========================================================
    // VALIDATE CUSTOMER CAN BE UPDATED
    // =========================================================

    public void validateCustomerCanBeUpdated(
            Customer customer) {

        validateCustomer(customer);

        /*
         * Customer currently does not contain
         * an active/inactive status.
         *
         * Therefore no status validation is
         * required at this point.
         *
         * Future customer business rules can
         * be added here.
         */
    }


    // =========================================================
    // VALIDATE CUSTOMER CAN BE DELETED
    // =========================================================

    public void validateCustomerCanBeDeleted(
            Customer customer) {

        validateCustomer(customer);

        /*
         * Before deleting a customer, future
         * business rules may need to verify
         * dependent records such as:
         *
         * - Work Orders
         * - Sites
         * - Notifications
         * - Invoices
         *
         * These checks can be added once the
         * corresponding repositories are finalized.
         */
    }
    
    // =========================================================
    // SAVE CUSTOMER
    // =========================================================

    public Customer saveCustomer(Customer customer) {

        log.debug(
                "Saving customer: customerId={}",
                customer.getCustomerId()
        );

        return customerRepository.save(customer);
    }


    // =========================================================
    // GET ALL CUSTOMERS (PAGINATED)
    // =========================================================

    public Page<Customer> getAllCustomers(Pageable pageable) {

        log.debug(
                "Fetching all customers: page={}, size={}",
                pageable.getPageNumber(),
                pageable.getPageSize()
        );

        return customerRepository.findAll(pageable);
    }


    // =========================================================
    // SEARCH CUSTOMERS BY NAME
    // =========================================================

    public List<Customer> searchCustomers(String customerName) {

        log.debug(
                "Searching customers by name={}",
                customerName
        );

        return customerRepository
                .findByCustomerNameContainingIgnoreCase(customerName);
    }


    // =========================================================
    // DELETE CUSTOMER
    // =========================================================

    public void deleteCustomer(Customer customer) {

        log.debug(
                "Deleting customer: customerId={}",
                customer.getCustomerId()
        );

        customerRepository.delete(customer);
    }
}