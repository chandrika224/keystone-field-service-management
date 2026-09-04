package com.keystone.dto;

import lombok.Data;

@Data
public class CustomerResponse {

    // =========================================================
    // CUSTOMER
    // =========================================================

    private Long customerId;

    private String customerCode;

    private String customerName;

    private String email;

    private String phone;

    private String address;


    // =========================================================
    // USER
    // =========================================================

    private Long userId;
}
