package com.keystone.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.SiteResponse;
import com.keystone.service.SiteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/sites")
@RequiredArgsConstructor
public class SiteController {

    private final SiteService siteService;
    
 // Get all sites
    @GetMapping
    public ResponseEntity<List<SiteResponse>> getAllSites() {

        List<SiteResponse> sites =
                siteService.getAllSites();

        return ResponseEntity.ok(sites);
    }

    // Get all sites belonging to a customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<SiteResponse>> getSitesByCustomerId(
            @PathVariable Long customerId) {

        List<SiteResponse> sites =
                siteService.getSitesByCustomerId(customerId);

        return ResponseEntity.ok(sites);
    }
}