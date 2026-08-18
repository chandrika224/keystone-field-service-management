package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SiteResponse {
    private Long id;
    private String name;
    private String address;
    private Long customerId;
    private String customerName;
    private Long activeWorkOrders;
}