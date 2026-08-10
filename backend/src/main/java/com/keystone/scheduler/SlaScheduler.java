package com.keystone.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.keystone.entity.WorkOrder;
import com.keystone.repository.WorkOrderRepository;

@Component
public class SlaScheduler {

    @Autowired
    private WorkOrderRepository workOrderRepository;

    @Scheduled(fixedRate = 60000)
    public void checkSla() {

        List<WorkOrder> workOrders =
                workOrderRepository.findBySlaBreachedFalse();

        for (WorkOrder workOrder : workOrders) {

            if (workOrder.getCompletedAt() == null &&
                    LocalDateTime.now().isAfter(workOrder.getSlaDueDate())) {

                workOrder.setSlaBreached(true);

                workOrderRepository.save(workOrder);

                System.out.println("SLA Breached: " + workOrder.getTitle());
            }
        }
    }
}