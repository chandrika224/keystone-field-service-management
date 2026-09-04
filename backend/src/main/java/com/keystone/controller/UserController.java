package com.keystone.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
@Tag(
    name = "Authentication",
    description = "Authentication and user profile APIs"
)
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;


    // =========================================================
    // REGISTER
    // =========================================================

    @Operation(
        summary = "Register a new customer"
    )
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        log.info(
            "Registration request received for email={}",
            request.getEmail()
        );

        UserResponse response =
                userService.register(request);

        return ResponseEntity
                .status(201)
                .body(response);
    }


    // =========================================================
    // LOGIN
    // =========================================================

    @Operation(
        summary = "Login user"
    )
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        log.info(
            "Login request received for email={}",
            request.getEmail()
        );

        AuthResponse response =
                userService.login(request);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // GET PROFILE
    // =========================================================

    @Operation(
        summary = "Get logged-in user's profile"
    )
    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(
            Authentication authentication) {

        String email =
                authentication.getName();

        log.info(
            "Fetching profile for email={}",
            email
        );

        UserResponse response =
                userService.getProfile(email);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // UPDATE PROFILE
    // =========================================================

    @Operation(
        summary = "Update logged-in user's profile"
    )
    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request) {

        String email =
                authentication.getName();

        log.info(
            "Updating profile for email={}",
            email
        );

        UserResponse response =
                userService.updateProfile(
                        email,
                        request
                );

        return ResponseEntity.ok(response);
    }
}
