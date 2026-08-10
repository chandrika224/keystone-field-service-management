package com.keystone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.ChangeStatusRequest;
import com.keystone.dto.PartUsageRequest;
import com.keystone.dto.PartUsageResponse;
import com.keystone.dto.TimeLogRequest;
import com.keystone.dto.TimeLogResponse;
import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;
import com.keystone.dto.WorkOrderStatusHistoryResponse;
import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;
import com.keystone.service.WorkOrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/workorders")
@Tag(name = "Work Order", description = "Work Order Management APIs")
public class WorkOrderController {

    @Autowired
    private WorkOrderService workOrderService;

    @Operation(summary = "Create Work Order")
    @PostMapping
    public WorkOrderResponse createWorkOrder(@Valid @RequestBody WorkOrderRequest request) {
        return workOrderService.createWorkOrder(request);
    }
    

    @Operation(summary = "Get All Work Orders")
    @GetMapping
    public List<WorkOrderResponse> getAllWorkOrders() {
        return workOrderService.getAllWorkOrders();
    }

    @Operation(summary = "Get Work Order By ID")
    @GetMapping("/{id}")
    public WorkOrderResponse getWorkOrderById(@PathVariable Long id) {
        return workOrderService.getWorkOrderById(id);
    }

    @Operation(summary = "Update Work Order")
    @PutMapping("/{id}")
    public WorkOrderResponse updateWorkOrder(@PathVariable Long id,
                                             @Valid @RequestBody WorkOrderRequest request) {
        return workOrderService.updateWorkOrder(id, request);
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<WorkOrderResponse> changeStatus(
            @PathVariable Long id,
            @Valid @RequestBody ChangeStatusRequest request) {

        return ResponseEntity.ok(
                workOrderService.changeStatus(id, request));
    }

    @Operation(summary = "Delete Work Order")
    @DeleteMapping("/{id}")
    public String deleteWorkOrder(@PathVariable Long id) {
        workOrderService.deleteWorkOrder(id);
        return "Work Order deleted successfully";
    }

    @Operation(summary = "Get Work Orders By Status")
    @GetMapping("/status")
    public List<WorkOrderResponse> getWorkOrdersByStatus(
            @RequestParam WorkOrderStatus status) {

        return workOrderService.getWorkOrdersByStatus(status);
    }
    @GetMapping("/{id}/history")
    public ResponseEntity<List<WorkOrderStatusHistoryResponse>>
    getStatusHistory(@PathVariable Long id) {

        return ResponseEntity.ok(
                workOrderService.getStatusHistory(id));
    }

    @Operation(summary = "Get Work Orders By Priority")
    @GetMapping("/priority")
    public List<WorkOrderResponse> getWorkOrdersByPriority(
            @RequestParam Priority priority) {

        return workOrderService.getWorkOrdersByPriority(priority);
    }

    @Operation(summary = "Get Work Orders By Customer")
    @GetMapping("/customer/{customerId}")
    public List<WorkOrderResponse> getByCustomer(
            @PathVariable Long customerId) {

        return workOrderService.getByCustomer(customerId);
    }
    @PostMapping("/{id}/time")
    public ResponseEntity<TimeLogResponse> addTimeLog(
            @PathVariable Long id,
            @Valid @RequestBody TimeLogRequest request) {

        return ResponseEntity.ok(
                workOrderService.addTimeLog(id, request));
    }
    @PostMapping("/{id}/parts")
    public ResponseEntity<PartUsageResponse> addPartUsage(
            @PathVariable Long id,
            @Valid @RequestBody PartUsageRequest request) {

        return ResponseEntity.ok(
                workOrderService.addPartUsage(id, request));
    }

    @GetMapping("/{id}/parts")
    public ResponseEntity<List<PartUsageResponse>> getPartUsage(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                workOrderService.getPartUsage(id));
    }

    @GetMapping("/{id}/time")
    public ResponseEntity<List<TimeLogResponse>> getTimeLogs(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                workOrderService.getTimeLogs(id));
    }

    @Operation(summary = "Get Work Orders By Technician")
    @GetMapping("/technician/{technicianId}")
    public List<WorkOrderResponse> getByTechnician(
            @PathVariable Long technicianId) {

        return workOrderService.getByTechnician(technicianId);
    }
}