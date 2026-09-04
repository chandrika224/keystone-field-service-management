package com.keystone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.keystone.entity.Notification;

@Repository
public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    // =========================================================
    // ALL NOTIFICATIONS FOR A USER
    // =========================================================

    List<Notification> findByUser_IdOrderByCreatedAtDesc(
            Long userId
    );


    // =========================================================
    // UNREAD NOTIFICATIONS
    // =========================================================

    List<Notification> findByUser_IdAndReadFalseOrderByCreatedAtDesc(
            Long userId
    );


    // =========================================================
    // UNREAD NOTIFICATION COUNT
    // =========================================================

    long countByUser_IdAndReadFalse(Long userId);


    // =========================================================
    // NOTIFICATIONS FOR A WORK ORDER
    // =========================================================

    List<Notification> findByWorkOrder_IdOrderByCreatedAtDesc(
            Long workOrderId
    );
    
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Notification n SET n.read = true WHERE n.user.id = :userId AND n.read = false")
    int markAllAsReadByUserId(@Param("userId") Long userId);
}