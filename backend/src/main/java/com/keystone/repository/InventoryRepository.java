package com.keystone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keystone.entity.Inventory;

@Repository
public interface InventoryRepository
        extends JpaRepository<Inventory, Long> {

    // =========================================================
    // CHECK WHETHER PART EXISTS
    // =========================================================

    boolean existsByPartNameIgnoreCase(String partName);


    // =========================================================
    // FIND PART BY NAME
    // =========================================================

    Optional<Inventory> findByPartNameIgnoreCase(String partName);
}