package com.keystone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.DashboardResponse;
import com.keystone.service.DashboardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/dashboard")
@Tag(name = "Dashboard", description = "Dashboard APIs")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Operation(summary = "Get Dashboard Summary")
    @GetMapping
    public DashboardResponse getDashboard() {
        return dashboardService.getDashboardSummary();
    }
}