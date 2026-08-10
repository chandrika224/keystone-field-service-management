package com.keystone.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.keystone.dto.TechnicianRequest;
import com.keystone.dto.TechnicianResponse;
import com.keystone.entity.Technician;
import com.keystone.exception.DuplicateResourceException;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.repository.TechnicianRepository;
import com.keystone.service.TechnicianService;

@Service
public class TechnicianServiceImpl implements TechnicianService {

    @Autowired
    private TechnicianRepository technicianRepository;

    @Override
    public TechnicianResponse addTechnician(TechnicianRequest request) {

        if (technicianRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Technician email already exists");
        }

        Technician technician = new Technician();

        technician.setFirstName(request.getFirstName());
        technician.setLastName(request.getLastName());
        technician.setEmail(request.getEmail());
        technician.setPhone(request.getPhone());
        technician.setSpecialization(request.getSpecialization());
        technician.setStatus(request.getStatus());

        Technician saved = technicianRepository.save(technician);

        return mapToResponse(saved);
    }

    @Override
    public List<TechnicianResponse> getAllTechnicians() {

        return technicianRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TechnicianResponse getTechnicianById(Long id) {

        Technician technician = technicianRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found with ID : " + id));

        return mapToResponse(technician);
    }

    @Override
    public TechnicianResponse updateTechnician(Long id, TechnicianRequest request) {

        Technician technician = technicianRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found with ID : " + id));

        if (!technician.getEmail().equals(request.getEmail())
                && technicianRepository.existsByEmail(request.getEmail())) {

            throw new DuplicateResourceException("Technician email already exists");
        }

        technician.setFirstName(request.getFirstName());
        technician.setLastName(request.getLastName());
        technician.setEmail(request.getEmail());
        technician.setPhone(request.getPhone());
        technician.setSpecialization(request.getSpecialization());
        technician.setStatus(request.getStatus());

        Technician updated = technicianRepository.save(technician);

        return mapToResponse(updated);
    }

    @Override
    public void deleteTechnician(Long id) {

        Technician technician = technicianRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found with ID : " + id));

        technicianRepository.delete(technician);
    }

    private TechnicianResponse mapToResponse(Technician technician) {

        TechnicianResponse response = new TechnicianResponse();

        response.setId(technician.getId());
        response.setFirstName(technician.getFirstName());
        response.setLastName(technician.getLastName());
        response.setEmail(technician.getEmail());
        response.setPhone(technician.getPhone());
        response.setSpecialization(technician.getSpecialization());
        response.setStatus(technician.getStatus());
        response.setRole(technician.getRole());

        return response;
    }
}