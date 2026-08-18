package com.keystone.service;



import java.util.List;
import java.util.Optional;

import com.keystone.entity.Site;

public interface SiteService {
	 // Get all sites belonging to a customer
    List<Site> getSitesByCustomerId(Long customerId);

    // Find a site by customer and address
    Optional<Site> findByCustomerIdAndAddress(
            Long customerId,
            String address
    );
}