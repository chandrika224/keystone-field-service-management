package com.keystone.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keystone.dto.DashboardResponse;
import com.keystone.enums.WorkOrderStatus;
import com.keystone.repository.CustomerRepository;
import com.keystone.repository.TechnicianRepository;
import com.keystone.repository.WorkOrderRepository;
import com.keystone.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @Autowired
    private WorkOrderRepository workOrderRepository;

    @Override
    public DashboardResponse getDashboardSummary() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalCustomers(
                customerRepository.count());

        response.setTotalTechnicians(
                technicianRepository.count());

        response.setTotalWorkOrders(
                workOrderRepository.count());

        // 1. NEW
        response.setNewWorkOrders(
                workOrderRepository
                        .findByStatus(WorkOrderStatus.NEW)
                        .size());

        // 2. ASSIGNED
        response.setAssignedWorkOrders(
                workOrderRepository
                        .findByStatus(WorkOrderStatus.ASSIGNED)
                        .size());

        // 3. IN_PROGRESS
        response.setInProgressWorkOrders(
                workOrderRepository
                        .findByStatus(WorkOrderStatus.IN_PROGRESS)
                        .size());

        // 4. ON_HOLD
        response.setOnHoldWorkOrders(
                workOrderRepository
                        .findByStatus(WorkOrderStatus.ON_HOLD)
                        .size());

        // 5. COMPLETED
        response.setCompletedWorkOrders(
                workOrderRepository
                        .findByStatus(WorkOrderStatus.COMPLETED)
                        .size());

        // 6. CLOSED
        response.setClosedWorkOrders(
                workOrderRepository
                        .findByStatus(WorkOrderStatus.CLOSED)
                        .size());

        // 7. CANCELLED
        response.setCancelledWorkOrders(
                workOrderRepository
                        .findByStatus(WorkOrderStatus.CANCELLED)
                        .size());

        // SLA
        response.setSlaBreachedCount(
                workOrderRepository.countBySlaBreachedTrue());

        return response;
    }
}