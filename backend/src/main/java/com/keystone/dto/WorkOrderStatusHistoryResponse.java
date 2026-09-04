
package com.keystone.dto;

import java.time.LocalDateTime;

import com.keystone.enums.WorkOrderStatus;

import lombok.Data;

@Data
public class WorkOrderStatusHistoryResponse {

    private Long id;

    private Long workOrderId;

    private WorkOrderStatus fromStatus;

    private WorkOrderStatus toStatus;

    private String changedBy;

    private LocalDateTime changedAt;
}

