package com.keystone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.ReportResponse;
import com.keystone.service.ReportService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/reports")
@Tag(name = "Reports", description = "Reporting APIs")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Operation(summary = "Generate Reports")
    @GetMapping
    public ReportResponse generateReport() {
        return reportService.generateReport();
    }
}