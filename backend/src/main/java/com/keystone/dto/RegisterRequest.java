package com.keystone.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterRequest {

    // =========================================================
    // BASIC INFORMATION
    // =========================================================

    @NotBlank(message = "First name is required")
    @Size(
        min = 2,
        max = 50,
        message = "First name must be between 2 and 50 characters"
    )
    @Pattern(
        regexp = "^[A-Za-z]+(?:[ '-][A-Za-z]+)*$",
        message = "First name contains invalid characters"
    )
    private String firstName;


    @NotBlank(message = "Last name is required")
    @Size(
        min = 2,
        max = 50,
        message = "Last name must be between 2 and 50 characters"
    )
    @Pattern(
        regexp = "^[A-Za-z]+(?:[ '-][A-Za-z]+)*$",
        message = "Last name contains invalid characters"
    )
    private String lastName;


    // =========================================================
    // EMAIL
    // =========================================================

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(
        max = 255,
        message = "Email must not exceed 255 characters"
    )
    private String email;


    // =========================================================
    // PHONE
    // =========================================================

    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Phone number must be a valid 10-digit Indian mobile number"
    )
    private String phone;
    
	 // =========================================================
	 // ADDRESS
	 // =========================================================
	
	 @NotBlank(message = "Address is required")
	 @Size(
	     min = 5,
	     max = 255,
	     message = "Address must be between 5 and 255 characters"
	 )
	 private String address;

    // =========================================================
    // PASSWORD
    // =========================================================

    @NotBlank(message = "Password is required")
    @Size(
        min = 8,
        max = 100,
        message = "Password must be between 8 and 100 characters"
    )
    private String password;


    // =========================================================
    // CONFIRM PASSWORD
    // =========================================================

    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;
    
    @NotNull(message = "Terms and conditions must be accepted")
    @AssertTrue(message = "You must accept the Terms and Conditions")
    private Boolean termsAccepted;
}
