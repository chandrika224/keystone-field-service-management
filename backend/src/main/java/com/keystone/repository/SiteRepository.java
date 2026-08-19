package com.keystone.repository;

import com.keystone.dto.SiteResponse;
import com.keystone.entity.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface SiteRepository extends JpaRepository<Site, Long> {

	List<Site> findByCustomerCustomerId(Long customerId);

    Optional<Site> findByCustomerCustomerIdAndAddressIgnoreCase(
            Long customerId,
            String address
    );
}