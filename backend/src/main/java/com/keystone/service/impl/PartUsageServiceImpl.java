package com.keystone.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keystone.dto.PartUsageRequest;
import com.keystone.dto.PartUsageResponse;
import com.keystone.entity.Inventory;
import com.keystone.entity.PartUsage;
import com.keystone.entity.Technician;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;
import com.keystone.service.PartUsageService;
import com.keystone.service.impl.helper.PartUsageServiceHelper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PartUsageServiceImpl implements PartUsageService {

    private final PartUsageServiceHelper helper;


    // =========================================================
    // ADD PART USAGE
    // =========================================================

    @Override
    @Transactional
    public PartUsageResponse addPartUsage(
            String email,
            Long workOrderId,
            PartUsageRequest request) {

        log.info(
                "Adding part usage: email={}, workOrderId={}, inventoryId={}, quantity={}",
                email,
                workOrderId,
                request.getInventoryId(),
                request.getQuantityUsed()
        );

        // -----------------------------------------------------
        // 1. GET USER
        // -----------------------------------------------------

        User user = helper.getUserByEmail(email);

        // -----------------------------------------------------
        // 2. VALIDATE TECHNICIAN ROLE
        // -----------------------------------------------------

        helper.validateTechnicianRole(user);

        // -----------------------------------------------------
        // 3. GET TECHNICIAN
        // -----------------------------------------------------

        Technician technician =
                helper.getTechnicianByEmail(email);

        // -----------------------------------------------------
        // 4. GET WORK ORDER
        // -----------------------------------------------------

        WorkOrder workOrder =
                helper.getWorkOrderById(workOrderId);

        // -----------------------------------------------------
        // 5. VALIDATE TECHNICIAN ASSIGNMENT
        // -----------------------------------------------------

        helper.validateTechnicianAssignment(
                workOrder,
                technician
        );

        // -----------------------------------------------------
        // 6. VALIDATE WORK ORDER STATUS
        // -----------------------------------------------------

        helper.validateWorkOrderAllowsPartUsage(
                workOrder
        );

        // -----------------------------------------------------
        // 7. GET INVENTORY
        // -----------------------------------------------------

        Inventory inventory =
                helper.getInventoryById(
                        request.getInventoryId()
                );

        // -----------------------------------------------------
        // 8. VALIDATE INVENTORY STOCK
        // -----------------------------------------------------

        helper.validateInventoryStock(
                inventory,
                request.getQuantityUsed()
        );

        // -----------------------------------------------------
        // 9. DEDUCT INVENTORY
        // -----------------------------------------------------

        int remainingQuantity =
                inventory.getQuantity()
                        - request.getQuantityUsed();

        inventory.setQuantity(remainingQuantity);

        log.info(
                "Inventory stock updated: inventoryId={}, remainingQuantity={}",
                inventory.getInventoryId(),
                remainingQuantity
        );

        // -----------------------------------------------------
        // 10. CREATE PART USAGE
        // -----------------------------------------------------

        PartUsage partUsage = new PartUsage();

        partUsage.setWorkOrder(workOrder);
        partUsage.setInventory(inventory);
        partUsage.setQuantityUsed(
                request.getQuantityUsed()
        );

        // -----------------------------------------------------
        // 11. SAVE PART USAGE
        // -----------------------------------------------------

        PartUsage savedPartUsage =
                helper.savePartUsage(partUsage);

        log.info(
                "Part usage created successfully: partUsageId={}, workOrderId={}, inventoryId={}",
                savedPartUsage.getId(),
                workOrderId,
                inventory.getInventoryId()
        );

        return mapToResponse(savedPartUsage);
    }


    // =========================================================
    // GET PART USAGE FOR WORK ORDER
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<PartUsageResponse> getPartUsage(
            String email,
            Long workOrderId) {

        log.info(
                "Fetching part usage: email={}, workOrderId={}",
                email,
                workOrderId
        );

        Technician technician =
                helper.getTechnicianByEmail(email);

        WorkOrder workOrder =
                helper.getWorkOrderById(workOrderId);

        helper.validateTechnicianAssignment(
                workOrder,
                technician
        );

        return helper
                .getPartUsageByWorkOrder(workOrderId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET MY PART USAGE
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<PartUsageResponse> getMyPartUsage(
            String email) {

        log.info(
                "Fetching technician part usage: email={}",
                email
        );

        Technician technician =
                helper.getTechnicianByEmail(email);

        return helper
                .getPartUsageByTechnician(technician.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // =========================================================
    // GET PART USAGE BY ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public PartUsageResponse getPartUsageById(
            String email,
            Long partUsageId) {

        log.info(
                "Fetching part usage: email={}, partUsageId={}",
                email,
                partUsageId
        );

        Technician technician =
                helper.getTechnicianByEmail(email);

        PartUsage partUsage =
                helper.getPartUsageById(partUsageId);

        helper.validatePartUsageOwnership(
                partUsage,
                technician
        );

        return mapToResponse(partUsage);
    }


    // =========================================================
    // DELETE PART USAGE
    // =========================================================

    @Override
    @Transactional
    public void deletePartUsage(
            String email,
            Long partUsageId) {

        log.info(
                "Deleting part usage: email={}, partUsageId={}",
                email,
                partUsageId
        );

        Technician technician =
                helper.getTechnicianByEmail(email);

        PartUsage partUsage =
                helper.getPartUsageById(partUsageId);

        helper.validatePartUsageOwnership(
                partUsage,
                technician
        );

        Inventory inventory =
                partUsage.getInventory();

        // -----------------------------------------------------
        // RESTORE INVENTORY
        // -----------------------------------------------------

        int restoredQuantity =
                inventory.getQuantity()
                        + partUsage.getQuantityUsed();

        inventory.setQuantity(restoredQuantity);

        log.info(
                "Inventory restored: inventoryId={}, restoredQuantity={}",
                inventory.getInventoryId(),
                restoredQuantity
        );

        // -----------------------------------------------------
        // DELETE PART USAGE
        // -----------------------------------------------------

        helper.deletePartUsage(partUsage);

        log.info(
                "Part usage deleted successfully: partUsageId={}",
                partUsageId
        );
    }


    // =========================================================
    // MAP ENTITY TO RESPONSE
    // =========================================================

    private PartUsageResponse mapToResponse(
            PartUsage partUsage) {

        PartUsageResponse response =
                new PartUsageResponse();

        response.setId(partUsage.getId());

        response.setWorkOrderId(
                partUsage.getWorkOrder().getId()
        );

        response.setInventoryId(
                partUsage.getInventory().getInventoryId()
        );

        response.setPartName(
                partUsage.getInventory().getPartName()
        );

        response.setQuantityUsed(
                partUsage.getQuantityUsed()
        );

        return response;
    }
}