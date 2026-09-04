package com.keystone.service;

import java.util.List;
import java.util.Optional;

import com.keystone.dto.SiteRequest;
import com.keystone.dto.SiteResponse;
import com.keystone.entity.Site;

public interface SiteService {
	
	public SiteResponse createSite(SiteRequest request);

	public List<SiteResponse> getSitesByCustomer(
            Long customerId);

	public SiteResponse getSiteById(Long siteId);
	
	public SiteResponse updateSite(Long siteId, SiteRequest request);
	
	public void deleteSite(Long siteId);
	
	
}