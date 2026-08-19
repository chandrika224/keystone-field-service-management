package com.keystone.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.keystone.dto.SiteResponse;
import com.keystone.entity.Site;
import com.keystone.repository.SiteRepository;
import com.keystone.service.SiteService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SiteServiceImpl implements SiteService {

    private final SiteRepository siteRepository;
    
    @Override
    public List<SiteResponse> getAllSites() {

        List<Site> sites = siteRepository.findAll();

        return sites.stream()
                .map(site -> SiteResponse.builder()
                        .id(site.getId())
                        .name(site.getName())
                        .address(site.getAddress())
                        .customerId(site.getCustomer().getCustomerId())
                        .customerName(site.getCustomer().getCustomerName())
                        .activeWorkOrders(0L)
                        .build())
                .toList();
    }

    @Override
    public List<SiteResponse> getSitesByCustomerId(Long customerId) {

        List<Site> sites =
                siteRepository.findSitesByCustomerId(customerId);

        return sites.stream()
                .map(site -> SiteResponse.builder()
                        .id(site.getId())
                        .name(site.getName())
                        .address(site.getAddress())
                        .customerId(site.getCustomer().getCustomerId())
                        .customerName(site.getCustomer().getCustomerName())
                        .activeWorkOrders(0L)
                        .build())
                .toList();
    }

    @Override
    public Optional<Site> findByCustomerIdAndAddress(
            Long customerId,
            String address) {

        return siteRepository.findByCustomerIdAndAddress(
                customerId,
                address
        );
    }
}