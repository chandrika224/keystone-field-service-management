package com.keystone.dto.staff;

import java.time.LocalDateTime;

import com.keystone.enums.Role;

import lombok.Data;

@Data
public class StaffResponse {

    private Long id;

    private String employeeId;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private Role role;

    private String specialization;

    private boolean active;

    private LocalDateTime joinedDate;

    private String temporaryPassword;
}