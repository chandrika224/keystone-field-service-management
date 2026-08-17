package com.keystone.service;

import java.util.List;

import com.keystone.dto.ChangeStatusRequest;
import com.keystone.dto.CustomerWorkOrderRequest;
import com.keystone.dto.PartUsageRequest;
import com.keystone.dto.PartUsageResponse;
import com.keystone.dto.TimeLogRequest;
import com.keystone.dto.TimeLogResponse;
import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;
import com.keystone.dto.WorkOrderStatusHistoryResponse;
import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;

public interface WorkOrderService {

    WorkOrderResponse createWorkOrder(
            WorkOrderRequest request);

    WorkOrderResponse createCustomerWorkOrder(
            String email,
            CustomerWorkOrderRequest request);

    List<WorkOrderResponse> getMyWorkOrders(
            String email);

    List<WorkOrderResponse> getAllWorkOrders();

    WorkOrderResponse getWorkOrderById(
            Long id);

    WorkOrderResponse updateWorkOrder(
            Long id,
            WorkOrderRequest request);

    List<WorkOrderResponse> getWorkOrdersByStatus(
            WorkOrderStatus status);

    List<WorkOrderResponse> getWorkOrdersByPriority(
            Priority priority);

    List<WorkOrderResponse> getByCustomer(
            Long customerId);

    List<WorkOrderResponse> getByTechnician(
            Long technicianId);

    WorkOrderResponse changeStatus(
            Long id,
            ChangeStatusRequest request);

    List<WorkOrderStatusHistoryResponse> getStatusHistory(
            Long workOrderId);

    TimeLogResponse addTimeLog(
            Long workOrderId,
            TimeLogRequest request);

    List<TimeLogResponse> getTimeLogs(
            Long workOrderId);

    PartUsageResponse addPartUsage(
            Long workOrderId,
            PartUsageRequest request);

    List<PartUsageResponse> getPartUsage(
            Long workOrderId);
    
    WorkOrderResponse updateMyWorkOrder(
            String email,
            Long workOrderId,
            CustomerWorkOrderRequest request
    );

    void deleteWorkOrder(Long id);
}