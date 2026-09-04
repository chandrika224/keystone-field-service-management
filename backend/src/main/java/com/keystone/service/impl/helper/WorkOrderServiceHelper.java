package com.keystone.service.impl.helper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Component;

import com.keystone.entity.Customer;
import com.keystone.entity.Site;
import com.keystone.entity.Technician;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;
import com.keystone.entity.WorkOrderStatusHistory;
import com.keystone.enums.ErrorCode;
import com.keystone.enums.Role;
import com.keystone.enums.WorkOrderStatus;
import com.keystone.exception.KeystoneException;
import com.keystone.repository.CustomerRepository;
import com.keystone.repository.SiteRepository;
import com.keystone.repository.TechnicianRepository;
import com.keystone.repository.UserRepository;
import com.keystone.repository.WorkOrderRepository;
import com.keystone.repository.WorkOrderStatusHistoryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class WorkOrderServiceHelper {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final TechnicianRepository technicianRepository;
    private final WorkOrderRepository workOrderRepository;
    private final WorkOrderStatusHistoryRepository workOrderStatusHistoryRepository;


    // =========================================================
    // USER
    // =========================================================

    public User getUserByEmail(String email) {

        log.debug("Fetching user by email={}", email);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("User not found: email={}", email);
                    return new KeystoneException(ErrorCode.USER_NOT_FOUND);
                });
    }


    // =========================================================
    // CUSTOMER
    // =========================================================

    public Customer getCustomerById(Long customerId) {

        log.debug("Fetching customer: customerId={}", customerId);

        return customerRepository.findById(customerId)
                .orElseThrow(() -> {
                    log.warn("Customer not found: customerId={}", customerId);
                    return new KeystoneException(ErrorCode.CUSTOMER_NOT_FOUND);
                });
    }


    // =========================================================
    // CUSTOMER BY USER  ⚠️ RESTORED — was missing
    // =========================================================

    public Customer getCustomerByUser(User user) {

        return customerRepository
                .findByUser_Id(user.getId())
                .orElseThrow(() -> {
                    log.warn(
                        "No customer profile linked to userId={}",
                        user.getId()
                    );

                    return new KeystoneException(
                        ErrorCode.CUSTOMER_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // SITE  ⚠️ RESTORED — was missing entirely
    // =========================================================

    public Site getSiteById(Long siteId) {

        log.debug("Fetching site: siteId={}", siteId);

        return siteRepository.findById(siteId)
                .orElseThrow(() -> {
                    log.warn("Site not found: siteId={}", siteId);
                    return new KeystoneException(ErrorCode.SITE_NOT_FOUND);
                });
    }

    public void validateSiteOwnership(Site site, Customer customer) {

        if (site.getCustomer() == null
                || !site.getCustomer().getCustomerId().equals(customer.getCustomerId())) {

            log.warn(
                    "Site {} does not belong to customer {}",
                    site.getId(),
                    customer.getCustomerId()
            );

            throw new KeystoneException(ErrorCode.SITE_ACCESS_DENIED);
        }
    }


    // =========================================================
    // TECHNICIAN
    // =========================================================

    public Technician getTechnicianById(Long technicianId) {

        log.debug("Fetching technician: technicianId={}", technicianId);

        return technicianRepository.findById(technicianId)
                .orElseThrow(() -> {
                    log.warn("Technician not found: technicianId={}", technicianId);
                    return new KeystoneException(ErrorCode.TECHNICIAN_NOT_FOUND);
                });
    }

    public Technician getTechnicianByEmail(String email) {

        log.debug("Fetching technician by email={}", email);

        User user = getUserByEmail(email);

        validateRole(user, Role.TECHNICIAN);

        return technicianRepository.findByUser_Id(user.getId())
                .orElseThrow(() -> {
                    log.warn("Technician not found for email={}", email);
                    return new KeystoneException(ErrorCode.TECHNICIAN_NOT_FOUND);
                });
    }


    // =========================================================
    // WORK ORDER
    // =========================================================

    public WorkOrder getWorkOrderById(Long workOrderId) {

        log.debug("Fetching work order: workOrderId={}", workOrderId);

        return workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> {
                    log.warn("Work order not found: workOrderId={}", workOrderId);
                    return new KeystoneException(ErrorCode.WORK_ORDER_NOT_FOUND);
                });
    }


    // =========================================================
    // VALIDATE CUSTOMER
    // =========================================================

    public void validateCustomer(Customer customer) {

        if (customer == null) {
            log.warn("Customer is null");
            throw new KeystoneException(ErrorCode.CUSTOMER_NOT_FOUND);
        }
    }


    // =========================================================
    // VALIDATE TECHNICIAN
    // =========================================================

    public void validateTechnician(Technician technician) {

        if (technician == null) {
            log.warn("Technician is null");
            throw new KeystoneException(ErrorCode.TECHNICIAN_NOT_FOUND);
        }

        if (!technician.isActive()) {
            log.warn("Technician is inactive: technicianId={}", technician.getId());
            throw new KeystoneException(ErrorCode.TECHNICIAN_INACTIVE);
        }
    }
    
 // =========================================================
 // VALIDATE TECHNICIAN FOR ASSIGNMENT
 // =========================================================

 public void validateTechnicianForAssignment(Technician technician) {

     if (technician == null) {
         log.warn("Technician is null");
         throw new KeystoneException(ErrorCode.TECHNICIAN_NOT_FOUND);
     }

     // -----------------------------------------------------
     // TECHNICIAN PROFILE ACTIVE
     // -----------------------------------------------------

     if (!technician.isActive()) {

         log.warn(
                 "Technician profile is inactive: technicianId={}",
                 technician.getId()
         );

         throw new KeystoneException(
                 ErrorCode.TECHNICIAN_INACTIVE
         );
     }

     // -----------------------------------------------------
     // USER ACCOUNT ACTIVE
     // -----------------------------------------------------

     User user = technician.getUser();

     if (user == null) {

         log.warn(
                 "Technician has no linked user: technicianId={}",
                 technician.getId()
         );

         throw new KeystoneException(
                 ErrorCode.TECHNICIAN_NOT_FOUND
         );
     }

     if (!user.isActive()) {

         log.warn(
                 "Technician user account is inactive: technicianId={}, userId={}",
                 technician.getId(),
                 user.getId()
         );

         throw new KeystoneException(
                 ErrorCode.TECHNICIAN_INACTIVE
         );
     }

     // -----------------------------------------------------
     // TECHNICIAN AVAILABILITY
     // -----------------------------------------------------

     if (!technician.isAvailable()) {

         log.warn(
                 "Technician is unavailable: technicianId={}",
                 technician.getId()
         );

         throw new KeystoneException(
                 ErrorCode.TECHNICIAN_UNAVAILABLE
         );
     }
 }


    // =========================================================
    // VALIDATE SCHEDULED DATE
    // =========================================================

    public void validateScheduledDate(LocalDate scheduledDate) {

        if (scheduledDate == null) {
            return;
        }

        if (scheduledDate.isBefore(LocalDate.now())) {
            log.warn("Invalid scheduled date: {}", scheduledDate);
            throw new KeystoneException(ErrorCode.INVALID_SCHEDULED_DATE);
        }
    }


    // =========================================================
    // VALIDATE STATUS
    // =========================================================

    public void validateStatus(WorkOrderStatus status) {

        if (status == null) {
            log.warn("Work order status is null");
            throw new KeystoneException(ErrorCode.INVALID_WORK_ORDER_STATUS);
        }
    }


    // =========================================================
    // VALIDATE PRIORITY
    // =========================================================

    public void validatePriority(com.keystone.enums.Priority priority) {

        if (priority == null) {
            log.warn("Work order priority is null");
            throw new KeystoneException(ErrorCode.INVALID_WORK_ORDER_PRIORITY);
        }
    }


    // =========================================================
    // VALIDATE CUSTOMER OWNERSHIP
    // =========================================================

    public void validateCustomerOwnership(WorkOrder workOrder, Customer customer) {

        if (workOrder == null) {
            throw new KeystoneException(ErrorCode.WORK_ORDER_NOT_FOUND);
        }

        if (customer == null) {
            throw new KeystoneException(ErrorCode.CUSTOMER_NOT_FOUND);
        }

        if (workOrder.getCustomer() == null
                || !workOrder.getCustomer().getCustomerId().equals(customer.getCustomerId())) {

            log.warn(
                    "Customer {} attempted to access workOrderId={}",
                    customer.getCustomerId(),
                    workOrder.getId()
            );

            throw new KeystoneException(ErrorCode.WORK_ORDER_ACCESS_DENIED);
        }
    }


    // =========================================================
    // VALIDATE TECHNICIAN ASSIGNMENT
    // =========================================================

    public void validateTechnicianAssignment(WorkOrder workOrder, Technician technician) {

        if (workOrder == null) {
            throw new KeystoneException(ErrorCode.WORK_ORDER_NOT_FOUND);
        }

        if (technician == null) {
            throw new KeystoneException(ErrorCode.TECHNICIAN_NOT_FOUND);
        }

        if (workOrder.getTechnician() == null) {
            log.warn("No technician assigned: workOrderId={}", workOrder.getId());
            throw new KeystoneException(ErrorCode.TECHNICIAN_NOT_ASSIGNED);
        }

        if (!workOrder.getTechnician().getId().equals(technician.getId())) {
            log.warn(
                    "Technician {} is not assigned to workOrderId={}",
                    technician.getId(),
                    workOrder.getId()
            );
            throw new KeystoneException(ErrorCode.TECHNICIAN_NOT_ASSIGNED);
        }
    }


    // =========================================================
    // VALIDATE WORK ORDER CAN BE ASSIGNED  ⚠️ RESTORED — was missing
    // =========================================================

    public void validateWorkOrderCanBeAssigned(WorkOrder workOrder) {

        if (workOrder.getStatus() != WorkOrderStatus.NEW) {

            log.warn(
                    "Work order cannot be assigned: workOrderId={}, status={}",
                    workOrder.getId(),
                    workOrder.getStatus()
            );

            throw new KeystoneException(ErrorCode.WORK_ORDER_ALREADY_ASSIGNED);
        }
    }


    // =========================================================
    // VALIDATE WORK ORDER CAN BE UPDATED
    // =========================================================

    public void validateWorkOrderCanBeUpdated(WorkOrder workOrder) {

        if (workOrder == null) {
            throw new KeystoneException(ErrorCode.WORK_ORDER_NOT_FOUND);
        }

        WorkOrderStatus status = workOrder.getStatus();

        if (status == WorkOrderStatus.COMPLETED
                || status == WorkOrderStatus.CLOSED
                || status == WorkOrderStatus.CANCELLED) {

            log.warn(
                    "Work order cannot be updated: workOrderId={}, status={}",
                    workOrder.getId(),
                    status
            );

            throw new KeystoneException(ErrorCode.WORK_ORDER_UPDATE_NOT_ALLOWED);
        }
    }


    // =========================================================
    // VALIDATE WORK ORDER CAN BE DELETED
    // =========================================================

    public void validateWorkOrderCanBeDeleted(WorkOrder workOrder) {

        if (workOrder == null) {
            throw new KeystoneException(ErrorCode.WORK_ORDER_NOT_FOUND);
        }

        WorkOrderStatus status = workOrder.getStatus();

        if (status == WorkOrderStatus.IN_PROGRESS
                || status == WorkOrderStatus.ON_HOLD
                || status == WorkOrderStatus.COMPLETED
                || status == WorkOrderStatus.CLOSED) {

            log.warn(
                    "Work order cannot be deleted: workOrderId={}, status={}",
                    workOrder.getId(),
                    status
            );

            throw new KeystoneException(ErrorCode.WORK_ORDER_DELETE_NOT_ALLOWED);
        }
    }


    // =========================================================
    // VALIDATE STATUS TRANSITION
    // =========================================================

    public void validateStatusTransition(WorkOrderStatus currentStatus, WorkOrderStatus newStatus) {

        validateStatus(currentStatus);
        validateStatus(newStatus);

        boolean valid = switch (currentStatus) {
            case NEW -> newStatus == WorkOrderStatus.ASSIGNED || newStatus == WorkOrderStatus.CANCELLED;
            case ASSIGNED -> newStatus == WorkOrderStatus.ACCEPTED || newStatus == WorkOrderStatus.CANCELLED;
            case ACCEPTED -> newStatus == WorkOrderStatus.IN_PROGRESS || newStatus == WorkOrderStatus.CANCELLED;
            case IN_PROGRESS -> newStatus == WorkOrderStatus.ON_HOLD || newStatus == WorkOrderStatus.COMPLETED;
            case ON_HOLD -> newStatus == WorkOrderStatus.IN_PROGRESS || newStatus == WorkOrderStatus.CANCELLED;
            case COMPLETED -> newStatus == WorkOrderStatus.CLOSED;
            case CLOSED, CANCELLED -> false;
        };

        if (!valid) {
            log.warn("Invalid status transition: {} -> {}", currentStatus, newStatus);
            throw new KeystoneException(ErrorCode.INVALID_WORK_ORDER_STATUS);
        }
    }


    // =========================================================
    // VALIDATE TECHNICIAN STATUS
    // =========================================================

    public void validateTechnicianStatus(WorkOrderStatus currentStatus, WorkOrderStatus requiredStatus) {

        validateStatus(currentStatus);
        validateStatus(requiredStatus);

        if (currentStatus != requiredStatus) {
            log.warn(
                    "Invalid technician operation: currentStatus={}, requiredStatus={}",
                    currentStatus,
                    requiredStatus
            );
            throw new KeystoneException(ErrorCode.INVALID_WORK_ORDER_STATUS);
        }
    }


    // =========================================================
    // VALIDATE USER ROLE
    // =========================================================

    public void validateRole(User user, Role expectedRole) {

        if (user == null || user.getRole() != expectedRole) {

            log.warn("Role validation failed: expectedRole={}", expectedRole);

            if (expectedRole == Role.TECHNICIAN) {
                throw new KeystoneException(ErrorCode.TECHNICIAN_ACCESS_DENIED);
            }
            if (expectedRole == Role.DISPATCHER) {
                throw new KeystoneException(ErrorCode.DISPATCHER_ACCESS_DENIED);
            }
            if (expectedRole == Role.CUSTOMER) {
                throw new KeystoneException(ErrorCode.CUSTOMER_ACCESS_DENIED);
            }

            throw new KeystoneException(ErrorCode.ACCESS_DENIED);
        }
    }


    // =========================================================
    // VALIDATE CUSTOMER WORK ORDER
    // =========================================================

    public void validateCustomerWorkOrder(WorkOrder workOrder, Customer customer) {
        validateCustomerOwnership(workOrder, customer);
    }


    // =========================================================
    // STATUS HISTORY  ⚠️ RESTORED — was missing entirely
    // =========================================================

    public List<WorkOrderStatusHistory> getStatusHistory(Long workOrderId) {

        log.debug("Fetching status history: workOrderId={}", workOrderId);

        return workOrderStatusHistoryRepository
                .findByWorkOrder_IdOrderByChangedAtAsc(workOrderId);
    }

    public void recordStatusChange(
            WorkOrder workOrder,
            WorkOrderStatus fromStatus,
            WorkOrderStatus toStatus,
            String changedBy) {

        WorkOrderStatusHistory history = new WorkOrderStatusHistory();

        history.setWorkOrder(workOrder);
        history.setFromStatus(fromStatus);
        history.setToStatus(toStatus);
        history.setChangedBy(changedBy);
        history.setChangedAt(LocalDateTime.now());

        workOrderStatusHistoryRepository.save(history);

        log.info(
                "Status change recorded: workOrderId={}, {} -> {}, changedBy={}",
                workOrder.getId(),
                fromStatus,
                toStatus,
                changedBy
        );
    }


    // =========================================================
    // GET WORK ORDERS BY TECHNICIAN
    // =========================================================

    public List<WorkOrder> getWorkOrdersByTechnician(Long technicianId) {

        log.debug("Fetching work orders for technicianId={}", technicianId);

        return workOrderRepository.findByTechnician_Id(technicianId);
    }


    // =========================================================
    // GET WORK ORDERS BY CUSTOMER
    // =========================================================

    public List<WorkOrder> getWorkOrdersByCustomer(Long customerId) {

        log.debug("Fetching work orders for customerId={}", customerId);

        return workOrderRepository.findByCustomer_CustomerId(customerId);
    }


    // =========================================================
    // GET PENDING TECHNICIAN ASSIGNMENTS
    // =========================================================

    public List<WorkOrder> getPendingTechnicianAssignments(Long technicianId) {

        log.debug("Fetching pending assignments for technicianId={}", technicianId);

        return workOrderRepository
                .findByTechnician_IdAndStatus(technicianId, WorkOrderStatus.ASSIGNED);
    }
    
    
}