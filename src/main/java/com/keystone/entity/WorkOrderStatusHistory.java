package com.keystone.entity;

import java.time.LocalDateTime;

import com.keystone.enums.WorkOrderStatus;

import jakarta.persistence.*;

@Entity
@Table(name = "work_order_status_history")
public class WorkOrderStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "work_order_id")
    private WorkOrder workOrder;

    @Enumerated(EnumType.STRING)
    private WorkOrderStatus fromStatus;

    @Enumerated(EnumType.STRING)
    private WorkOrderStatus toStatus;

    private String changedBy;

    private LocalDateTime changedAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public WorkOrder getWorkOrder() {
		return workOrder;
	}

	public void setWorkOrder(WorkOrder workOrder) {
		this.workOrder = workOrder;
	}

	public WorkOrderStatus getFromStatus() {
		return fromStatus;
	}

	public void setFromStatus(WorkOrderStatus fromStatus) {
		this.fromStatus = fromStatus;
	}

	public WorkOrderStatus getToStatus() {
		return toStatus;
	}

	public void setToStatus(WorkOrderStatus toStatus) {
		this.toStatus = toStatus;
	}

	public String getChangedBy() {
		return changedBy;
	}

	public void setChangedBy(String changedBy) {
		this.changedBy = changedBy;
	}

	public LocalDateTime getChangedAt() {
		return changedAt;
	}

	public void setChangedAt(LocalDateTime changedAt) {
		this.changedAt = changedAt;
	}

    
}