package com.keystone.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keystone.dto.ChangeStatusRequest;
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

    @Override
    public WorkOrderResponse createWorkOrder(WorkOrderRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        Technician technician = technicianRepository.findById(request.getTechnicianId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found"));

        WorkOrder workOrder = new WorkOrder();

        workOrder.setTitle(request.getTitle());
        workOrder.setDescription(request.getDescription());
        workOrder.setPriority(request.getPriority());
        workOrder.setScheduledDate(request.getScheduledDate());

        workOrder.setStatus(WorkOrderStatus.NEW);
        workOrder.setCreatedAt(LocalDateTime.now());
        workOrder.setSlaDueDate(LocalDateTime.now().plusHours(24));
        workOrder.setSlaBreached(false);

        workOrder.setCustomer(customer);
        workOrder.setTechnician(technician);

        WorkOrder saved = workOrderRepository.save(workOrder);

        return mapToResponse(saved);
    }

    @Override
    public List<WorkOrderResponse> getAllWorkOrders() {

        return workOrderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public WorkOrderResponse getWorkOrderById(Long id) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        return mapToResponse(workOrder);
    }
    @Override
    public WorkOrderResponse changeStatus(Long id,
            ChangeStatusRequest request) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        // Store current status
        WorkOrderStatus oldStatus = workOrder.getStatus();

        // Validate transition
        if (!WorkOrderStatusValidator.isValidTransition(
                oldStatus,
                request.getStatus())) {

            throw new IllegalArgumentException(
                    "Invalid status transition from "
                            + oldStatus
                            + " to "
                            + request.getStatus());
        }

     // Update Status
        workOrder.setStatus(request.getStatus());

        // SLA Time Tracking
        if (request.getStatus() == WorkOrderStatus.ASSIGNED) {

            workOrder.setAssignedAt(LocalDateTime.now());

            emailService.sendEmail(
                    workOrder.getTechnician().getEmail(),
                    "Work Order Assigned",
                    "A new work order has been assigned.\n\n"
                            + "Title : " + workOrder.getTitle());
        }

        if (request.getStatus() == WorkOrderStatus.IN_PROGRESS) {

            workOrder.setStartedAt(LocalDateTime.now());
        }

        if (request.getStatus() == WorkOrderStatus.COMPLETED) {

            workOrder.setCompletedAt(LocalDateTime.now());

            if (workOrder.getCompletedAt()
                    .isAfter(workOrder.getSlaDueDate())) {

                workOrder.setSlaBreached(true);
            }

            emailService.sendEmail(
                    workOrder.getCustomer().getEmail(),
                    "Work Order Completed",
                    "Your work order has been completed successfully.");
        }

        WorkOrder updated = workOrderRepository.save(workOrder);        // Save status history
        WorkOrderStatusHistory history = new WorkOrderStatusHistory();

        history.setWorkOrder(updated);
        history.setFromStatus(oldStatus);
        history.setToStatus(request.getStatus());
        history.setChangedBy("SYSTEM");
        history.setChangedAt(LocalDateTime.now());

        historyRepository.save(history);

        return mapToResponse(updated);
    }
    
    @Override
    public List<WorkOrderStatusHistoryResponse> getStatusHistory(Long workOrderId) {

        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        return historyRepository.findByWorkOrderOrderByChangedAtDesc(workOrder)
                .stream()
                .map(history -> {

                    WorkOrderStatusHistoryResponse response =
                            new WorkOrderStatusHistoryResponse();

                    response.setFromStatus(history.getFromStatus());
                    response.setToStatus(history.getToStatus());
                    response.setChangedBy(history.getChangedBy());
                    response.setChangedAt(history.getChangedAt());

                    return response;

                }).toList();
    }

       

    @Override
    public WorkOrderResponse updateWorkOrder(Long id, WorkOrderRequest request) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        Technician technician = technicianRepository.findById(request.getTechnicianId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found"));

        workOrder.setTitle(request.getTitle());
        workOrder.setDescription(request.getDescription());
        workOrder.setPriority(request.getPriority());
        workOrder.setScheduledDate(request.getScheduledDate());
        workOrder.setCustomer(customer);
        workOrder.setTechnician(technician);

        WorkOrder updated = workOrderRepository.save(workOrder);

        return mapToResponse(updated);
    }

    @Override
    public void deleteWorkOrder(Long id) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        workOrderRepository.delete(workOrder);
    }
    @Override
    public List<WorkOrderResponse> getWorkOrdersByStatus(WorkOrderStatus status) {

        return workOrderRepository.findByStatus(status)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<WorkOrderResponse> getWorkOrdersByPriority(Priority priority) {

        return workOrderRepository.findByPriority(priority)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    @Override
    public List<WorkOrderResponse> getByCustomer(Long customerId) {

        return workOrderRepository.findByCustomerCustomerId(customerId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<WorkOrderResponse> getByTechnician(Long technicianId) {

        return workOrderRepository.findByTechnicianId(technicianId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private WorkOrderResponse mapToResponse(WorkOrder workOrder) {

        WorkOrderResponse response = new WorkOrderResponse();

        response.setId(workOrder.getId());
        response.setTitle(workOrder.getTitle());
        response.setDescription(workOrder.getDescription());
        response.setPriority(workOrder.getPriority());
        response.setStatus(workOrder.getStatus());
        response.setScheduledDate(workOrder.getScheduledDate());
        response.setCompletedDate(workOrder.getCompletedDate());

        response.setCustomerName(workOrder.getCustomer().getCustomerName());

        response.setTechnicianName(
                workOrder.getTechnician().getFirstName() + " " +
                workOrder.getTechnician().getLastName());

        response.setSlaDueDate(workOrder.getSlaDueDate());
        response.setSlaBreached(workOrder.getSlaBreached());

        return response;
    }
    @Override
    public TimeLogResponse addTimeLog(Long workOrderId,
            TimeLogRequest request) {

        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        Technician technician = technicianRepository
                .findById(request.getTechnicianId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found"));

        TimeLog timeLog = new TimeLog();

        timeLog.setWorkOrder(workOrder);
        timeLog.setTechnician(technician);
        timeLog.setMinutesWorked(request.getMinutesWorked());
        timeLog.setNotes(request.getNotes());
        timeLog.setLoggedAt(LocalDateTime.now());

        TimeLog saved = timeLogRepository.save(timeLog);

        TimeLogResponse response = new TimeLogResponse();

        response.setId(saved.getId());
        response.setMinutesWorked(saved.getMinutesWorked());
        response.setNotes(saved.getNotes());
        response.setLoggedAt(saved.getLoggedAt());
        response.setTechnicianName(
                technician.getFirstName() + " " + technician.getLastName());

        return response;
    }
    @Override
    public List<TimeLogResponse> getTimeLogs(Long workOrderId) {

        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        return timeLogRepository.findByWorkOrder(workOrder)
                .stream()
                .map(log -> {

                    TimeLogResponse response = new TimeLogResponse();

                    response.setId(log.getId());
                    response.setMinutesWorked(log.getMinutesWorked());
                    response.setNotes(log.getNotes());
                    response.setLoggedAt(log.getLoggedAt());
                    response.setTechnicianName(
                            log.getTechnician().getFirstName()
                            + " "
                            + log.getTechnician().getLastName());

                    return response;

                }).toList();
    }
    @Override
    public PartUsageResponse addPartUsage(Long workOrderId,
            PartUsageRequest request) {

        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        Inventory inventory = inventoryRepository.findById(request.getInventoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Inventory not found"));

        if (inventory.getQuantity() < request.getQuantityUsed()) {
            throw new IllegalArgumentException("Insufficient stock available");
        }

        inventory.setQuantity(
                inventory.getQuantity() - request.getQuantityUsed());

        inventoryRepository.save(inventory);

        PartUsage usage = new PartUsage();

        usage.setWorkOrder(workOrder);
        usage.setInventory(inventory);
        usage.setQuantityUsed(request.getQuantityUsed());

        PartUsage saved = partUsageRepository.save(usage);

        PartUsageResponse response = new PartUsageResponse();

        response.setId(saved.getId());
        response.setPartName(inventory.getPartName());
        response.setQuantityUsed(saved.getQuantityUsed());

        return response;
    }
    
    @Override
    public List<PartUsageResponse> getPartUsage(Long workOrderId) {

        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        return partUsageRepository.findByWorkOrder(workOrder)
                .stream()
                .map(part -> {

                    PartUsageResponse response =
                            new PartUsageResponse();

                    response.setId(part.getId());
                    response.setPartName(
                            part.getInventory().getPartName());
                    response.setQuantityUsed(
                            part.getQuantityUsed());

                    return response;

                }).toList();
    }
}