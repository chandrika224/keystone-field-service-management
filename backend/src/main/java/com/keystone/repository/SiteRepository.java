package com.keystone.repository;

import com.keystone.dto.SiteResponse;
import com.keystone.entity.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface SiteRepository extends JpaRepository<Site, Long> {

    List<Site> findByCustomerId(Long customerId);

    Optional<Site> findByIdAndCustomerId(Long siteId, Long customerId);

    Optional<Site> findByAddressIgnoreCaseAndCustomerId(
        String address,
        Long customerId
    );
}