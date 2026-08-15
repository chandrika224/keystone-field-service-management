package com.keystone.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.dto.staff.CreateStaffRequest;
import com.keystone.dto.staff.StaffDetailsResponse;
import com.keystone.dto.staff.StaffResponse;
import com.keystone.dto.staff.StaffStatusUpdateRequest;
import com.keystone.dto.staff.UpdateStaffRequest;
import com.keystone.entity.User;
import com.keystone.enums.Role;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.repository.UserRepository;
import com.keystone.service.StaffService;
import com.keystone.service.mapper.StaffDetailsResponseMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class StaffServiceImpl implements StaffService {
	
	private final CreateStaffService createStaff;
	private final UserRepository userRepository;
	private final StaffDetailsResponseMapper staffDetailsMapper;
	private final UpdateStaff updateStaff;
	
	@Override
	public StaffResponse createStaff(CreateStaffRequest request) {
		
		StaffResponse response = createStaff.createStaff(request);
		return response;
	}

	@Override
	public List<StaffDetailsResponse> getAllStaff() {

	    List<User> users = userRepository.findByRoleIn(
	            List.of(
	                Role.DISPATCHER,
	                Role.TECHNICIAN
	            )
	    );

	    return users.stream()
	            .map(staffDetailsMapper::mapToStaffDetailsResponse)
	            .toList();
	}

	@Override
	public StaffDetailsResponse getStaffById(Long id) {

	    User user = userRepository.findById(id)
	            .orElseThrow(() ->
	                new ResourceNotFoundException(
	                    "Staff not found with id: " + id
	                )
	            );

	    if (user.getRole() != Role.DISPATCHER &&
	        user.getRole() != Role.TECHNICIAN) {

	        throw new ResourceNotFoundException(
	            "Staff not found with id: " + id
	        );
	    }
	    
	    StaffDetailsResponse response = staffDetailsMapper.mapToStaffDetailsResponse(user);

	    return response;
	}

	@Override
	public StaffDetailsResponse updateStaff(Long id, UpdateStaffRequest request) {
		StaffDetailsResponse response = updateStaff.updateStaff(id, request);
		return response;
	}

	@Override
	public StaffDetailsResponse updateStaffStatus(
	        Long id,
	        StaffStatusUpdateRequest request
	) {

	    User user = userRepository.findById(id)
	            .orElseThrow(() ->
	                new ResourceNotFoundException(
	                    "Staff not found with id: " + id
	                )
	            );

	    if (user.getRole() != Role.DISPATCHER &&
	        user.getRole() != Role.TECHNICIAN) {

	        throw new ResourceNotFoundException(
	            "Staff not found with id: " + id
	        );
	    }

	    user.setActive(request.isActive());

	    User updatedUser = userRepository.save(user);
	    StaffDetailsResponse response = staffDetailsMapper.mapToStaffDetailsResponse(updatedUser);
	    return response;
	}

	
	@Override
	public String deleteStaff(Long id) {

	    System.out.println("DELETE STAFF ID = " + id);

	    User user = userRepository.findById(id)
	            .orElseThrow(() ->
	                new ResourceNotFoundException(
	                    "Staff not found with id: " + id
	                )
	            );

	    System.out.println(
	        "FOUND USER = " +
	        user.getId() +
	        ", ROLE = " +
	        user.getRole()
	    );

	    if (user.getRole() != Role.DISPATCHER &&
	        user.getRole() != Role.TECHNICIAN) {

	        throw new ResourceNotFoundException(
	            "Staff not found with id: " + id
	        );
	    }

	    userRepository.delete(user);

	    return "Staff deleted successfully";
	}



}