package com.keystone.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keystone.dto.InventoryRequest;
import com.keystone.dto.InventoryResponse;
import com.keystone.entity.Inventory;
import com.keystone.exception.DuplicateResourceException;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.repository.InventoryRepository;
import com.keystone.service.InventoryService;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Override
    public InventoryResponse addInventory(InventoryRequest request) {

        if (inventoryRepository.existsByPartName(request.getPartName())) {
            throw new DuplicateResourceException("Part already exists");
        }

        Inventory inventory = new Inventory();

        inventory.setPartName(request.getPartName());
        inventory.setCategory(request.getCategory());
        inventory.setQuantity(request.getQuantity());
        inventory.setUnitPrice(request.getPrice());
        inventory.setSupplier(request.getSupplier());

        Inventory saved = inventoryRepository.save(inventory);

        return mapToResponse(saved);
    }

    @Override
    public List<InventoryResponse> getAllInventory() {

        return inventoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public InventoryResponse getInventoryById(Long inventoryId) {

        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Inventory not found"));

        return mapToResponse(inventory);
    }

    @Override
    public InventoryResponse updateInventory(Long inventoryId,
                                             InventoryRequest request) {

        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Inventory not found"));

        inventory.setPartName(request.getPartName());
        inventory.setCategory(request.getCategory());
        inventory.setQuantity(request.getQuantity());
        inventory.setUnitPrice(request.getPrice());
        inventory.setSupplier(request.getSupplier());

        Inventory updated = inventoryRepository.save(inventory);

        return mapToResponse(updated);
    }

    @Override
    public void deleteInventory(Long inventoryId) {

        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Inventory not found"));

        inventoryRepository.delete(inventory);
    }

    private InventoryResponse mapToResponse(Inventory inventory) {

        InventoryResponse response = new InventoryResponse();

        response.setInventoryId(inventory.getInventoryId());
        response.setPartName(inventory.getPartName());
        response.setCategory(inventory.getCategory());
        response.setQuantity(inventory.getQuantity());
        response.setUnitPrice(inventory.getUnitPrice());
        response.setSupplier(inventory.getSupplier());

        return response;
    }
}