package com.keystone.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.keystone.enums.Priority;
import com.keystone.enums.ServiceType;
import com.keystone.enums.WorkOrderStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "work_orders",
    indexes = {
        @Index(name = "idx_work_order_status", columnList = "status"),
        @Index(name = "idx_work_order_customer", columnList = "customer_id"),
        @Index(name = "idx_work_order_technician", columnList = "technician_id"),
        @Index(name = "idx_work_order_scheduled_date", columnList = "scheduled_date")
    }
)
@Getter
@Setter
@NoArgsConstructor
public class WorkOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ============================================================
    // BASIC INFORMATION
    // ============================================================

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceType serviceType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WorkOrderStatus status;

    // ============================================================
    // SCHEDULING
    // ============================================================

    private LocalDate scheduledDate;

    private LocalDate completedDate;

    // ============================================================
    // SERVICE LOCATION
    // ============================================================

    @Column(length = 1000)
    private String address;

    // ============================================================
    // RELATIONSHIPS
    // ============================================================

    /*
     * Every work order must belong to a customer.
     */
    @ManyToOne
    @JoinColumn(
        name = "customer_id",
        nullable = false
    )
    private Customer customer;

    /*
     * Technician can be null initially because
     * Dispatcher may assign a technician later.
     */
    @ManyToOne
    @JoinColumn(
        name = "technician_id"
    )
    private User technician;

    // ============================================================
    // TIMESTAMPS
    // ============================================================

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime assignedAt;

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    // ============================================================
    // SLA
    // ============================================================

    @Column(nullable = false)
    private LocalDateTime slaDueDate;

    @Column(nullable = false)
    private boolean slaBreached = false;

    // ============================================================
    // PRE PERSIST
    // ============================================================

    @PrePersist
    protected void onCreate() {

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }

        if (slaDueDate == null) {
            slaDueDate = createdAt.plusHours(24);
        }

        slaBreached = false;
    }

    // ============================================================
    // PRE UPDATE
    // ============================================================

    @PreUpdate
    protected void onUpdate() {

        if (slaDueDate != null
                && !isCompleted()
                && LocalDateTime.now().isAfter(slaDueDate)) {

            slaBreached = true;
        }
    }

    // ============================================================
    // HELPER METHOD
    // ============================================================

    private boolean isCompleted() {

        return status == WorkOrderStatus.COMPLETED;
    }

	public boolean getSlaBreached() {
		// TODO Auto-generated method stub
		return false;
	}
}