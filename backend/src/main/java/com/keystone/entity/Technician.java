package com.keystone.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "technicians")
@Getter
@Setter
@NoArgsConstructor
public class Technician {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ============================================================
    // PERSONAL INFORMATION
    // ============================================================

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

    // ============================================================
    // TECHNICIAN INFORMATION
    // ============================================================

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private boolean active = true;

    // ============================================================
    // ROLE
    // ============================================================

    /*
     * A record in this table is always a technician.
     *
     * Authentication/authorization is handled through
     * the User entity.
     */
    
    // No Role field needed here.
}