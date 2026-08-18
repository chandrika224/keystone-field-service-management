package com.keystone.service.impl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.keystone.dto.staff.CreateStaffRequest;
import com.keystone.dto.staff.StaffResponse;
import com.keystone.entity.Technician;
import com.keystone.entity.User;
import com.keystone.enums.Role;
import com.keystone.exception.ResourceAlreadyExistsException;
import com.keystone.repository.TechnicianRepository;
import com.keystone.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateStaffService {

    private final UserRepository userRepository;

    private final TechnicianRepository technicianRepository;

    private final PasswordEncoder passwordEncoder;


    @Transactional
    public StaffResponse createStaff(
            CreateStaffRequest request) {

        // ============================================================
        // 1. CHECK DUPLICATE EMAIL
        // ============================================================

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new ResourceAlreadyExistsException(
                    "User with this email already exists"
            );
        }


        // ============================================================
        // 2. VALIDATE ROLE
        // ============================================================

        if (request.getRole() == null) {

            throw new IllegalArgumentException(
                    "Staff role is required"
            );
        }


        Role role = Role.valueOf(
                request.getRole().name()
        );


        // ============================================================
        // 3. ONLY STAFF ROLES
        // ============================================================

        if (role != Role.DISPATCHER &&
            role != Role.TECHNICIAN) {

            throw new IllegalArgumentException(
                    "Only DISPATCHER and TECHNICIAN roles can be created"
            );
        }


        // ============================================================
        // 4. CREATE USER
        // ============================================================

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

        user.setJoinedDate(
                LocalDateTime.now()
        );


        // ============================================================
        // 5. GENERATE TEMPORARY PASSWORD
        // ============================================================

        String temporaryPassword =
                generateTemporaryPassword();

        user.setPassword(
                passwordEncoder.encode(
                        temporaryPassword
                )
        );


        // ============================================================
        // 6. SAVE USER FIRST
        // ============================================================

        User savedUser =
                userRepository.save(user);


        // ============================================================
        // 7. GENERATE EMPLOYEE ID
        // ============================================================

        String employeeId =
                generateEmployeeId(
                        savedUser.getRole(),
                        savedUser.getId()
                );

        savedUser.setEmployeeId(
                employeeId
        );

        savedUser =
                userRepository.save(savedUser);


     // ============================================================
     // 8. CREATE TECHNICIAN PROFILE
     // ============================================================

     if (role == Role.TECHNICIAN) {

         Technician technician = new Technician();

         // Link Technician to User
         technician.setUser(savedUser);

         // Copy common staff information from User
         technician.setFirstName(
                 savedUser.getFirstName()
         );

         technician.setLastName(
                 savedUser.getLastName()
         );

         technician.setEmail(
                 savedUser.getEmail()
         );

         technician.setPhone(
                 savedUser.getPhone()
         );

         technician.setRole(
                 savedUser.getRole().name()
         );

         // Technician-specific information
         technician.setSpecialization(
                 savedUser.getSpecialization()
         );

         // Initial technician status
         technician.setStatus("Available");

         technician.setActive(
                 savedUser.isActive()
         );

         technicianRepository.save(technician);

         log.info(
                 "Technician profile created for user id {}",
                 savedUser.getId()
         );
     }

        // ============================================================
        // 9. BUILD RESPONSE
        // ============================================================

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


    // ============================================================
    // EMPLOYEE ID
    // ============================================================

    private String generateEmployeeId(
            Role role,
            Long id) {

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


    // ============================================================
    // TEMPORARY PASSWORD
    // ============================================================

    private String generateTemporaryPassword() {

        return "KS-" +
                UUID.randomUUID()
                        .toString()
                        .substring(0, 8);
    }
    
}