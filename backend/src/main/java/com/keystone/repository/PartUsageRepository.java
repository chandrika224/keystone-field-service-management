package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.PartUsage;
import com.keystone.entity.WorkOrder;

public interface PartUsageRepository
        extends JpaRepository<PartUsage, Long> {

    List<PartUsage> findByWorkOrder(WorkOrder workOrder);

}