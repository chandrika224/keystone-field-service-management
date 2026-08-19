package com.keystone.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keystone.dto.ChangeStatusRequest;
import com.keystone.dto.CustomerWorkOrderRequest;
import com.keystone.dto.PartUsageRequest;
import com.keystone.dto.PartUsageResponse;
import com.keystone.dto.TimeLogRequest;
import com.keystone.dto.TimeLogResponse;
import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;
import com.keystone.dto.WorkOrderStatusHistoryResponse;

import com.keystone.entity.Customer;
import com.keystone.entity.Inventory;
import com.keystone.entity.PartUsage;
import com.keystone.entity.Technician;
import com.keystone.entity.TimeLog;
import com.keystone.entity.WorkOrder;
import com.keystone.entity.WorkOrderStatusHistory;

import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;

import com.keystone.exception.ResourceNotFoundException;

import com.keystone.repository.CustomerRepository;
import com.keystone.repository.InventoryRepository;
import com.keystone.repository.PartUsageRepository;
import com.keystone.repository.TechnicianRepository;
import com.keystone.repository.TimeLogRepository;
import com.keystone.repository.WorkOrderRepository;
import com.keystone.repository.WorkOrderStatusHistoryRepository;

import com.keystone.service.EmailService;
import com.keystone.service.WorkOrderService;
import com.keystone.util.WorkOrderStatusValidator;

@Service
public class WorkOrderServiceImpl implements WorkOrderService {

    // =========================================================
    // REPOSITORIES / SERVICES
    // =========================================================

    @Autowired
    private WorkOrderRepository workOrderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @Autowired
    private WorkOrderStatusHistoryRepository historyRepository;

    @Autowired
    private TimeLogRepository timeLogRepository;

    @Autowired
    private PartUsageRepository partUsageRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private EmailService emailService;


    // =========================================================
    // CREATE WORK ORDER
    // Used by ADMIN / DISPATCHER / MANAGER
    // =========================================================

    @Override
    public WorkOrderResponse createWorkOrder(
            WorkOrderRequest request) {

        Customer customer =
                customerRepository.findById(
                        request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found"));

        Technician technician =
                technicianRepository.findById(
                        request.getTechnicianId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Technician not found"));

        WorkOrder workOrder = new WorkOrder();

        workOrder.setTitle(request.getTitle());
        workOrder.setDescription(request.getDescription());
        workOrder.setPriority(request.getPriority());
        workOrder.setScheduledDate(
                request.getScheduledDate());

        workOrder.setStatus(
                WorkOrderStatus.NEW);

        workOrder.setCreatedAt(
                LocalDateTime.now());

        workOrder.setSlaDueDate(
                LocalDateTime.now().plusHours(24));

        workOrder.setSlaBreached(false);

        workOrder.setCustomer(customer);
        workOrder.setTechnician(technician);

        WorkOrder saved =
                workOrderRepository.save(workOrder);

        return mapToResponse(saved);
    }


    // =========================================================
    // CREATE WORK ORDER BY CUSTOMER
    // =========================================================

    @Override
    public WorkOrderResponse createCustomerWorkOrder(
            String email,
            CustomerWorkOrderRequest request) {

        Customer customer =
                customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found for email: "
                                + email));

        WorkOrder workOrder = new WorkOrder();

        workOrder.setTitle(
                request.getTitle());

        workOrder.setDescription(
                request.getDescription());

        workOrder.setPriority(
                request.getPriority());

        workOrder.setScheduledDate(
                request.getScheduledDate());

        workOrder.setStatus(
                WorkOrderStatus.NEW);

        workOrder.setCustomer(customer);

        // Customer-created work order is initially unassigned
        workOrder.setTechnician(null);

        workOrder.setCreatedAt(
                LocalDateTime.now());

        workOrder.setSlaDueDate(
                LocalDateTime.now().plusHours(24));

        workOrder.setSlaBreached(false);

        WorkOrder saved =
                workOrderRepository.save(workOrder);

        return mapToResponse(saved);
    }


    // =========================================================
    // GET MY CUSTOMER WORK ORDERS
    // =========================================================

