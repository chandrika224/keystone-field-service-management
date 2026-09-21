import api from "@/lib/api";
import type {
  CustomerWorkOrder,
  DispatcherWorkOrder,
  TechnicianWorkOrder,
  WorkOrderPriority,
  WorkOrderStatus,
} from "@/types/workOrder";

export const workOrderService = {
  // ============================================================
  // DISPATCHER
  // GET ALL WORK ORDERS
  // ============================================================

  getAllWorkOrders: async (): Promise<DispatcherWorkOrder[]> => {
    const response = await api.get<DispatcherWorkOrder[]>(
      "/workorders"
    );

    return response.data;
  },

  // ============================================================
  // DISPATCHER
  // GET WORK ORDER BY ID
  // ============================================================

  getWorkOrderById: async (
    id: number
  ): Promise<DispatcherWorkOrder> => {
    const response = await api.get<DispatcherWorkOrder>(
      `/workorders/${id}`
    );

    return response.data;
  },

  // ============================================================
  // DISPATCHER
  // GET WORK ORDERS BY STATUS
  // GET /api/workorders/status/{status}
  // ============================================================

  getWorkOrdersByStatus: async (
    status: WorkOrderStatus
  ): Promise<DispatcherWorkOrder[]> => {
    const response = await api.get<DispatcherWorkOrder[]>(
      `/workorders/status/${status}`
    );

    return response.data;
  },

  // ============================================================
  // DISPATCHER
  // GET WORK ORDERS BY PRIORITY
  // GET /api/workorders/priority/{priority}
  // ============================================================

  getWorkOrdersByPriority: async (
    priority: WorkOrderPriority
  ): Promise<DispatcherWorkOrder[]> => {
    const response = await api.get<DispatcherWorkOrder[]>(
      `/workorders/priority/${priority}`
    );

    return response.data;
  },

  // ============================================================
  // DISPATCHER
  // ASSIGN TECHNICIAN
  // PATCH /api/workorders/{id}/assign?technicianId={id}
  // ============================================================

  assignTechnician: async (
    workOrderId: number,
    technicianId: number
  ): Promise<DispatcherWorkOrder> => {
    const response = await api.patch<DispatcherWorkOrder>(
      `/workorders/${workOrderId}/assign?technicianId=${technicianId}`
    );

    return response.data;
  },

  // ============================================================
  // CUSTOMER
  // GET MY WORK ORDERS
  // ============================================================

  getMyWorkOrders: async (
    email: string
  ): Promise<CustomerWorkOrder[]> => {
    const response = await api.get<CustomerWorkOrder[]>(
      `/workorders/my?email=${encodeURIComponent(email)}`
    );

    return response.data;
  },

  // ============================================================
  // CUSTOMER
  // CREATE WORK ORDER
  // ============================================================

  createMyWorkOrder: async (
    email: string,
    request: {
      title: string;
      description: string;
      serviceType: string;
      priority: "LOW" | "MEDIUM" | "HIGH";
      scheduledDate: string;
      siteId: number;
    }
  ): Promise<CustomerWorkOrder> => {
    const response = await api.post<CustomerWorkOrder>(
      `/workorders/my?email=${encodeURIComponent(email)}`,
      request
    );

    return response.data;
  },

  // ============================================================
  // CUSTOMER
  // UPDATE WORK ORDER
  // ============================================================

  updateMyWorkOrder: async (
    email: string,
    id: number,
    request: {
      title: string;
      description: string;
      serviceType: string;
      priority: "LOW" | "MEDIUM" | "HIGH";
      scheduledDate: string;
      siteId: number;
    }
  ): Promise<CustomerWorkOrder> => {
    const response = await api.put<CustomerWorkOrder>(
      `/workorders/my/${id}?email=${encodeURIComponent(email)}`,
      request
    );

    return response.data;
  },

  getAssignedWorkOrders: async (
    email: string
  ): Promise<TechnicianWorkOrder[]> => {
    const response = await api.get<TechnicianWorkOrder[]>(
      `/workorders/technician/my?email=${encodeURIComponent(email)}`
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
      `/workorders/${workOrderId}/accept?email=${encodeURIComponent(email)}`
    );

    return response.data;
  },

  startWorkOrder: async (
  workOrderId: number,
  email: string
): Promise<TechnicianWorkOrder> => {
  const response = await api.put<TechnicianWorkOrder>(
    `/workorders/${workOrderId}/start?email=${encodeURIComponent(email)}`
  );

  return response.data;
},

holdWorkOrder: async (
  workOrderId: number,
  email: string
): Promise<TechnicianWorkOrder> => {
  const response = await api.put<TechnicianWorkOrder>(
    `/workorders/${workOrderId}/hold?email=${encodeURIComponent(email)}`
  );

  return response.data;
},

resumeWorkOrder: async (
  workOrderId: number,
  email: string
): Promise<TechnicianWorkOrder> => {
  const response = await api.put<TechnicianWorkOrder>(
    `/workorders/${workOrderId}/resume?email=${encodeURIComponent(email)}`
  );

  return response.data;
},

completeWorkOrder: async (
  workOrderId: number,
  email: string
): Promise<TechnicianWorkOrder> => {
  const response = await api.put<TechnicianWorkOrder>(
    `/workorders/${workOrderId}/complete?email=${encodeURIComponent(email)}`
  );

  return response.data;
},

cancelWorkOrder: async (
  workOrderId: number,
  email: string
): Promise<TechnicianWorkOrder> => {
  const response = await api.put<TechnicianWorkOrder>(
    `/workorders/${workOrderId}/cancel?email=${encodeURIComponent(email)}`
  );

  return response.data;
},
};

console.log(
  "========== WORK ORDER SERVICE LOADED =========="
);

console.log(
  "AVAILABLE WORK ORDER METHODS:",
  Object.keys(workOrderService)
);