
package com.keystone.service;

import java.util.List;

import com.keystone.dto.ChangeStatusRequest;
import com.keystone.dto.CustomerWorkOrderRequest;
import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;
import com.keystone.dto.WorkOrderStatusHistoryResponse;
import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;

public interface WorkOrderService {

    // =========================================================
    // WORK ORDER
    // =========================================================

    WorkOrderResponse createWorkOrder(
    		String email, WorkOrderRequest request
    );

    WorkOrderResponse getWorkOrderById(
            Long workOrderId
    );

    List<WorkOrderResponse> getAllWorkOrders();

    WorkOrderResponse updateWorkOrder(
            Long workOrderId,
            WorkOrderRequest request
    );

    void deleteWorkOrder(
            Long workOrderId
    );


    // =========================================================
    // CUSTOMER
    // =========================================================

    WorkOrderResponse createCustomerWorkOrder(
            String email,
            CustomerWorkOrderRequest request
    );

    List<WorkOrderResponse> getMyWorkOrders(
            String email
    );

    WorkOrderResponse updateMyWorkOrder(
            String email,
            Long workOrderId,
            CustomerWorkOrderRequest request
    );

    List<WorkOrderResponse> getByCustomer(
            Long customerId
    );


    // =========================================================
    // DISPATCHER
    // =========================================================

    List<WorkOrderResponse> getWorkOrdersByStatus(
            WorkOrderStatus status
    );

    List<WorkOrderResponse> getWorkOrdersByPriority(
            Priority priority
    );

    List<WorkOrderResponse> getByTechnician(
            Long technicianId
    );

    WorkOrderResponse assignTechnician(
            String dispatcherEmail,
            Long workOrderId,
            Long technicianId
    );

    // =========================================================
    // STATUS
    // =========================================================

    WorkOrderResponse changeStatus(
            Long workOrderId,
            ChangeStatusRequest request
    );


    // =========================================================
    // TECHNICIAN
    // =========================================================

    List<WorkOrderResponse> getMyTechnicianWorkOrders(
            String email
    );

    List<WorkOrderResponse> getPendingTechnicianAssignments(
            String email
    );

    WorkOrderResponse acceptWorkOrder(
            String email,
            Long workOrderId
    );

    WorkOrderResponse startWorkOrder(
            String email,
            Long workOrderId
    );

    WorkOrderResponse holdWorkOrder(
            String email,
            Long workOrderId
    );

    WorkOrderResponse resumeWorkOrder(
            String email,
            Long workOrderId
    );

    WorkOrderResponse completeWorkOrder(
            String email,
            Long workOrderId
    );


    // =========================================================
    // STATUS HISTORY
    // =========================================================

    List<WorkOrderStatusHistoryResponse> getStatusHistory(
            Long workOrderId
    );

    WorkOrderResponse cancelWorkOrder(String email, Long workOrderId);
}
