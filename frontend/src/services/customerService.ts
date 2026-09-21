import api from "@/lib/api";
import type { Customer } from "@/types/customer";

export interface CustomerPage {
  content: Customer[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export const customerService = {
  getAllCustomers: async (
    page = 0,
    size = 20
  ): Promise<CustomerPage> => {
    const response = await api.get<CustomerPage>(
      `/customers?page=${page}&size=${size}&sort=customerName`
    );

    return response.data;
  },

  getCustomerById: async (
    customerId: number
  ): Promise<Customer> => {
    const response = await api.get<Customer>(
      `/customers/${customerId}`
    );

    return response.data;
  },
};