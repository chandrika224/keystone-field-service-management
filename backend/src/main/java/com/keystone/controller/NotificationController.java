package com.keystone.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.NotificationResponse;
import com.keystone.service.NotificationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications", description = "Notification Management APIs")
public class NotificationController {

    private final NotificationService notificationService;

    // ==========================================
    // GET MY NOTIFICATIONS
    // GET /api/notifications
    // ==========================================
    @Operation(summary = "Get all notifications for the logged-in user")
    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getMyNotifications(
            Authentication authentication) {

        String email = authentication.getName();

        log.info("Received request to fetch notifications for email={}", email);

        List<NotificationResponse> notifications = notificationService.getMyNotifications(email);

        return ResponseEntity.ok(notifications);
    }

    // ==========================================
    // GET UNREAD NOTIFICATIONS
    // GET /api/notifications/unread
    // ==========================================
    @Operation(summary = "Get unread notifications for the logged-in user")
    @GetMapping("/unread")
    public ResponseEntity<List<NotificationResponse>> getUnreadNotifications(
            Authentication authentication) {

        String email = authentication.getName();

        log.info("Received request to fetch unread notifications for email={}", email);

        List<NotificationResponse> notifications = notificationService.getUnreadNotifications(email);

        return ResponseEntity.ok(notifications);
    }

    // ==========================================
    // COUNT UNREAD NOTIFICATIONS
    // GET /api/notifications/unread/count
    // ==========================================
    @Operation(summary = "Get unread notification count for the logged-in user")
    @GetMapping("/unread/count")
    public ResponseEntity<Long> countUnreadNotifications(
            Authentication authentication) {

        String email = authentication.getName();

        log.debug("Received request to count unread notifications for email={}", email);

        long count = notificationService.countUnreadNotifications(email);

        return ResponseEntity.ok(count);
    }

    // ==========================================
    // MARK ONE AS READ
    // PATCH /api/notifications/{notificationId}/read
    // ==========================================
    @Operation(summary = "Mark a single notification as read")
    @PatchMapping("/{notificationId}/read")
    public ResponseEntity<NotificationResponse> markAsRead(
            Authentication authentication,
            @PathVariable Long notificationId) {

        String email = authentication.getName();

        log.info("Received request to mark notificationId={} as read for email={}", notificationId, email);

        NotificationResponse response = notificationService.markAsRead(email, notificationId);

        return ResponseEntity.ok(response);
    }

    // ==========================================
    // MARK ALL AS READ
    // PATCH /api/notifications/read-all
    // ==========================================
    @Operation(summary = "Mark all notifications as read for the logged-in user")
    @PatchMapping("/read-all")
    public ResponseEntity<Void> markAllAsRead(
            Authentication authentication) {

        String email = authentication.getName();

        log.info("Received request to mark all notifications as read for email={}", email);

        notificationService.markAllAsRead(email);

        return ResponseEntity.noContent().build();
    }

    // ==========================================
    // DELETE NOTIFICATION
    // DELETE /api/notifications/{notificationId}
    // ==========================================
    @Operation(summary = "Delete a notification")
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(
            Authentication authentication,
            @PathVariable Long notificationId) {

        String email = authentication.getName();

        log.info("Received request to delete notificationId={} for email={}", notificationId, email);

        notificationService.deleteNotification(email, notificationId);

        return ResponseEntity.noContent().build();
    }
}