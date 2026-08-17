package com.keystone.service.impl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keystone.dto.AssignTechnicianRequest;
import com.keystone.dto.WorkOrderResponse;
import com.keystone.entity.Technician;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;
import com.keystone.entity.WorkOrderStatusHistory;
import com.keystone.enums.Role;
import com.keystone.enums.WorkOrderStatus;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.repository.UserRepository;
import com.keystone.repository.WorkOrderRepository;
import com.keystone.repository.WorkOrderStatusHistoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AssignTechnicianService {

    private final WorkOrderRepository workOrderRepository;
    private final UserRepository userRepository;
    private final WorkOrderStatusHistoryRepository statusHistoryRepository;

    @Transactional
    public WorkOrderResponse assignTechnician(
            Long id,
            AssignTechnicianRequest request) {

        // ============================================================
        // 1. FIND WORK ORDER
        // ============================================================

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found with id: " + id
                        )
                );

        // ============================================================
        // 2. FIND TECHNICIAN
        // ============================================================

        User technician = userRepository.findById(request.getTechnicianId())
                .filter(user -> user.getRole() == Role.TECHNICIAN)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Technician not found with id: "
                                        + request.getTechnicianId()
                        )
                );

        // ============================================================
        // 3. CHECK TECHNICIAN STATUS
        // ============================================================

        if (!technician.isActive()) {
            throw new IllegalStateException(
                    "Cannot assign work order to an inactive technician"
            );
        }

        // ============================================================
        // 4. CHECK CURRENT STATUS
        // ============================================================

        WorkOrderStatus previousStatus = workOrder.getStatus();

        // ============================================================
        // 5. ASSIGN TECHNICIAN
        // ============================================================

        workOrder.setTechnician(technician);
        workOrder.setAssignedAt(LocalDateTime.now());

        // ============================================================
        // 6. UPDATE STATUS
        // ============================================================

        workOrder.setStatus(WorkOrderStatus.ASSIGNED);

        // ============================================================
        // 7. SAVE WORK ORDER
        // ============================================================

        WorkOrder updatedOrder =
                workOrderRepository.save(workOrder);

        // ============================================================
        // 8. SAVE STATUS HISTORY
        // ============================================================

        WorkOrderStatusHistory history =
                new WorkOrderStatusHistory();

        history.setWorkOrder(updatedOrder);
        history.setFromStatus(previousStatus);
        history.setToStatus(WorkOrderStatus.ASSIGNED);

        // Temporary value.
        // Later we should get the logged-in dispatcher from JWT.
        history.setChangedBy("DISPATCHER");

        statusHistoryRepository.save(history);

        // ============================================================
        // 9. RETURN RESPONSE
        // ============================================================

        return mapToResponse(updatedOrder);
    }

    // ============================================================
    // RESPONSE MAPPING
    // ============================================================

    private WorkOrderResponse mapToResponse(
            WorkOrder workOrder) {

        WorkOrderResponse response =
                new WorkOrderResponse();

        response.setId(workOrder.getId());

        response.setTitle(workOrder.getTitle());

        response.setDescription(
                workOrder.getDescription()
        );

        response.setServiceType(
                workOrder.getServiceType()
        );

        response.setPriority(
                workOrder.getPriority()
        );

        response.setStatus(
                workOrder.getStatus()
        );

        response.setScheduledDate(
                workOrder.getScheduledDate()
        );

        response.setCompletedDate(
                workOrder.getCompletedDate()
        );

        response.setAddress(
                workOrder.getAddress()
        );

        // ============================================================
        // TIMESTAMPS
        // ============================================================

        response.setCreatedAt(
                workOrder.getCreatedAt()
        );

        response.setAssignedAt(
                workOrder.getAssignedAt()
        );

        response.setStartedAt(
                workOrder.getStartedAt()
        );

        response.setCompletedAt(
                workOrder.getCompletedAt()
        );

        // ============================================================
        // SLA
        // ============================================================

        response.setSlaDueDate(
                workOrder.getSlaDueDate()
        );

       

        // ============================================================
        // TECHNICIAN
        // ============================================================

        if (workOrder.getTechnician() != null) {

            User technician =
                    workOrder.getTechnician();

            response.setTechnicianId(
                    technician.getId()
            );

            response.setTechnicianName(
                    technician.getFirstName()
                            + " "
                            + technician.getLastName()
            );
        }

        // ============================================================
        // CUSTOMER
        // ============================================================

        if (workOrder.getCustomer() != null) {

            response.setCustomerId(
                    workOrder.getCustomer().getCustomerId()
            );

            response.setCustomerName(
                    workOrder.getCustomer().getCustomerName()
            );
        
        }

        return response;
    }
}