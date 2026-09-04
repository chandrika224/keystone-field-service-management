package com.keystone.service.mapper;

import org.springframework.stereotype.Component;

import com.keystone.dto.TechnicianRequest;
import com.keystone.dto.TechnicianResponse;
import com.keystone.entity.Technician;
import com.keystone.entity.User;

@Component
public class TechnicianMapper {

    // =========================================================
    // REQUEST -> USER
    // =========================================================

    public User mapToUser(
            TechnicianRequest request) {

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

        return user;
    }


    // =========================================================
    // REQUEST -> TECHNICIAN
    // =========================================================

    public Technician mapToEntity(
            TechnicianRequest request,
            User user) {

        Technician technician = new Technician();

        technician.setSpecialization(
                request.getSpecialization()
        );

        if (request.getActive() != null) {
            technician.setActive(
                    request.getActive()
            );
        }

        // New technicians are available by default
        technician.setAvailable(true);

        technician.setUser(user);

        return technician;
    }


    // =========================================================
    // TECHNICIAN + USER -> RESPONSE
    // =========================================================

    public TechnicianResponse mapToResponse(
            Technician technician) {

        TechnicianResponse response =
                new TechnicianResponse();

        // -----------------------------------------------------
        // TECHNICIAN
        // -----------------------------------------------------

        response.setId(
                technician.getId()
        );

        response.setSpecialization(
                technician.getSpecialization()
        );

        response.setActive(
                technician.isActive()
        );

        response.setAvailable(
                technician.isAvailable()
        );


        // -----------------------------------------------------
        // USER
        // -----------------------------------------------------

        User user = technician.getUser();

        if (user != null) {

            response.setFirstName(
                    user.getFirstName()
            );

            response.setLastName(
                    user.getLastName()
            );

            response.setEmail(
                    user.getEmail()
            );

            response.setPhone(
                    user.getPhone()
            );

            response.setRole(
                    user.getRole()
            );
        }

        return response;
    }


    // =========================================================
    // UPDATE USER
    // =========================================================

    public void updateUser(
            User user,
            TechnicianRequest request) {

        if (user == null) {
            return;
        }

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
    }


    // =========================================================
    // UPDATE TECHNICIAN
    // =========================================================

    public void updateEntity(
            Technician technician,
            TechnicianRequest request) {

        if (technician == null) {
            return;
        }

        technician.setSpecialization(
                request.getSpecialization()
        );

        if (request.getActive() != null) {

            technician.setActive(
                    request.getActive()
            );
        }
    }
}