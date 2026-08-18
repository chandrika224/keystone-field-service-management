

// ==============================
// Types
// ==============================

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

export interface CustomerResponse {
  content: Customer[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export interface WorkOrder {
  id: number;
  title: string;
  description: string;
  serviceType: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: string;
  scheduledDate: string | null;
  completedDate: string | null;
  address: string | null;
  customerId: number | null;
  customerName: string;
  technicianId: number | null;
  technicianName: string;
  createdAt: string | null;
  assignedAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  slaDueDate: string | null;
  slaBreached: boolean;
  message: string | null;
}

export interface Technician {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  active: boolean;
  role: "TECHNICIAN";
  activeJobs: number;
}


// ==============================
// Customer API
// ==============================

export const getAllCustomers = async (): Promise<CustomerResponse> => {
  const response = await api.get<CustomerResponse>("/customers");

  return response.data;
};


// ==============================
// Work Order API
// ==============================

export const getAllWorkOrders = async (): Promise<WorkOrder[]> => {
  const response = await api.get<WorkOrder[]>("/workorders");

  return response.data;
};


// ==============================
// Technician API
// ==============================

export const getAllTechnicians = async (): Promise<Technician[]> => {
  const response = await api.get<Technician[]>("/technicians");

  return response.data;
};