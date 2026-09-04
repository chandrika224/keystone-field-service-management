package com.keystone.dto;

import java.time.LocalDate;

import com.keystone.enums.Priority;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CustomerWorkOrderUpdateRequest {
	
	@NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private Priority priority;

    @NotNull
    private LocalDate scheduledDate;

}
