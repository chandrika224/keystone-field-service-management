package com.keystone.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keystone.dto.ChangeStatusRequest;
import com.keystone.dto.CustomerWorkOrderRequest;
import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;
import com.keystone.dto.WorkOrderStatusHistoryResponse;
import com.keystone.entity.Customer;
import com.keystone.entity.Site;
import com.keystone.entity.Technician;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;
import com.keystone.enums.ErrorCode;
import com.keystone.enums.Priority;
import com.keystone.enums.Role;
import com.keystone.enums.WorkOrderStatus;
import com.keystone.exception.KeystoneException;
import com.keystone.repository.WorkOrderRepository;
import com.keystone.repository.WorkOrderStatusHistoryRepository;
import com.keystone.service.NotificationService;
import com.keystone.service.WorkOrderService;
import com.keystone.service.impl.helper.WorkOrderServiceHelper;
import com.keystone.service.mapper.WorkOrderMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class WorkOrderServiceImpl implements WorkOrderService {

    private final WorkOrderRepository workOrderRepository;

    private final WorkOrderServiceHelper helper;

    private final WorkOrderMapper mapper;

    private final WorkOrderStatusHistoryRepository
            workOrderStatusHistoryRepository;

    private final NotificationService notificationService;


    // =========================================================
    // CREATE WORK ORDER
    // =========================================================

    @Override
    public WorkOrderResponse createWorkOrder(
            String email,
            WorkOrderRequest request) {

        log.info(
                "Creating work order: customerId={}, technicianId={}, siteId={}",
                request.getCustomerId(),
                request.getTechnicianId(),
                request.getSiteId()
        );

        // -----------------------------------------------------
        // BUSINESS VALIDATION
        // -----------------------------------------------------

        User user =
                helper.getUserByEmail(email);

        Customer customer =
                helper.getCustomerById(
                        request.getCustomerId()
                );

        Technician technician =
                helper.getTechnicianById(
                        request.getTechnicianId()
                );

        Site site =
                helper.getSiteById(
                        request.getSiteId()
                );

        helper.validateCustomer(customer);

        helper.validateTechnician(technician);

        helper.validateSiteOwnership(
                site,
                customer
        );

        helper.validateScheduledDate(
                request.getScheduledDate()
        );

        // -----------------------------------------------------
        // CREATE ENTITY
        // -----------------------------------------------------

        WorkOrder workOrder = new WorkOrder();

        workOrder.setTitle(
                request.getTitle()
        );

        workOrder.setDescription(
                request.getDescription()
        );

        workOrder.setPriority(
                request.getPriority()
        );

        workOrder.setScheduledDate(
                request.getScheduledDate()
        );

        workOrder.setCustomer(
                customer
        );

        workOrder.setSite(
                site
        );

        workOrder.setTechnician(
                technician
        );

        // -----------------------------------------------------
        // INITIAL STATUS
        // -----------------------------------------------------

        workOrder.setStatus(
                WorkOrderStatus.ASSIGNED
        );

        workOrder.setAssignedAt(
                LocalDateTime.now()
        );

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        WorkOrder saved =
                workOrderRepository.save(workOrder);

        // -----------------------------------------------------
        // NOTIFY TECHNICIAN
        // -----------------------------------------------------

        notifyTechnicianAssigned(
                saved
        );

        log.info(
                "Work order created successfully: workOrderId={}, siteId={}",
                saved.getId(),
                site.getId()
        );

        return mapper.mapToResponse(saved);
    }


    // =========================================================
    // CREATE CUSTOMER WORK ORDER
    // =========================================================

    @Override
    public WorkOrderResponse createCustomerWorkOrder(
            String email,
            CustomerWorkOrderRequest request) {

        log.info(
                "Customer creating work order: email={}, siteId={}",
                email,
                request.getSiteId()
        );

        // -----------------------------------------------------
        // GET USER
        // -----------------------------------------------------

        User user =
                helper.getUserByEmail(email);

        // -----------------------------------------------------
        // CUSTOMER ROLE VALIDATION
        // -----------------------------------------------------

        helper.validateRole(
                user,
                Role.CUSTOMER
        );

        // -----------------------------------------------------
        // GET CUSTOMER
        // -----------------------------------------------------

        Customer customer =
                helper.getCustomerByUser(user);

        // -----------------------------------------------------
        // GET SITE
        // -----------------------------------------------------

        Site site =
                helper.getSiteById(
                        request.getSiteId()
                );

        // -----------------------------------------------------
        // SITE OWNERSHIP VALIDATION
        // -----------------------------------------------------

        helper.validateSiteOwnership(
                site,
                customer
        );

        // -----------------------------------------------------
        // DATE VALIDATION
        // -----------------------------------------------------

        helper.validateScheduledDate(
                request.getScheduledDate()
        );

        // -----------------------------------------------------
        // CREATE WORK ORDER
        // -----------------------------------------------------

        WorkOrder workOrder = new WorkOrder();

        workOrder.setTitle(
                request.getTitle()
        );

        workOrder.setDescription(
                request.getDescription()
        );

        workOrder.setPriority(
                request.getPriority()
        );

        workOrder.setScheduledDate(
                request.getScheduledDate()
        );

        workOrder.setServiceType(
                request.getServiceType()
        );

        // -----------------------------------------------------
        // CUSTOMER
        // -----------------------------------------------------

        workOrder.setCustomer(
                customer
        );

        // -----------------------------------------------------
        // SITE
        // -----------------------------------------------------

        workOrder.setSite(
                site
        );

        // -----------------------------------------------------
        // INITIAL STATUS
        // -----------------------------------------------------

        workOrder.setStatus(
                WorkOrderStatus.NEW
        );

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        WorkOrder saved =
                workOrderRepository.save(workOrder);

        log.info(
                "Customer work order created: workOrderId={}, customerId={}, siteId={}",
                saved.getId(),
                customer.getCustomerId(),
                site.getId()
        );

        /*
         * No dispatcher notification here because the current
         * WorkOrder model does not identify a dispatcher at the
         * time the customer creates the work order.
         *
         * Dispatcher can see NEW work orders through the
         * dispatcher work-order APIs.
         */

        return mapper.mapToResponse(saved);
    }


    // =========================================================
    // GET ALL WORK ORDERS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getAllWorkOrders() {

        log.info("Fetching all work orders");

        return workOrderRepository
                .findAll()
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET WORK ORDER BY ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public WorkOrderResponse getWorkOrderById(
            Long workOrderId) {

        log.info(
                "Fetching work order: workOrderId={}",
                workOrderId
        );

        WorkOrder workOrder =
                helper.getWorkOrderById(
                        workOrderId
                );

        return mapper.mapToResponse(
                workOrder
        );
    }


    // =========================================================
    // UPDATE WORK ORDER
    // =========================================================

    @Override
    public WorkOrderResponse updateWorkOrder(
            Long workOrderId,
            WorkOrderRequest request) {

        log.info(
                "Updating work order: workOrderId={}, siteId={}",
                workOrderId,
                request.getSiteId()
        );

        // -----------------------------------------------------
        // GET WORK ORDER
        // -----------------------------------------------------

        WorkOrder workOrder =
                helper.getWorkOrderById(
                        workOrderId
                );

        helper.validateWorkOrderCanBeUpdated(
                workOrder
        );

        // -----------------------------------------------------
        // GET CUSTOMER
        // -----------------------------------------------------

        Customer customer =
                helper.getCustomerById(
                        request.getCustomerId()
                );

        // -----------------------------------------------------
        // GET TECHNICIAN
        // -----------------------------------------------------

        Technician technician =
                helper.getTechnicianById(
                        request.getTechnicianId()
                );

        // -----------------------------------------------------
        // GET SITE
        // -----------------------------------------------------

        Site site =
                helper.getSiteById(
                        request.getSiteId()
                );

        // -----------------------------------------------------
        // VALIDATIONS
        // -----------------------------------------------------

        helper.validateCustomer(
                customer
        );

        helper.validateTechnician(
                technician
        );

        helper.validateSiteOwnership(
                site,
                customer
        );

        helper.validateScheduledDate(
                request.getScheduledDate()
        );

        // -----------------------------------------------------
        // UPDATE FIELDS
        // -----------------------------------------------------

        workOrder.setTitle(
                request.getTitle()
        );

        workOrder.setDescription(
                request.getDescription()
        );

        workOrder.setPriority(
                request.getPriority()
        );

        workOrder.setScheduledDate(
                request.getScheduledDate()
        );

        workOrder.setCustomer(
                customer
        );

        workOrder.setSite(
                site
        );

        workOrder.setTechnician(
                technician
        );

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        WorkOrder updated =
                workOrderRepository.save(
                        workOrder
                );

        // -----------------------------------------------------
        // NOTIFY AFFECTED USERS
        // -----------------------------------------------------

        notifyWorkOrderUpdated(
                updated
        );

        log.info(
                "Work order updated successfully: workOrderId={}, siteId={}",
                workOrderId,
                site.getId()
        );

        return mapper.mapToResponse(
                updated
        );
    }


    // =========================================================
    // DELETE WORK ORDER
    // =========================================================

    @Override
    public void deleteWorkOrder(
            Long workOrderId) {

        log.info(
                "Deleting work order: workOrderId={}",
                workOrderId
        );

        WorkOrder workOrder =
                helper.getWorkOrderById(
                        workOrderId
                );

        helper.validateWorkOrderCanBeDeleted(
                workOrder
        );

        workOrderRepository.delete(
                workOrder
        );

        log.info(
                "Work order deleted successfully: workOrderId={}",
                workOrderId
        );
    }


    // =========================================================
    // CUSTOMER - MY WORK ORDERS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getMyWorkOrders(
            String email) {

        log.info(
                "Fetching customer work orders: email={}",
                email
        );

        User user =
                helper.getUserByEmail(
                        email
                );

        helper.validateRole(
                user,
                Role.CUSTOMER
        );

        Customer customer =
                helper.getCustomerByUser(
                        user
                );

        return helper
                .getWorkOrdersByCustomer(
                        customer.getCustomerId()
                )
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }


    // =========================================================
    // CUSTOMER - UPDATE MY WORK ORDER
    // =========================================================

    @Override
    public WorkOrderResponse updateMyWorkOrder(
            String email,
            Long workOrderId,
            CustomerWorkOrderRequest request) {

        log.info(
                "Customer updating work order: email={}, workOrderId={}, siteId={}",
                email,
                workOrderId,
                request.getSiteId()
        );

        // -----------------------------------------------------
        // GET USER
        // -----------------------------------------------------

        User user =
                helper.getUserByEmail(
                        email
                );

        // -----------------------------------------------------
        // CUSTOMER ROLE
        // -----------------------------------------------------

        helper.validateRole(
                user,
                Role.CUSTOMER
        );

        // -----------------------------------------------------
        // GET CUSTOMER
        // -----------------------------------------------------

        Customer customer =
                helper.getCustomerByUser(
                        user
                );

        // -----------------------------------------------------
        // GET WORK ORDER
        // -----------------------------------------------------

        WorkOrder workOrder =
                helper.getWorkOrderById(
                        workOrderId
                );

        // -----------------------------------------------------
        // WORK ORDER OWNERSHIP
        // -----------------------------------------------------

        helper.validateCustomerOwnership(
                workOrder,
                customer
        );

        // -----------------------------------------------------
        // WORK ORDER STATUS
        // -----------------------------------------------------

        helper.validateWorkOrderCanBeUpdated(
                workOrder
        );

        // -----------------------------------------------------
        // GET SITE
        // -----------------------------------------------------

        Site site =
                helper.getSiteById(
                        request.getSiteId()
                );

        // -----------------------------------------------------
        // SITE OWNERSHIP
        // -----------------------------------------------------

        helper.validateSiteOwnership(
                site,
                customer
        );

        // -----------------------------------------------------
        // DATE VALIDATION
        // -----------------------------------------------------

        helper.validateScheduledDate(
                request.getScheduledDate()
        );

        // -----------------------------------------------------
        // UPDATE BASIC INFORMATION
        // -----------------------------------------------------

        workOrder.setTitle(
                request.getTitle()
        );

        workOrder.setDescription(
                request.getDescription()
        );

        workOrder.setPriority(
                request.getPriority()
        );

        workOrder.setScheduledDate(
                request.getScheduledDate()
        );

        // -----------------------------------------------------
        // UPDATE SERVICE INFORMATION
        // -----------------------------------------------------

        workOrder.setServiceType(
                request.getServiceType()
        );

        // -----------------------------------------------------
        // UPDATE SITE
        // -----------------------------------------------------

        workOrder.setSite(
                site
        );

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        WorkOrder updated =
                workOrderRepository.save(
                        workOrder
                );

        // -----------------------------------------------------
        // NOTIFY TECHNICIAN
        // -----------------------------------------------------

        notifyTechnicianWorkOrderUpdated(
                updated
        );

        log.info(
                "Customer work order updated successfully: workOrderId={}, siteId={}",
                workOrderId,
                site.getId()
        );

        return mapper.mapToResponse(
                updated
        );
    }


    // =========================================================
    // ASSIGN TECHNICIAN (DISPATCHER)
    // =========================================================

    @Override
    public WorkOrderResponse assignTechnician(
            String dispatcherEmail,
            Long workOrderId,
            Long technicianId) {

        log.info(
                "Dispatcher assigning technician: dispatcherEmail={}, workOrderId={}, technicianId={}",
                dispatcherEmail,
                workOrderId,
                technicianId
        );

        User dispatcher =
                helper.getUserByEmail(
                        dispatcherEmail
                );

        helper.validateRole(
                dispatcher,
                Role.DISPATCHER
        );

        WorkOrder workOrder =
                helper.getWorkOrderById(
                        workOrderId
                );

        helper.validateWorkOrderCanBeAssigned(
                workOrder
        );

        Technician technician =
                helper.getTechnicianById(
                        technicianId
                );

        // -----------------------------------------------------
        // VALIDATE TECHNICIAN
        // -----------------------------------------------------

        helper.validateTechnicianForAssignment(
                technician
        );

        WorkOrderStatus oldStatus =
                workOrder.getStatus();

        // -----------------------------------------------------
        // ASSIGN TECHNICIAN
        // -----------------------------------------------------

        workOrder.setTechnician(
                technician
        );

        workOrder.setAssignedBy(
                dispatcher
        );

        workOrder.setStatus(
                WorkOrderStatus.ASSIGNED
        );

        workOrder.setAssignedAt(
                LocalDateTime.now()
        );

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        WorkOrder updated =
                workOrderRepository.save(
                        workOrder
                );

        // -----------------------------------------------------
        // STATUS HISTORY
        // -----------------------------------------------------

        helper.recordStatusChange(
                updated,
                oldStatus,
                WorkOrderStatus.ASSIGNED,
                dispatcherEmail
        );

        // -----------------------------------------------------
        // TECHNICIAN NOTIFICATION
        // -----------------------------------------------------

        notifyTechnicianAssigned(
                updated
        );

        log.info(
                "Technician assigned successfully: workOrderId={}, technicianId={}, dispatcherId={}",
                workOrderId,
                technicianId,
                dispatcher.getId()
        );

        return mapper.mapToResponse(
                updated
        );
    }


    // =========================================================
    // GET BY CUSTOMER
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getByCustomer(
            Long customerId) {

        helper.getCustomerById(
                customerId
        );

        return helper
                .getWorkOrdersByCustomer(
                        customerId
                )
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET BY STATUS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getWorkOrdersByStatus(
            WorkOrderStatus status) {

        helper.validateStatus(
                status
        );

        return workOrderRepository
                .findByStatus(status)
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET BY PRIORITY
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getWorkOrdersByPriority(
            Priority priority) {

        if (priority == null) {

            throw new KeystoneException(
                    ErrorCode.INVALID_WORK_ORDER_PRIORITY
            );
        }

        return workOrderRepository
                .findByPriority(priority)
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET BY TECHNICIAN
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getByTechnician(
            Long technicianId) {

        helper.getTechnicianById(
                technicianId
        );

        return helper
                .getWorkOrdersByTechnician(
                        technicianId
                )
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }


    // =========================================================
    // CHANGE STATUS
    // =========================================================

    @Override
    public WorkOrderResponse changeStatus(
            Long workOrderId,
            ChangeStatusRequest request) {

        log.info(
                "Changing status: workOrderId={}, newStatus={}",
                workOrderId,
                request.getStatus()
        );

        WorkOrder workOrder =
                helper.getWorkOrderById(
                        workOrderId
                );

        WorkOrderStatus currentStatus =
                workOrder.getStatus();

        WorkOrderStatus newStatus =
                request.getStatus();

        helper.validateStatus(
                newStatus
        );

        helper.validateStatusTransition(
                currentStatus,
                newStatus
        );

        workOrder.setStatus(
                newStatus
        );

        updateTimeline(
                workOrder,
                newStatus
        );

        WorkOrder updated =
                workOrderRepository.save(
                        workOrder
                );

        log.info(
                "Status changed: workOrderId={}, {} -> {}",
                workOrderId,
                currentStatus,
                newStatus
        );

        return mapper.mapToResponse(
                updated
        );
    }


    // =========================================================
    // TECHNICIAN - MY WORK ORDERS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getMyTechnicianWorkOrders(
            String email) {

        Technician technician =
                helper.getTechnicianByEmail(
                        email
                );

        return helper
                .getWorkOrdersByTechnician(
                        technician.getId()
                )
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }


    // =========================================================
    // PENDING TECHNICIAN ASSIGNMENTS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getPendingTechnicianAssignments(
            String email) {

        Technician technician =
                helper.getTechnicianByEmail(
                        email
                );

        return workOrderRepository
                .findByTechnician_IdAndStatus(
                        technician.getId(),
                        WorkOrderStatus.ASSIGNED
                )
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }


    // =========================================================
    // ACCEPT WORK ORDER
    // =========================================================

    @Override
    public WorkOrderResponse acceptWorkOrder(
            String email,
            Long workOrderId) {

        return changeTechnicianStatus(
                email,
                workOrderId,
                WorkOrderStatus.ASSIGNED,
                WorkOrderStatus.ACCEPTED
        );
    }


    // =========================================================
    // START WORK ORDER
    // =========================================================

    @Override
    public WorkOrderResponse startWorkOrder(
            String email,
            Long workOrderId) {

        return changeTechnicianStatus(
                email,
                workOrderId,
                WorkOrderStatus.ACCEPTED,
                WorkOrderStatus.IN_PROGRESS
        );
    }


    // =========================================================
    // HOLD WORK ORDER
    // =========================================================

    @Override
    public WorkOrderResponse holdWorkOrder(
            String email,
            Long workOrderId) {

        return changeTechnicianStatus(
                email,
                workOrderId,
                WorkOrderStatus.IN_PROGRESS,
                WorkOrderStatus.ON_HOLD
        );
    }


    // =========================================================
    // RESUME WORK ORDER
    // =========================================================

    @Override
    public WorkOrderResponse resumeWorkOrder(
            String email,
            Long workOrderId) {

        return changeTechnicianStatus(
                email,
                workOrderId,
                WorkOrderStatus.ON_HOLD,
                WorkOrderStatus.IN_PROGRESS
        );
    }


    // =========================================================
    // COMPLETE WORK ORDER
    // =========================================================

    @Override
    public WorkOrderResponse completeWorkOrder(
            String email,
            Long workOrderId) {

        return changeTechnicianStatus(
                email,
                workOrderId,
                WorkOrderStatus.IN_PROGRESS,
                WorkOrderStatus.COMPLETED
        );
    }


    // =========================================================
    // STATUS HISTORY
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<WorkOrderStatusHistoryResponse> getStatusHistory(
            Long workOrderId) {

        helper.getWorkOrderById(
                workOrderId
        );

        return workOrderStatusHistoryRepository
                .findByWorkOrder_IdOrderByChangedAtAsc(
                        workOrderId
                )
                .stream()
                .map(mapper::mapToStatusHistoryResponse)
                .toList();
    }


    // =========================================================
    // PRIVATE - TECHNICIAN STATUS CHANGE
    // =========================================================

    private WorkOrderResponse changeTechnicianStatus(
            String email,
            Long workOrderId,
            WorkOrderStatus requiredCurrentStatus,
            WorkOrderStatus newStatus) {

        log.info(
                "Technician status change: email={}, workOrderId={}, {} -> {}",
                email,
                workOrderId,
                requiredCurrentStatus,
                newStatus
        );

        Technician technician =
                helper.getTechnicianByEmail(
                        email
                );

        WorkOrder workOrder =
                helper.getWorkOrderById(
                        workOrderId
                );

        helper.validateTechnicianAssignment(
                workOrder,
                technician
        );

        helper.validateTechnicianStatus(
                workOrder.getStatus(),
                requiredCurrentStatus
        );

        helper.validateStatusTransition(
                workOrder.getStatus(),
                newStatus
        );

        // -----------------------------------------------------
        // CHANGE STATUS
        // -----------------------------------------------------

        workOrder.setStatus(
                newStatus
        );

        updateTimeline(
                workOrder,
                newStatus
        );

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        WorkOrder updated =
                workOrderRepository.save(
                        workOrder
                );

        // -----------------------------------------------------
        // NOTIFY DISPATCHER
        // -----------------------------------------------------

        sendTechnicianStatusNotification(
                updated,
                requiredCurrentStatus,
                newStatus
        );

        // -----------------------------------------------------
        // NOTIFY CUSTOMER WHEN COMPLETED
        // -----------------------------------------------------

        if (newStatus == WorkOrderStatus.COMPLETED) {

            notifyCustomerCompleted(
                    updated
            );
        }

        log.info(
                "Technician status updated: workOrderId={}, newStatus={}",
                workOrderId,
                newStatus
        );

        return mapper.mapToResponse(
                updated
        );
    }


    // =========================================================
    // TECHNICIAN STATUS NOTIFICATION
    // =========================================================

    private void sendTechnicianStatusNotification(
            WorkOrder workOrder,
            WorkOrderStatus oldStatus,
            WorkOrderStatus newStatus) {

        User dispatcher =
                workOrder.getAssignedBy();

        if (dispatcher == null) {

            log.warn(
                    "No dispatcher found for work order notification: workOrderId={}",
                    workOrder.getId()
            );

            return;
        }

        String title;
        String message;
        String type;

        // -----------------------------------------------------
        // ACCEPTED
        // -----------------------------------------------------

        if (oldStatus == WorkOrderStatus.ASSIGNED
                && newStatus == WorkOrderStatus.ACCEPTED) {

            title = "Work Order Accepted";

            message =
                    "Technician has accepted work order #"
                    + workOrder.getId()
                    + ".";

            type = "WORK_ORDER_ACCEPTED";

        }

        // -----------------------------------------------------
        // STARTED
        // -----------------------------------------------------

        else if (oldStatus == WorkOrderStatus.ACCEPTED
                && newStatus == WorkOrderStatus.IN_PROGRESS) {

            title = "Work Order Started";

            message =
                    "Technician has started work order #"
                    + workOrder.getId()
                    + ".";

            type = "WORK_ORDER_STARTED";

        }

        // -----------------------------------------------------
        // ON HOLD
        // -----------------------------------------------------

        else if (oldStatus == WorkOrderStatus.IN_PROGRESS
                && newStatus == WorkOrderStatus.ON_HOLD) {

            title = "Work Order On Hold";

            message =
                    "Work order #"
                    + workOrder.getId()
                    + " has been put on hold by the technician.";

            type = "WORK_ORDER_ON_HOLD";

        }

        // -----------------------------------------------------
        // RESUMED
        // -----------------------------------------------------

        else if (oldStatus == WorkOrderStatus.ON_HOLD
                && newStatus == WorkOrderStatus.IN_PROGRESS) {

            title = "Work Order Resumed";

            message =
                    "Technician has resumed work order #"
                    + workOrder.getId()
                    + ".";

            type = "WORK_ORDER_RESUMED";

        }

        // -----------------------------------------------------
        // COMPLETED
        // -----------------------------------------------------

        else if (oldStatus == WorkOrderStatus.IN_PROGRESS
                && newStatus == WorkOrderStatus.COMPLETED) {

            title = "Work Order Completed";

            message =
                    "Work order #"
                    + workOrder.getId()
                    + " has been completed by the technician.";

            type = "WORK_ORDER_COMPLETED";

        }

        else {
            return;
        }

        notificationService.createNotification(
                dispatcher,
                workOrder,
                title,
                message,
                type
        );
    }


    // =========================================================
    // TECHNICIAN ASSIGNED NOTIFICATION
    // =========================================================

    private void notifyTechnicianAssigned(
            WorkOrder workOrder) {

        Technician technician =
                workOrder.getTechnician();

        if (technician == null
                || technician.getUser() == null) {

            log.warn(
                    "Cannot notify technician because technician/user is missing: workOrderId={}",
                    workOrder.getId()
            );

            return;
        }

        notificationService.createNotification(
                technician.getUser(),
                workOrder,
                "New Work Order Assigned",
                "Work order #"
                        + workOrder.getId()
                        + " has been assigned to you.",
                "WORK_ORDER_ASSIGNED"
        );

        log.info(
                "Technician assignment notification created: workOrderId={}, technicianId={}",
                workOrder.getId(),
                technician.getId()
        );
    }


    // =========================================================
    // CUSTOMER - WORK ORDER COMPLETED
    // =========================================================

    private void notifyCustomerCompleted(
            WorkOrder workOrder) {

        Customer customer =
                workOrder.getCustomer();

        if (customer == null) {

            log.warn(
                    "Cannot notify customer: customer is null, workOrderId={}",
                    workOrder.getId()
            );

            return;
        }

        User customerUser =
                customer.getUser();

        if (customerUser == null) {

            log.warn(
                    "Cannot notify customer: user is null, workOrderId={}",
                    workOrder.getId()
            );

            return;
        }

        notificationService.createNotification(
                customerUser,
                workOrder,
                "Work Order Completed",
                "Your work order #"
                        + workOrder.getId()
                        + " has been completed.",
                "WORK_ORDER_COMPLETED"
        );

        log.info(
                "Customer completion notification created: workOrderId={}, customerId={}",
                workOrder.getId(),
                customer.getCustomerId()
        );
    }


    // =========================================================
    // WORK ORDER UPDATED
    // =========================================================

    private void notifyWorkOrderUpdated(
            WorkOrder workOrder) {

        // -----------------------------------------------------
        // TECHNICIAN
        // -----------------------------------------------------

        Technician technician =
                workOrder.getTechnician();

        if (technician != null
                && technician.getUser() != null) {

            notificationService.createNotification(
                    technician.getUser(),
                    workOrder,
                    "Work Order Updated",
                    "Work order #"
                            + workOrder.getId()
                            + " has been updated.",
                    "WORK_ORDER_UPDATED"
            );
        }

        // -----------------------------------------------------
        // CUSTOMER
        // -----------------------------------------------------

        Customer customer =
                workOrder.getCustomer();

        if (customer != null
                && customer.getUser() != null) {

            notificationService.createNotification(
                    customer.getUser(),
                    workOrder,
                    "Work Order Updated",
                    "Your work order #"
                            + workOrder.getId()
                            + " has been updated.",
                    "WORK_ORDER_UPDATED"
            );
        }
    }


    // =========================================================
    // CUSTOMER UPDATED WORK ORDER
    // =========================================================

    private void notifyTechnicianWorkOrderUpdated(
            WorkOrder workOrder) {

        Technician technician =
                workOrder.getTechnician();

        if (technician == null
                || technician.getUser() == null) {

            return;
        }

        notificationService.createNotification(
                technician.getUser(),
                workOrder,
                "Work Order Updated",
                "Customer has updated work order #"
                        + workOrder.getId()
                        + ".",
                "WORK_ORDER_UPDATED"
        );
    }


    // =========================================================
    // UPDATE TIMELINE
    // =========================================================

    private void updateTimeline(
            WorkOrder workOrder,
            WorkOrderStatus status) {

        LocalDateTime now =
                LocalDateTime.now();

        // -----------------------------------------------------
        // ASSIGNED
        // -----------------------------------------------------

        if (status == WorkOrderStatus.ASSIGNED
                && workOrder.getAssignedAt() == null) {

            workOrder.setAssignedAt(
                    now
            );
        }

        // -----------------------------------------------------
        // IN PROGRESS
        // -----------------------------------------------------

        if (status == WorkOrderStatus.IN_PROGRESS
                && workOrder.getStartedAt() == null) {

            workOrder.setStartedAt(
                    now
            );
        }

        // -----------------------------------------------------
        // COMPLETED
        // -----------------------------------------------------

        if (status == WorkOrderStatus.COMPLETED) {

            workOrder.setCompletedAt(
                    now
            );

            workOrder.setCompletedDate(
                    LocalDate.now()
            );
        }
    }


    // =========================================================
    // CANCEL WORK ORDER
    // =========================================================

    @Override
    public WorkOrderResponse cancelWorkOrder(
            String email,
            Long workOrderId) {

        log.info(
                "Technician cancelling work order: email={}, workOrderId={}",
                email,
                workOrderId
        );

        Technician technician =
                helper.getTechnicianByEmail(
                        email
                );

        WorkOrder workOrder =
                helper.getWorkOrderById(
                        workOrderId
                );

        // -----------------------------------------------------
        // VALIDATE ASSIGNMENT
        // -----------------------------------------------------

        helper.validateTechnicianAssignment(
                workOrder,
                technician
        );

        WorkOrderStatus currentStatus =
                workOrder.getStatus();

        // -----------------------------------------------------
        // VALIDATE CANCELLATION STATUS
        // -----------------------------------------------------

        if (currentStatus != WorkOrderStatus.ASSIGNED
                && currentStatus != WorkOrderStatus.ACCEPTED
                && currentStatus != WorkOrderStatus.ON_HOLD) {

            log.warn(
                    "Technician cannot cancel work order: workOrderId={}, currentStatus={}",
                    workOrderId,
                    currentStatus
            );

            throw new KeystoneException(
                    ErrorCode.INVALID_WORK_ORDER_STATUS
            );
        }

        // -----------------------------------------------------
        // VALIDATE TRANSITION
        // -----------------------------------------------------

        helper.validateStatusTransition(
                currentStatus,
                WorkOrderStatus.CANCELLED
        );

        // -----------------------------------------------------
        // CHANGE STATUS
        // -----------------------------------------------------

        workOrder.setStatus(
                WorkOrderStatus.CANCELLED
        );

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        WorkOrder updated =
                workOrderRepository.save(
                        workOrder
                );

        // -----------------------------------------------------
        // NOTIFY DISPATCHER
        // -----------------------------------------------------

        notifyDispatcherCancelled(
                updated
        );

        // -----------------------------------------------------
        // NOTIFY CUSTOMER
        // -----------------------------------------------------

        notifyCustomerCancelled(
                updated
        );

        log.info(
                "Work order cancelled successfully: workOrderId={}, {} -> {}",
                workOrderId,
                currentStatus,
                WorkOrderStatus.CANCELLED
        );

        return mapper.mapToResponse(
                updated
        );
    }


    // =========================================================
    // DISPATCHER - WORK ORDER CANCELLED
    // =========================================================

    private void notifyDispatcherCancelled(
            WorkOrder workOrder) {

        User dispatcher =
                workOrder.getAssignedBy();

        if (dispatcher == null) {

            log.warn(
                    "Cannot notify dispatcher: dispatcher is null, workOrderId={}",
                    workOrder.getId()
            );

            return;
        }

        notificationService.createNotification(
                dispatcher,
                workOrder,
                "Work Order Cancelled",
                "Technician has cancelled work order #"
                        + workOrder.getId()
                        + ".",
                "WORK_ORDER_CANCELLED"
        );
    }


    // =========================================================
    // CUSTOMER - WORK ORDER CANCELLED
    // =========================================================

    private void notifyCustomerCancelled(
            WorkOrder workOrder) {

        Customer customer =
                workOrder.getCustomer();

        if (customer == null
                || customer.getUser() == null) {

            log.warn(
                    "Cannot notify customer: customer/user missing, workOrderId={}",
                    workOrder.getId()
            );

            return;
        }

        notificationService.createNotification(
                customer.getUser(),
                workOrder,
                "Work Order Cancelled",
                "Your work order #"
                        + workOrder.getId()
                        + " has been cancelled.",
                "WORK_ORDER_CANCELLED"
        );
    }
}