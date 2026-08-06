package com.keystone.service;

import java.util.List;

import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;
import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;

public interface WorkOrderService {

    WorkOrderResponse createWorkOrder(WorkOrderRequest request);

    List<WorkOrderResponse> getAllWorkOrders();

    WorkOrderResponse getWorkOrderById(Long id);
    List<WorkOrderResponse> getWorkOrdersByStatus(WorkOrderStatus status);

    List<WorkOrderResponse> getWorkOrdersByPriority(Priority priority);

    WorkOrderResponse updateWorkOrder(Long id, WorkOrderRequest request);
    
    List<WorkOrderResponse> getByCustomer(Long customerId);

    List<WorkOrderResponse> getByTechnician(Long technicianId);

    void deleteWorkOrder(Long id);

}