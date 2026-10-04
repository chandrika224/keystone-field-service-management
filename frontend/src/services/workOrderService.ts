import api from "@/lib/api";

import type {
  CustomerWorkOrder,
  DispatcherWorkOrder,
  TechnicianWorkOrder,
  WorkOrderPriority,
  WorkOrderStatus,
} from "@/types/workOrder";

type CustomerWorkOrderRequest = {
  title: string;
  description: string;
  serviceType: string;
  priority: WorkOrderPriority;
  scheduledDate: string;
  siteId: number;
};

export const workOrderService = {
  // ============================================================
  // DISPATCHER
  // ============================================================

  getAllWorkOrders: async (): Promise<DispatcherWorkOrder[]> => {
    const response = await api.get<DispatcherWorkOrder[]>("/workorders");
    return response.data;
  },

  getWorkOrderById: async (
    id: number
  ): Promise<DispatcherWorkOrder> => {
    const response = await api.get<DispatcherWorkOrder>(
      `/workorders/${id}`
    );
    return response.data;
  },

  getWorkOrdersByStatus: async (
    status: WorkOrderStatus
  ): Promise<DispatcherWorkOrder[]> => {
    const response = await api.get<DispatcherWorkOrder[]>(
      `/workorders/status/${encodeURIComponent(status)}`
    );
    return response.data;
  },

  getWorkOrdersByPriority: async (
    priority: WorkOrderPriority
  ): Promise<DispatcherWorkOrder[]> => {
    const response = await api.get<DispatcherWorkOrder[]>(
      `/workorders/priority/${encodeURIComponent(priority)}`
    );
    return response.data;
  },

  assignTechnician: async (
    workOrderId: number,
    technicianId: number
  ): Promise<DispatcherWorkOrder> => {
    const response = await api.patch<DispatcherWorkOrder>(
      `/workorders/${workOrderId}/assign`,
      null,
      {
        params: { technicianId },
      }
    );
    return response.data;
  },

  // ============================================================
  // CUSTOMER
  // ============================================================

  getMyWorkOrders: async (
    email: string
  ): Promise<CustomerWorkOrder[]> => {
    const response = await api.get<CustomerWorkOrder[]>(
      "/workorders/my",
      {
        params: { email },
      }
    );
    return response.data;
  },

  createMyWorkOrder: async (
    email: string,
    request: CustomerWorkOrderRequest
  ): Promise<CustomerWorkOrder> => {
    const response = await api.post<CustomerWorkOrder>(
      "/workorders/my",
      request,
      {
        params: { email },
      }
    );
    return response.data;
  },

  updateMyWorkOrder: async (
    email: string,
    id: number,
    request: CustomerWorkOrderRequest
  ): Promise<CustomerWorkOrder> => {
    const response = await api.put<CustomerWorkOrder>(
      `/workorders/my/${id}`,
      request,
      {
        params: { email },
      }
    );
    return response.data;
  },

  // ============================================================
  // TECHNICIAN
  // ============================================================

  getAssignedWorkOrders: async (
    email: string
  ): Promise<TechnicianWorkOrder[]> => {
    const response = await api.get<TechnicianWorkOrder[]>(
      "/workorders/technician/my",
      {
        params: { email },
      }
    );
    return response.data;
  },

  verifyWorkOrderStatus: async (
    workOrderId: number
  ): Promise<TechnicianWorkOrder> => {
    const response = await api.get<TechnicianWorkOrder>(
      `/workorders/${workOrderId}`
    );
    return response.data;
  },

  acceptWorkOrder: async (
    workOrderId: number,
    email: string
  ): Promise<TechnicianWorkOrder> => {
    const response = await api.put<TechnicianWorkOrder>(
      `/workorders/${workOrderId}/accept`,
      null,
      {
        params: { email },
      }
    );
    return response.data;
  },

  startWorkOrder: async (
    workOrderId: number,
    email: string
  ): Promise<TechnicianWorkOrder> => {
    const response = await api.put<TechnicianWorkOrder>(
      `/workorders/${workOrderId}/start`,
      null,
      {
        params: { email },
      }
    );
    return response.data;
  },

  holdWorkOrder: async (
    workOrderId: number,
    email: string
  ): Promise<TechnicianWorkOrder> => {
    const response = await api.put<TechnicianWorkOrder>(
      `/workorders/${workOrderId}/hold`,
      null,
      {
        params: { email },
      }
    );
    return response.data;
  },

  resumeWorkOrder: async (
    workOrderId: number,
    email: string
  ): Promise<TechnicianWorkOrder> => {
    const response = await api.put<TechnicianWorkOrder>(
      `/workorders/${workOrderId}/resume`,
      null,
      {
        params: { email },
      }
    );
    return response.data;
  },

  completeWorkOrder: async (
    workOrderId: number,
    email: string
  ): Promise<TechnicianWorkOrder> => {
    const response = await api.put<TechnicianWorkOrder>(
      `/workorders/${workOrderId}/complete`,
      null,
      {
        params: { email },
      }
    );
    return response.data;
  },

  cancelWorkOrder: async (
    workOrderId: number,
    email: string
  ): Promise<TechnicianWorkOrder> => {
    const response = await api.put<TechnicianWorkOrder>(
      `/workorders/${workOrderId}/cancel`,
      null,
      {
        params: { email },
      }
    );
    return response.data;
  },
};