package com.keystone.repository;

import com.keystone.entity.Customer;

import com.keystone.entity.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {

    List<Site> findByCustomer_CustomerId(Long customerId);

    Optional<Site> findByCustomer_CustomerIdAndAddressIgnoreCase(
            Long customerId,
            String address
    );

    boolean existsByCustomer_CustomerIdAndAddressIgnoreCase(
            Long customerId,
            String address
    );
    
    boolean existsByCustomer_CustomerIdAndAddressIgnoreCaseAndIdNot(
            Long customerId,
            String address,
            Long siteId
    );


}