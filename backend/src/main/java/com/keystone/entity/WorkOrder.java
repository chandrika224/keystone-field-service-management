package com.keystone.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.keystone.enums.Priority;
import com.keystone.enums.ServiceType;
import com.keystone.enums.WorkOrderStatus;

import jakarta.persistence.*;

@Entity
@Table(name = "work_orders")
public class WorkOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ============================================================
    // BASIC WORK ORDER INFORMATION
    // ============================================================

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
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

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "technician_id")
    private Technician technician;

    // ============================================================
    // TIMESTAMPS
    // ============================================================

    private LocalDateTime createdAt;

    private LocalDateTime assignedAt;

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    // ============================================================
    // SLA
    // ============================================================

    private LocalDateTime slaDueDate;

    private Boolean slaBreached = false;

    // ============================================================
    // PRE PERSIST
    // ============================================================

    @PrePersist
    public void prePersist() {

        this.createdAt = LocalDateTime.now();

        this.slaDueDate =
                this.createdAt.plusHours(24);

        this.slaBreached = false;
    }

    // ============================================================
    // CONSTRUCTOR
    // ============================================================

    public WorkOrder() {
    }

    // ============================================================
    // GETTERS / SETTERS
    // ============================================================

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Technician getTechnician() {
        return technician;
    }

    public void setTechnician(Technician technician) {
        this.technician = technician;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

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
}