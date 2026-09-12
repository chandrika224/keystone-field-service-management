import api from "@/lib/api";
import type {
  CustomerWorkOrder,
  DispatcherWorkOrder,
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
};