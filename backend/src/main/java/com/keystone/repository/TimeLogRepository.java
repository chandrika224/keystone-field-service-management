package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keystone.entity.TimeLog;
import com.keystone.entity.WorkOrder;

public interface TimeLogRepository extends JpaRepository<TimeLog, Long> {

    List<TimeLog> findByWorkOrder(WorkOrder workOrder);

}