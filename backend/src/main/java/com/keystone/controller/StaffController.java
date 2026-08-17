package com.keystone.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.staff.CreateStaffRequest;
import com.keystone.dto.staff.StaffDetailsResponse;
import com.keystone.dto.staff.StaffResponse;
import com.keystone.dto.staff.StaffStatusUpdateRequest;
import com.keystone.dto.staff.UpdateStaffRequest;
import com.keystone.service.StaffService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;


    // =========================================================
    // CREATE STAFF
    // POST /api/staff
    // =========================================================

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StaffResponse> createStaff(
            @Valid @RequestBody CreateStaffRequest request) {

        StaffResponse response =
                staffService.createStaff(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // =========================================================
    // GET ALL STAFF
    // GET /api/staff
    // =========================================================

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<StaffDetailsResponse>> getAllStaff() {

        List<StaffDetailsResponse> staff =
                staffService.getAllStaff();

        return ResponseEntity.ok(staff);
    }


    // =========================================================
    // GET STAFF BY ID
    // GET /api/staff/{id}
    // =========================================================

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StaffDetailsResponse> getStaffById(
            @PathVariable Long id) {

        StaffDetailsResponse response =
                staffService.getStaffById(id);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // UPDATE STAFF
    // PUT /api/staff/{id}
    // =========================================================

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StaffDetailsResponse> updateStaff(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStaffRequest request) {

        StaffDetailsResponse response =
                staffService.updateStaff(id, request);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // ACTIVATE / DEACTIVATE STAFF
    // PATCH /api/staff/{id}/status
    // =========================================================

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StaffDetailsResponse> updateStaffStatus(
            @PathVariable Long id,
            @Valid @RequestBody StaffStatusUpdateRequest request) {

        StaffDetailsResponse response =
                staffService.updateStaffStatus(
                        id,
                        request
                );

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // DELETE STAFF
    // DELETE /api/staff/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteStaff(
            @PathVariable Long id) {

        staffService.deleteStaff(id);

        return staffService.deleteStaff(id);
    }
}