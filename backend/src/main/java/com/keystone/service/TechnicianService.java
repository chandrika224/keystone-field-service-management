package com.keystone.service;

import java.util.List;

import com.keystone.dto.TechnicianRequest;
import com.keystone.dto.TechnicianResponse;

public interface TechnicianService {

    TechnicianResponse addTechnician(
            TechnicianRequest request);

    List<TechnicianResponse> getAllTechnicians();

    TechnicianResponse getTechnicianById(
            Long id);

    TechnicianResponse updateTechnician(
            Long id,
            TechnicianRequest request);

    void deleteTechnician(Long id);

	TechnicianResponse getMyProfile(String email);
}