package com.keystone.service;

import java.util.List;

import com.keystone.dto.TechnicianRequest;
import com.keystone.dto.TechnicianResponse;

public interface TechnicianService {

    // =========================================================
    // CREATE TECHNICIAN
    // =========================================================

    TechnicianResponse addTechnician(
            TechnicianRequest request
    );


    // =========================================================
    // GET ALL TECHNICIANS
    // =========================================================

    List<TechnicianResponse> getAllTechnicians();


    // =========================================================
    // GET AVAILABLE TECHNICIANS
    // =========================================================

    List<TechnicianResponse> getAvailableTechnicians();


    // =========================================================
    // GET TECHNICIAN BY ID
    // =========================================================

    TechnicianResponse getTechnicianById(
            Long id
    );


    // =========================================================
    // UPDATE TECHNICIAN
    // =========================================================

    TechnicianResponse updateTechnician(
            Long id,
            TechnicianRequest request
    );


    // =========================================================
    // DELETE TECHNICIAN
    // =========================================================

    void deleteTechnician(
            Long id
    );


    // =========================================================
    // MY PROFILE
    // =========================================================

    TechnicianResponse getMyProfile(
            String email
    );


    // =========================================================
    // UPDATE MY AVAILABILITY
    // =========================================================

    TechnicianResponse updateMyAvailability(
            String email,
            Boolean available
    );
}