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

        response.setTotalCustomers(customerRepository.count());

        response.setTotalTechnicians(technicianRepository.count());

        response.setTotalWorkOrders(workOrderRepository.count());

        response.setOpenWorkOrders(
                workOrderRepository.findByStatus(WorkOrderStatus.OPEN).size());

        response.setAssignedWorkOrders(
                workOrderRepository.findByStatus(WorkOrderStatus.ASSIGNED).size());

        response.setInProgressWorkOrders(
                workOrderRepository.findByStatus(WorkOrderStatus.IN_PROGRESS).size());

        response.setCompletedWorkOrders(
                workOrderRepository.findByStatus(WorkOrderStatus.COMPLETED).size());

        return response;
    }
}