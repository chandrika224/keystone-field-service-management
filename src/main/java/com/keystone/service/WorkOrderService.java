package com.keystone.service;

import java.util.List;

import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;

public interface WorkOrderService {

    WorkOrderResponse createWorkOrder(WorkOrderRequest request);

    List<WorkOrderResponse> getAllWorkOrders();

    WorkOrderResponse getWorkOrderById(Long id);

    WorkOrderResponse updateWorkOrder(Long id, WorkOrderRequest request);

    void deleteWorkOrder(Long id);

}