package com.keystone.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.TechnicianResponse;
import com.keystone.service.TechnicianService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/technicians")
@RequiredArgsConstructor
public class TechnicianController {

    private final TechnicianService technicianService;

    // ============================================================
    // GET ALL ACTIVE TECHNICIANS
    // ============================================================

    @GetMapping
    public ResponseEntity<List<TechnicianResponse>> getAllTechnicians() {

        return ResponseEntity.ok(
                technicianService.getAllTechnicians()
        );
    }

    // ============================================================
    // GET TECHNICIAN BY ID
    // ============================================================

    @GetMapping("/{id}")
    public ResponseEntity<TechnicianResponse> getTechnicianById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                technicianService.getTechnicianById(id)
        );
    }
}
