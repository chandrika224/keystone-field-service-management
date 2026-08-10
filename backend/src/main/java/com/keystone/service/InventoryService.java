package com.keystone.service;

import java.util.List;

import com.keystone.dto.InventoryRequest;
import com.keystone.dto.InventoryResponse;

public interface InventoryService {

    InventoryResponse addInventory(InventoryRequest request);

    List<InventoryResponse> getAllInventory();

    InventoryResponse getInventoryById(Long inventoryId);

    InventoryResponse updateInventory(Long inventoryId, InventoryRequest request);

    void deleteInventory(Long inventoryId);
}