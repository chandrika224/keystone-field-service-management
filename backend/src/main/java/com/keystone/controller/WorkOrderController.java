package com.keystone.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.AssignTechnicianRequest;
import com.keystone.dto.ChangeStatusRequest;
import com.keystone.dto.CustomerWorkOrderRequest;
import com.keystone.dto.PartUsageRequest;
import com.keystone.dto.PartUsageResponse;
import com.keystone.dto.TimeLogRequest;
import com.keystone.dto.TimeLogResponse;
import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;
import com.keystone.dto.WorkOrderStatusHistoryResponse;
import com.keystone.enums.Priority;
import com.keystone.enums.WorkOrderStatus;
import com.keystone.service.WorkOrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/workorders")
@Tag(
    name = "Work Order",
    description = "Work Order Management APIs"
)
@Slf4j
public class WorkOrderController {

    @Autowired
    private WorkOrderService workOrderService;


    // ============================================================
    // CREATE WORK ORDER
    // ============================================================

    @Operation(summary = "Create Work Order")
    @PostMapping
    public WorkOrderResponse createWorkOrder(
            @Valid @RequestBody WorkOrderRequest request) {

        return workOrderService.createWorkOrder(request);
    }


    // ============================================================
    // GET ALL WORK ORDERS
    // ============================================================

    @Operation(summary = "Get All Work Orders")
    @GetMapping
    public List<WorkOrderResponse> getAllWorkOrders() {
    	
    	log.info("request is processing");
        return workOrderService.getAllWorkOrders();
    }


    // ============================================================
    // GET WORK ORDER BY ID
    // ============================================================

    @Operation(summary = "Get Work Order By ID")
    @GetMapping("/{id}")
    public WorkOrderResponse getWorkOrderById(
            @PathVariable Long id) {

        return workOrderService.getWorkOrderById(id);
    }


    // ============================================================
    // UPDATE WORK ORDER
    // ============================================================

    @Operation(summary = "Update Work Order")
    @PutMapping("/{id}")
    public WorkOrderResponse updateWorkOrder(
            @PathVariable Long id,
            @Valid @RequestBody WorkOrderRequest request) {

        return workOrderService.updateWorkOrder(
                id,
                request
        );
    }


    // ============================================================
    // CHANGE STATUS
    // ============================================================

    @PatchMapping("/{id}/status")
    public ResponseEntity<WorkOrderResponse> changeStatus(
            @PathVariable Long id,
            @Valid @RequestBody ChangeStatusRequest request) {

        return ResponseEntity.ok(
                workOrderService.changeStatus(
                        id,
                        request
                )
        );
    }


    // ============================================================
    // DELETE WORK ORDER
    // ============================================================

    @Operation(summary = "Delete Work Order")
    @DeleteMapping("/{id}")
    public String deleteWorkOrder(
            @PathVariable Long id) {

        workOrderService.deleteWorkOrder(id);

        return "Work Order deleted successfully";
    }


    // ============================================================
    // GET WORK ORDERS BY STATUS
    // ============================================================

    @Operation(summary = "Get Work Orders By Status")
    @GetMapping("/status")
    public List<WorkOrderResponse> getWorkOrdersByStatus(
            @RequestParam WorkOrderStatus status) {

        return workOrderService.getWorkOrdersByStatus(
                status
        );
    }


    // ============================================================
    // GET STATUS HISTORY
    // ============================================================

