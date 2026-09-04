package com.keystone.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keystone.dto.PartUsageRequest;
import com.keystone.dto.PartUsageResponse;
import com.keystone.service.PartUsageService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/part-usage")
@RequiredArgsConstructor
@Slf4j
@Validated
public class PartUsageController {

    private final PartUsageService partUsageService;


    // =========================================================
    // ADD PART USAGE
    // =========================================================

    @PostMapping("/work-order/{workOrderId}")
    public ResponseEntity<PartUsageResponse> addPartUsage(
            Authentication authentication,

            @PathVariable
            @NotNull
            @Positive
            Long workOrderId,

            @Valid
            @RequestBody
            PartUsageRequest request) {

        String email = authentication.getName();

        log.info(
                "REST request to add part usage: email={}, workOrderId={}",
                email,
                workOrderId
        );

        PartUsageResponse response =
                partUsageService.addPartUsage(
                        email,
                        workOrderId,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // =========================================================
    // GET PART USAGE FOR WORK ORDER
    // =========================================================

    @GetMapping("/work-order/{workOrderId}")
    public ResponseEntity<List<PartUsageResponse>> getPartUsage(
            Authentication authentication,

            @PathVariable
            @NotNull
            @Positive
            Long workOrderId) {

        String email = authentication.getName();

        log.info(
                "REST request to get part usage: email={}, workOrderId={}",
                email,
                workOrderId
        );

        List<PartUsageResponse> response =
                partUsageService.getPartUsage(
                        email,
                        workOrderId
                );

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // GET MY PART USAGE
    // =========================================================

    @GetMapping("/my")
    public ResponseEntity<List<PartUsageResponse>> getMyPartUsage(
            Authentication authentication) {

        String email = authentication.getName();

        log.info(
                "REST request to get technician part usage: email={}",
                email
        );

        List<PartUsageResponse> response =
                partUsageService.getMyPartUsage(
                        email
                );

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // GET PART USAGE BY ID
    // =========================================================

    @GetMapping("/{partUsageId}")
    public ResponseEntity<PartUsageResponse> getPartUsageById(
            Authentication authentication,

            @PathVariable
            @NotNull
            @Positive
            Long partUsageId) {

        String email = authentication.getName();

        log.info(
                "REST request to get part usage: email={}, partUsageId={}",
                email,
                partUsageId
        );

        PartUsageResponse response =
                partUsageService.getPartUsageById(
                        email,
                        partUsageId
                );

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // DELETE PART USAGE
    // =========================================================

    @DeleteMapping("/{partUsageId}")
    public ResponseEntity<Void> deletePartUsage(
            Authentication authentication,

            @PathVariable
            @NotNull
            @Positive
            Long partUsageId) {

        String email = authentication.getName();

        log.info(
                "REST request to delete part usage: email={}, partUsageId={}",
                email,
                partUsageId
        );

        partUsageService.deletePartUsage(
                email,
                partUsageId
        );

        return ResponseEntity.noContent().build();
    }
}
