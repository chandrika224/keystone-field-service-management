package com.keystone.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keystone.dto.TimeLogRequest;
import com.keystone.dto.TimeLogResponse;
import com.keystone.entity.Technician;
import com.keystone.entity.TimeLog;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;
import com.keystone.enums.ErrorCode;
import com.keystone.exception.KeystoneException;
import com.keystone.repository.TimeLogRepository;
import com.keystone.service.TimeLogService;
import com.keystone.service.impl.helper.TimeLogServiceHelper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TimeLogServiceImpl implements TimeLogService {

    private final TimeLogRepository timeLogRepository;
    private final TimeLogServiceHelper timeLogServiceHelper;


    // =========================================================
    // CREATE TIME LOG
    // =========================================================

    @Override
    public TimeLogResponse addTimeLog(
            String email,
            Long workOrderId,
            TimeLogRequest request) {

        log.info(
                "Creating time log for workOrderId={} by user={}",
                workOrderId,
                email
        );

        // -----------------------------------------------------
        // 1. GET USER
        // -----------------------------------------------------

        User user = timeLogServiceHelper.getUserByEmail(email);

        // -----------------------------------------------------
        // 2. VALIDATE TECHNICIAN ROLE
        // -----------------------------------------------------

        timeLogServiceHelper.validateTechnicianRole(user);

        // -----------------------------------------------------
        // 3. GET TECHNICIAN
        // -----------------------------------------------------

        Technician technician =
                timeLogServiceHelper.getTechnicianByEmail(email);

        // -----------------------------------------------------
        // 4. GET WORK ORDER
        // -----------------------------------------------------

        WorkOrder workOrder =
                timeLogServiceHelper.getWorkOrderById(workOrderId);

        // -----------------------------------------------------
        // 5. VALIDATE TECHNICIAN ASSIGNMENT
        // -----------------------------------------------------

        timeLogServiceHelper.validateTechnicianAssignment(
                workOrder,
                technician
        );

        // -----------------------------------------------------
        // 6. VALIDATE WORK ORDER STATUS
        // -----------------------------------------------------

        timeLogServiceHelper.validateWorkOrderAllowsTimeLog(
                workOrder
        );

        // -----------------------------------------------------
        // 7. CREATE TIME LOG
        // -----------------------------------------------------

        TimeLog timeLog = new TimeLog();

        timeLog.setWorkOrder(workOrder);
        timeLog.setTechnician(technician);
        timeLog.setMinutesWorked(request.getMinutesWorked());
        timeLog.setNotes(request.getNotes());
        timeLog.setLoggedAt(LocalDateTime.now());

        // -----------------------------------------------------
        // 8. SAVE
        // -----------------------------------------------------

        TimeLog savedTimeLog =
                timeLogRepository.save(timeLog);

        log.info(
                "Time log created successfully: timeLogId={}, workOrderId={}, technicianId={}",
                savedTimeLog.getId(),
                workOrderId,
                technician.getId()
        );

        // -----------------------------------------------------
        // 9. RETURN RESPONSE
        // -----------------------------------------------------

        return mapToResponse(savedTimeLog);
    }


    // =========================================================
    // GET TIME LOGS FOR WORK ORDER
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<TimeLogResponse> getTimeLogs(
            String email,
            Long workOrderId) {

        log.info(
                "Fetching time logs for workOrderId={} by user={}",
                workOrderId,
                email
        );

        // -----------------------------------------------------
        // 1. GET TECHNICIAN
        // -----------------------------------------------------

        Technician technician =
                timeLogServiceHelper.getTechnicianByEmail(email);

        // -----------------------------------------------------
        // 2. GET WORK ORDER
        // -----------------------------------------------------

        WorkOrder workOrder =
                timeLogServiceHelper.getWorkOrderById(workOrderId);

        // -----------------------------------------------------
        // 3. VALIDATE ASSIGNMENT
        // -----------------------------------------------------

        timeLogServiceHelper.validateTechnicianAssignment(
                workOrder,
                technician
        );

        // -----------------------------------------------------
        // 4. GET TIME LOGS
        // -----------------------------------------------------

        return timeLogRepository
                .findByWorkOrderOrderByLoggedAtDesc(workOrder)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // =========================================================
    // GET MY TIME LOGS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<TimeLogResponse> getMyTimeLogs(
            String email) {

        log.info(
                "Fetching time logs for technician={}",
                email
        );

        // -----------------------------------------------------
        // 1. GET TECHNICIAN
        // -----------------------------------------------------

        Technician technician =
                timeLogServiceHelper.getTechnicianByEmail(email);

        // -----------------------------------------------------
        // 2. GET TIME LOGS
        // -----------------------------------------------------

        return timeLogRepository
                .findByTechnicianOrderByLoggedAtDesc(technician)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET TIME LOG BY ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public TimeLogResponse getTimeLogById(
            String email,
            Long timeLogId) {

        log.info(
                "Fetching timeLogId={} by user={}",
                timeLogId,
                email
        );

        // -----------------------------------------------------
        // 1. GET TECHNICIAN
        // -----------------------------------------------------

        Technician technician =
                timeLogServiceHelper.getTechnicianByEmail(email);

        // -----------------------------------------------------
        // 2. GET TIME LOG
        // -----------------------------------------------------

        TimeLog timeLog =
                timeLogServiceHelper.getTimeLogById(timeLogId);

        // -----------------------------------------------------
        // 3. VALIDATE OWNERSHIP
        // -----------------------------------------------------

        timeLogServiceHelper.validateTimeLogOwnership(
                timeLog,
                technician
        );

        // -----------------------------------------------------
        // 4. RETURN RESPONSE
        // -----------------------------------------------------

        return mapToResponse(timeLog);
    }


    // =========================================================
    // DELETE TIME LOG
    // =========================================================

    @Override
    public void deleteTimeLog(
            String email,
            Long timeLogId) {

        log.info(
                "Deleting timeLogId={} by user={}",
                timeLogId,
                email
        );

        // -----------------------------------------------------
        // 1. GET TECHNICIAN
        // -----------------------------------------------------

        Technician technician =
                timeLogServiceHelper.getTechnicianByEmail(email);

        // -----------------------------------------------------
        // 2. GET TIME LOG
        // -----------------------------------------------------

        TimeLog timeLog =
                timeLogServiceHelper.getTimeLogById(timeLogId);

        // -----------------------------------------------------
        // 3. VALIDATE OWNERSHIP
        // -----------------------------------------------------

        timeLogServiceHelper.validateTimeLogOwnership(
                timeLog,
                technician
        );

        // -----------------------------------------------------
        // 4. VALIDATE WORK ORDER STATUS
        // -----------------------------------------------------

        timeLogServiceHelper.validateWorkOrderAllowsTimeLog(
                timeLog.getWorkOrder()
        );

        // -----------------------------------------------------
        // 5. DELETE
        // -----------------------------------------------------

        timeLogRepository.delete(timeLog);

        log.info(
                "Time log deleted successfully: timeLogId={}",
                timeLogId
        );
    }


    // =========================================================
    // MAP ENTITY → RESPONSE
    // =========================================================

    private TimeLogResponse mapToResponse(
            TimeLog timeLog) {

        TimeLogResponse response =
                new TimeLogResponse();

        response.setId(timeLog.getId());

        response.setWorkOrderId(
                timeLog.getWorkOrder().getId()
        );

        response.setTechnicianId(
                timeLog.getTechnician().getId()
        );

        response.setTechnicianName(
                timeLog.getTechnician()
                        .getUser()
                        .getFirstName()
                + " "
                + timeLog.getTechnician()
                        .getUser()
                        .getLastName()
        );

        response.setMinutesWorked(
                timeLog.getMinutesWorked()
        );

        response.setNotes(
                timeLog.getNotes()
        );

        response.setLoggedAt(
                timeLog.getLoggedAt()
        );

        return response;
    }
}