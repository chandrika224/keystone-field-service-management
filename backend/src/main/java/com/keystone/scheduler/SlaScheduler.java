package com.keystone.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.keystone.entity.WorkOrder;
import com.keystone.repository.WorkOrderRepository;
import com.keystone.service.NotificationService;

@Component
public class SlaScheduler {

    @Autowired
    private WorkOrderRepository workOrderRepository;

    @Autowired
    private NotificationService notificationService;

    @Scheduled(fixedRate = 60000)
    public void checkSla() {

        List<WorkOrder> workOrders =
                workOrderRepository.findBySlaBreachedFalse();

        LocalDateTime now = LocalDateTime.now();

        for (WorkOrder workOrder : workOrders) {

            // Ignore work orders without SLA due date
            if (workOrder.getSlaDueDate() == null) {
                continue;
            }

            // Ignore completed and closed work orders
            if (workOrder.getStatus() != null &&
                    (workOrder.getStatus().name().equals("COMPLETED")
                    || workOrder.getStatus().name().equals("CLOSED"))) {
                continue;
            }

            // Check SLA breach
            if (now.isAfter(workOrder.getSlaDueDate())) {

                workOrder.setSlaBreached(true);

                workOrderRepository.save(workOrder);

                // Send SLA notification
                notificationService.notifySlaBreach(workOrder);
            }
        }
    }
}