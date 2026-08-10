package com.keystone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keystone.entity.Technician;

@Repository
public interface TechnicianRepository extends JpaRepository<Technician, Long> {

    boolean existsByEmail(String email);

    Optional<Technician> findByEmail(String email);

}