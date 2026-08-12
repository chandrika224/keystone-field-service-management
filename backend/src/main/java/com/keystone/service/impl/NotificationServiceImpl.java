package com.keystone.service.impl;

import org.springframework.stereotype.Service;

import com.keystone.entity.WorkOrder;
import com.keystone.service.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Override
    public void notifySlaBreach(WorkOrder workOrder) {

        System.out.println("========================================");
        System.out.println("SLA BREACH NOTIFICATION");
        System.out.println("Work Order ID : " + workOrder.getId());
        System.out.println("Title         : " + workOrder.getTitle());
        System.out.println("Status        : " + workOrder.getStatus());
        System.out.println("SLA Due Date  : " + workOrder.getSlaDueDate());
        System.out.println("Message       : SLA has been breached.");
        System.out.println("========================================");
    }
}