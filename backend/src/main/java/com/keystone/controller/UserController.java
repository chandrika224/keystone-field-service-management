package com.keystone.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.AuthResponse;
import com.keystone.dto.LoginRequest;
import com.keystone.dto.RegisterRequest;
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
    	log.info("user logged in:" +request);
        return userService.login(request);
    }

}