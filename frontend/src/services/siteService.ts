import api from "@/lib/api";

export interface Site {
  id: number;
  name: string;
  address: string;
  customerId: number;
  customerName: string;
  activeWorkOrders: number;
}

export const siteService = {

  getAllSites: async (): Promise<Site[]> => {
    const response = await api.get<Site[]>("/sites");

    return response.data;
  },

  getSitesByCustomerId: async (
    customerId: number
  ): Promise<Site[]> => {

    const response = await api.get<Site[]>(
      `/sites/customer/${customerId}`
    );

    return response.data;
  },

};