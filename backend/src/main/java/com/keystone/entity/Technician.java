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

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "technicians")
@Data
@NoArgsConstructor
public class Technician {

    // =========================================================
    // ID
    // =========================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================================================
    // TECHNICIAN INFORMATION
    // =========================================================

    @Column(name = "specialization", nullable = false)
    private String specialization;


    // =========================================================
    // ACTIVE STATUS
    // =========================================================

    @Column(name = "active", nullable = false)
    private boolean active = true;
    
	 // =========================================================
	 // AVAILABILITY STATUS
	 // =========================================================
	
	 @Column(name = "available", nullable = false)
	 private boolean available = true;
	

    // =========================================================
    // USER RELATIONSHIP
    // =========================================================

    @OneToOne(
            fetch = FetchType.LAZY,
            optional = false
    )
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;
}