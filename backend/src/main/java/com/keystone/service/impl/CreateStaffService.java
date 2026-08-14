package com.keystone.service.impl;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.keystone.dto.staff.CreateStaffRequest;
import com.keystone.dto.staff.StaffResponse;
import com.keystone.entity.User;
import com.keystone.enums.Role;
import com.keystone.exception.ResourceAlreadyExistsException;
import com.keystone.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateStaffService {
	
	private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
	
	 public StaffResponse createStaff(CreateStaffRequest request) {
		 
	        // 1. Check duplicate email
	        if (userRepository.existsByEmail(request.getEmail())) {
	            throw new ResourceAlreadyExistsException(
	                    "User with this email already exists"
	            );
	        }

	        // 2. Validate role
	        if (request.getRole() == null) {
	            throw new IllegalArgumentException(
	                    "Staff role is required"
	            );
	        }

	        Role role = Role.valueOf(
	                request.getRole().name()
	        );

	        // 3. Only allow staff roles
	        if (role != Role.DISPATCHER &&
	            role != Role.TECHNICIAN) {

	            throw new IllegalArgumentException(
	                    "Only DISPATCHER and TECHNICIAN roles can be created"
	            );
	        }

	        // 4. Create User
	        User user = new User();

	        user.setFirstName(
	                request.getFirstName()
	        );

	        user.setLastName(
	                request.getLastName()
	        );

	        user.setEmail(
	                request.getEmail()
	        );

	        user.setPhone(
	                request.getPhone()
	        );

	        user.setSpecialization(
	                request.getSpecialization()
	        );

	        user.setRole(role);

	        user.setActive(true);

	        // 5. Generate temporary password
	        String temporaryPassword =
	                generateTemporaryPassword();

	        user.setPassword(
	                passwordEncoder.encode(
	                        temporaryPassword
	                )
	        );

	        // 6. Save user
	        User savedUser =
	                userRepository.save(user);

	        // 7. Generate employee ID
	        String employeeId =
	                generateEmployeeId(
	                        savedUser.getRole(),
	                        savedUser.getId()
	                );

	        savedUser.setEmployeeId(employeeId);

	        // Save employee ID
	        savedUser =
	                userRepository.save(savedUser);

	        // 8. Build response
	        StaffResponse response =
	                new StaffResponse();

	        response.setId(
	                savedUser.getId()
	        );

	        response.setEmployeeId(
	                savedUser.getEmployeeId()
	        );

	        response.setFirstName(
	                savedUser.getFirstName()
	        );

	        response.setLastName(
	                savedUser.getLastName()
	        );

	        response.setEmail(
	                savedUser.getEmail()
	        );

	        response.setPhone(
	                savedUser.getPhone()
	        );

	        response.setRole(
	                savedUser.getRole()
	        );

	        response.setSpecialization(
	                savedUser.getSpecialization()
	        );

	        response.setActive(
	                savedUser.isActive()
	        );

	        response.setJoinedDate(
	                savedUser.getJoinedDate()
	        );

	        // Temporary testing only
	        response.setTemporaryPassword(
	                temporaryPassword
	        );

	        return response;
	    }

	    private String generateEmployeeId(
	            Role role,
	            Long id
	    ) {

	        String prefix;

	        if (role == Role.DISPATCHER) {
	            prefix = "DISP";
	        } else if (role == Role.TECHNICIAN) {
	            prefix = "TECH";
	        } else {
	            prefix = "EMP";
	        }

	        return String.format(
	                "%s-%03d",
	                prefix,
	                id
	        );
	    }

	    private String generateTemporaryPassword() {

	        return "KS-" +
	                UUID.randomUUID()
	                        .toString()
	                        .substring(0, 8);
	    }
		 
	 

}
