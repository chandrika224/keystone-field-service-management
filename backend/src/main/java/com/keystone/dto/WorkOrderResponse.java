package com.keystone.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.keystone.enums.Priority;
import com.keystone.enums.ServiceType;
import com.keystone.enums.WorkOrderStatus;

public class WorkOrderResponse {

    private Long id;

    private String title;

    private String description;

    private ServiceType serviceType;

    private Priority priority;

    private WorkOrderStatus status;

    private LocalDate scheduledDate;

    private LocalDate completedDate;

    private LocalDateTime slaDueDate;

    private Boolean slaBreached;

    private String address;

    private String customerName;

    private String technicianName;

    public WorkOrderResponse() {
    }

    // ============================================================
    // ID
    // ============================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // ============================================================
    // BASIC INFORMATION
    // ============================================================

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

    // ============================================================
    // SERVICE TYPE
    // ============================================================

    public ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    // ============================================================
    // PRIORITY
    // ============================================================

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    // ============================================================
    // STATUS
    // ============================================================

    public WorkOrderStatus getStatus() {
        return status;
    }

    public void setStatus(WorkOrderStatus status) {
        this.status = status;
    }

    // ============================================================
    // SCHEDULING
    // ============================================================

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

    // ============================================================
    // SLA
    // ============================================================

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

    // ============================================================
    // ADDRESS
    // ============================================================

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // ============================================================
    // CUSTOMER
    // ============================================================

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    // ============================================================
    // TECHNICIAN
    // ============================================================

    public String getTechnicianName() {
        return technicianName;
    }

    public void setTechnicianName(String technicianName) {
        this.technicianName = technicianName;
    }
}