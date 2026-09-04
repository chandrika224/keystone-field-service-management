package com.keystone.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.keystone.dto.TechnicianRequest;
import com.keystone.dto.TechnicianResponse;
import com.keystone.entity.Technician;
import com.keystone.entity.User;
import com.keystone.enums.ErrorCode;
import com.keystone.enums.Role;
import com.keystone.exception.KeystoneException;
import com.keystone.repository.TechnicianRepository;
import com.keystone.repository.UserRepository;
import com.keystone.service.TechnicianService;
import com.keystone.service.impl.helper.TechnicianHelper;
import com.keystone.service.mapper.TechnicianMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TechnicianServiceImpl
        implements TechnicianService {

    private final TechnicianRepository technicianRepository;

    private final UserRepository userRepository;

    private final TechnicianHelper helper;

    private final TechnicianMapper mapper;


    // =========================================================
    // ADD TECHNICIAN
    // =========================================================

    @Override
    public TechnicianResponse addTechnician(
            TechnicianRequest request) {

        log.info(
                "Creating technician: email={}",
                request.getEmail()
        );


        // -----------------------------------------------------
        // VALIDATION
        // -----------------------------------------------------

        helper.validateFirstName(
                request.getFirstName()
        );

        helper.validateLastName(
                request.getLastName()
        );

        helper.validateEmail(
                request.getEmail()
        );

        helper.validatePhone(
                request.getPhone()
        );

        helper.validateSpecialization(
                request.getSpecialization()
        );


        // -----------------------------------------------------
        // FIND USER
        // -----------------------------------------------------

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> {

                    log.warn(
                            "User not found for technician email={}",
                            request.getEmail()
                    );

                    return new KeystoneException(
                            com.keystone.enums.ErrorCode.USER_NOT_FOUND
                    );
                });


        // -----------------------------------------------------
        // VALIDATE USER ROLE
        // -----------------------------------------------------

        if (user.getRole() != Role.TECHNICIAN) {

            log.warn(
                    "User is not a technician: email={}, role={}",
                    request.getEmail(),
                    user.getRole()
            );

            throw new KeystoneException(
                    com.keystone.enums.ErrorCode.TECHNICIAN_ACCESS_DENIED
            );
        }


        // -----------------------------------------------------
        // CHECK EXISTING TECHNICIAN PROFILE
        // -----------------------------------------------------

        helper.validateTechnicianNotExistsForUser(
                user.getId()
        );


        // -----------------------------------------------------
        // UPDATE USER INFORMATION
        // -----------------------------------------------------

        mapper.updateUser(
                user,
                request
        );


        // -----------------------------------------------------
        // CREATE TECHNICIAN
        // -----------------------------------------------------

        Technician technician =
                mapper.mapToEntity(
                        request,
                        user
                );


        // -----------------------------------------------------
        // SAVE USER
        // -----------------------------------------------------

        userRepository.save(user);


        // -----------------------------------------------------
        // SAVE TECHNICIAN
        // -----------------------------------------------------

        Technician savedTechnician =
                technicianRepository.save(
                        technician
                );


        log.info(
                "Technician created successfully: technicianId={}",
                savedTechnician.getId()
        );


        // -----------------------------------------------------
        // RESPONSE
        // -----------------------------------------------------

        return mapper.mapToResponse(
                savedTechnician
        );
    }


    // =========================================================
    // GET ALL TECHNICIANS
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public List<TechnicianResponse> getAllTechnicians() {

        log.info(
                "Fetching all technicians"
        );

        return technicianRepository
                .findAll()
                .stream()
                .map(mapper::mapToResponse)
                .toList();
    }
    
	 // =========================================================
	 // GET AVAILABLE TECHNICIANS
	 // =========================================================
	
	 @Override
	 @Transactional(readOnly = true)
	 public List<TechnicianResponse> getAvailableTechnicians() {
	
	     log.info(
	             "Fetching available technicians"
	     );
	
	     return technicianRepository
	             .findByActiveTrueAndAvailableTrue()
	             .stream()
	             .map(mapper::mapToResponse)
	             .toList();
	 }


    // =========================================================
    // GET TECHNICIAN BY ID
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public TechnicianResponse getTechnicianById(
            Long id) {

        log.info(
                "Fetching technician: technicianId={}",
                id
        );

        helper.validateTechnicianId(id);

        Technician technician =
                helper.getTechnicianById(id);

        return mapper.mapToResponse(
                technician
        );
    }


    // =========================================================
    // UPDATE TECHNICIAN
    // =========================================================

    @Override
    public TechnicianResponse updateTechnician(
            Long id,
            TechnicianRequest request) {

        log.info(
                "Updating technician: technicianId={}",
                id
        );


        // -----------------------------------------------------
        // FETCH EXISTING TECHNICIAN
        // -----------------------------------------------------

        helper.validateTechnicianId(id);

        Technician technician =
                helper.getTechnicianById(id);

        helper.validateTechnicianCanBeUpdated(
                technician
        );


        // -----------------------------------------------------
        // VALIDATION
        // -----------------------------------------------------

        helper.validateFirstName(
                request.getFirstName()
        );

        helper.validateLastName(
                request.getLastName()
        );

        helper.validateEmail(
                request.getEmail()
        );

        helper.validatePhone(
                request.getPhone()
        );

        helper.validateSpecialization(
                request.getSpecialization()
        );


        // -----------------------------------------------------
        // GET ASSOCIATED USER
        // -----------------------------------------------------

        helper.validateUser(
                technician
        );

        User user =
                technician.getUser();


        // -----------------------------------------------------
        // CHECK EMAIL CHANGE
        // -----------------------------------------------------

        if (!user.getEmail()
                .equalsIgnoreCase(request.getEmail())) {

            userRepository
                    .findByEmail(request.getEmail())
                    .ifPresent(existingUser -> {

                        if (!existingUser
                                .getId()
                                .equals(user.getId())) {

                            throw new KeystoneException(
                                    com.keystone.enums.ErrorCode
                                            .DUPLICATE_CUSTOMER_EMAIL
                            );
                        }
                    });
        }


        // -----------------------------------------------------
        // UPDATE USER
        // -----------------------------------------------------

        mapper.updateUser(
                user,
                request
        );


        // -----------------------------------------------------
        // UPDATE TECHNICIAN
        // -----------------------------------------------------

        mapper.updateEntity(
                technician,
                request
        );


        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        userRepository.save(user);

        Technician updatedTechnician =
                technicianRepository.save(
                        technician
                );


        log.info(
                "Technician updated successfully: technicianId={}",
                id
        );


        // -----------------------------------------------------
        // RESPONSE
        // -----------------------------------------------------

        return mapper.mapToResponse(
                updatedTechnician
        );
    }


    // =========================================================
    // DELETE TECHNICIAN
    // =========================================================

    @Override
    public void deleteTechnician(
            Long id) {

        log.info(
                "Deleting technician: technicianId={}",
                id
        );


        // -----------------------------------------------------
        // FETCH TECHNICIAN
        // -----------------------------------------------------

        helper.validateTechnicianId(id);

        Technician technician =
                helper.getTechnicianById(id);


        // -----------------------------------------------------
        // VALIDATE DELETE
        // -----------------------------------------------------

        helper.validateTechnicianCanBeDeleted(
                technician
        );


        // -----------------------------------------------------
        // DELETE TECHNICIAN
        // -----------------------------------------------------

        technicianRepository.delete(
                technician
        );


        log.info(
                "Technician deleted successfully: technicianId={}",
                id
        );
    }


    // =========================================================
    // GET MY PROFILE
    // =========================================================

    @Override
    @Transactional(readOnly = true)
    public TechnicianResponse getMyProfile(
            String email) {

        log.info(
                "Fetching technician profile: email={}",
                email
        );


        // -----------------------------------------------------
        // GET TECHNICIAN
        // -----------------------------------------------------

        Technician technician =
                helper.getTechnicianByEmail(
                        email
                );


        // -----------------------------------------------------
        // VALIDATE TECHNICIAN
        // -----------------------------------------------------

        helper.validateTechnician(
                technician
        );


        // -----------------------------------------------------
        // RESPONSE
        // -----------------------------------------------------

        return mapper.mapToResponse(
                technician
        );
    }
    
 // =========================================================
 // UPDATE MY AVAILABILITY
 // =========================================================

 @Override
 public TechnicianResponse updateMyAvailability(
         String email,
         Boolean available) {

     log.info(
             "Updating technician availability: email={}, available={}",
             email,
             available
     );


     // -----------------------------------------------------
     // VALIDATE REQUEST
     // -----------------------------------------------------

     if (available == null) {

         throw new KeystoneException(
                 ErrorCode.INVALID_REQUEST
         );
     }


     // -----------------------------------------------------
     // GET TECHNICIAN
     // -----------------------------------------------------

     Technician technician =
             helper.getTechnicianByEmail(
                     email
             );


     // -----------------------------------------------------
     // VALIDATE TECHNICIAN
     // -----------------------------------------------------

     helper.validateTechnician(
             technician
     );


     // -----------------------------------------------------
     // CHECK ACTIVE ACCOUNT
     // -----------------------------------------------------

     if (!technician.isActive()) {

         log.warn(
                 "Inactive technician attempted to change availability: email={}",
                 email
         );

         throw new KeystoneException(
                 com.keystone.enums.ErrorCode.TECHNICIAN_ACCESS_DENIED
         );
     }


     // -----------------------------------------------------
     // UPDATE AVAILABILITY
     // -----------------------------------------------------

     technician.setAvailable(
             available
     );


     // -----------------------------------------------------
     // SAVE
     // -----------------------------------------------------

     Technician updatedTechnician =
             technicianRepository.save(
                     technician
             );


     log.info(
             "Technician availability updated successfully: email={}, available={}",
             email,
             available
     );


     // -----------------------------------------------------
     // RESPONSE
     // -----------------------------------------------------

     return mapper.mapToResponse(
             updatedTechnician
     );
 }
}