    @GetMapping("/{id}/history")
    public ResponseEntity<
            List<WorkOrderStatusHistoryResponse>>
    getStatusHistory(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                workOrderService.getStatusHistory(id)
        );
    }


    // ============================================================
    // GET WORK ORDERS BY PRIORITY
    // ============================================================

    @Operation(summary = "Get Work Orders By Priority")
    @GetMapping("/priority")
    public List<WorkOrderResponse> getWorkOrdersByPriority(
            @RequestParam Priority priority) {

        return workOrderService.getWorkOrdersByPriority(
                priority
        );
    }


    // ============================================================
    // GET WORK ORDERS BY CUSTOMER
    // Existing API
    // ============================================================

    @Operation(summary = "Get Work Orders By Customer")
    @GetMapping("/customer/{customerId}")
    public List<WorkOrderResponse> getByCustomer(
            @PathVariable Long customerId) {

        return workOrderService.getByCustomer(
                customerId
        );
    }


    // ============================================================
    // ADD TIME LOG
    // ============================================================

    @PostMapping("/{id}/time")
    public ResponseEntity<TimeLogResponse> addTimeLog(
            @PathVariable Long id,
            @Valid @RequestBody TimeLogRequest request) {

        return ResponseEntity.ok(
                workOrderService.addTimeLog(
                        id,
                        request
                )
        );
    }


    // ============================================================
    // ADD PART USAGE
    // ============================================================

    @PostMapping("/{id}/parts")
    public ResponseEntity<PartUsageResponse> addPartUsage(
            @PathVariable Long id,
            @Valid @RequestBody PartUsageRequest request) {

        return ResponseEntity.ok(
                workOrderService.addPartUsage(
                        id,
                        request
                )
        );
    }


    // ============================================================
    // GET PART USAGE
    // ============================================================

    @GetMapping("/{id}/parts")
    public ResponseEntity<
            List<PartUsageResponse>>
    getPartUsage(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                workOrderService.getPartUsage(id)
        );
    }


    // ============================================================
    // GET TIME LOGS
    // ============================================================

    @GetMapping("/{id}/time")
    public ResponseEntity<
            List<TimeLogResponse>>
    getTimeLogs(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                workOrderService.getTimeLogs(id)
        );
    }


    // ============================================================
    // GET WORK ORDERS BY TECHNICIAN
    // ============================================================

    @Operation(summary = "Get Work Orders By Technician")
    @GetMapping("/technician/{technicianId}")
    public List<WorkOrderResponse> getByTechnician(
            @PathVariable Long technicianId) {

        return workOrderService.getByTechnician(
                technicianId
        );
    }

	 // ============================================================
	 // ASSIGN TECHNICIAN
	 // ============================================================
	
	 @Operation(summary = "Assign Technician to Work Order")
	 @PatchMapping("/{id}/assign")
	 public ResponseEntity<WorkOrderResponse> assignTechnician(
	         @PathVariable Long id,
	         @Valid @RequestBody AssignTechnicianRequest request) {
	
	     return ResponseEntity.ok(
	             workOrderService.assignTechnician(id, request)
	     );
	 }
    
    
    // ============================================================
    // CUSTOMER - CREATE MY WORK ORDER
    // ============================================================

    @Operation(
        summary = "Create Work Order for Current Customer"
    )
    @PostMapping("/my")
    public ResponseEntity<WorkOrderResponse>
    createMyWorkOrder(
            @Valid
            @RequestBody CustomerWorkOrderRequest request,
            Authentication authentication) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(
                workOrderService.createCustomerWorkOrder(
                        email,
                        request
                )
        );
    }


    // ============================================================
    // CUSTOMER - GET MY WORK ORDERS
    // ============================================================

    @Operation(
        summary = "Get Current Customer Work Orders"
    )
    @GetMapping("/my")
    public ResponseEntity<
            List<WorkOrderResponse>>
    getMyWorkOrders(
            Authentication authentication) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(
                workOrderService.getMyWorkOrders(
                        email
                )
        );
    }
 // ============================================================
 // CUSTOMER - UPDATE MY WORK ORDER
 // ============================================================

 @Operation(
     summary = "Update Current Customer Work Order"
 )
 @PutMapping("/my/{id}")
 public ResponseEntity<WorkOrderResponse> updateMyWorkOrder(
         @PathVariable Long id,
         @Valid @RequestBody CustomerWorkOrderRequest request,
         Authentication authentication) {

     String email = authentication.getName();

     return ResponseEntity.ok(
             workOrderService.updateMyWorkOrder(
                     email,
                     id,
                     request
             )
     );
 }
 
//============================================================
// CUSTOMER - CANCEL MY WORK ORDER
// ============================================================
 
 
 @PatchMapping("/my/{id}/cancel")
 public ResponseEntity<WorkOrderResponse> cancelMyWorkOrder(
         @PathVariable Long id,
         Authentication authentication) {

     String email = authentication.getName();

     return ResponseEntity.ok(
             workOrderService.cancelMyWorkOrder(
                     email,
                     id
             )
     );
 }
 

 
}