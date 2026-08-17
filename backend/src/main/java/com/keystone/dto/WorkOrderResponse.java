package com.keystone.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.keystone.enums.Priority;
import com.keystone.enums.ServiceType;
import com.keystone.enums.WorkOrderStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WorkOrderResponse {

    private Long id;

    private String title;
    private String description;

    private ServiceType serviceType;
    private Priority priority;
    private WorkOrderStatus status;

    private LocalDate scheduledDate;
    private LocalDate completedDate;

    private String address;

    private Long customerId;
    private String customerName;

    private Long technicianId;
    private String technicianName;

    private LocalDateTime createdAt;
    private LocalDateTime assignedAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;

    private LocalDateTime slaDueDate;
    private boolean slaBreached;

    private String message;
}