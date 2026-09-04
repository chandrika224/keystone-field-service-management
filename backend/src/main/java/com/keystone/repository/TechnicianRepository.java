package com.keystone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keystone.entity.Technician;

@Repository
public interface TechnicianRepository
        extends JpaRepository<Technician, Long> {

    // =========================================================
    // FIND TECHNICIAN BY USER ID
    // =========================================================

    Optional<Technician> findByUser_Id(
            Long userId
    );


    // =========================================================
    // CHECK TECHNICIAN BY USER ID
    // =========================================================

    boolean existsByUser_Id(
            Long userId
    );


    // =========================================================
    // FIND TECHNICIAN BY USER EMAIL
    // =========================================================

    Optional<Technician> findByUser_Email(
            String email
    );


    // =========================================================
    // CHECK TECHNICIAN BY USER EMAIL
    // =========================================================

    boolean existsByUser_Email(
            String email
    );


    // =========================================================
    // ACTIVE TECHNICIANS
    // =========================================================

    List<Technician> findByActiveTrue();


    // =========================================================
    // AVAILABLE TECHNICIANS
    // =========================================================

    List<Technician> findByActiveTrueAndAvailableTrue();


    // =========================================================
    // INACTIVE TECHNICIANS
    // =========================================================

    List<Technician> findByActiveFalse();


    // =========================================================
    // TECHNICIANS BY SPECIALIZATION
    // =========================================================

    List<Technician> findBySpecializationIgnoreCase(
            String specialization
    );


    // =========================================================
    // ACTIVE TECHNICIANS BY SPECIALIZATION
    // =========================================================

    List<Technician> findBySpecializationIgnoreCaseAndActiveTrue(
            String specialization
    );
}