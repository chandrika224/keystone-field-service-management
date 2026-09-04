package com.keystone.service.impl.helper;

import org.springframework.stereotype.Component;

import com.keystone.entity.Technician;
import com.keystone.entity.TimeLog;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;
import com.keystone.enums.ErrorCode;
import com.keystone.enums.Role;
import com.keystone.enums.WorkOrderStatus;
import com.keystone.exception.KeystoneException;
import com.keystone.repository.TechnicianRepository;
import com.keystone.repository.TimeLogRepository;
import com.keystone.repository.UserRepository;
import com.keystone.repository.WorkOrderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class TimeLogServiceHelper {

    private final UserRepository userRepository;
    private final TechnicianRepository technicianRepository;
    private final WorkOrderRepository workOrderRepository;
    private final TimeLogRepository timeLogRepository;


    // =========================================================
    // GET USER BY EMAIL
    // =========================================================

    public User getUserByEmail(String email) {

        log.debug("Fetching user by email={}", email);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> {

                    log.warn(
                            "User not found for email={}",
                            email
                    );

                    return new KeystoneException(
                            ErrorCode.USER_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // GET TECHNICIAN BY USER EMAIL
    // =========================================================

    public Technician getTechnicianByEmail(String email) {

        User user = getUserByEmail(email);

        log.debug(
                "Fetching technician profile for userId={}",
                user.getId()
        );

        return technicianRepository
                .findByUser_Id(user.getId())
                .orElseThrow(() -> {

                    log.warn(
                            "Technician profile not found for userId={}",
                            user.getId()
                    );

                    return new KeystoneException(
                            ErrorCode.TECHNICIAN_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // VALIDATE TECHNICIAN ROLE
    // =========================================================

    public void validateTechnicianRole(User user) {

        if (user.getRole() != Role.TECHNICIAN) {

            log.warn(
                    "User is not a technician: userId={}, role={}",
                    user.getId(),
                    user.getRole()
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_ACCESS_DENIED
            );
        }
    }


    // =========================================================
    // GET WORK ORDER BY ID
    // =========================================================

    public WorkOrder getWorkOrderById(Long workOrderId) {

        log.debug(
                "Fetching work order: workOrderId={}",
                workOrderId
        );

        return workOrderRepository
                .findById(workOrderId)
                .orElseThrow(() -> {

                    log.warn(
                            "Work order not found: workOrderId={}",
                            workOrderId
                    );

                    return new KeystoneException(
                            ErrorCode.WORK_ORDER_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // GET TIME LOG BY ID
    // =========================================================

    public TimeLog getTimeLogById(Long timeLogId) {

        log.debug(
                "Fetching time log: timeLogId={}",
                timeLogId
        );

        return timeLogRepository
                .findById(timeLogId)
                .orElseThrow(() -> {

                    log.warn(
                            "Time log not found: timeLogId={}",
                            timeLogId
                    );

                    return new KeystoneException(
                            ErrorCode.TIME_LOG_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // VALIDATE TECHNICIAN ASSIGNMENT
    // =========================================================

    public void validateTechnicianAssignment(
            WorkOrder workOrder,
            Technician technician) {

        if (workOrder.getTechnician() == null) {

            log.warn(
                    "No technician assigned to workOrderId={}",
                    workOrder.getId()
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_NOT_ASSIGNED
            );
        }

        if (!workOrder.getTechnician()
                .getId()
                .equals(technician.getId())) {

            log.warn(
                    "Technician {} is not assigned to workOrderId={}",
                    technician.getId(),
                    workOrder.getId()
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_NOT_ASSIGNED
            );
        }
    }


    // =========================================================
    // VALIDATE WORK ORDER STATUS FOR TIME LOGGING
    // =========================================================

    public void validateWorkOrderAllowsTimeLog(
            WorkOrder workOrder) {

        WorkOrderStatus status = workOrder.getStatus();

        if (status == null) {

            log.warn(
                    "Work order has no status: workOrderId={}",
                    workOrder.getId()
            );

            throw new KeystoneException(
                    ErrorCode.INVALID_WORK_ORDER_STATUS
            );
        }

        if (status == WorkOrderStatus.COMPLETED
                || status == WorkOrderStatus.CLOSED
                || status == WorkOrderStatus.CANCELLED) {

            log.warn(
                    "Time log not allowed for workOrderId={}, status={}",
                    workOrder.getId(),
                    status
            );

            throw new KeystoneException(
                    ErrorCode.TIME_LOG_NOT_ALLOWED
            );
        }
    }


    // =========================================================
    // VALIDATE TIME LOG OWNERSHIP
    // =========================================================

    public void validateTimeLogOwnership(
            TimeLog timeLog,
            Technician technician) {

        if (timeLog.getTechnician() == null) {

            log.warn(
                    "TimeLog has no technician: timeLogId={}",
                    timeLog.getId()
            );

            throw new KeystoneException(
                    ErrorCode.TIME_LOG_ACCESS_DENIED
            );
        }

        if (!timeLog.getTechnician()
                .getId()
                .equals(technician.getId())) {

            log.warn(
                    "Technician {} attempted to access timeLogId={}",
                    technician.getId(),
                    timeLog.getId()
            );

            throw new KeystoneException(
                    ErrorCode.TIME_LOG_ACCESS_DENIED
            );
        }
    }


    // =========================================================
    // VALIDATE TIME LOG DELETION
    // =========================================================

    public void validateTimeLogCanBeDeleted(
            TimeLog timeLog) {

        WorkOrder workOrder = timeLog.getWorkOrder();

        if (workOrder == null) {

            log.warn(
                    "TimeLog has no work order: timeLogId={}",
                    timeLog.getId()
            );

            throw new KeystoneException(
                    ErrorCode.WORK_ORDER_NOT_FOUND
            );
        }

        WorkOrderStatus status = workOrder.getStatus();

        if (status == WorkOrderStatus.COMPLETED
                || status == WorkOrderStatus.CLOSED) {

            log.warn(
                    "Cannot delete timeLogId={} because workOrderId={} is {}",
                    timeLog.getId(),
                    workOrder.getId(),
                    status
            );

            throw new KeystoneException(
                    ErrorCode.TIME_LOG_DELETE_NOT_ALLOWED
            );
        }
    }
}