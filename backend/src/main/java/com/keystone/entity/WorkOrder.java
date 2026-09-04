package com.keystone.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "work_orders")
@Data
@NoArgsConstructor
public class WorkOrder {

    // =========================================================
    // ID
    // =========================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================================================
    // BASIC INFORMATION
    // =========================================================

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;


    // =========================================================
    // PRIORITY
    // =========================================================

    @Enumerated(EnumType.STRING) 
    @Column( name = "priority", nullable = false ) 
    private Priority priority;
    
    // =========================================================
    // STATUS
    // =========================================================

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private WorkOrderStatus status;

    // =========================================================
    // SCHEDULING
    // =========================================================

    @Column(name = "scheduled_date")
    private LocalDate scheduledDate;


    // =========================================================
    // COMPLETION
    // =========================================================

    @Column(name = "completed_date")
    private LocalDate completedDate;


    // =========================================================
    // CUSTOMER
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Customer customer;


    // =========================================================
    // SITE
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "site_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Site site;


    // =========================================================
    // ASSIGNED TECHNICIAN
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "technician_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Technician technician;


    // =========================================================
    // ASSIGNED BY
    // Dispatcher who assigned the technician
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_by")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User assignedBy;


    // =========================================================
    // TIMELINE
    // =========================================================

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "assigned_at")
    private LocalDateTime assignedAt;

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;


    // =========================================================
    // SLA
    // =========================================================

    @Column(name = "sla_due_date", nullable = false)
    private LocalDateTime slaDueDate;

    @Column(name = "sla_breached", nullable = false)
    private boolean slaBreached = false;


    // =========================================================
    // PRE-PERSIST
    // =========================================================

    @PrePersist
    protected void prePersist() {

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }

        if (slaDueDate == null) {
            slaDueDate = createdAt.plusHours(24);
        }

        if (status == null) {
            status = WorkOrderStatus.NEW;
        }
    }
    
    @Column(name = "service_type", nullable = false)
    private String serviceType;

    @Column(name = "address", length = 1000)
    private String address;
}