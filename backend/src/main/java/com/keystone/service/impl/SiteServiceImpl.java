package com.keystone.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.keystone.entity.Site;
import com.keystone.repository.SiteRepository;
import com.keystone.service.SiteService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SiteServiceImpl implements SiteService {

    private final SiteRepository siteRepository;


    @Override
    public List<Site> getSitesByCustomerId(Long customerId) {
        return siteRepository.findByCustomerId(customerId);
    }

    @Override
    public Optional<Site> findByCustomerIdAndAddress(
            Long customerId,
            String address) {

        return siteRepository.findByCustomerIdAndAddressIgnoreCase(
                customerId,
                address
        );
    }
}