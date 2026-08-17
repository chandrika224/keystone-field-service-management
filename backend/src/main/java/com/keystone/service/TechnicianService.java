package com.keystone.service;

import java.util.List;

import com.keystone.dto.TechnicianResponse;

public interface TechnicianService {
	
	List<TechnicianResponse> getAllTechnicians();

    TechnicianResponse getTechnicianById(Long id);

}
