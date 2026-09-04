package com.keystone.service;

import com.keystone.dto.AuthResponse;
import com.keystone.dto.LoginRequest;
import com.keystone.dto.RegisterRequest;
import com.keystone.dto.UpdateProfileRequest;
import com.keystone.dto.UserResponse;

public interface UserService {

    // =========================================================
    // REGISTER
    // =========================================================

    UserResponse register(RegisterRequest request);


    // =========================================================
    // LOGIN
    // =========================================================

    AuthResponse login(LoginRequest request);


    // =========================================================
    // PROFILE
    // =========================================================

    UserResponse getProfile(String email);


    // =========================================================
    // UPDATE PROFILE
    // =========================================================

    UserResponse updateProfile(
            String email,
            UpdateProfileRequest request
    );
}
