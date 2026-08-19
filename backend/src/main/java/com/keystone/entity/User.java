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
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
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

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String phone;

    @Column
    private String address;


    // =========================================================
    // STAFF INFORMATION
    // =========================================================

    @Column(unique = true)
    private String employeeId;

    @Column
    private String specialization;

    @Column
    private LocalDateTime joinedDate;


    // =========================================================
    // ROLE
    // =========================================================

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;


    // =========================================================
    // ACTIVE STATUS
    // =========================================================

    @Column(nullable = false)
    private boolean active = true;


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public User() {
    }


    // =========================================================
    // ID
    // =========================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // =========================================================
    // FIRST NAME
    // =========================================================

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    // =========================================================
    // LAST NAME
    // =========================================================

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    // =========================================================
    // EMAIL
    // =========================================================

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    // =========================================================
    // PASSWORD
    // =========================================================

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    // =========================================================
    // PHONE
    // =========================================================

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    // =========================================================
    // ADDRESS
    // =========================================================

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    // =========================================================
    // EMPLOYEE ID
    // =========================================================

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }


    // =========================================================
    // SPECIALIZATION
    // =========================================================

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }


    // =========================================================
    // JOINED DATE
    // =========================================================

    public LocalDateTime getJoinedDate() {
        return joinedDate;
    }

    public void setJoinedDate(LocalDateTime joinedDate) {
        this.joinedDate = joinedDate;
    }


    // =========================================================
    // ROLE
    // =========================================================

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }


    // =========================================================
    // ACTIVE
    // =========================================================

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}