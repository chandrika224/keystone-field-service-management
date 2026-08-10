package com.keystone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.InventoryRequest;
import com.keystone.dto.InventoryResponse;
import com.keystone.service.InventoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/inventory")
@Tag(name = "Inventory", description = "Inventory Management APIs")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @Operation(summary = "Add Inventory Item")
    @PostMapping
    public InventoryResponse addInventory(@Valid @RequestBody InventoryRequest request) {
        return inventoryService.addInventory(request);
    }

    @Operation(summary = "Get All Inventory Items")
    @GetMapping
    public List<InventoryResponse> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @Operation(summary = "Get Inventory Item By ID")
    @GetMapping("/{id}")
    public InventoryResponse getInventoryById(@PathVariable Long id) {
        return inventoryService.getInventoryById(id);
    }

    @Operation(summary = "Update Inventory Item")
    @PutMapping("/{id}")
    public InventoryResponse updateInventory(@PathVariable Long id,
                                             @Valid @RequestBody InventoryRequest request) {
        return inventoryService.updateInventory(id, request);
    }

    @Operation(summary = "Delete Inventory Item")
    @DeleteMapping("/{id}")
    public String deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
        return "Inventory deleted successfully";
    }
}