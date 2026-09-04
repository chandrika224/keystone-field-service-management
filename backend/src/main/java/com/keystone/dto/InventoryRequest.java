package com.keystone.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InventoryRequest {

    @NotBlank(message = "Part name is required")
    private String partName;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Quantity is required")
    @Min(
        value = 0,
        message = "Quantity cannot be negative"
    )
    private Integer quantity;

    @NotNull(message = "Unit price is required")
    @DecimalMin(
        value = "0.0",
        inclusive = true,
        message = "Unit price cannot be negative"
    )
    private Double unitPrice;

    @NotBlank(message = "Supplier is required")
    private String supplier;
}