package com.keystone.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keystone.dto.ReportResponse;
import com.keystone.repository.CustomerRepository;
import com.keystone.repository.InventoryRepository;
import com.keystone.repository.TechnicianRepository;
import com.keystone.repository.WorkOrderRepository;
import com.keystone.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @Autowired
    private WorkOrderRepository workOrderRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Override
    public ReportResponse generateReport() {

        ReportResponse response = new ReportResponse();

        response.setTotalCustomers(customerRepository.count());
        response.setTotalTechnicians(technicianRepository.count());
        response.setTotalWorkOrders(workOrderRepository.count());
        response.setTotalInventoryItems(inventoryRepository.count());

        return response;
    }
}