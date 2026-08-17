package com.keystone.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.dto.TechnicianResponse;
import com.keystone.entity.User;
import com.keystone.enums.Role;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.repository.UserRepository;
import com.keystone.service.TechnicianService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TechnicianServiceImpl implements TechnicianService {

    private final UserRepository userRepository;

    @Override
    public List<TechnicianResponse> getAllTechnicians() {

        return userRepository
                .findByRoleAndActiveTrue(Role.TECHNICIAN)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public TechnicianResponse getTechnicianById(Long id) {

        User technician = userRepository
                .findById(id)
                .filter(user -> user.getRole() == Role.TECHNICIAN)
                .filter(User::isActive)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Technician not found with id: " + id
                        )
                );

        return mapToResponse(technician);
    }

    private TechnicianResponse mapToResponse(User technician) {

        TechnicianResponse response = new TechnicianResponse();

        response.setId(technician.getId());
        response.setFirstName(technician.getFirstName());
        response.setLastName(technician.getLastName());
        response.setEmail(technician.getEmail());
        response.setPhone(technician.getPhone());
        response.setSpecialization(technician.getSpecialization());
        response.setRole(technician.getRole());
        response.setActive(technician.isActive());

        return response;
    }
}