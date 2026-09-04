package com.keystone.dto;

import lombok.Data;

@Data
public class InventoryResponse {

    private Long inventoryId;

    private String partName;

    private String category;

    private Integer quantity;

    private Double unitPrice;

    private String supplier;
}