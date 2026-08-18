import api from "@/lib/api";

export interface Customer {
  customerId: number;
  customerCode: string | null;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  user: unknown | null;
}

export interface CustomerPageResponse {
  content: Customer[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const customerService = {
  getAllCustomers: async (): Promise<CustomerPageResponse> => {
    const response = await api.get<CustomerPageResponse>(
      "/customers"
    );

    return response.data;
  },
};