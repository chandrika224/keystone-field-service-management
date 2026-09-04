package com.keystone.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TimeLogRequest {

    // =========================================================
    // WORK TIME
    // =========================================================

    @NotNull(message = "Minutes worked is required")
    @Min(value = 1, message = "Minutes worked must be at least 1 minute")
    private Integer minutesWorked;


    // =========================================================
    // NOTES
    // =========================================================

    @Size(
        max = 1000,
        message = "Notes must not exceed 1000 characters"
    )
    private String notes;
}