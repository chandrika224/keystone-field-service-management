package com.keystone.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import com.keystone.dto.AuthResponse;
import com.keystone.dto.LoginRequest;
import com.keystone.dto.RegisterRequest;
import com.keystone.dto.UpdateProfileRequest;
import com.keystone.dto.UserResponse;
import com.keystone.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Authentication APIs")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @Operation(summary = "Register User")
    @PostMapping("/register")
    public UserResponse register(@Valid @RequestBody RegisterRequest request) {
    	UserResponse response = userService.register(request);
    	log.info("user registration successful: {}" +request);
        return response;
    }
    

    @Operation(summary = "Login User")
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {

        AuthResponse response = userService.login(request);

        System.out.println("LOGIN ROLE = " + response.getRole());
        System.out.println("LOGIN RESPONSE = " + response);

        return response;
    }
    @Operation(summary = "Update User Profile")
    @PutMapping("/profile")
    public UserResponse updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        return userService.updateProfile(email, request);
    }
    @Operation(summary = "Get Current User Profile")
    @GetMapping("/profile")
    public UserResponse getProfile(Authentication authentication) {

        String email = authentication.getName();

        return userService.getProfile(email);
    }
    @Operation(summary = "Logout User")
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {

        log.info("User logout successful");

        return ResponseEntity.ok("Logout successful");
    }

}