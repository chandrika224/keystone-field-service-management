package com.keystone.dto;

import com.keystone.enums.Role;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TechnicianResponse {

    // =========================================================
    // TECHNICIAN ID
    // =========================================================

    private Long id;


    // =========================================================
    // USER INFORMATION
    // =========================================================

    private String firstName;

    private String lastName;

    private String email;

    private String phone;


    // =========================================================
    // TECHNICIAN INFORMATION
    // =========================================================

    private String specialization;


    // =========================================================
    // TECHNICIAN STATUS
    // =========================================================

    private boolean active;

    private boolean available;


    // =========================================================
    // USER ROLE
    // =========================================================

    private Role role;
}