package com.keystone.service.mapper;

import org.springframework.stereotype.Component;

import com.keystone.dto.WorkOrderResponse;
import com.keystone.dto.WorkOrderStatusHistoryResponse;
import com.keystone.entity.WorkOrder;
import com.keystone.entity.WorkOrderStatusHistory;

@Component
public class WorkOrderMapper {

    // =========================================================
    // WORK ORDER ENTITY -> RESPONSE
    // =========================================================

    public WorkOrderResponse mapToResponse(WorkOrder workOrder) {

        if (workOrder == null) {
            return null;
        }

        WorkOrderResponse response = new WorkOrderResponse();

        // -----------------------------------------------------
        // BASIC INFORMATION
        // -----------------------------------------------------

        response.setId(workOrder.getId());
        response.setTitle(workOrder.getTitle());
        response.setDescription(workOrder.getDescription());

        // -----------------------------------------------------
        // PRIORITY & STATUS
        // -----------------------------------------------------

        response.setPriority(workOrder.getPriority());
        response.setStatus(workOrder.getStatus());

        // -----------------------------------------------------
        // SCHEDULING
        // -----------------------------------------------------

        response.setScheduledDate(
                workOrder.getScheduledDate()
        );

        // -----------------------------------------------------
        // SERVICE INFORMATION
        // -----------------------------------------------------

        response.setServiceType(
                workOrder.getServiceType()
        );

        response.setAddress(
                workOrder.getAddress()
        );

        // -----------------------------------------------------
        // CUSTOMER
        // -----------------------------------------------------

        if (workOrder.getCustomer() != null) {

            response.setCustomerId(
                    workOrder.getCustomer()
                            .getCustomerId()
            );

            response.setCustomerName(
                    workOrder.getCustomer()
                            .getCustomerName()
            );
        }

        // -----------------------------------------------------
        // SITE
        // -----------------------------------------------------

        if (workOrder.getSite() != null) {

            response.setSiteId(
                    workOrder.getSite()
                            .getId()
            );
        }

        // -----------------------------------------------------
        // TECHNICIAN
        // -----------------------------------------------------

        if (workOrder.getTechnician() != null) {

            response.setTechnicianId(
                    workOrder.getTechnician()
                            .getId()
            );

            response.setTechnicianName(
                    getTechnicianName(workOrder)
            );
        }

        // -----------------------------------------------------
        // ASSIGNED BY
        // -----------------------------------------------------

        if (workOrder.getAssignedBy() != null) {

            response.setAssignedById(
                    workOrder.getAssignedBy()
                            .getId()
            );
        }

        response.setAssignedAt(
                workOrder.getAssignedAt()
        );

        // -----------------------------------------------------
        // TIMELINE
        // -----------------------------------------------------

        response.setCreatedAt(
                workOrder.getCreatedAt()
        );

        response.setStartedAt(
                workOrder.getStartedAt()
        );

        response.setCompletedAt(
                workOrder.getCompletedAt()
        );

        response.setCompletedDate(
                workOrder.getCompletedDate()
        );

        // -----------------------------------------------------
        // SLA
        // -----------------------------------------------------

        response.setSlaDueDate(
                workOrder.getSlaDueDate()
        );

        response.setSlaBreached(
                workOrder.isSlaBreached()
        );

        return response;
    }


    // =========================================================
    // TECHNICIAN NAME
    // =========================================================

    private String getTechnicianName(WorkOrder workOrder) {

        if (workOrder.getTechnician() == null) {
            return null;
        }

        if (workOrder.getTechnician().getUser() == null) {
            return null;
        }

        String firstName =
                workOrder.getTechnician()
                        .getUser()
                        .getFirstName();

        String lastName =
                workOrder.getTechnician()
                        .getUser()
                        .getLastName();

        if (firstName == null && lastName == null) {
            return null;
        }

        if (firstName == null) {
            return lastName;
        }

        if (lastName == null) {
            return firstName;
        }

        return firstName + " " + lastName;
    }


    // =========================================================
    // STATUS HISTORY ENTITY -> RESPONSE
    // =========================================================

    public WorkOrderStatusHistoryResponse mapToStatusHistoryResponse(
            WorkOrderStatusHistory history) {

        if (history == null) {
            return null;
        }

        WorkOrderStatusHistoryResponse response =
                new WorkOrderStatusHistoryResponse();

        // -----------------------------------------------------
        // BASIC INFORMATION
        // -----------------------------------------------------

        response.setId(
                history.getId()
        );

        // -----------------------------------------------------
        // WORK ORDER
        // -----------------------------------------------------

        if (history.getWorkOrder() != null) {

            response.setWorkOrderId(
                    history.getWorkOrder()
                            .getId()
            );
        }

        // -----------------------------------------------------
        // STATUS
        // -----------------------------------------------------

        response.setFromStatus(
                history.getFromStatus()
        );

        response.setToStatus(
                history.getToStatus()
        );

        // -----------------------------------------------------
        // AUDIT INFORMATION
        // -----------------------------------------------------

        response.setChangedBy(
                history.getChangedBy()
        );

        response.setChangedAt(
                history.getChangedAt()
        );

        return response;
    }
}