
package com.keystone.dto;

import java.time.LocalDate;

import com.keystone.enums.Priority;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WorkOrderRequest {

    // =========================================================
    // BASIC INFORMATION
    // =========================================================

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;


    // =========================================================
    // PRIORITY
    // =========================================================

    @NotNull(message = "Priority is required")
    private Priority priority;


    // =========================================================
    // SCHEDULING
    // =========================================================

    @NotNull(message = "Scheduled date is required")
    @FutureOrPresent(message = "Scheduled date cannot be in the past")
    private LocalDate scheduledDate;


    // =========================================================
    // CUSTOMER
    // =========================================================

    @NotNull(message = "Customer ID is required")
    @Positive(message = "Customer ID must be positive")
    private Long customerId;


    // =========================================================
    // SITE
    // =========================================================

    @NotNull(message = "Site ID is required")
    @Positive(message = "Site ID must be positive")
    private Long siteId;


    // =========================================================
    // TECHNICIAN
    // =========================================================

    @NotNull(message = "Technician ID is required")
    @Positive(message = "Technician ID must be positive")
    private Long technicianId;


    // =========================================================
    // SERVICE INFORMATION
    // =========================================================

    @NotBlank(message = "Service type is required")
    private String serviceType;

    @NotBlank(message = "Address is required")
    private String address;
}
