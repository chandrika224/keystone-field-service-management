package com.keystone.dto;

import com.keystone.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TechnicianResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String specialization;

    private boolean active;

    private Role role;

    // Computed field for dispatcher dashboard
    private long activeJobs;
}