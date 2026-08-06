package com.keystone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.TechnicianRequest;
import com.keystone.dto.TechnicianResponse;
import com.keystone.service.TechnicianService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/technicians")
public class TechnicianController {

    @Autowired
    private TechnicianService technicianService;

    // Create Technician
    @PostMapping
    public TechnicianResponse addTechnician(@Valid @RequestBody TechnicianRequest request) {
        return technicianService.addTechnician(request);
    }

    // Get All Technicians
    @GetMapping
    public List<TechnicianResponse> getAllTechnicians() {
        return technicianService.getAllTechnicians();
    }

    // Get Technician By Id
    @GetMapping("/{id}")
    public TechnicianResponse getTechnicianById(@PathVariable Long id) {
        return technicianService.getTechnicianById(id);
    }

    // Update Technician
    @PutMapping("/{id}")
    public TechnicianResponse updateTechnician(@PathVariable Long id,
                                               @Valid @RequestBody TechnicianRequest request) {
        return technicianService.updateTechnician(id, request);
    }

    // Delete Technician
    @DeleteMapping("/{id}")
    public String deleteTechnician(@PathVariable Long id) {
        technicianService.deleteTechnician(id);
        return "Technician deleted successfully";
    }
}