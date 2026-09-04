package com.keystone.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PartUsageResponse {

    private Long id;

    private Long workOrderId;

    private Long inventoryId;

    private String partName;

    private Integer quantityUsed;
}