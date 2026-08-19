package com.keystone.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {

    private Long id;
    private String customerCode;
    private String companyName;
    private String contactPerson;
    private String email;
    private String phone;
    private long sitesCount;
    private long activeWorkOrders;
}