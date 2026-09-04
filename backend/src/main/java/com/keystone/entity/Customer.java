package com.keystone.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
public class Customer {

    // =========================================================
    // CUSTOMER ID
    // =========================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long customerId;


    // =========================================================
    // CUSTOMER CODE
    // =========================================================

    @Column(name = "customer_code", unique = true)
    private String customerCode;


    // =========================================================
    // CUSTOMER INFORMATION
    // =========================================================

    @NotBlank(message = "Customer name is required")
    @Column(name = "customer_name", nullable = false)
    private String customerName;


    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "email", nullable = false, unique = true)
    private String email;


    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must be exactly 10 digits"
    )
    @Column(name = "phone", nullable = false)
    private String phone;


    @NotBlank(message = "Address is required")
    @Column(name = "address", nullable = false)
    private String address;


    // =========================================================
    // USER RELATIONSHIP
    // =========================================================

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "user_id",
        unique = true
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;
}