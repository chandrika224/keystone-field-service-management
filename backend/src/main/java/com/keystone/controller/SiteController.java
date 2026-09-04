package com.keystone.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.SiteRequest;
import com.keystone.dto.SiteResponse;
import com.keystone.service.SiteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/sites")
@RequiredArgsConstructor
@Slf4j
public class SiteController {

    private final SiteService siteService;
    
    // ==========================================
    // CREATE SITE
    // POST /api/sites
    // ==========================================
    @PostMapping
    public ResponseEntity<SiteResponse> createSite(
            @Valid @RequestBody SiteRequest request) {

        log.info("Received request to create site: customerId={}", request.getCustomerId());

        SiteResponse response = siteService.createSite(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
    
    // ==========================================
    // GET SITES BY CUSTOMER
    // GET /api/sites/customer/{customerId}
    // ==========================================
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<SiteResponse>> getSitesByCustomer(
            @PathVariable Long customerId) {

        log.info("Received request to fetch sites for customerId={}", customerId);

        List<SiteResponse> sites = siteService.getSitesByCustomer(customerId);

        return ResponseEntity.ok(sites);
    }
    
 // ==========================================
    // GET SITE BY ID
    // GET /api/sites/{siteId}
    // ==========================================
    @GetMapping("/{siteId}")
    public ResponseEntity<SiteResponse> getSiteById(
            @PathVariable Long siteId) {

        log.info("Received request to fetch siteId={}", siteId);

        SiteResponse site = siteService.getSiteById(siteId);

        return ResponseEntity.ok(site);
    }
    
	 // ==========================================
	 // UPDATE SITE
	 // PUT /api/sites/{siteId}
	 // ==========================================
	 @PutMapping("/{siteId}")
	 public ResponseEntity<SiteResponse> updateSite(
	         @PathVariable Long siteId,
	         @Valid @RequestBody SiteRequest request) {
	
	     log.info("Received request to update siteId={}", siteId);
	
	     SiteResponse response = siteService.updateSite(siteId, request);
	
	     return ResponseEntity.ok(response);
	 }
  
    @DeleteMapping("/{siteId}")
    public ResponseEntity<Void> deleteSite(
            @PathVariable Long siteId) {

        log.info("Received request to delete siteId={}", siteId);

        siteService.deleteSite(siteId);

        return ResponseEntity.noContent().build();
    }
    
    
}