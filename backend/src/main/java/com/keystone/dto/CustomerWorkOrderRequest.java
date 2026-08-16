package com.keystone.dto;

import java.time.LocalDate;

import com.keystone.enums.Priority;
import com.keystone.enums.ServiceType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CustomerWorkOrderRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Service type is required")
    private ServiceType serviceType;

    @NotNull(message = "Priority is required")
    private Priority priority;

    @NotNull(message = "Scheduled date is required")
    private LocalDate scheduledDate;

    @NotBlank(message = "Address is required")
    private String address;

    public CustomerWorkOrderRequest() {
    }

    // ============================================================
    // GETTERS / SETTERS
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

    public ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public LocalDate getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(LocalDate scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}