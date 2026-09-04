package com.keystone.service;

import java.util.List;

import com.keystone.dto.NotificationResponse;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;

public interface NotificationService {

    // =========================================================
    // CREATE NOTIFICATION
    // =========================================================

    NotificationResponse createNotification(
            User user,
            WorkOrder workOrder,
            String title,
            String message,
            String type
    );


    // =========================================================
    // GET NOTIFICATIONS
    // =========================================================

    List<NotificationResponse> getMyNotifications(
            String email
    );

    List<NotificationResponse> getUnreadNotifications(
            String email
    );


    // =========================================================
    // UNREAD COUNT
    // =========================================================

    long countUnreadNotifications(
            String email
    );


    // =========================================================
    // MARK AS READ
    // =========================================================

    NotificationResponse markAsRead(
            String email,
            Long notificationId
    );

    void markAllAsRead(
            String email
    );


    // =========================================================
    // DELETE
    // =========================================================

    void deleteNotification(
            String email,
            Long notificationId
    );


    // =========================================================
    // SLA
    // =========================================================

    void notifySlaBreach(
            WorkOrder workOrder
    );
}