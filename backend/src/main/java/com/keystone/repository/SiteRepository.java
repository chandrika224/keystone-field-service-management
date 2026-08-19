package com.keystone.repository;

import com.keystone.entity.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SiteRepository extends JpaRepository<Site, Long> {

    @Query("""
        SELECT s
        FROM Site s
        WHERE s.customer.customerId = :customerId
    """)
    List<Site> findSitesByCustomerId(
            @Param("customerId") Long customerId
    );

    @Query("""
        SELECT s
        FROM Site s
        WHERE s.customer.customerId = :customerId
        AND LOWER(s.address) = LOWER(:address)
    """)
    Optional<Site> findByCustomerIdAndAddress(
            @Param("customerId") Long customerId,
            @Param("address") String address
    );
}