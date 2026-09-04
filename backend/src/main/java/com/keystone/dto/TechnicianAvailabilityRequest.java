package com.keystone.dto;

import jakarta.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TechnicianAvailabilityRequest {

    // =========================================================
    // TECHNICIAN AVAILABILITY
    // =========================================================

    @NotNull(message = "Availability is required")
    private Boolean available;
}