package com.keystone.service.impl.helper;

import org.springframework.stereotype.Component;

import com.keystone.dto.NotificationResponse;
import com.keystone.entity.Notification;
import com.keystone.entity.User;
import com.keystone.enums.ErrorCode;
import com.keystone.exception.KeystoneException;
import com.keystone.repository.NotificationRepository;
import com.keystone.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationServiceHelper {

    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    public User getUserById(Long id) {

        log.debug("Looking up user by id={}", id);

        return userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("User not found: id={}", id);
                    return new KeystoneException(
                            ErrorCode.USER_NOT_FOUND
                    );
                });
    }

    public User getUserByEmail(String email) {

        log.debug("Looking up user by email={}", email);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("User not found: email={}", email);
                    return new KeystoneException(
                            ErrorCode.USER_NOT_FOUND
                    );
                });
    }

    public Notification getNotificationById(Long id) {

        log.debug("Looking up notification by id={}", id);

        return notificationRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Notification not found: id={}", id);
                    return new KeystoneException(
                            ErrorCode.NOTIFICATION_NOT_FOUND
                    );
                });
    }

    public void validateNotificationOwnership(
            Notification notification,
            User user) {

        if (!notification.getUser().getId()
                .equals(user.getId())) {

            log.warn(
                    "Access denied: userId={} attempted to access notificationId={} owned by userId={}",
                    user.getId(),
                    notification.getId(),
                    notification.getUser().getId()
            );

            throw new KeystoneException(
                    ErrorCode.NOTIFICATION_ACCESS_DENIED
            );
        }

        log.debug(
                "Ownership validated: userId={}, notificationId={}",
                user.getId(),
                notification.getId()
        );
    }

    public NotificationResponse mapToResponse(
            Notification notification) {

        NotificationResponse response = new NotificationResponse();

        // =========================================================
        // NOTIFICATION
        // =========================================================

        response.setId(notification.getId());


        // =========================================================
        // USER
        // =========================================================

        if (notification.getUser() != null) {
            response.setUserId(
                    notification.getUser().getId()
            );
        }


        // =========================================================
        // WORK ORDER
        // =========================================================

        if (notification.getWorkOrder() != null) {
            response.setWorkOrderId(
                    notification.getWorkOrder().getId()
            );
        }


        // =========================================================
        // NOTIFICATION DETAILS
        // =========================================================

        response.setTitle(notification.getTitle());

        response.setMessage(notification.getMessage());

        response.setType(notification.getType());


        // =========================================================
        // READ STATUS
        // =========================================================

        response.setRead(notification.isRead());


        // =========================================================
        // CREATED AT
        // =========================================================

        response.setCreatedAt(notification.getCreatedAt());


        return response;
    }

}