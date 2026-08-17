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

@Service
@RequiredArgsConstructor
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

        // -----------------------------------------------------
        // Check duplicate email in USERS
        // -----------------------------------------------------

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException(
                    "Email already exists");
        }

        // -----------------------------------------------------
        // Create User
        // -----------------------------------------------------

        User user = new User();

        user.setFirstName(
                request.getFirstName());

        user.setLastName(
                request.getLastName());

        user.setEmail(
                request.getEmail());

        user.setPhone(
                request.getPhone());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        // Every public registration is CUSTOMER
        user.setRole(Role.CUSTOMER);
        user.setPhone(request.getPhone());
        User savedUser = userRepository.save(user);

        User savedUser =
                userRepository.save(user);


        // =====================================================
        // CREATE CUSTOMER RECORD
        // =====================================================

        Customer customer = new Customer();

        customer.setCustomerName(
                savedUser.getFirstName()
                + " "
                + savedUser.getLastName());

        customer.setEmail(
                savedUser.getEmail());

        customer.setPhone(
                savedUser.getPhone());

        /*
         * RegisterRequest currently does not contain address.
         *
         * Customer.address is currently nullable=false,
         * therefore we use a temporary value.
         *
         * The customer can update the address later
         * from My Profile.
         */
        customer.setAddress(
                "Not provided");

        customerRepository.save(customer);


        // =====================================================
        // RESPONSE
        // =====================================================

        UserResponse response =
                new UserResponse();

        response.setId(
                savedUser.getId());

        response.setFirstName(
                savedUser.getFirstName());

        response.setLastName(
                savedUser.getLastName());

        response.setEmail(
                savedUser.getEmail());

        response.setRole(
                savedUser.getRole());

        response.setPhone(
                savedUser.getPhone());

        response.setAddress(
                savedUser.getAddress());

        
        return response;
    }


    // =========================================================
    // LOGIN
    // =========================================================

    @Override
    public AuthResponse login(
            LoginRequest request) {

        User user =
                userRepository.findByEmail(
                        request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException(
                                "Invalid Email"));


        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new InvalidCredentialsException(
                    "Invalid Password");
        }

        String token = jwtService.generateToken(
        	    user.getEmail(),
        	    user.getRole().name()
        	);

        String token =
                jwtService.generateToken(
                        user.getEmail());


        return new AuthResponse(
                token,
                "Login Successful",
                user.getRole(),
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
        );
    }


    // =========================================================
    // UPDATE PROFILE
    // =========================================================

    @Override
    public UserResponse updateProfile(
            String email,
            UpdateProfileRequest request) {

        User user =
                userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));


        user.setFirstName(
                request.getFirstName());

        user.setLastName(
                request.getLastName());

        user.setPhone(
                request.getPhone());

        user.setAddress(
                request.getAddress());


        User savedUser =
                userRepository.save(user);


        // -----------------------------------------------------
        // Also update Customer record
        // -----------------------------------------------------

        customerRepository.findByEmail(email)
                .ifPresent(customer -> {

                    customer.setCustomerName(
                            savedUser.getFirstName()
                            + " "
                            + savedUser.getLastName());

                    customer.setPhone(
                            savedUser.getPhone());

                    customer.setAddress(
                            savedUser.getAddress());

                    customerRepository.save(customer);
                });


        return buildUserResponse(savedUser);
    }


    // =========================================================
    // GET PROFILE
    // =========================================================

    @Override
    public UserResponse getProfile(
            String email) {

        User user =
                userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));

        return buildUserResponse(user);
    }


    // =========================================================
    // USER RESPONSE
    // =========================================================

    private UserResponse buildUserResponse(
            User user) {

        UserResponse response =
                new UserResponse();

        response.setId(
                user.getId());

        response.setFirstName(
                user.getFirstName());

        response.setLastName(
                user.getLastName());

        response.setEmail(
                user.getEmail());

        response.setPhone(
                user.getPhone());

        response.setAddress(
                user.getAddress());

        response.setRole(
                user.getRole());

        return response;
    }
}