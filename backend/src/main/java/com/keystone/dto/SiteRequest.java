package com.keystone.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SiteRequest {

    @NotBlank(message = "Site name is required")
    private String name;

    @NotBlank(message = "Site address is required")
    private String address;

    @NotNull(message = "Customer ID is required")
    private Long customerId;
}