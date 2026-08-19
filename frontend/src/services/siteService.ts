import api from "@/lib/api";


export interface Site {
  id: number;
  name: string;
  address: string;
}

export const siteService = {

  getSitesByCustomerId: async (
    customerId: number
  ): Promise<Site[]> => {

    const response =
      await api.get<Site[]>(
        `/api/sites/customer/${customerId}`
      );

    return response.data;
  },
};