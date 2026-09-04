package com.keystone.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.ChangeStatusRequest;
import com.keystone.dto.CustomerWorkOrderRequest;
import com.keystone.dto.CustomerWorkOrderUpdateRequest;
import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;
import com.keystone.dto.WorkOrderStatusHistoryResponse;
import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;
import com.keystone.service.WorkOrderService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/workorders")
@RequiredArgsConstructor
@Slf4j
public class WorkOrderController {

    private final WorkOrderService workOrderService;


    // =========================================================
    // WORK ORDER
    // =========================================================

    /**
     * Create a work order.
     *
     * Used by dispatcher/admin.
     */
    @PostMapping
    public ResponseEntity<WorkOrderResponse> createWorkOrder(
            Authentication authentication,
            @Valid @RequestBody WorkOrderRequest request) {

        String dispatcherEmail = authentication.getName();

        log.info(
                "Received request to create work order by dispatcherEmail={}",
                dispatcherEmail
        );

        WorkOrderResponse response =
                workOrderService.createWorkOrder(dispatcherEmail, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    /**
     * Get all work orders.
     */
    @GetMapping
    public ResponseEntity<List<WorkOrderResponse>> getAllWorkOrders() {

        return ResponseEntity.ok(
                workOrderService.getAllWorkOrders()
        );
    }


    /**
     * Get work order by ID.
     */
    @GetMapping("/{workOrderId}")
    public ResponseEntity<WorkOrderResponse> getWorkOrderById(
            @PathVariable Long workOrderId) {

        return ResponseEntity.ok(
                workOrderService.getWorkOrderById(workOrderId)
        );
    }


    /**
     * Update work order.
     */
    @PutMapping("/{workOrderId}")
    public ResponseEntity<WorkOrderResponse> updateWorkOrder(
            @PathVariable Long workOrderId,
            @Valid @RequestBody WorkOrderRequest request) {

        return ResponseEntity.ok(
                workOrderService.updateWorkOrder(
                        workOrderId,
                        request
                )
        );
    }

    @Operation(summary = "Assign a technician to a work order (dispatcher only)")
    @PatchMapping("/{workOrderId}/assign")
    public ResponseEntity<WorkOrderResponse> assignTechnician(
            Authentication authentication,
            @PathVariable Long workOrderId,
            @RequestParam Long technicianId) {

        String dispatcherEmail = authentication.getName();

        log.info(
                "Received request to assign technicianId={} to workOrderId={} by dispatcherEmail={}",
                technicianId,
                workOrderId,
                dispatcherEmail
        );

        WorkOrderResponse response = workOrderService.assignTechnician(
                dispatcherEmail,
                workOrderId,
                technicianId
        );

        return ResponseEntity.ok(response);
    }

    /**
     * Delete work order.
     */
    @DeleteMapping("/{workOrderId}")
    public ResponseEntity<Void> deleteWorkOrder(
            @PathVariable Long workOrderId) {

        workOrderService.deleteWorkOrder(workOrderId);

        return ResponseEntity.noContent().build();
    }


    // =========================================================
    // CUSTOMER
    // =========================================================

    /**
     * Customer creates their own work order.
     */
    @PostMapping("/my")
    public ResponseEntity<WorkOrderResponse> createCustomerWorkOrder(
            @RequestParam String email,
            @Valid @RequestBody CustomerWorkOrderRequest request) {

        WorkOrderResponse response =
                workOrderService.createCustomerWorkOrder(
                        email,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    /**
     * Get logged-in customer's work orders.
     */
    @GetMapping("/my")
    public ResponseEntity<List<WorkOrderResponse>> getMyWorkOrders(
            @RequestParam String email) {

        return ResponseEntity.ok(
                workOrderService.getMyWorkOrders(email)
        );
    }


    /**
     * Customer updates their own work order.
     */
    @PutMapping("/my/{workOrderId}")
    public ResponseEntity<WorkOrderResponse> updateMyWorkOrder(
            @RequestParam String email,
            @PathVariable Long workOrderId,
            @Valid @RequestBody CustomerWorkOrderRequest request) {

        return ResponseEntity.ok(
            workOrderService.updateMyWorkOrder(
                email,
                workOrderId,
                request
            )
        );
    }


    /**
     * Get work orders by customer ID.
     */
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<WorkOrderResponse>> getByCustomer(
            @PathVariable Long customerId) {

        return ResponseEntity.ok(
                workOrderService.getByCustomer(customerId)
        );
    }


    // =========================================================
    // DISPATCHER
    // =========================================================

    /**
     * Get work orders by status.
     *
     * Example:
     * GET /api/workorders/status/ASSIGNED
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<WorkOrderResponse>> getWorkOrdersByStatus(
            @PathVariable WorkOrderStatus status) {

        return ResponseEntity.ok(
                workOrderService.getWorkOrdersByStatus(status)
        );
    }


    /**
     * Get work orders by priority.
     *
     * Example:
     * GET /api/workorders/priority/HIGH
     */
    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<WorkOrderResponse>> getWorkOrdersByPriority(
            @PathVariable Priority priority) {

        return ResponseEntity.ok(
                workOrderService.getWorkOrdersByPriority(priority)
        );
    }


    /**
     * Get work orders assigned to a technician.
     */
    @GetMapping("/technician/{technicianId}")
    public ResponseEntity<List<WorkOrderResponse>> getByTechnician(
            @PathVariable Long technicianId) {

        return ResponseEntity.ok(
                workOrderService.getByTechnician(technicianId)
        );
    }


    // =========================================================
    // STATUS
    // =========================================================

    /**
     * Change work order status.
     *
     * Example:
     * PUT /api/workorders/10/status
     */
    @PutMapping("/{workOrderId}/status")
    public ResponseEntity<WorkOrderResponse> changeStatus(
            @PathVariable Long workOrderId,
            @Valid @RequestBody ChangeStatusRequest request) {

        return ResponseEntity.ok(
                workOrderService.changeStatus(
                        workOrderId,
                        request
                )
        );
    }


    // =========================================================
    // TECHNICIAN
    // =========================================================

    /**
     * Get logged-in technician's work orders.
     */
    @GetMapping("/technician/my")
    public ResponseEntity<List<WorkOrderResponse>>
    getMyTechnicianWorkOrders(
            @RequestParam String email) {

        return ResponseEntity.ok(
                workOrderService.getMyTechnicianWorkOrders(email)
        );
    }


    /**
     * Get pending assignments for technician.
     */
    @GetMapping("/technician/my/pending")
    public ResponseEntity<List<WorkOrderResponse>>
    getPendingTechnicianAssignments(
            @RequestParam String email) {

        return ResponseEntity.ok(
                workOrderService.getPendingTechnicianAssignments(email)
        );
    }


    /**
     * Technician accepts work order.
     */
    @PutMapping("/{workOrderId}/accept")
    public ResponseEntity<WorkOrderResponse> acceptWorkOrder(
            @RequestParam String email,
            @PathVariable Long workOrderId) {

        return ResponseEntity.ok(
                workOrderService.acceptWorkOrder(
                        email,
                        workOrderId
                )
        );
    }


    /**
     * Technician starts work order.
     */
    @PutMapping("/{workOrderId}/start")
    public ResponseEntity<WorkOrderResponse> startWorkOrder(
            @RequestParam String email,
            @PathVariable Long workOrderId) {

        return ResponseEntity.ok(
                workOrderService.startWorkOrder(
                        email,
                        workOrderId
                )
        );
    }


    /**
     * Technician puts work order on hold.
     */
    @PutMapping("/{workOrderId}/hold")
    public ResponseEntity<WorkOrderResponse> holdWorkOrder(
            @RequestParam String email,
            @PathVariable Long workOrderId) {

        return ResponseEntity.ok(
                workOrderService.holdWorkOrder(
                        email,
                        workOrderId
                )
        );
    }


    /**
     * Technician resumes work order.
     */
    @PutMapping("/{workOrderId}/resume")
    public ResponseEntity<WorkOrderResponse> resumeWorkOrder(
            @RequestParam String email,
            @PathVariable Long workOrderId) {

        return ResponseEntity.ok(
                workOrderService.resumeWorkOrder(
                        email,
                        workOrderId
                )
        );
    }


    /**
     * Technician completes work order.
     */
    @PutMapping("/{workOrderId}/complete")
    public ResponseEntity<WorkOrderResponse> completeWorkOrder(
            @RequestParam String email,
            @PathVariable Long workOrderId) {

        return ResponseEntity.ok(
                workOrderService.completeWorkOrder(
                        email,
                        workOrderId
                )
        );
    }

    @PutMapping("/{workOrderId}/cancel")
    public ResponseEntity<WorkOrderResponse> cancelWorkOrder(
            Authentication authentication,
            @RequestParam String email,
            @PathVariable Long workOrderId) {

        log.info(
                "CANCEL ENDPOINT HIT: authenticatedUser={}, emailParam={}, workOrderId={}, authorities={}",
                authentication.getName(),
                email,
                workOrderId,
                authentication.getAuthorities()
        );

        return ResponseEntity.ok(
                workOrderService.cancelWorkOrder(
                        email,
                        workOrderId
                )
        );
    }

    // =========================================================
    // STATUS HISTORY
    // =========================================================

    /**
     * Get status history for a work order.
     */
    @GetMapping("/{workOrderId}/status-history")
    public ResponseEntity<List<WorkOrderStatusHistoryResponse>>
    getStatusHistory(
            @PathVariable Long workOrderId) {

        return ResponseEntity.ok(
                workOrderService.getStatusHistory(workOrderId)
        );
    }
}