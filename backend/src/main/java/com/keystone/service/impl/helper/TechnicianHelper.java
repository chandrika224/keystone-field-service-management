package com.keystone.service.impl.helper;

import org.springframework.stereotype.Component;

import com.keystone.entity.Technician;
import com.keystone.entity.User;
import com.keystone.enums.ErrorCode;
import com.keystone.enums.Role;
import com.keystone.exception.KeystoneException;
import com.keystone.repository.TechnicianRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class TechnicianHelper {

    private final TechnicianRepository technicianRepository;


    // =========================================================
    // GET TECHNICIAN BY ID
    // =========================================================

    public Technician getTechnicianById(
            Long technicianId) {

        log.debug(
                "Fetching technician: technicianId={}",
                technicianId
        );

        if (technicianId == null) {

            log.warn("Technician ID is null");

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_NOT_FOUND
            );
        }

        return technicianRepository
                .findById(technicianId)
                .orElseThrow(() -> {

                    log.warn(
                            "Technician not found: technicianId={}",
                            technicianId
                    );

                    return new KeystoneException(
                            ErrorCode.TECHNICIAN_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // GET TECHNICIAN BY EMAIL
    // =========================================================

    public Technician getTechnicianByEmail(
            String email) {

        log.debug(
                "Fetching technician by email={}",
                email
        );

        validateEmail(email);

        return technicianRepository
                .findByUser_Email(email)
                .orElseThrow(() -> {

                    log.warn(
                            "Technician not found: email={}",
                            email
                    );

                    return new KeystoneException(
                            ErrorCode.TECHNICIAN_NOT_FOUND
                    );
                });
    }


    // =========================================================
    // VALIDATE TECHNICIAN
    // =========================================================

    public void validateTechnician(
            Technician technician) {

        if (technician == null) {

            log.warn("Technician is null");

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_NOT_FOUND
            );
        }
    }


    // =========================================================
    // VALIDATE TECHNICIAN ID
    // =========================================================

    public void validateTechnicianId(
            Long technicianId) {

        if (technicianId == null) {

            log.warn("Technician ID is null");

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_NOT_FOUND
            );
        }
    }


    // =========================================================
    // VALIDATE EMAIL
    // =========================================================

    public void validateEmail(
            String email) {

        if (email == null
                || email.isBlank()) {

            log.warn(
                    "Technician email is missing"
            );

            throw new KeystoneException(
                    ErrorCode.CUSTOMER_EMAIL_REQUIRED
            );
        }
    }


    // =========================================================
    // VALIDATE FIRST NAME
    // =========================================================

    public void validateFirstName(
            String firstName) {

        if (firstName == null
                || firstName.isBlank()) {

            log.warn(
                    "Technician first name is missing"
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_FIRST_NAME_REQUIRED
            );
        }
    }


    // =========================================================
    // VALIDATE LAST NAME
    // =========================================================

    public void validateLastName(
            String lastName) {

        if (lastName == null
                || lastName.isBlank()) {

            log.warn(
                    "Technician last name is missing"
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_LAST_NAME_REQUIRED
            );
        }
    }


    // =========================================================
    // VALIDATE PHONE
    // =========================================================

    public void validatePhone(
            String phone) {

        if (phone == null
                || phone.isBlank()) {

            log.warn(
                    "Technician phone is missing"
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_PHONE_REQUIRED
            );
        }

        if (!phone.matches(
                "^[0-9]{10}$")) {

            log.warn(
                    "Invalid technician phone number"
            );

            throw new KeystoneException(
                    ErrorCode.INVALID_TECHNICIAN_PHONE
            );
        }
    }


    // =========================================================
    // VALIDATE SPECIALIZATION
    // =========================================================

    public void validateSpecialization(
            String specialization) {

        if (specialization == null
                || specialization.isBlank()) {

            log.warn(
                    "Technician specialization is missing"
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_SPECIALIZATION_REQUIRED
            );
        }
    }


    // =========================================================
    // VALIDATE USER
    // =========================================================

    public void validateUser(
            Technician technician) {

        if (technician == null
                || technician.getUser() == null) {

            log.warn(
                    "Technician does not have an associated user"
            );

            throw new KeystoneException(
                    ErrorCode.USER_NOT_FOUND
            );
        }
    }


    // =========================================================
    // VALIDATE USER ROLE
    // =========================================================

    public void validateTechnicianRole(
            Technician technician) {

        validateUser(technician);

        User user =
                technician.getUser();

        if (user.getRole() != Role.TECHNICIAN) {

            log.warn(
                    "Invalid technician role: technicianId={}, role={}",
                    technician.getId(),
                    user.getRole()
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_ACCESS_DENIED
            );
        }
    }


    // =========================================================
    // VALIDATE TECHNICIAN ACTIVE STATUS
    // =========================================================

    public void validateActiveTechnician(
            Technician technician) {

        validateTechnician(technician);

        if (!technician.isActive()) {

            log.warn(
                    "Technician is inactive: technicianId={}",
                    technician.getId()
            );

            throw new KeystoneException(
                    ErrorCode.TECHNICIAN_INACTIVE
            );
        }
    }


    // =========================================================
    // CHECK DUPLICATE USER
    // =========================================================

    public void validateTechnicianNotExistsForUser(
            Long userId) {

        if (userId == null) {

            throw new KeystoneException(
                    ErrorCode.USER_NOT_FOUND
            );
        }

        if (technicianRepository
                .existsByUser_Id(userId)) {

            log.warn(
                    "Technician profile already exists for userId={}",
                    userId
            );

            throw new KeystoneException(
                    ErrorCode.DUPLICATE_TECHNICIAN
            );
        }
    }


    // =========================================================
    // VALIDATE TECHNICIAN CAN BE UPDATED
    // =========================================================

    public void validateTechnicianCanBeUpdated(
            Technician technician) {

        validateTechnician(technician);
        validateUser(technician);
    }


    // =========================================================
    // VALIDATE TECHNICIAN CAN BE DELETED
    // =========================================================

    public void validateTechnicianCanBeDeleted(
            Technician technician) {

        validateTechnician(technician);
        validateUser(technician);
    }


    // =========================================================
    // SAVE TECHNICIAN
    // =========================================================

    public Technician saveTechnician(
            Technician technician) {

        validateTechnician(technician);

        log.debug(
                "Saving technician"
        );

        return technicianRepository.save(
                technician
        );
    }


    // =========================================================
    // DELETE TECHNICIAN
    // =========================================================

    public void deleteTechnician(
            Technician technician) {

        validateTechnician(technician);

        log.debug(
                "Deleting technician: technicianId={}",
                technician.getId()
        );

        technicianRepository.delete(
                technician
        );
    }
}
