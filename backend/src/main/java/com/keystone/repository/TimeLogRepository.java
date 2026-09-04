package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keystone.entity.Technician;
import com.keystone.entity.TimeLog;
import com.keystone.entity.WorkOrder;

@Repository
public interface TimeLogRepository
        extends JpaRepository<TimeLog, Long> {

    // =========================================================
    // FIND TIME LOGS FOR A WORK ORDER
    // =========================================================

    List<TimeLog> findByWorkOrderOrderByLoggedAtDesc(
            WorkOrder workOrder
    );


    // =========================================================
    // FIND TIME LOGS FOR A TECHNICIAN
    // =========================================================

    List<TimeLog> findByTechnicianOrderByLoggedAtDesc(
            Technician technician
    );


    // =========================================================
    // FIND TIME LOGS FOR TECHNICIAN + WORK ORDER
    // =========================================================

    List<TimeLog> findByTechnicianAndWorkOrderOrderByLoggedAtDesc(
            Technician technician,
            WorkOrder workOrder
    );
}