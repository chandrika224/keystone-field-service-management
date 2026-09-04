package com.keystone.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.InventoryRequest;
import com.keystone.dto.InventoryResponse;
import com.keystone.service.InventoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@Tag(name = "Inventory", description = "Inventory Management APIs")
public class InventoryController {

    private final InventoryService inventoryService;

    @Operation(summary = "Add Inventory Item")
    @PostMapping
    public ResponseEntity<InventoryResponse> createInventory(
            @Valid @RequestBody InventoryRequest request) {

        log.info("Received request to create inventory item: partName={}", request.getPartName());

        InventoryResponse response = inventoryService.createInventory(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @Operation(summary = "Get All Inventory Items")
    @GetMapping
    public ResponseEntity<List<InventoryResponse>> getAllInventory() {

        log.info("Received request to fetch all inventory items");

        List<InventoryResponse> items = inventoryService.getAllInventory();

        return ResponseEntity.ok(items);
    }

    @Operation(summary = "Get Inventory Item By ID")
    @GetMapping("/{id}")
    public ResponseEntity<InventoryResponse> getInventoryById(@PathVariable Long id) {

        log.info("Received request to fetch inventory itemId={}", id);

        InventoryResponse response = inventoryService.getInventoryById(id);

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Update Inventory Item")
    @PutMapping("/{id}")
    public ResponseEntity<InventoryResponse> updateInventory(
            @PathVariable Long id,
            @Valid @RequestBody InventoryRequest request) {

        log.info("Received request to update inventory itemId={}", id);

        InventoryResponse response = inventoryService.updateInventory(id, request);

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Delete Inventory Item")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Long id) {

        log.info("Received request to delete inventory itemId={}", id);

        inventoryService.deleteInventory(id);

        return ResponseEntity.noContent().build();
    }
}