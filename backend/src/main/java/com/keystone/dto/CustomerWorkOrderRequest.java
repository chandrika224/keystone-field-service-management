package com.keystone.dto;

import java.time.LocalDate;

import com.keystone.enums.Priority;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CustomerWorkOrderRequest {

    // =========================================================
    // BASIC INFORMATION
    // =========================================================

    @NotBlank(message = "Title is required")
    @Size(
        min = 3,
        max = 255,
        message = "Title must be between 3 and 255 characters"
    )
    private String title;


    @NotBlank(message = "Description is required")
    @Size(
        max = 1000,
        message = "Description must not exceed 1000 characters"
    )
    private String description;


    // =========================================================
    // SERVICE INFORMATION
    // =========================================================

    @NotBlank(message = "Service type is required")
    @Size(
        max = 255,
        message = "Service type must not exceed 255 characters"
    )
    private String serviceType;


    // =========================================================
    // PRIORITY
    // =========================================================

    @NotNull(message = "Priority is required")
    private Priority priority;


    // =========================================================
    // SCHEDULING
    // =========================================================

    @NotNull(message = "Scheduled date is required")
    @FutureOrPresent(
        message = "Scheduled date cannot be in the past"
    )
    private LocalDate scheduledDate;


    // =========================================================
    // SITE
    // Customer selects one of their registered sites
    // =========================================================

    @NotNull(message = "Site ID is required")
    @Positive(message = "Site ID must be positive")
    private Long siteId;
}
