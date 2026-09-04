package com.keystone.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keystone.dto.AuthResponse;
import com.keystone.dto.LoginRequest;
import com.keystone.dto.RegisterRequest;
import com.keystone.dto.UpdateProfileRequest;
import com.keystone.dto.UserResponse;

import com.keystone.entity.Customer;
import com.keystone.entity.User;

import com.keystone.enums.Role;

import com.keystone.exception.InvalidCredentialsException;

import com.keystone.repository.CustomerRepository;
import com.keystone.repository.UserRepository;

import com.keystone.security.JwtService;
import com.keystone.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final CustomerRepository customerRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;


    // =========================================================
    // REGISTER
    // =========================================================

    @Override
    @Transactional
    public UserResponse register(RegisterRequest request) {

        log.info(
                "Registering new customer with email={}",
                request.getEmail()
        );


        // =====================================================
        // VALIDATE PASSWORD
        // =====================================================

        if (!request.getPassword().equals(
                request.getConfirmPassword())) {

            throw new IllegalArgumentException(
                    "Password and confirm password do not match"
            );
        }


        // =====================================================
        // CHECK DUPLICATE EMAIL
        // =====================================================

        if (userRepository.existsByEmail(
                request.getEmail())) {

            throw new IllegalArgumentException(
                    "Email already exists"
            );
        }


        // =====================================================
        // CREATE USER
        // =====================================================

        User user = new User();

        user.setFirstName(
                request.getFirstName()
        );

        user.setLastName(
                request.getLastName()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPhone(
                request.getPhone()
        );
        user.setAddress(request.getAddress());
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );
        
        


        // -----------------------------------------------------
        // PUBLIC REGISTRATION = CUSTOMER
        // -----------------------------------------------------

        user.setRole(Role.CUSTOMER);

        user.setActive(true);


        // -----------------------------------------------------
        // Save User
        // joinedDate is automatically populated by @PrePersist
        // -----------------------------------------------------

        User savedUser =
                userRepository.save(user);


        // =====================================================
        // CREATE CUSTOMER
        // =====================================================

        Customer customer = new Customer();
        
        customer.setCustomerCode(
                "CUS-" + String.format("%03d", savedUser.getId())
        );

        customer.setCustomerName(
                savedUser.getFirstName() + " " + savedUser.getLastName()
        );

        customer.setEmail(savedUser.getEmail());
        customer.setPhone(savedUser.getPhone());
        customer.setAddress(savedUser.getAddress());

        // IMPORTANT
        customer.setUser(savedUser);

        
        // -----------------------------------------------------
        // Save Customer
        // customerId is generated automatically by database
        // -----------------------------------------------------

        Customer savedCustomer =
                customerRepository.save(customer);


        log.info(
                "Customer registered successfully: userId={}, customerId={}",
                savedUser.getId(),
                savedCustomer.getCustomerId()
        );


        // =====================================================
        // BUILD RESPONSE
        // =====================================================

        return buildUserResponse(
                savedUser,
                savedCustomer
        );
    }


    // =========================================================
    // LOGIN
    // =========================================================

        @Override
        public AuthResponse login(LoginRequest request) {

            log.info("======================================");
            log.info("LOGIN START");
            log.info("Email received: {}", request.getEmail());

            User user =
                    userRepository.findByEmail(
                            request.getEmail()
                    )
                    .orElseThrow(() -> {

                        log.error(
                                "USER NOT FOUND: {}",
                                request.getEmail()
                        );

                        return new InvalidCredentialsException(
                                "Invalid email or password"
                        );
                    });

            log.info("User found");
            log.info("User ID: {}", user.getId());
            log.info("User email: {}", user.getEmail());
            log.info("User role: {}", user.getRole());
            log.info("User active: {}", user.isActive());
            log.info("Stored password hash: {}", user.getPassword());

            boolean passwordMatches =
                    passwordEncoder.matches(
                            request.getPassword(),
                            user.getPassword()
                    );

            log.info(
                    "Password matches: {}",
                    passwordMatches
            );

            if (!passwordMatches) {

                log.error("PASSWORD DOES NOT MATCH");

                throw new InvalidCredentialsException(
                        "Invalid email or password"
                );
            }

            log.info("Password verified successfully");

            String token =
                    jwtService.generateToken(
                            user.getEmail(),
                            user.getRole().name()
                    );

            log.info("JWT generated successfully");

            Long customerId = null;

            if (user.getRole() == Role.CUSTOMER) {

                customerId =
                        customerRepository
                                .findByEmail(user.getEmail())
                                .map(Customer::getCustomerId)
                                .orElse(null);
            }

            log.info("LOGIN SUCCESS");
            log.info("======================================");

            return new AuthResponse(
                    user.getId(),
                    customerId,
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhone(),
                    user.getAddress(),
                    user.getRole(),
                    token,
                    "Login Successful"
            );
        }

    // =========================================================
    // GET PROFILE
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public UserResponse getProfile(
            String email) {

        log.info(
                "Fetching profile for email={}",
                email
        );


        User user =
                userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        return buildUserResponse(user);
    }


    // =========================================================
    // UPDATE PROFILE
    // =========================================================

    @Override
    @Transactional
    public UserResponse updateProfile(
            String email,
            UpdateProfileRequest request) {

        log.info(
                "Updating profile for email={}",
                email
        );


        // =====================================================
        // FIND USER
        // =====================================================

        User user =
                userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        // =====================================================
        // UPDATE USER
        // =====================================================

        user.setFirstName(
                request.getFirstName()
        );

        user.setLastName(
                request.getLastName()
        );

        user.setPhone(
                request.getPhone()
        );

        user.setAddress(
                request.getAddress()
        );


        User savedUser =
                userRepository.save(user);


        // =====================================================
        // UPDATE CUSTOMER
        // =====================================================

        Customer savedCustomer = null;

        if (savedUser.getRole() == Role.CUSTOMER) {

            savedCustomer =
                    customerRepository
                            .findByEmail(email)
                            .orElse(null);


            if (savedCustomer != null) {

                savedCustomer.setCustomerName(
                        savedUser.getFirstName()
                                + " "
                                + savedUser.getLastName()
                );

                savedCustomer.setPhone(
                        savedUser.getPhone()
                );

                savedCustomer.setAddress(
                        savedUser.getAddress()
                );

                savedCustomer =
                        customerRepository.save(
                                savedCustomer
                        );
            }
        }


        // =====================================================
        // RESPONSE
        // =====================================================

        return buildUserResponse(
                savedUser,
                savedCustomer
        );
    }


    // =========================================================
    // BUILD USER RESPONSE
    // =========================================================

    private UserResponse buildUserResponse(
            User user) {

        Customer customer = null;

        if (user.getRole() == Role.CUSTOMER) {

            customer =
                    customerRepository
                            .findByEmail(user.getEmail())
                            .orElse(null);
        }


        return buildUserResponse(
                user,
                customer
        );
    }


    // =========================================================
    // BUILD USER RESPONSE WITH CUSTOMER
    // =========================================================

    private UserResponse buildUserResponse(
            User user,
            Customer customer) {

        UserResponse response =
                new UserResponse();


        // =====================================================
        // USER INFORMATION
        // =====================================================

        response.setId(
                user.getId()
        );

        response.setFirstName(
                user.getFirstName()
        );

        response.setLastName(
                user.getLastName()
        );

        response.setEmail(
                user.getEmail()
        );

        response.setPhone(
                user.getPhone()
        );

        response.setAddress(
                user.getAddress()
        );

        response.setRole(
                user.getRole()
        );


        // =====================================================
        // CUSTOMER INFORMATION
        // =====================================================

        if (customer != null) {

            response.setCustomerId(
                    customer.getCustomerId()
            );
        }


        return response;
    }
}
