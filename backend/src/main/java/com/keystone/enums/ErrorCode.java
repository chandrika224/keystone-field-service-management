
package com.keystone.enums;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {

    // =========================================================
    // USER ERRORS
    // =========================================================

    USER_NOT_FOUND(
            "USER-001",
            "User not found",
            HttpStatus.NOT_FOUND
    ),


    // =========================================================
    // CUSTOMER ERRORS
    // =========================================================

    CUSTOMER_NOT_FOUND(
            "CUSTOMER-001",
            "Customer not found",
            HttpStatus.NOT_FOUND
    ),

    INVALID_CUSTOMER(
            "CUSTOMER-002",
            "The customer is invalid",
            HttpStatus.BAD_REQUEST
    ),
    CUSTOMER_ACCESS_DENIED(
    		"CUSTOMER-003",
    		"Customer access is denied",
    		HttpStatus.FORBIDDEN), 
    
    CUSTOMER_NAME_REQUIRED(
    	    "CUSTOMER-003",
    	    "Customer name is required",
    	    HttpStatus.BAD_REQUEST
    	),

    	CUSTOMER_EMAIL_REQUIRED(
    	    "CUSTOMER-004",
    	    "Customer email is required",
    	    HttpStatus.BAD_REQUEST
    	),

    	CUSTOMER_PHONE_REQUIRED(
    	    "CUSTOMER-005",
    	    "Customer phone number is required",
    	    HttpStatus.BAD_REQUEST
    	),

    	INVALID_CUSTOMER_PHONE(
    	    "CUSTOMER-006",
    	    "Customer phone number must be exactly 10 digits",
    	    HttpStatus.BAD_REQUEST
    	),

    	CUSTOMER_ADDRESS_REQUIRED(
    	    "CUSTOMER-007",
    	    "Customer address is required",
    	    HttpStatus.BAD_REQUEST
    	),

    	DUPLICATE_CUSTOMER_EMAIL(
    	    "CUSTOMER-008",
    	    "A customer with this email already exists",
    	    HttpStatus.CONFLICT
    	),
    	DUPLICATE_CUSTOMER_USER(
    			"CUSTOMER-009",
    			"customer is already existed",
    			HttpStatus.BAD_REQUEST),
    
    

    // =========================================================
    // SITE ERRORS
    // =========================================================

    SITE_NOT_FOUND(
            "SITE-001",
            "Site not found",
            HttpStatus.NOT_FOUND
    ),

    SITE_NAME_REQUIRED(
            "SITE-002",
            "Site name is required",
            HttpStatus.BAD_REQUEST
    ),

    SITE_ADDRESS_REQUIRED(
            "SITE-003",
            "Site address is required",
            HttpStatus.BAD_REQUEST
    ),

    DUPLICATE_SITE(
            "SITE-004",
            "A site with this address already exists for the customer",
            HttpStatus.CONFLICT
    ),

    SITE_ACCESS_DENIED(
            "SITE-005",
            "Access to the site is denied",
            HttpStatus.FORBIDDEN
    ),


    // =========================================================
    // INVENTORY ERRORS
    // =========================================================

    INVENTORY_NOT_FOUND(
            "INVENTORY-001",
            "Inventory item not found",
            HttpStatus.NOT_FOUND
    ),

    DUPLICATE_INVENTORY_PART(
            "INVENTORY-002",
            "An inventory item with this part name already exists",
            HttpStatus.CONFLICT
    ),

    INVALID_INVENTORY_QUANTITY(
            "INVENTORY-003",
            "Inventory quantity cannot be negative",
            HttpStatus.BAD_REQUEST
    ),

    INVALID_UNIT_PRICE(
            "INVENTORY-004",
            "Unit price cannot be negative",
            HttpStatus.BAD_REQUEST
    ),

    INSUFFICIENT_INVENTORY(
            "INVENTORY-005",
            "Insufficient inventory quantity",
            HttpStatus.BAD_REQUEST
    ),


    // =========================================================
    // NOTIFICATION ERRORS
    // =========================================================

    NOTIFICATION_NOT_FOUND(
            "NOTIFICATION-001",
            "Notification not found",
            HttpStatus.NOT_FOUND
    ),

    NOTIFICATION_ACCESS_DENIED(
            "NOTIFICATION-002",
            "Access to the notification is denied",
            HttpStatus.FORBIDDEN
    ),


    // =========================================================
    // TECHNICIAN ERRORS
    // =========================================================

    TECHNICIAN_NOT_FOUND(
            "TECHNICIAN-001",
            "Technician not found",
            HttpStatus.NOT_FOUND
    ),

    TECHNICIAN_INACTIVE(
            "TECHNICIAN-002",
            "Technician is inactive",
            HttpStatus.FORBIDDEN
    ),

    TECHNICIAN_ACCESS_DENIED(
            "TECHNICIAN-003",
            "Technician access is denied",
            HttpStatus.FORBIDDEN
    ),

    TECHNICIAN_NOT_ASSIGNED(
            "TECHNICIAN-004",
            "Technician is not assigned to this work order",
            HttpStatus.FORBIDDEN
    ),
    
    TECHNICIAN_FIRST_NAME_REQUIRED(
    		"TECHNICIAN-005",
    		"Technician first name is required",
    		HttpStatus.BAD_REQUEST),
    
    TECHNICIAN_LAST_NAME_REQUIRED(
    		"TECHNICIAN-006",
    		"Technician last name is required",
    		HttpStatus.BAD_REQUEST),
    
    TECHNICIAN_PHONE_REQUIRED(
    		"TECHNICIAN-007",
    		"Technician phone is required",
    		HttpStatus.BAD_REQUEST),
    
    INVALID_TECHNICIAN_PHONE(
    		"TECHNICIAN-008",
    		"Technician phone is invalid",
    		HttpStatus.BAD_REQUEST), 
    
    TECHNICIAN_SPECIALIZATION_REQUIRED(
    		"TECHNICIAN-009",
    		"Technician specialization is required",
    		HttpStatus.BAD_REQUEST),
    
    DUPLICATE_TECHNICIAN(
    		"TECHNICIAN-010",
    		"Technician is duplicated",
    		HttpStatus.BAD_REQUEST),
    
    TECHNICIAN_UNAVAILABLE(
			"TECHNICIAN-011",
			"Technician is unavailable",
			HttpStatus.BAD_REQUEST),

    // =========================================================
    // DISPATCHER ERRORS
    // =========================================================

    DISPATCHER_ACCESS_DENIED(
            "DISPATCHER-001",
            "Dispatcher access is denied",
            HttpStatus.FORBIDDEN
    ),


    // =========================================================
    // WORK ORDER ERRORS
    // =========================================================

    WORK_ORDER_NOT_FOUND(
            "WORKORDER-001",
            "Work order not found",
            HttpStatus.NOT_FOUND
    ),

    WORK_ORDER_ACCESS_DENIED(
            "WORKORDER-002",
            "Access to the work order is denied",
            HttpStatus.FORBIDDEN
    ),

    WORK_ORDER_ALREADY_ASSIGNED(
            "WORKORDER-003",
            "Work order is already assigned or cannot be assigned",
            HttpStatus.CONFLICT
    ),

    WORK_ORDER_UPDATE_NOT_ALLOWED(
            "WORKORDER-004",
            "Work order cannot be updated in its current status",
            HttpStatus.BAD_REQUEST
    ),

    WORK_ORDER_DELETE_NOT_ALLOWED(
            "WORKORDER-005",
            "Work order cannot be deleted in its current status",
            HttpStatus.BAD_REQUEST
    ),

    INVALID_SCHEDULED_DATE(
            "WORKORDER-006",
            "Scheduled date cannot be in the past",
            HttpStatus.BAD_REQUEST
    ),

    INVALID_WORK_ORDER_STATUS(
            "WORKORDER-007",
            "Invalid work order status",
            HttpStatus.BAD_REQUEST
    ),

    INVALID_STATUS_TRANSITION(
            "WORKORDER-008",
            "Invalid work order status transition",
            HttpStatus.BAD_REQUEST
    ),

    INVALID_WORK_ORDER_PRIORITY(
    		"WORKORDER-009",
    		"Invalid work order priority",
    		HttpStatus.BAD_REQUEST),

    // =========================================================
    // TIME LOG ERRORS
    // =========================================================

    TIME_LOG_NOT_FOUND(
            "TIMELOG-001",
            "Time log not found",
            HttpStatus.NOT_FOUND
    ),

    TIME_LOG_ACCESS_DENIED(
            "TIMELOG-002",
            "Access to the time log is denied",
            HttpStatus.FORBIDDEN
    ),

    TIME_LOG_NOT_ALLOWED(
            "TIMELOG-003",
            "Time log is not allowed for this work order",
            HttpStatus.BAD_REQUEST
    ),

    TIME_LOG_DELETE_NOT_ALLOWED(
            "TIMELOG-004",
            "Time log cannot be deleted",
            HttpStatus.BAD_REQUEST
    ),


    // =========================================================
    // PART USAGE ERRORS
    // =========================================================

    PART_USAGE_NOT_ALLOWED(
            "PARTUSAGE-001",
            "Part usage is not allowed for this work order",
            HttpStatus.BAD_REQUEST
    ),

    PART_USAGE_NOT_FOUND(
            "PARTUSAGE-002",
            "Part usage record not found",
            HttpStatus.NOT_FOUND
    ),

    PART_USAGE_ACCESS_DENIED(
            "PARTUSAGE-003",
            "Access to the part usage record is denied",
            HttpStatus.FORBIDDEN
    ), 
    
    ACCESS_DENIED(
    		"CUSTOMER-003",
    		"Customer is not valid access denied",
    		HttpStatus.FORBIDDEN),
    
    INVALID_REQUEST(
			"REQUEST-001",
			"Request is invalid",
			HttpStatus.BAD_REQUEST
	);
	


    // =========================================================
    // ERROR RESPONSE DATA
    // =========================================================

    private final String code;

    private final String message;

    private final HttpStatus httpStatus;


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    ErrorCode(
            String code,
            String message,
            HttpStatus httpStatus) {

        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}