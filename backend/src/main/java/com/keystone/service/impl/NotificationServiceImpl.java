package com.keystone.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.dto.NotificationResponse;
import com.keystone.entity.Notification;
import com.keystone.entity.User;
import com.keystone.entity.WorkOrder;
import com.keystone.repository.NotificationRepository;
import com.keystone.repository.WorkOrderRepository;
import com.keystone.service.NotificationService;
import com.keystone.service.impl.helper.NotificationServiceHelper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final WorkOrderRepository workOrderRepository;
    private final NotificationServiceHelper notificationServiceHelper;

    @Override
    @Transactional
    public NotificationResponse createNotification(
            User user,
            WorkOrder workOrder,
            String title,
            String message,
            String type) {

        log.info(
                "Creating notification for userId={}, workOrderId={}, type={}",
                user != null ? user.getId() : null,
                workOrder != null ? workOrder.getId() : null,
                type
        );

        // =========================================================
        // CREATE NOTIFICATION
        // =========================================================

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setWorkOrder(workOrder);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false);


        // =========================================================
        // SAVE
        // =========================================================

        Notification savedNotification =
                notificationRepository.save(notification);

        log.info(
                "Notification created successfully: notificationId={}, userId={}, workOrderId={}",
                savedNotification.getId(),
                user != null ? user.getId() : null,
                workOrder != null ? workOrder.getId() : null
        );


        // =========================================================
        // RESPONSE
        // =========================================================

        return notificationServiceHelper.mapToResponse(savedNotification);
    }


    @Override
    public List<NotificationResponse> getMyNotifications(String email) {

        log.debug("Fetching notifications for email={}", email);

        User user = notificationServiceHelper.getUserByEmail(email);

        List<NotificationResponse> notifications = notificationRepository
                .findByUser_IdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(notificationServiceHelper::mapToResponse)
                .toList();

        log.debug("Found {} notification(s) for email={}", notifications.size(), email);

        return notifications;
    }

    @Override
    public List<NotificationResponse> getUnreadNotifications(String email) {

        log.debug("Fetching unread notifications for email={}", email);

        User user = notificationServiceHelper.getUserByEmail(email);

        List<NotificationResponse> notifications = notificationRepository
                .findByUser_IdAndReadFalseOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(notificationServiceHelper::mapToResponse)
                .toList();

        log.debug("Found {} unread notification(s) for email={}", notifications.size(), email);

        return notifications;
    }

    @Override
    public long countUnreadNotifications(String email) {

        log.debug("Counting unread notifications for email={}", email);

        User user = notificationServiceHelper.getUserByEmail(email);

        long count = notificationRepository
                .countByUser_IdAndReadFalse(user.getId());

        log.debug("Unread count for email={} is {}", email, count);

        return count;
    }

    @Override
    @Transactional
    public NotificationResponse markAsRead(String email, Long notificationId) {

        log.info("Marking notification as read: email={}, notificationId={}", email, notificationId);

        // =========================================================
        // GET USER
        // =========================================================

        User user = notificationServiceHelper.getUserByEmail(email);

        // =========================================================
        // GET NOTIFICATION
        // =========================================================

        Notification notification = notificationServiceHelper.getNotificationById(notificationId);

        // =========================================================
        // VALIDATE OWNERSHIP
        // =========================================================

        notificationServiceHelper.validateNotificationOwnership(notification, user);

        // =========================================================
        // MARK AS READ
        // =========================================================

        if (notification.isRead()) {
            log.debug("Notification already marked as read: notificationId={}", notificationId);
        } else {
            notification.setRead(true);
            notification = notificationRepository.save(notification);
            log.info("Notification marked as read: notificationId={}, userId={}", notificationId, user.getId());
        }

        // =========================================================
        // RESPONSE
        // =========================================================

        return notificationServiceHelper.mapToResponse(notification);
    }

    @Override
    @Transactional
    public void markAllAsRead(String email) {

        log.info("Marking all notifications as read for email={}", email);

        User user = notificationServiceHelper.getUserByEmail(email);

        int updatedCount = notificationRepository
                .markAllAsReadByUserId(user.getId());

        log.info("Marked {} notification(s) as read for email={}", updatedCount, email);
    }

    @Override
    @Transactional
    public void deleteNotification(String email, Long notificationId) {

        log.info("Deleting notification: email={}, notificationId={}", email, notificationId);

        // =========================================================
        // GET USER
        // =========================================================

        User user = notificationServiceHelper.getUserByEmail(email);

        // =========================================================
        // GET NOTIFICATION
        // =========================================================

        Notification notification = notificationServiceHelper.getNotificationById(notificationId);

        // =========================================================
        // VALIDATE OWNERSHIP
        // =========================================================

        notificationServiceHelper.validateNotificationOwnership(notification, user);

        // =========================================================
        // DELETE
        // =========================================================

        notificationRepository.delete(notification);

        log.info("Notification deleted successfully: notificationId={}, userId={}", notificationId, user.getId());
    }

    @Override
    public void notifySlaBreach(WorkOrder workOrder) {
        // TODO Auto-generated method stub

    }

}