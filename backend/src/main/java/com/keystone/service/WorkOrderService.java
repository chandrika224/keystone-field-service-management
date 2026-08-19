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

    // ============================================================
    // WORK ORDER
    // ============================================================

    WorkOrderResponse createWorkOrder(
            WorkOrderRequest request);

    WorkOrderResponse createCustomerWorkOrder(
            String email,
            CustomerWorkOrderRequest request);

    List<WorkOrderResponse> getAllWorkOrders();

    WorkOrderResponse getWorkOrderById(
            Long id);

    WorkOrderResponse updateWorkOrder(
            Long id,
            WorkOrderRequest request);

    void deleteWorkOrder(Long id);


    // ============================================================
    // CUSTOMER
    // ============================================================

    List<WorkOrderResponse> getMyWorkOrders(
            String email);

    WorkOrderResponse updateMyWorkOrder(
            String email,
            Long workOrderId,
            CustomerWorkOrderRequest request);

    List<WorkOrderResponse> getByCustomer(
            Long customerId);


    // ============================================================
    // DISPATCHER
    // ============================================================

    List<WorkOrderResponse> getWorkOrdersByStatus(
            WorkOrderStatus status);

    List<WorkOrderResponse> getWorkOrdersByPriority(
            Priority priority);

    List<WorkOrderResponse> getByTechnician(
            Long technicianId);

    WorkOrderResponse changeStatus(
            Long id,
            ChangeStatusRequest request);


    // ============================================================
    // TECHNICIAN
    // ============================================================

    List<WorkOrderResponse> getMyTechnicianWorkOrders(
            String email);

    WorkOrderResponse acceptWorkOrder(
            String email,
            Long workOrderId);

    WorkOrderResponse startWorkOrder(
            String email,
            Long workOrderId);

    WorkOrderResponse holdWorkOrder(
            String email,
            Long workOrderId);

    WorkOrderResponse resumeWorkOrder(
            String email,
            Long workOrderId);

    WorkOrderResponse completeWorkOrder(
            String email,
            Long workOrderId);


    // ============================================================
    // STATUS HISTORY
    // ============================================================

    List<WorkOrderStatusHistoryResponse> getStatusHistory(
            Long workOrderId);


    // ============================================================
    // TIME
    // ============================================================

    TimeLogResponse addTimeLog(
            Long workOrderId,
            TimeLogRequest request);

    List<TimeLogResponse> getTimeLogs(
            Long workOrderId);


    // ============================================================
    // PARTS
    // ============================================================

    PartUsageResponse addPartUsage(
            Long workOrderId,
            PartUsageRequest request);

    List<PartUsageResponse> getPartUsage(
            Long workOrderId);
}