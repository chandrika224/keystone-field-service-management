package com.keystone.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "part_usage")
@Data
@NoArgsConstructor
public class PartUsage {

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
    // INVENTORY
    // =========================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Inventory inventory;


    // =========================================================
    // QUANTITY USED
    // =========================================================

    @Column(name = "quantity_used")
    private Integer quantityUsed;
}