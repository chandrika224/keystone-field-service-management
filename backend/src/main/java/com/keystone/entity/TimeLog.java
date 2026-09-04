package com.keystone.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "time_logs")
@Data
@NoArgsConstructor
public class TimeLog {

    // =========================================================
    // ID
    // =========================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =========================================================
    // WORK ORDER
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_order_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private WorkOrder workOrder;


    // =========================================================
    // TECHNICIAN
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "technician_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Technician technician;


    // =========================================================
    // WORK TIME
    // =========================================================

    @Column(name = "minutes_worked")
    private Integer minutesWorked;


    // =========================================================
    // NOTES
    // =========================================================

    @Column(name = "notes")
    private String notes;


    // =========================================================
    // LOGGED TIME
    // =========================================================

    @Column(name = "logged_at")
    private LocalDateTime loggedAt;


    // =========================================================
    // PRE-PERSIST
    // =========================================================

    @PrePersist
    protected void prePersist() {

        if (loggedAt == null) {
            loggedAt = LocalDateTime.now();
        }
    }
}