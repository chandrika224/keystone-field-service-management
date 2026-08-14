package com.keystone.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.keystone.dto.AuthResponse;
import com.keystone.dto.LoginRequest;
import com.keystone.dto.RegisterRequest;
import com.keystone.dto.UserResponse;
import com.keystone.entity.User;
import com.keystone.enums.Role;
import com.keystone.exception.InvalidCredentialsException;
import com.keystone.repository.UserRepository;
import com.keystone.security.JwtService;
import com.keystone.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    @Override
    public UserResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.CUSTOMER);
        user.setPhone(request.getPhone());
        User savedUser = userRepository.save(user);

        UserResponse response = new UserResponse();

        response.setId(savedUser.getId());
        response.setFirstName(savedUser.getFirstName());
        response.setLastName(savedUser.getLastName());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());

        
        return response;
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
        		.orElseThrow(() -> new InvalidCredentialsException("Invalid Email"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        	throw new InvalidCredentialsException("Invalid Password");
        }

        String token = jwtService.generateToken(
        	    user.getEmail(),
        	    user.getRole().name()
        	);

        return new AuthResponse(token, "Login Successful");
    }
}