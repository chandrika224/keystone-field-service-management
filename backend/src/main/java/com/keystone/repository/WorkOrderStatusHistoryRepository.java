package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.WorkOrder;
import com.keystone.entity.WorkOrderStatusHistory;

public interface WorkOrderStatusHistoryRepository
        extends JpaRepository<WorkOrderStatusHistory, Long> {

    List<WorkOrderStatusHistory> findByWorkOrderOrderByChangedAtDesc(
            WorkOrder workOrder);
}