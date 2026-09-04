package com.keystone.dto;

import com.keystone.enums.Role;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponse {

    private Long id;

    private Long customerId;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String address;

    private String employeeId;

    private String specialization;

    private Role role;

    private boolean active;
}