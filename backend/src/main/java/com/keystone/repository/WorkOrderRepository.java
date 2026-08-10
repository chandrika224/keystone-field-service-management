package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keystone.entity.Technician;
import com.keystone.entity.WorkOrder;
import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

    List<WorkOrder> findByStatus(WorkOrderStatus status);

    List<WorkOrder> findByPriority(Priority priority);

    List<WorkOrder> findByCustomerCustomerId(Long customerId);

    List<WorkOrder> findByTechnicianId(Long technicianId);
    
    long countBySlaBreachedTrue();

	List<WorkOrder> findBySlaBreachedFalse();


}