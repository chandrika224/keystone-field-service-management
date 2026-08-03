package com.keystone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.AuthResponse;
import com.keystone.dto.LoginRequest;
import com.keystone.dto.RegisterRequest;
import com.keystone.dto.UserResponse;
import com.keystone.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public  UserResponse register(@RequestBody RegisterRequest request) {
		return userService.register(request);
		
	}
	
	@PostMapping("/login")
	public AuthResponse login(@RequestBody LoginRequest request) {
	    return userService.login(request);
	}

}
