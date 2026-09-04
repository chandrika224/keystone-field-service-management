package com.keystone.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.keystone.dto.InventoryRequest;
import com.keystone.dto.InventoryResponse;
import com.keystone.entity.Inventory;
import com.keystone.enums.ErrorCode;
import com.keystone.exception.KeystoneException;
import com.keystone.repository.InventoryRepository;
import com.keystone.service.InventoryService;



@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

	@Override
	public InventoryResponse createInventory(InventoryRequest request) {
		// -----------------------------------------------------
        // BUSINESS VALIDATION
        // -----------------------------------------------------

		if (inventoryRepository
		        .existsByPartNameIgnoreCase(request.getPartName())) {
            throw new KeystoneException(
                    ErrorCode.DUPLICATE_INVENTORY_PART
            );
        }
        
        // -----------------------------------------------------
        // CREATE ENTITY
        // -----------------------------------------------------

        Inventory inventory = new Inventory();

        inventory.setPartName(
                request.getPartName()
        );

        inventory.setCategory(
                request.getCategory()
        );

        inventory.setQuantity(
                request.getQuantity()
        );

        inventory.setUnitPrice(
                request.getUnitPrice()
        );

        inventory.setSupplier(
                request.getSupplier()
        );
     // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        Inventory savedInventory =
                inventoryRepository.save(inventory);


        // -----------------------------------------------------
        // RESPONSE
        // -----------------------------------------------------

        return mapToResponse(savedInventory);
	}
	

	 // =========================================================
    // GET ALL INVENTORY
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<InventoryResponse> getAllInventory() {

        return inventoryRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    
    
    // =========================================================
    // GET INVENTORY BY ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public InventoryResponse getInventoryById(
            Long inventoryId) {

        Inventory inventory =
                inventoryRepository
                        .findById(inventoryId)
                        .orElseThrow(() ->
                                new KeystoneException(
                                        ErrorCode.INVENTORY_NOT_FOUND
                                )
                        );

        return mapToResponse(inventory);
    }

	@Override
	public InventoryResponse updateInventory(Long inventoryId, InventoryRequest request) {
		// -----------------------------------------------------
        // FIND EXISTING INVENTORY
        // -----------------------------------------------------

        Inventory inventory =
                inventoryRepository
                        .findById(inventoryId)
                        .orElseThrow(() ->
                                new KeystoneException(
                                        ErrorCode.INVENTORY_NOT_FOUND
                                )
                        );
        
     // -----------------------------------------------------
        // CHECK DUPLICATE PART NAME
        // -----------------------------------------------------

        inventoryRepository
                .findByPartNameIgnoreCase(request.getPartName())
                .ifPresent(existingInventory -> {

                    if (!existingInventory
                            .getInventoryId()
                            .equals(inventoryId)) {

                        throw new KeystoneException(
                                ErrorCode.DUPLICATE_INVENTORY_PART
                        );
                    }
                });
        
        // -----------------------------------------------------
        // UPDATE ENTITY
        // -----------------------------------------------------

        inventory.setPartName(
                request.getPartName()
        );

        inventory.setCategory(
                request.getCategory()
        );

        inventory.setQuantity(
                request.getQuantity()
        );

        inventory.setUnitPrice(
                request.getUnitPrice()
        );

        inventory.setSupplier(
                request.getSupplier()
        );
        
     // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        Inventory updatedInventory =
                inventoryRepository.save(inventory);


        return mapToResponse(updatedInventory);
	}

	// =========================================================
    // DELETE INVENTORY
    // =========================================================

    @Override
    public void deleteInventory(
            Long inventoryId) {

        Inventory inventory =
                inventoryRepository
                        .findById(inventoryId)
                        .orElseThrow(() ->
                                new KeystoneException(
                                        ErrorCode.INVENTORY_NOT_FOUND
                                )
                        );

        inventoryRepository.delete(inventory);
    }
    // =========================================================
    // ENTITY → RESPONSE
    // =========================================================

    private InventoryResponse mapToResponse(
            Inventory inventory) {

        InventoryResponse response =
                new InventoryResponse();

        response.setInventoryId(
                inventory.getInventoryId()
        );

        response.setPartName(
                inventory.getPartName()
        );

        response.setCategory(
                inventory.getCategory()
        );

        response.setQuantity(
                inventory.getQuantity()
        );

        response.setUnitPrice(
                inventory.getUnitPrice()
        );

        response.setSupplier(
                inventory.getSupplier()
        );

        return response;
    }

	
   
}