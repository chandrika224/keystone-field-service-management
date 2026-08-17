package com.keystone.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AssignTechnicianRequest {

    @NotNull(message = "Technician ID is required")
    private Long technicianId;

    private String remarks;
}