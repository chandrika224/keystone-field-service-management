package com.keystone.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keystone.dto.WorkOrderRequest;
import com.keystone.dto.WorkOrderResponse;
import com.keystone.entity.Customer;
import com.keystone.entity.Technician;
import com.keystone.entity.WorkOrder;
import com.keystone.enums.WorkOrderStatus;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.repository.CustomerRepository;
import com.keystone.repository.TechnicianRepository;
import com.keystone.repository.WorkOrderRepository;
import com.keystone.service.WorkOrderService;



@Service
public class WorkOrderServiceImpl implements WorkOrderService {

    @Autowired
    private WorkOrderRepository workOrderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TechnicianRepository technicianRepository;

    @Override
    public WorkOrderResponse createWorkOrder(WorkOrderRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        Technician technician = technicianRepository.findById(request.getTechnicianId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found"));

        WorkOrder workOrder = new WorkOrder();

        workOrder.setTitle(request.getTitle());
        workOrder.setDescription(request.getDescription());
        workOrder.setPriority(request.getPriority());
        workOrder.setScheduledDate(request.getScheduledDate());

        workOrder.setStatus(WorkOrderStatus.OPEN);

        workOrder.setCustomer(customer);
        workOrder.setTechnician(technician);

        WorkOrder saved = workOrderRepository.save(workOrder);

        return mapToResponse(saved);
    }

    @Override
    public List<WorkOrderResponse> getAllWorkOrders() {

        return workOrderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public WorkOrderResponse getWorkOrderById(Long id) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        return mapToResponse(workOrder);
    }

    @Override
    public WorkOrderResponse updateWorkOrder(Long id, WorkOrderRequest request) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        Technician technician = technicianRepository.findById(request.getTechnicianId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found"));

        workOrder.setTitle(request.getTitle());
        workOrder.setDescription(request.getDescription());
        workOrder.setPriority(request.getPriority());
        workOrder.setScheduledDate(request.getScheduledDate());
        workOrder.setCustomer(customer);
        workOrder.setTechnician(technician);

        WorkOrder updated = workOrderRepository.save(workOrder);

        return mapToResponse(updated);
    }

    @Override
    public void deleteWorkOrder(Long id) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Work Order not found"));

        workOrderRepository.delete(workOrder);
    }

    private WorkOrderResponse mapToResponse(WorkOrder workOrder) {

        WorkOrderResponse response = new WorkOrderResponse();

        response.setId(workOrder.getId());
        response.setTitle(workOrder.getTitle());
        response.setDescription(workOrder.getDescription());
        response.setPriority(workOrder.getPriority());
        response.setStatus(workOrder.getStatus());
        response.setScheduledDate(workOrder.getScheduledDate());
        response.setCompletedDate(workOrder.getCompletedDate());

        response.setCustomerName(workOrder.getCustomer().getCustomerName());

        response.setTechnicianName(
                workOrder.getTechnician().getFirstName() + " " +
                workOrder.getTechnician().getLastName());

        return response;
    }
}