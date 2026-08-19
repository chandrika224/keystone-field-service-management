package com.keystone.service;


import java.util.List;
import java.util.Optional;

import com.keystone.entity.Site;

public interface SiteService {

    List<Site> getSitesByCustomerId(Long customerId);

    Optional<Site> findByCustomerIdAndAddress(
            Long customerId,
            String address
    );
}