package com.keystone.entity;

import java.time.LocalDateTime;

import com.keystone.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {

    // =========================================================
    // ID
    // =========================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================================================
    // BASIC INFORMATION
    // =========================================================

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;


    // =========================================================
    // STAFF INFORMATION
    // =========================================================

    @Column(name = "employee_id", unique = true)
    private String employeeId;

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "joined_date", nullable = false)
    private LocalDateTime joinedDate;


    // =========================================================
    // ROLE
    // =========================================================

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;


    // =========================================================
    // ACTIVE STATUS
    // =========================================================

    @Column(name = "active", nullable = false)
    private boolean active = true;


    // =========================================================
    // PRE-PERSIST
    // =========================================================

    @PrePersist
    protected void onCreate() {

        if (joinedDate == null) {
            joinedDate = LocalDateTime.now();
        }

        if (role == null) {
            throw new IllegalStateException(
                    "User role cannot be null"
            );
        }
    }
}