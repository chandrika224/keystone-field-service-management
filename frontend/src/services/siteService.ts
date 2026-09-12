import api from "@/lib/api";
import type { Site, SiteRequest, SiteResponse } from "@/types/site";

export const siteService = {
  // ==========================================
  // GET ALL SITES FOR CUSTOMER
  // GET /api/sites/customer/{customerId}
  // ==========================================
  getSitesByCustomerId: async (customerId: number): Promise<Site[]> => {
    const response = await api.get<Site[]>(
      `/sites/customer/${customerId}`
    );

    return response.data;
  },

  // ==========================================
  // CREATE SITE
  // POST /api/sites
  // ==========================================
  createSite: async (
    request: SiteRequest
  ): Promise<SiteResponse> => {
    const response = await api.post<SiteResponse>(
      "/sites",
      request
    );

    return response.data;
  },

  // ==========================================
  // GET SITE BY ID
  // GET /api/sites/{siteId}
  // ==========================================
  getSiteById: async (siteId: number): Promise<SiteResponse> => {
    const response = await api.get<SiteResponse>(
      `/sites/${siteId}`
    );

    return response.data;
  },

  // ==========================================
  // UPDATE SITE
  // PUT /api/sites/{siteId}
  // ==========================================
  updateSite: async (
    siteId: number,
    request: SiteRequest
  ): Promise<SiteResponse> => {
    const response = await api.put<SiteResponse>(
      `/sites/${siteId}`,
      request
    );

    return response.data;
  },

  // ==========================================
  // DELETE SITE
  // DELETE /api/sites/{siteId}
  // ==========================================
  deleteSite: async (siteId: number): Promise<void> => {
    await api.delete(`/sites/${siteId}`);
  },
};