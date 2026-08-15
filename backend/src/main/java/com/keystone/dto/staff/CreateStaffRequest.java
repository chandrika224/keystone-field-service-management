package com.keystone.dto.staff;

import com.keystone.enums.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateStaffRequest {

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private Role role;

    private String specialization;
}