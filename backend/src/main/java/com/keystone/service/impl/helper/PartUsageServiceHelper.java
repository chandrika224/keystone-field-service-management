package com.keystone.service.impl.helper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.keystone.entity.Inventory;
import com.keystone.entity.PartUsage;
import com.keystone.entity.Technician;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;
import com.keystone.enums.ErrorCode;
import com.keystone.enums.Role;
import com.keystone.enums.WorkOrderStatus;
import com.keystone.exception.KeystoneException;
import com.keystone.repository.InventoryRepository;
import com.keystone.repository.PartUsageRepository;
import com.keystone.repository.TechnicianRepository;
import com.keystone.repository.UserRepository;
import com.keystone.repository.WorkOrderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class PartUsageServiceHelper {

    private final UserRepository userRepository;
    private final TechnicianRepository technicianRepository;
    private final WorkOrderRepository workOrderRepository;
    private final InventoryRepository inventoryRepository;
    private final PartUsageRepository partUsageRepository;


    // =========================================================
    // GET USER BY EMAIL
    // =========================================================

    public User getUserByEmail(String email) {

        log.debug("Fetching user by email={}", email);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> {

                    log.warn(
                            "User not found for email={}",
                            email
                    );

                    return new KeystoneException(
                            ErrorCode.USER_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // VALIDATE TECHNICIAN ROLE
    // =========================================================

    public void validateTechnicianRole(User user) {

        if (user == null
                || user.getRole() != Role.TECHNICIAN) {

            log.warn(
                    "User is not a technician: userId={}, role={}",
                    user != null ? user.getId() : null,
                    user != null ? user.getRole() : null
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_ACCESS_DENIED
            );
        }
    }


    // =========================================================
    // GET TECHNICIAN BY USER EMAIL
    // =========================================================

    public Technician getTechnicianByEmail(String email) {

        User user = getUserByEmail(email);

        log.debug(
                "Fetching technician profile for userId={}",
                user.getId()
        );

        return technicianRepository
                .findByUser_Id(user.getId())
                .orElseThrow(() -> {

                    log.warn(
                            "Technician profile not found for userId={}",
                            user.getId()
                    );

                    return new KeystoneException(
                            ErrorCode.TECHNICIAN_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // GET WORK ORDER BY ID
    // =========================================================

    public WorkOrder getWorkOrderById(Long workOrderId) {

        log.debug(
                "Fetching work order: workOrderId={}",
                workOrderId
        );

        return workOrderRepository
                .findById(workOrderId)
                .orElseThrow(() -> {

                    log.warn(
                            "Work order not found: workOrderId={}",
                            workOrderId
                    );

                    return new KeystoneException(
                            ErrorCode.WORK_ORDER_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // GET INVENTORY BY ID
    // =========================================================

    public Inventory getInventoryById(Long inventoryId) {

        log.debug(
                "Fetching inventory item: inventoryId={}",
                inventoryId
        );

        return inventoryRepository
                .findById(inventoryId)
                .orElseThrow(() -> {

                    log.warn(
                            "Inventory item not found: inventoryId={}",
                            inventoryId
                    );

                    return new KeystoneException(
                            ErrorCode.INVENTORY_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // VALIDATE TECHNICIAN ASSIGNMENT
    // =========================================================

    public void validateTechnicianAssignment(
            WorkOrder workOrder,
            Technician technician) {

        if (workOrder == null
                || technician == null
                || workOrder.getTechnician() == null) {

            log.warn(
                    "Technician is not assigned to work order"
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_NOT_ASSIGNED
            );
        }

        if (!workOrder.getTechnician()
                .getId()
                .equals(technician.getId())) {

            log.warn(
                    "Technician {} is not assigned to workOrderId={}",
                    technician.getId(),
                    workOrder.getId()
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_NOT_ASSIGNED
            );
        }
    }


    // =========================================================
    // VALIDATE WORK ORDER STATUS
    // =========================================================

    public void validateWorkOrderAllowsPartUsage(
            WorkOrder workOrder) {

        if (workOrder == null
                || workOrder.getStatus() == null) {

            log.warn(
                    "Invalid work order status for part usage"
            );

            throw new KeystoneException(
                    ErrorCode.PART_USAGE_NOT_ALLOWED
            );
        }

        WorkOrderStatus status =
                workOrder.getStatus();

        if (status == WorkOrderStatus.COMPLETED
                || status == WorkOrderStatus.CLOSED
                || status == WorkOrderStatus.CANCELLED) {

            log.warn(
                    "Part usage not allowed: workOrderId={}, status={}",
                    workOrder.getId(),
                    status
            );

            throw new KeystoneException(
                    ErrorCode.PART_USAGE_NOT_ALLOWED
            );
        }
    }


    // =========================================================
    // VALIDATE INVENTORY STOCK
    // =========================================================

    public void validateInventoryStock(
            Inventory inventory,
            Integer quantityUsed) {

        if (inventory == null
                || inventory.getQuantity() == null
                || quantityUsed == null
                || quantityUsed <= 0) {

            log.warn(
                    "Invalid inventory quantity: inventoryId={}, available={}, requested={}",
                    inventory != null
                            ? inventory.getInventoryId()
                            : null,
                    inventory != null
                            ? inventory.getQuantity()
                            : null,
                    quantityUsed
            );

            throw new KeystoneException(
                    ErrorCode.INSUFFICIENT_INVENTORY
            );
        }

        if (inventory.getQuantity() < quantityUsed) {

            log.warn(
                    "Insufficient inventory: inventoryId={}, available={}, requested={}",
                    inventory.getInventoryId(),
                    inventory.getQuantity(),
                    quantityUsed
            );

            throw new KeystoneException(
                    ErrorCode.INSUFFICIENT_INVENTORY
            );
        }
    }


    // =========================================================
    // GET PART USAGE BY ID
    // =========================================================

    public PartUsage getPartUsageById(
            Long partUsageId) {

        log.debug(
                "Fetching part usage: partUsageId={}",
                partUsageId
        );

        return partUsageRepository
                .findById(partUsageId)
                .orElseThrow(() -> {

                    log.warn(
                            "Part usage not found: partUsageId={}",
                            partUsageId
                    );

                    return new KeystoneException(
                            ErrorCode.PART_USAGE_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // GET PART USAGE BY WORK ORDER
    // =========================================================

    public List<PartUsage> getPartUsageByWorkOrder(
            Long workOrderId) {

        log.debug(
                "Fetching part usage for workOrderId={}",
                workOrderId
        );

        return partUsageRepository
                .findByWorkOrder_IdOrderByIdDesc(
                        workOrderId
                );
    }


    // =========================================================
    // GET PART USAGE BY TECHNICIAN
    // =========================================================

    public List<PartUsage> getPartUsageByTechnician(
            Long technicianId) {

        log.debug(
                "Fetching part usage for technicianId={}",
                technicianId
        );

        return partUsageRepository
                .findByWorkOrder_Technician_IdOrderByIdDesc(
                        technicianId
                );
    }


    // =========================================================
    // VALIDATE PART USAGE OWNERSHIP
    // =========================================================

    public void validatePartUsageOwnership(
            PartUsage partUsage,
            Technician technician) {

        if (partUsage == null
                || technician == null
                || partUsage.getWorkOrder() == null
                || partUsage.getWorkOrder()
                        .getTechnician() == null) {

            log.warn(
                    "Invalid part usage ownership validation"
            );

            throw new KeystoneException(
                    ErrorCode.PART_USAGE_ACCESS_DENIED
            );
        }

        Long assignedTechnicianId =
                partUsage.getWorkOrder()
                        .getTechnician()
                        .getId();

        if (!assignedTechnicianId
                .equals(technician.getId())) {

            log.warn(
                    "Technician {} attempted to access partUsageId={}",
                    technician.getId(),
                    partUsage.getId()
            );

            throw new KeystoneException(
                    ErrorCode.PART_USAGE_ACCESS_DENIED
            );
        }
    }


    // =========================================================
    // SAVE PART USAGE
    // =========================================================

    public PartUsage savePartUsage(
            PartUsage partUsage) {

        log.debug(
                "Saving part usage for workOrderId={}",
                partUsage.getWorkOrder().getId()
        );

        return partUsageRepository.save(
                partUsage
        );
    }


    // =========================================================
    // DELETE PART USAGE
    // =========================================================

    public void deletePartUsage(
            PartUsage partUsage) {

        log.debug(
                "Deleting part usage: partUsageId={}",
                partUsage.getId()
        );

        partUsageRepository.delete(
                partUsage
        );
    }
}

