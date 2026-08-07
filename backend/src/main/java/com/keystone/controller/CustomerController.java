package com.keystone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import com.keystone.entity.Customer;
import com.keystone.service.CustomerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
@Tag(name = "Customer", description = "Customer Management APIs")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Create Customer
    @Operation(summary = "Create Customer")
    @PostMapping
    public Customer saveCustomer(@Valid @RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }

    // Get All Customers
    @Operation(summary = "Get All Customers")
    @GetMapping
    public Page<Customer> getAllCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "customerName") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return customerService.getAllCustomers(pageable);
    }

    // Get Customer By Id
    @Operation(summary = "Get Customer By ID")
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    // Update Customer
    @Operation(summary = "Update Customer")
    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id,
                                   @Valid @RequestBody Customer customer) {
        return customerService.updateCustomer(id, customer);
    }

    // Search Customer By Name
    @Operation(summary = "Search Customer By Name")
    @GetMapping("/search")
    public List<Customer> searchCustomers(
            @RequestParam String customerName) {

        return customerService.searchCustomers(customerName);
    }

    // Delete Customer
    @Operation(summary = "Delete Customer")
    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return "Customer deleted successfully";
    }
}