package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keystone.entity.WorkOrder;
import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;

@Repository
public interface WorkOrderRepository
        extends JpaRepository<WorkOrder, Long> {

    // =========================================================
    // FIND BY STATUS
    // =========================================================

    List<WorkOrder> findByStatus(WorkOrderStatus status);


    // =========================================================
    // FIND BY PRIORITY
    // =========================================================

    List<WorkOrder> findByPriority(Priority priority);


    // =========================================================
    // CUSTOMER WORK ORDERS
    // =========================================================

    List<WorkOrder> findByCustomer_CustomerId(Long customerId);


    // =========================================================
    // TECHNICIAN WORK ORDERS
    // =========================================================

    List<WorkOrder> findByTechnician_Id(Long technicianId);


    // =========================================================
    // TECHNICIAN + STATUS
    // =========================================================

    List<WorkOrder> findByTechnician_IdAndStatus(
            Long technicianId,
            WorkOrderStatus status
    );


    // =========================================================
    // SLA
    // =========================================================

    long countBySlaBreachedTrue();

    List<WorkOrder> findBySlaBreachedFalse();
}