package com.keystone.service;

import java.util.List;

import com.keystone.dto.TimeLogRequest;
import com.keystone.dto.TimeLogResponse;

public interface TimeLogService {

    // =========================================================
    // CREATE TIME LOG
    // =========================================================

    TimeLogResponse addTimeLog(
            String email,
            Long workOrderId,
            TimeLogRequest request
    );


    // =========================================================
    // GET TIME LOGS FOR WORK ORDER
    // =========================================================

    List<TimeLogResponse> getTimeLogs(
            String email,
            Long workOrderId
    );


    // =========================================================
    // GET MY TIME LOGS
    // =========================================================

    List<TimeLogResponse> getMyTimeLogs(
            String email
    );


    // =========================================================
    // GET TIME LOG BY ID
    // =========================================================

    TimeLogResponse getTimeLogById(
            String email,
            Long timeLogId
    );


    // =========================================================
    // DELETE TIME LOG
    // =========================================================

    void deleteTimeLog(
            String email,
            Long timeLogId
    );
}