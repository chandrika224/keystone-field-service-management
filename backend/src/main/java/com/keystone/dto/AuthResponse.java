package com.keystone.dto;

import com.keystone.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private Long id;

    private Long customerId;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String address;

    private Role role;

    private String token;

    private String message;
}