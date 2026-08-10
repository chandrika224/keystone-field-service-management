package com.keystone.service;

import com.keystone.dto.AuthResponse;
import com.keystone.dto.LoginRequest;
import com.keystone.dto.RegisterRequest;
import com.keystone.dto.UserResponse;

public interface UserService {

    UserResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}