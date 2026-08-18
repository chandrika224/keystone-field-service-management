package com.keystone.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keystone.entity.Customer;
import com.keystone.entity.Site;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.repository.CustomerRepository;
import com.keystone.repository.SiteRepository;
import com.keystone.service.CustomerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;

    @Override
    @Transactional
    public Customer saveCustomer(Customer customer) {
        Customer savedCustomer = customerRepository.save(customer);

        // Auto-generate customerCode if not present (e.g., CUS-001)
        if (savedCustomer.getCustomerCode() == null || savedCustomer.getCustomerCode().isBlank()) {
            savedCustomer.setCustomerCode("CUS-" + String.format("%03d", savedCustomer.getCustomerId()));
            savedCustomer = customerRepository.save(savedCustomer);
        }

        // Automatically create a default site for the customer
        if (savedCustomer.getAddress() != null && !savedCustomer.getAddress().isBlank()) {
            Site defaultSite = Site.builder()
                    .name(savedCustomer.getCustomerName() + " - Main Plant")
                    .address(savedCustomer.getAddress())
                    .customer(savedCustomer)
                    .build();

            siteRepository.save(defaultSite);
        }

        return savedCustomer;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Customer> getAllCustomers(Pageable pageable) {
        return customerRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
    }

    @Override
    @Transactional
    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        Customer existingCustomer = getCustomerById(id);

        existingCustomer.setCustomerName(updatedCustomer.getCustomerName());
        existingCustomer.setEmail(updatedCustomer.getEmail());
        existingCustomer.setPhone(updatedCustomer.getPhone());
        existingCustomer.setAddress(updatedCustomer.getAddress());

        // Update linked User info if present
        if (existingCustomer.getUser() != null) {
            existingCustomer.getUser().setPhone(updatedCustomer.getPhone());
            existingCustomer.getUser().setAddress(updatedCustomer.getAddress());
        }

        return customerRepository.save(existingCustomer);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Customer> searchCustomers(String customerName) {
        return customerRepository.findByCustomerNameContainingIgnoreCase(customerName);
    }

    @Override
    @Transactional
    public void deleteCustomer(Long id) {
        Customer customer = getCustomerById(id);
        customerRepository.delete(customer);
    }
}