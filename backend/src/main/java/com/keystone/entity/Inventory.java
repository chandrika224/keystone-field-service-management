package com.keystone.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "inventory")
@Data
@NoArgsConstructor
public class Inventory {

    // =========================================================
    // ID
    // =========================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventoryId;


    // =========================================================
    // PART INFORMATION
    // =========================================================

    @Column(name = "part_name", nullable = false)
    private String partName;

    @Column(nullable = false)
    private String category;


    // =========================================================
    // STOCK
    // =========================================================

    @Column(nullable = false)
    private Integer quantity;


    // =========================================================
    // PRICE
    // =========================================================

    @Column(name = "unit_price", nullable = false)
    private Double unitPrice;


    // =========================================================
    // SUPPLIER
    // =========================================================

    @Column(nullable = false)
    private String supplier;
}