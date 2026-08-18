package com.keystone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.Technician;

public interface TechnicianRepository
        extends JpaRepository<Technician, Long> {

    Optional<Technician> findByUserId(Long userId);

    Optional<Technician> findByUserEmail(String email);

    boolean existsByUserId(Long userId);
}