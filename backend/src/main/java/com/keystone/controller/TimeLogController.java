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

import com.keystone.dto.TimeLogRequest;
import com.keystone.dto.TimeLogResponse;
import com.keystone.service.TimeLogService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/timelogs")
@RequiredArgsConstructor
@Slf4j
@Validated
public class TimeLogController {

    private final TimeLogService timeLogService;


    // =========================================================
    // CREATE TIME LOG
    // =========================================================

    @PostMapping("/work-order/{workOrderId}")
    public ResponseEntity<TimeLogResponse> addTimeLog(
            Authentication authentication,
            @PathVariable
            @NotNull
            @Positive
            Long workOrderId,
            @Valid
            @RequestBody
            TimeLogRequest request) {

        String email = authentication.getName();

        log.info(
                "POST /api/timelogs/work-order/{} requested by user={}",
                workOrderId,
                email
        );

        TimeLogResponse response =
                timeLogService.addTimeLog(
                        email,
                        workOrderId,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // =========================================================
    // GET TIME LOGS FOR WORK ORDER
    // =========================================================

    @GetMapping("/work-order/{workOrderId}")
    public ResponseEntity<List<TimeLogResponse>> getTimeLogs(
            Authentication authentication,
            @PathVariable
            @NotNull
            @Positive
            Long workOrderId) {

        String email = authentication.getName();

        log.info(
                "GET /api/timelogs/work-order/{} requested by user={}",
                workOrderId,
                email
        );

        List<TimeLogResponse> response =
                timeLogService.getTimeLogs(
                        email,
                        workOrderId
                );

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // GET MY TIME LOGS
    // =========================================================

    @GetMapping("/my")
    public ResponseEntity<List<TimeLogResponse>> getMyTimeLogs(
            Authentication authentication) {

        String email = authentication.getName();

        log.info(
                "GET /api/timelogs/my requested by user={}",
                email
        );

        List<TimeLogResponse> response =
                timeLogService.getMyTimeLogs(email);

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // GET TIME LOG BY ID
    // =========================================================

    @GetMapping("/{timeLogId}")
    public ResponseEntity<TimeLogResponse> getTimeLogById(
            Authentication authentication,
            @PathVariable
            @NotNull
            @Positive
            Long timeLogId) {

        String email = authentication.getName();

        log.info(
                "GET /api/timelogs/{} requested by user={}",
                timeLogId,
                email
        );

        TimeLogResponse response =
                timeLogService.getTimeLogById(
                        email,
                        timeLogId
                );

        return ResponseEntity.ok(response);
    }


    // =========================================================
    // DELETE TIME LOG
    // =========================================================

    @DeleteMapping("/{timeLogId}")
    public ResponseEntity<Void> deleteTimeLog(
            Authentication authentication,
            @PathVariable
            @NotNull
            @Positive
            Long timeLogId) {

        String email = authentication.getName();

        log.info(
                "DELETE /api/timelogs/{} requested by user={}",
                timeLogId,
                email
        );

        timeLogService.deleteTimeLog(
                email,
                timeLogId
        );

        return ResponseEntity.noContent().build();
    }
}