package com.keystone.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.keystone.dto.SiteRequest;
import com.keystone.dto.SiteResponse;
import com.keystone.entity.Customer;
import com.keystone.entity.Site;
import com.keystone.enums.ErrorCode;
import com.keystone.exception.KeystoneException;
import com.keystone.repository.CustomerRepository;
import com.keystone.repository.SiteRepository;
import com.keystone.service.SiteService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SiteServiceImpl implements SiteService {
	

    private final SiteRepository siteRepository;
    private final CustomerRepository customerRepository;

	@Override
	public SiteResponse createSite(SiteRequest request) {
		
		log.info("Creating site for customerId={}, address={}",
                request.getCustomerId(), request.getAddress());

		
		// ==========================================
        // BUSINESS VALIDATION 1
        // Customer must exist
        // ==========================================

        Customer customer = customerRepository
                .findById(request.getCustomerId())
                
                .orElseThrow(() -> {
                    log.warn("Site creation failed: customerId={} not found", request.getCustomerId());
                    return new KeystoneException(ErrorCode.CUSTOMER_NOT_FOUND);
                });
        
        // ==========================================
        // BUSINESS VALIDATION 2
        // Prevent duplicate site for same customer
        // ==========================================

        siteRepository
        .findByCustomer_CustomerIdAndAddressIgnoreCase(
            customer.getCustomerId(),
            request.getAddress()
        )
        .ifPresent(existingSite -> {
            log.warn("Duplicate site detected for customerId={}, address={}, existingSiteId={}",
                    customer.getCustomerId(), request.getAddress(), existingSite.getId());
            throw new KeystoneException(ErrorCode.DUPLICATE_SITE);
        });
        
     // ==========================================
        // CREATE SITE
        // ==========================================

        Site site = new Site();
        
        site.setName(request.getName());
        site.setAddress(request.getAddress());
        site.setCustomer(customer);
        
        // ==========================================
        // SAVE
        // ==========================================

        Site savedSite = siteRepository.save(site);
        
        log.info("Site created successfully: siteId={}, customerId={}",
                savedSite.getId(), customer.getCustomerId());

        
        // ==========================================
        // RESPONSE
        // ==========================================

        return mapToResponse(savedSite);

	}
	

	@Override
	public List<SiteResponse> getSitesByCustomer(Long customerId) {
		
		log.debug("Fetching sites for customerId={}", customerId);
		
	    if (!customerRepository.existsById(customerId)) {
	        throw new KeystoneException(ErrorCode.CUSTOMER_NOT_FOUND);
	    }

	    List<SiteResponse> sites = siteRepository.findByCustomer_CustomerId(customerId)
                .stream()
                .map(this::mapToResponse)
                .toList();

        log.debug("Found {} site(s) for customerId={}", sites.size(), customerId);

        return sites;
	}

	@Override
	public SiteResponse getSiteById(Long siteId) {
		
		log.debug("Fetching site by siteId={}", siteId);
		
		Site site = siteRepository.findById(siteId)
                .orElseThrow(() -> {
                    log.warn("Site not found: siteId={}", siteId);
                    return new KeystoneException(ErrorCode.SITE_NOT_FOUND);
                });


        return mapToResponse(site);
	}

	
	
	
	@Override
	public void deleteSite(Long siteId) {
		
		 log.info("Deleting site siteId={}", siteId);
		
		 if (!siteRepository.existsById(siteId)) {
	            throw new KeystoneException(ErrorCode.SITE_NOT_FOUND);
	        }

	        siteRepository.deleteById(siteId);
	        log.info("Site deleted successfully: siteId={}", siteId);
		
	}
	
	// ==============================================
    // ENTITY → RESPONSE
    // ==============================================

    private SiteResponse mapToResponse(Site site) {

        SiteResponse response = new SiteResponse();

        response.setId(site.getId());
        response.setName(site.getName());
        response.setAddress(site.getAddress());

        if (site.getCustomer() != null) {
            response.setCustomerId(
                    site.getCustomer().getCustomerId()
            );
        }

        return response;
    }


	@Override
	public SiteResponse updateSite(Long siteId, SiteRequest request) {
	     log.info("Updating siteId={}", siteId);

	        Site site = siteRepository.findById(siteId)
	                .orElseThrow(() -> {
	                    log.warn("Update failed: siteId={} not found", siteId);
	                    return new KeystoneException(ErrorCode.SITE_NOT_FOUND);
	                });

	        Customer customer = customerRepository
	                .findById(request.getCustomerId())
	                .orElseThrow(() -> {
	                    log.warn("Update failed: customerId={} not found", request.getCustomerId());
	                    return new KeystoneException(ErrorCode.CUSTOMER_NOT_FOUND);
	                });

	        boolean duplicateExists = siteRepository
	                .existsByCustomer_CustomerIdAndAddressIgnoreCaseAndIdNot(
	                        customer.getCustomerId(),
	                        request.getAddress(),
	                        siteId
	                );

	        if (duplicateExists) {
	            log.warn("Update failed: duplicate site for customerId={}, address={}",
	                    customer.getCustomerId(), request.getAddress());
	            throw new KeystoneException(ErrorCode.DUPLICATE_SITE);
	        }

	        Long previousCustomerId = site.getCustomer() != null ? site.getCustomer().getCustomerId() : null;

	        site.setName(request.getName());
	        site.setAddress(request.getAddress());
	        site.setCustomer(customer);

	        Site updatedSite = siteRepository.save(site);

	        if (previousCustomerId != null && !previousCustomerId.equals(customer.getCustomerId())) {
	            log.info("Site siteId={} reassigned from customerId={} to customerId={}",
	                    siteId, previousCustomerId, customer.getCustomerId());
	        }

	        log.info("Site updated successfully: siteId={}", updatedSite.getId());

	        return mapToResponse(updatedSite);
	}
    
    
}