    @Override
    public List<WorkOrderResponse> getMyWorkOrders(
            String email) {

        Customer customer =
                customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found for email: "
                                + email));

        return workOrderRepository
                .findByCustomerCustomerId(
                        customer.getCustomerId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // =========================================================
    // GET ALL WORK ORDERS
    // =========================================================

    @Override
    public List<WorkOrderResponse> getAllWorkOrders() {

        return workOrderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // =========================================================
    // GET WORK ORDER BY ID
    // =========================================================

    @Override
    public WorkOrderResponse getWorkOrderById(
            Long id) {

        WorkOrder workOrder =
                workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found"));

        return mapToResponse(workOrder);
    }


    // =========================================================
    // UPDATE WORK ORDER
    // Used by ADMIN / DISPATCHER / MANAGER
    // =========================================================

    @Override
    public WorkOrderResponse updateWorkOrder(
            Long id,
            WorkOrderRequest request) {

        WorkOrder workOrder =
                workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found"));

        Customer customer =
                customerRepository.findById(
                        request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found"));

        Technician technician =
                technicianRepository.findById(
                        request.getTechnicianId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Technician not found"));

        workOrder.setTitle(
                request.getTitle());

        workOrder.setDescription(
                request.getDescription());

        workOrder.setPriority(
                request.getPriority());

        workOrder.setScheduledDate(
                request.getScheduledDate());

        workOrder.setCustomer(customer);
        workOrder.setTechnician(technician);

        WorkOrder updated =
                workOrderRepository.save(workOrder);

        return mapToResponse(updated);
    }


    // =========================================================
    // UPDATE MY WORK ORDER
    // Customer can update only their own work order
    // =========================================================

    @Override
    public WorkOrderResponse updateMyWorkOrder(
            String email,
            Long workOrderId,
            CustomerWorkOrderRequest request) {

        Customer customer =
                customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found for email: "
                                + email));

        WorkOrder workOrder =
                workOrderRepository.findById(workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found"));

        // Security check
        if (workOrder.getCustomer() == null ||
                !workOrder.getCustomer()
                        .getCustomerId()
                        .equals(customer.getCustomerId())) {

            throw new ResourceNotFoundException(
                    "Work Order not found for this customer");
        }

        // Completed / closed / cancelled orders cannot be edited
        if (workOrder.getStatus() == WorkOrderStatus.COMPLETED ||
                workOrder.getStatus() == WorkOrderStatus.CLOSED ||
                workOrder.getStatus() == WorkOrderStatus.CANCELLED) {

            throw new IllegalArgumentException(
                    "This work order cannot be edited");
        }

        workOrder.setTitle(
                request.getTitle());

        workOrder.setDescription(
                request.getDescription());

        workOrder.setPriority(
                request.getPriority());

        workOrder.setScheduledDate(
                request.getScheduledDate());

        // Do not modify:
        // customer
        // technician
        // status

        WorkOrder updated =
                workOrderRepository.save(workOrder);

        return mapToResponse(updated);
    }


    // =========================================================
    // DELETE WORK ORDER
    // =========================================================

    @Override
    public void deleteWorkOrder(Long id) {

        WorkOrder workOrder =
                workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found"));

        workOrderRepository.delete(workOrder);
    }


    // =========================================================
    // GET BY STATUS
    // =========================================================

    @Override
    public List<WorkOrderResponse>
            getWorkOrdersByStatus(
                    WorkOrderStatus status) {

        return workOrderRepository
                .findByStatus(status)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET BY PRIORITY
    // =========================================================

    @Override
    public List<WorkOrderResponse>
            getWorkOrdersByPriority(
                    Priority priority) {

        return workOrderRepository
                .findByPriority(priority)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET BY CUSTOMER
    // =========================================================

    @Override
    public List<WorkOrderResponse>
            getByCustomer(Long customerId) {

        return workOrderRepository
                .findByCustomerCustomerId(customerId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET BY TECHNICIAN
    // =========================================================

    @Override
    public List<WorkOrderResponse>
            getByTechnician(Long technicianId) {

        return workOrderRepository
                .findByTechnicianId(technicianId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // CHANGE STATUS
    // Dispatcher / Manager / Admin
    // =========================================================

    @Override
    public WorkOrderResponse changeStatus(
            Long id,
            ChangeStatusRequest request) {

        WorkOrder workOrder =
                workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found"));

        WorkOrderStatus oldStatus =
                workOrder.getStatus();

        WorkOrderStatus newStatus =
                request.getStatus();

        if (!WorkOrderStatusValidator.isValidTransition(
                oldStatus,
                newStatus)) {

            throw new IllegalArgumentException(
                    "Invalid status transition from "
                    + oldStatus
                    + " to "
                    + newStatus);
        }

        workOrder.setStatus(newStatus);

        // =====================================================
        // ASSIGNED
        // =====================================================

        if (newStatus == WorkOrderStatus.ASSIGNED) {

            workOrder.setAssignedAt(
                    LocalDateTime.now());

            if (workOrder.getTechnician() != null) {

                emailService.sendEmail(
                        workOrder.getTechnician().getEmail(),

                        "Work Order Assigned",

                        "A new work order has been assigned.\n\n"
                        + "Title : "
                        + workOrder.getTitle());
            }
        }


        // =====================================================
        // IN PROGRESS
        // =====================================================

        if (newStatus == WorkOrderStatus.IN_PROGRESS) {

            if (workOrder.getStartedAt() == null) {

                workOrder.setStartedAt(
                        LocalDateTime.now());
            }
        }


        // =====================================================
        // COMPLETED
        // =====================================================

        if (newStatus == WorkOrderStatus.COMPLETED) {

            workOrder.setCompletedAt(
                    LocalDateTime.now());

            if (workOrder.getSlaDueDate() != null
                    && workOrder.getCompletedAt()
                            .isAfter(
                                    workOrder.getSlaDueDate())) {

                workOrder.setSlaBreached(true);
            }

            if (Boolean.TRUE.equals(
                    workOrder.getSlaBreached())) {

                if (workOrder.getCustomer() != null) {

                    emailService.sendEmail(
                            workOrder.getCustomer().getEmail(),

                            "SLA Breached",

                            "Your work order was completed "
                            + "after the SLA due date.");
                }
            }

            if (workOrder.getCustomer() != null) {

                emailService.sendEmail(
                        workOrder.getCustomer().getEmail(),

                        "Work Order Completed",

                        "Your work order has been "
                        + "completed successfully.");
            }
        }


        WorkOrder updated =
                workOrderRepository.save(workOrder);


        // =====================================================
        // STATUS HISTORY
        // =====================================================

        WorkOrderStatusHistory history =
                new WorkOrderStatusHistory();

        history.setWorkOrder(updated);

        history.setFromStatus(oldStatus);

        history.setToStatus(newStatus);

        history.setChangedBy("SYSTEM");

        history.setChangedAt(
                LocalDateTime.now());

        historyRepository.save(history);

        return mapToResponse(updated);
    }


    // =========================================================
    // TECHNICIAN - GET MY WORK ORDERS
    // =========================================================

    @Override
    public List<WorkOrderResponse>
            getMyTechnicianWorkOrders(
                    String email) {

        Technician technician =
                technicianRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Technician not found for email: "
                                + email));

        return workOrderRepository.findAll()
                .stream()
                .filter(workOrder ->
                        workOrder.getTechnician() != null
                        && workOrder.getTechnician()
                                .getId()
                                .equals(
                                        technician.getId()))
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // TECHNICIAN - ACCEPT WORK ORDER
    //
    // There is no ACCEPTED status in WorkOrderStatus.
    // Therefore acceptance validates that the work order
    // is assigned to this technician and is ASSIGNED.
    // =========================================================

    @Override
    public WorkOrderResponse acceptWorkOrder(
            String email,
            Long workOrderId) {

        WorkOrder workOrder =
                getTechnicianWorkOrder(
                        email,
                        workOrderId);

        if (workOrder.getStatus()
                != WorkOrderStatus.ASSIGNED) {

            throw new IllegalArgumentException(
                    "Only ASSIGNED work orders can be accepted");
        }

        return mapToResponse(workOrder);
    }


    // =========================================================
    // TECHNICIAN - START WORK ORDER
    // ASSIGNED -> IN_PROGRESS
    // =========================================================

    @Override
    public WorkOrderResponse startWorkOrder(
            String email,
            Long workOrderId) {

        WorkOrder workOrder =
                getTechnicianWorkOrder(
                        email,
                        workOrderId);

        if (workOrder.getStatus()
                != WorkOrderStatus.ASSIGNED) {

            throw new IllegalArgumentException(
                    "Only ASSIGNED work orders can be started");
        }

        ChangeStatusRequest request =
                new ChangeStatusRequest();

        request.setStatus(
                WorkOrderStatus.IN_PROGRESS);

        return changeStatus(
                workOrderId,
                request);
    }


    // =========================================================
    // TECHNICIAN - HOLD WORK ORDER
    // IN_PROGRESS -> ON_HOLD
    // =========================================================

    @Override
    public WorkOrderResponse holdWorkOrder(
            String email,
            Long workOrderId) {

        WorkOrder workOrder =
                getTechnicianWorkOrder(
                        email,
                        workOrderId);

        if (workOrder.getStatus()
                != WorkOrderStatus.IN_PROGRESS) {

            throw new IllegalArgumentException(
                    "Only IN_PROGRESS work orders can be put on hold");
        }

        ChangeStatusRequest request =
                new ChangeStatusRequest();

        request.setStatus(
                WorkOrderStatus.ON_HOLD);

        return changeStatus(
                workOrderId,
                request);
    }


    // =========================================================
    // TECHNICIAN - RESUME WORK ORDER
    // ON_HOLD -> IN_PROGRESS
    // =========================================================

    @Override
    public WorkOrderResponse resumeWorkOrder(
            String email,
            Long workOrderId) {

        WorkOrder workOrder =
                getTechnicianWorkOrder(
                        email,
                        workOrderId);

        if (workOrder.getStatus()
                != WorkOrderStatus.ON_HOLD) {

            throw new IllegalArgumentException(
                    "Only ON_HOLD work orders can be resumed");
        }

        ChangeStatusRequest request =
                new ChangeStatusRequest();

        request.setStatus(
                WorkOrderStatus.IN_PROGRESS);

        return changeStatus(
                workOrderId,
                request);
    }


    // =========================================================
    // TECHNICIAN - COMPLETE WORK ORDER
    // IN_PROGRESS -> COMPLETED
    // =========================================================

    @Override
    public WorkOrderResponse completeWorkOrder(
            String email,
            Long workOrderId) {

        WorkOrder workOrder =
                getTechnicianWorkOrder(
                        email,
                        workOrderId);

        if (workOrder.getStatus()
                != WorkOrderStatus.IN_PROGRESS) {

            throw new IllegalArgumentException(
                    "Only IN_PROGRESS work orders can be completed");
        }

        ChangeStatusRequest request =
                new ChangeStatusRequest();

        request.setStatus(
                WorkOrderStatus.COMPLETED);

        return changeStatus(
                workOrderId,
                request);
    }


    // =========================================================
    // HELPER
    // Get work order and verify technician ownership
    // =========================================================

    private WorkOrder getTechnicianWorkOrder(
            String email,
            Long workOrderId) {

        Technician technician =
                technicianRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Technician not found for email: "
                                + email));

        WorkOrder workOrder =
                workOrderRepository.findById(workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found"));

        if (workOrder.getTechnician() == null
                || !workOrder.getTechnician()
                        .getId()
                        .equals(
                                technician.getId())) {

            throw new ResourceNotFoundException(
                    "Work Order not assigned to this technician");
        }

        return workOrder;
    }


    // =========================================================
    // STATUS HISTORY
    // =========================================================

    @Override
    public List<WorkOrderStatusHistoryResponse>
            getStatusHistory(Long workOrderId) {

        WorkOrder workOrder =
                workOrderRepository.findById(
                        workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found"));

        return historyRepository
                .findByWorkOrderOrderByChangedAtDesc(
                        workOrder)
                .stream()
                .map(history -> {

                    WorkOrderStatusHistoryResponse response =
                            new WorkOrderStatusHistoryResponse();

                    response.setFromStatus(
                            history.getFromStatus());

                    response.setToStatus(
                            history.getToStatus());

                    response.setChangedBy(
                            history.getChangedBy());

                    response.setChangedAt(
                            history.getChangedAt());

                    return response;
                })
                .toList();
    }


    // =========================================================
    // TIME LOG
    // =========================================================

    @Override
    public TimeLogResponse addTimeLog(
            Long workOrderId,
            TimeLogRequest request) {

        WorkOrder workOrder =
                workOrderRepository.findById(
                        workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found"));

        Technician technician =
                technicianRepository.findById(
                        request.getTechnicianId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Technician not found"));

        TimeLog timeLog =
                new TimeLog();

        timeLog.setWorkOrder(workOrder);

        timeLog.setTechnician(technician);

        timeLog.setMinutesWorked(
                request.getMinutesWorked());

        timeLog.setNotes(
                request.getNotes());

        timeLog.setLoggedAt(
                LocalDateTime.now());

        TimeLog saved =
                timeLogRepository.save(timeLog);

        TimeLogResponse response =
                new TimeLogResponse();

        response.setId(
                saved.getId());

        response.setMinutesWorked(
                saved.getMinutesWorked());

        response.setNotes(
                saved.getNotes());

        response.setLoggedAt(
                saved.getLoggedAt());

        response.setTechnicianName(
                technician.getFirstName()
                + " "
                + technician.getLastName());

        return response;
    }


    // =========================================================
    // GET TIME LOGS
    // =========================================================

    @Override
    public List<TimeLogResponse>
            getTimeLogs(Long workOrderId) {

        WorkOrder workOrder =
                workOrderRepository.findById(
                        workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found"));

        return timeLogRepository
                .findByWorkOrder(workOrder)
                .stream()
                .map(log -> {

                    TimeLogResponse response =
                            new TimeLogResponse();

                    response.setId(
                            log.getId());

                    response.setMinutesWorked(
                            log.getMinutesWorked());

                    response.setNotes(
                            log.getNotes());

                    response.setLoggedAt(
                            log.getLoggedAt());

                    if (log.getTechnician() != null) {

                        response.setTechnicianName(
                                log.getTechnician()
                                        .getFirstName()
                                + " "
                                + log.getTechnician()
                                        .getLastName());
                    }

                    return response;

                })
                .toList();
    }


    // =========================================================
    // PART USAGE
    // =========================================================

    @Override
    public PartUsageResponse addPartUsage(
            Long workOrderId,
            PartUsageRequest request) {

        WorkOrder workOrder =
                workOrderRepository.findById(
                        workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found"));

        Inventory inventory =
                inventoryRepository.findById(
                        request.getInventoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Inventory not found"));

        if (inventory.getQuantity()
                < request.getQuantityUsed()) {

            throw new IllegalArgumentException(
                    "Insufficient stock available");
        }

        inventory.setQuantity(
                inventory.getQuantity()
                - request.getQuantityUsed());

        inventoryRepository.save(inventory);

        PartUsage usage =
                new PartUsage();

        usage.setWorkOrder(workOrder);

        usage.setInventory(inventory);

        usage.setQuantityUsed(
                request.getQuantityUsed());

        PartUsage saved =
                partUsageRepository.save(usage);

        PartUsageResponse response =
                new PartUsageResponse();

        response.setId(
                saved.getId());

        response.setPartName(
                inventory.getPartName());

        response.setQuantityUsed(
                saved.getQuantityUsed());

        return response;
    }


    // =========================================================
    // GET PART USAGE
    // =========================================================

    @Override
    public List<PartUsageResponse>
            getPartUsage(Long workOrderId) {

        WorkOrder workOrder =
                workOrderRepository.findById(
                        workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found"));

        return partUsageRepository
                .findByWorkOrder(workOrder)
                .stream()
                .map(part -> {

                    PartUsageResponse response =
                            new PartUsageResponse();

                    response.setId(
                            part.getId());

                    response.setPartName(
                            part.getInventory()
                                    .getPartName());

                    response.setQuantityUsed(
                            part.getQuantityUsed());

                    return response;

                })
                .toList();
    }


    // =========================================================
    // MAP ENTITY TO RESPONSE
    // =========================================================

    private WorkOrderResponse mapToResponse(
            WorkOrder workOrder) {

        WorkOrderResponse response =
                new WorkOrderResponse();

        response.setId(
                workOrder.getId());

        response.setTitle(
                workOrder.getTitle());

        response.setDescription(
                workOrder.getDescription());

        response.setPriority(
                workOrder.getPriority());

        response.setStatus(
                workOrder.getStatus());

        response.setScheduledDate(
                workOrder.getScheduledDate());

        response.setCompletedDate(
                workOrder.getCompletedDate());


        // =====================================================
        // CUSTOMER
        // =====================================================

        if (workOrder.getCustomer() != null) {

            response.setCustomerName(
                    workOrder.getCustomer()
                            .getCustomerName());
        }


        // =====================================================
        // TECHNICIAN
        // =====================================================

        if (workOrder.getTechnician() != null) {

            response.setTechnicianName(
                    workOrder.getTechnician()
                            .getFirstName()
                    + " "
                    + workOrder.getTechnician()
                            .getLastName());

        } else {

            response.setTechnicianName(
                    "Unassigned");
        }


        // =====================================================
        // SLA
        // =====================================================

        response.setSlaDueDate(
                workOrder.getSlaDueDate());

        response.setSlaBreached(
                workOrder.getSlaBreached());

        return response;
    }
}