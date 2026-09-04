package com.keystone.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class NotificationRequest {

    // =========================================================
    // USER
    // =========================================================

    @NotNull(message = "User ID is required")
    private Long userId;


    // =========================================================
    // WORK ORDER
    // Optional because some notifications may not be
    // related to a work order.
    // =========================================================

    private Long workOrderId;


    // =========================================================
    // NOTIFICATION DETAILS
    // =========================================================

    @NotBlank(message = "Notification title is required")
    @Size(max = 255, message = "Notification title must not exceed 255 characters")
    private String title;

    @NotBlank(message = "Notification message is required")
    @Size(max = 1000, message = "Notification message must not exceed 1000 characters")
    private String message;

    @NotBlank(message = "Notification type is required")
    @Size(max = 100, message = "Notification type must not exceed 100 characters")
    private String type;
}