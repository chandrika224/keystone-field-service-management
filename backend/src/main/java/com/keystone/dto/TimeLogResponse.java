package com.keystone.dto;

import java.time.LocalDateTime;

public class TimeLogResponse {

    private Long id;
    private String technicianName;
    private Integer minutesWorked;
    private String notes;
    private LocalDateTime loggedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTechnicianName() {
        return technicianName;
    }

    public void setTechnicianName(String technicianName) {
        this.technicianName = technicianName;
    }

    public Integer getMinutesWorked() {
        return minutesWorked;
    }

    public void setMinutesWorked(Integer minutesWorked) {
        this.minutesWorked = minutesWorked;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getLoggedAt() {
        return loggedAt;
    }

    public void setLoggedAt(LocalDateTime loggedAt) {
        this.loggedAt = loggedAt;
    }
}