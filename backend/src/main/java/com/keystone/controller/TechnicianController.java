package com.keystone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.keystone.dto.TechnicianRequest;
import com.keystone.dto.TechnicianResponse;
import com.keystone.service.TechnicianService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/technicians")
@Tag(name = "Technician", description = "Technician Management APIs")
public class TechnicianController {

    @Autowired
    private TechnicianService technicianService;

    @Operation(summary = "Create Technician")
    @PostMapping
    public TechnicianResponse addTechnician(@Valid @RequestBody TechnicianRequest request) {
        return technicianService.addTechnician(request);
    }

    @Operation(summary = "Get All Technicians")
    @GetMapping
    public List<TechnicianResponse> getAllTechnicians() {
        return technicianService.getAllTechnicians();
    }

    @Operation(summary = "Get Technician By ID")
    @GetMapping("/{id}")
    public TechnicianResponse getTechnicianById(@PathVariable Long id) {
        return technicianService.getTechnicianById(id);
    }

    @Operation(summary = "Update Technician")
    @PutMapping("/{id}")
    public TechnicianResponse updateTechnician(
            @PathVariable Long id,
            @Valid @RequestBody TechnicianRequest request) {

        return technicianService.updateTechnician(id, request);
    }

    @Operation(summary = "Delete Technician")
    @DeleteMapping("/{id}")
    public String deleteTechnician(@PathVariable Long id) {
        technicianService.deleteTechnician(id);
        return "Technician deleted successfully";
    }
}