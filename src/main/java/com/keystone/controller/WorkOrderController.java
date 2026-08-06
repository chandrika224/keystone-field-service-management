package com.keystone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;
import com.keystone.service.WorkOrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/workorders")
public class WorkOrderController {

    @Autowired
    private WorkOrderService workOrderService;

    // Create Work Order
    @PostMapping
    public WorkOrderResponse createWorkOrder(@Valid @RequestBody WorkOrderRequest request) {
        return workOrderService.createWorkOrder(request);
    }

    // Get All Work Orders
    @GetMapping
    public List<WorkOrderResponse> getAllWorkOrders() {
        return workOrderService.getAllWorkOrders();
    }

    // Get Work Order By Id
    @GetMapping("/{id}")
    public WorkOrderResponse getWorkOrderById(@PathVariable Long id) {
        return workOrderService.getWorkOrderById(id);
    }

    // Update Work Order
    @PutMapping("/{id}")
    public WorkOrderResponse updateWorkOrder(
            @PathVariable Long id,
            @Valid @RequestBody WorkOrderRequest request) {

        return workOrderService.updateWorkOrder(id, request);
    }

    // Delete Work Order
    @DeleteMapping("/{id}")
    public String deleteWorkOrder(@PathVariable Long id) {

        workOrderService.deleteWorkOrder(id);

        return "Work Order Deleted Successfully";
    }
}