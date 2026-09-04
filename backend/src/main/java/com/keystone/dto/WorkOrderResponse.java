
package com.keystone.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WorkOrderResponse {

    // =========================================================
    // BASIC INFORMATION
    // =========================================================

    private Long id;

    private String title;

    private String description;


    // =========================================================
    // PRIORITY & STATUS
    // =========================================================

    private Priority priority;

    private WorkOrderStatus status;


    // =========================================================
    // SCHEDULING
    // =========================================================

    private LocalDate scheduledDate;


    // =========================================================
    // COMPLETION
    // =========================================================

    private LocalDate completedDate;

    private LocalDateTime completedAt;


    // =========================================================
    // SITE
    // =========================================================

    private Long siteId;

    private String address;


    // =========================================================
    // SERVICE
    // =========================================================

    private String serviceType;


    // =========================================================
    // CUSTOMER
    // =========================================================

    private Long customerId;

    private String customerName;


    // =========================================================
    // TECHNICIAN
    // =========================================================

    private Long technicianId;

    private String technicianName;


    // =========================================================
    // ASSIGNMENT
    // =========================================================

    private Long assignedById;

    private LocalDateTime assignedAt;


    // =========================================================
    // TIMELINE
    // =========================================================

    private LocalDateTime createdAt;

    private LocalDateTime startedAt;


    // =========================================================
    // SLA
    // =========================================================

    private LocalDateTime slaDueDate;

    private Boolean slaBreached;
}
