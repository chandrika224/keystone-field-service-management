package com.keystone.service;

import java.util.List;

import com.keystone.dto.PartUsageRequest;
import com.keystone.dto.PartUsageResponse;

public interface PartUsageService {

    // =========================================================
    // CREATE PART USAGE
    // =========================================================

    PartUsageResponse addPartUsage(
            String email,
            Long workOrderId,
            PartUsageRequest request
    );


    // =========================================================
    // GET PART USAGE FOR WORK ORDER
    // =========================================================

    List<PartUsageResponse> getPartUsage(
            String email,
            Long workOrderId
    );


    // =========================================================
    // GET MY PART USAGE
    // =========================================================

    List<PartUsageResponse> getMyPartUsage(
            String email
    );


    // =========================================================
    // GET PART USAGE BY ID
    // =========================================================

    PartUsageResponse getPartUsageById(
            String email,
            Long partUsageId
    );


    // =========================================================
    // DELETE PART USAGE
    // =========================================================

    void deletePartUsage(
            String email,
            Long partUsageId
    );
}