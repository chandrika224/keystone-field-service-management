package com.keystone.service.impl;

import org.springframework.stereotype.Service;

import com.keystone.dto.staff.StaffDetailsResponse;
import com.keystone.dto.staff.UpdateStaffRequest;
import com.keystone.entity.User;
import com.keystone.enums.Role;
import com.keystone.exception.ResourceAlreadyExistsException;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.repository.UserRepository;
import com.keystone.service.mapper.StaffDetailsResponseMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UpdateStaff {
	
	private final UserRepository userRepository;
	private final StaffDetailsResponseMapper staffDetails;
	
	public StaffDetailsResponse updateStaff(
	        Long id,
	        UpdateStaffRequest request
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

	    // Check email change
	    if (!user.getEmail().equals(request.getEmail())
	            && userRepository.existsByEmail(request.getEmail())) {

	        throw new ResourceAlreadyExistsException(
	            "User with this email already exists"
	        );
	    }

	    user.setFirstName(request.getFirstName());
	    user.setLastName(request.getLastName());
	    user.setEmail(request.getEmail());
	    user.setPhone(request.getPhone());
	    user.setRole(request.getRole());
	    user.setSpecialization(request.getSpecialization());
	    

	    User updatedUser = userRepository.save(user);

	    return staffDetails.mapToStaffDetailsResponse(updatedUser);
	}

}
