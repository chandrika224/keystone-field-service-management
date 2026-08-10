package com.keystone.dto;

import com.keystone.enums.WorkOrderStatus;

import jakarta.validation.constraints.NotNull;

public class ChangeStatusRequest {

    @NotNull(message = "Status is required")
    private WorkOrderStatus status;

    public WorkOrderStatus getStatus() {
        return status;
    }

    public void setStatus(WorkOrderStatus status) {
        this.status = status;
    }
}