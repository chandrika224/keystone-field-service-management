package com.keystone.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TechnicianRequest {

    // =========================================================
    // USER INFORMATION
    // =========================================================

    @NotBlank(message = "First name is required")
    private String firstName;


    @NotBlank(message = "Last name is required")
    private String lastName;


    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;


    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must be exactly 10 digits"
    )
    private String phone;


    // =========================================================
    // TECHNICIAN INFORMATION
    // =========================================================

    @NotBlank(message = "Specialization is required")
    private String specialization;


    // =========================================================
    // TECHNICIAN STATUS
    // =========================================================

    private Boolean active;
}
