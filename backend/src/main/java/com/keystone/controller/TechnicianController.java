package com.keystone.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.TechnicianAvailabilityRequest;
import com.keystone.dto.TechnicianRequest;
import com.keystone.dto.TechnicianResponse;
import com.keystone.service.TechnicianService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/technicians")
@RequiredArgsConstructor
@Slf4j
public class TechnicianController {

    private final TechnicianService technicianService;


    // =========================================================
    // ADD TECHNICIAN
    // =========================================================

    @PostMapping
    public ResponseEntity<TechnicianResponse> addTechnician(
            @Valid @RequestBody TechnicianRequest request) {

        log.info(
                "REST request to create technician: email={}",
                request.getEmail()
        );

        TechnicianResponse response =
                technicianService.addTechnician(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // =========================================================
    // GET ALL TECHNICIANS
    // =========================================================

    @GetMapping
    public ResponseEntity<List<TechnicianResponse>>
            getAllTechnicians() {

        log.info(
                "REST request to fetch all technicians"
        );

        List<TechnicianResponse> response =
                technicianService.getAllTechnicians();

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // GET AVAILABLE TECHNICIANS
    // =========================================================

    @GetMapping("/available")
    public ResponseEntity<List<TechnicianResponse>>
            getAvailableTechnicians() {

        log.info(
                "REST request to fetch available technicians"
        );

        List<TechnicianResponse> response =
                technicianService.getAvailableTechnicians();

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // GET MY PROFILE
    // =========================================================

    @GetMapping("/me")
    public ResponseEntity<TechnicianResponse>
            getMyProfile(
                    Authentication authentication) {

        String email =
                authentication.getName();

        log.info(
                "REST request to fetch technician profile: email={}",
                email
        );

        TechnicianResponse response =
                technicianService.getMyProfile(email);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // UPDATE MY AVAILABILITY
    // =========================================================

    @PatchMapping("/me/availability")
    public ResponseEntity<TechnicianResponse>
            updateMyAvailability(
                    Authentication authentication,
                    @Valid @RequestBody
                    TechnicianAvailabilityRequest request) {

        String email =
                authentication.getName();

        log.info(
                "REST request to update technician availability: email={}, available={}",
                email,
                request.getAvailable()
        );

        TechnicianResponse response =
                technicianService.updateMyAvailability(
                        email,
                        request.getAvailable()
                );

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // GET TECHNICIAN BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<TechnicianResponse>
            getTechnicianById(
                    @PathVariable Long id) {

        log.info(
                "REST request to fetch technician: technicianId={}",
                id
        );

        TechnicianResponse response =
                technicianService.getTechnicianById(id);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // UPDATE TECHNICIAN
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<TechnicianResponse>
            updateTechnician(
                    @PathVariable Long id,
                    @Valid @RequestBody TechnicianRequest request) {

        log.info(
                "REST request to update technician: technicianId={}",
                id
        );

        TechnicianResponse response =
                technicianService.updateTechnician(
                        id,
                        request
                );

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // DELETE TECHNICIAN
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechnician(
            @PathVariable Long id) {

        log.info(
                "REST request to delete technician: technicianId={}",
                id
        );

        technicianService.deleteTechnician(id);

        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/debug-authorities")
    public ResponseEntity<?> debugAuthorities(
            Authentication authentication) {

        return ResponseEntity.ok(
                authentication.getAuthorities()
        );
    }
}