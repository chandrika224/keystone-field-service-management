package com.keystone.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;

public class WorkOrderResponse {

    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private WorkOrderStatus status;
    private LocalDate scheduledDate;
    private LocalDate completedDate;
    private LocalDateTime slaDueDate;
    

    public LocalDateTime getSlaDueDate() {
		return slaDueDate;
	}

	public void setSlaDueDate(LocalDateTime slaDueDate) {
		this.slaDueDate = slaDueDate;
	}

	public Boolean getSlaBreached() {
		return slaBreached;
	}

	public void setSlaBreached(Boolean slaBreached) {
		this.slaBreached = slaBreached;
	}

	private Boolean slaBreached;

    private String customerName;
    private String technicianName;

    public WorkOrderResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public WorkOrderStatus getStatus() {
        return status;
    }

    public void setStatus(WorkOrderStatus status) {
        this.status = status;
    }

    public LocalDate getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(LocalDate scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public LocalDate getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(LocalDate completedDate) {
        this.completedDate = completedDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getTechnicianName() {
        return technicianName;
    }

    public void setTechnicianName(String technicianName) {
        this.technicianName = technicianName;
    }
}