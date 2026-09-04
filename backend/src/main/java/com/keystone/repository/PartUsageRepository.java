package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keystone.entity.PartUsage;

@Repository
public interface PartUsageRepository
        extends JpaRepository<PartUsage, Long> {

    List<PartUsage> findByWorkOrder_IdOrderByIdDesc(
            Long workOrderId
    );

    List<PartUsage> findByInventory_InventoryIdOrderByIdDesc(
            Long inventoryId
    );

    List<PartUsage> findByWorkOrder_Technician_IdOrderByIdDesc(
            Long technicianId
    );
}