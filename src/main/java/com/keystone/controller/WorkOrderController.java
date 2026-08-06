package com.keystone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;
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

    @Operation(summary = "Get Work Orders By Technician")
    @GetMapping("/technician/{technicianId}")
    public List<WorkOrderResponse> getByTechnician(
            @PathVariable Long technicianId) {

        return workOrderService.getByTechnician(technicianId);
    }
}