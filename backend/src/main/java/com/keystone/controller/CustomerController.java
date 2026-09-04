package com.keystone.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.CustomerRequest;
import com.keystone.dto.CustomerResponse;
import com.keystone.service.CustomerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@Tag(name = "Customers", description = "Customer Management APIs")
public class CustomerController {

    private final CustomerService customerService;

    // ==========================================
    // CREATE CUSTOMER
    // POST /api/customers
    // ==========================================
    @Operation(summary = "Create a new customer")
    @PostMapping
    public ResponseEntity<CustomerResponse> createCustomer(
            @Valid @RequestBody CustomerRequest request) {

        log.info("Received request to create customer: email={}", request.getEmail());

        CustomerResponse response = customerService.saveCustomer(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // ==========================================
    // GET ALL CUSTOMERS (PAGINATED)
    // GET /api/customers?page=0&size=20&sort=customerName
    // ==========================================
    @Operation(summary = "Get all customers, paginated")
    @GetMapping
    public ResponseEntity<Page<CustomerResponse>> getAllCustomers(
            @PageableDefault(size = 20, sort = "customerName") Pageable pageable) {

        log.info(
                "Received request to fetch customers: page={}, size={}",
                pageable.getPageNumber(),
                pageable.getPageSize()
        );

        Page<CustomerResponse> customers = customerService.getAllCustomers(pageable);

        return ResponseEntity.ok(customers);
    }

    // ==========================================
    // GET CUSTOMER BY ID
    // GET /api/customers/{customerId}
    // ==========================================
    @Operation(summary = "Get a customer by ID")
    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerResponse> getCustomerById(
            @PathVariable Long customerId) {

        log.info("Received request to fetch customerId={}", customerId);

        CustomerResponse response = customerService.getCustomerById(customerId);

        return ResponseEntity.ok(response);
    }

    // ==========================================
    // UPDATE CUSTOMER
    // PUT /api/customers/{customerId}
    // ==========================================
    @Operation(summary = "Update an existing customer")
    @PutMapping("/{customerId}")
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable Long customerId,
            @Valid @RequestBody CustomerRequest request) {

        log.info("Received request to update customerId={}", customerId);

        CustomerResponse response = customerService.updateCustomer(customerId, request);

        return ResponseEntity.ok(response);
    }

    // ==========================================
    // SEARCH CUSTOMERS BY NAME
    // GET /api/customers/search?customerName=acme
    // ==========================================
    @Operation(summary = "Search customers by name")
    @GetMapping("/search")
    public ResponseEntity<List<CustomerResponse>> searchCustomers(
            @RequestParam String customerName) {

        log.info("Received request to search customers: customerName={}", customerName);

        List<CustomerResponse> results = customerService.searchCustomers(customerName);

        return ResponseEntity.ok(results);
    }

    // ==========================================
    // DELETE CUSTOMER
    // DELETE /api/customers/{customerId}
    // ==========================================
    @Operation(summary = "Delete a customer")
    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable Long customerId) {

        log.info("Received request to delete customerId={}", customerId);

        customerService.deleteCustomer(customerId);

        return ResponseEntity.noContent().build();
    }
}