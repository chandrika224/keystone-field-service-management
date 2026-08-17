package com.keystone.service;

import java.util.List;

import com.keystone.dto.staff.CreateStaffRequest;
import com.keystone.dto.staff.StaffDetailsResponse;
import com.keystone.dto.staff.StaffResponse;
import com.keystone.dto.staff.StaffStatusUpdateRequest;
import com.keystone.dto.staff.UpdateStaffRequest;

public interface StaffService {
	
	// CREATE
	StaffResponse createStaff(CreateStaffRequest request);
	
	// READ ALL
    List<StaffDetailsResponse> getAllStaff();

    // READ ONE
    StaffDetailsResponse getStaffById(Long id);

    // UPDATE
    StaffDetailsResponse updateStaff(
            Long id,
            UpdateStaffRequest request
    );

    // ACTIVATE / DEACTIVATE
    StaffDetailsResponse updateStaffStatus(
            Long id,
            StaffStatusUpdateRequest request
    );

    // DELETE
    String deleteStaff(Long id);

}
