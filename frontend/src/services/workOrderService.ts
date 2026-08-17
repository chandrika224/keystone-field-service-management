import api from "@/lib/api";

import type {
  CustomerWorkOrderRequest,
  WorkOrderResponse,
} from "@/types/workOrder";

export const workOrderService = {
  // ============================================================
  // CREATE MY WORK ORDER
  // POST /api/workorders/my
  // ============================================================

  createMyWorkOrder: async (
    request: CustomerWorkOrderRequest
  ): Promise<WorkOrderResponse> => {
    const response = await api.post<WorkOrderResponse>(
      "/workorders/my",
      request
    );

    return response.data;
  },

  // ============================================================
  // GET MY WORK ORDERS
  // GET /api/workorders/my
  // ============================================================

  getMyWorkOrders: async (): Promise<WorkOrderResponse[]> => {
    const response = await api.get<WorkOrderResponse[]>(
      "/workorders/my"
    );

    return response.data;
  },

  // ============================================================
  // GET ALL WORK ORDERS
  // GET /api/workorders
  // ============================================================

  getAllWorkOrders: async (): Promise<WorkOrderResponse[]> => {
    const response = await api.get<WorkOrderResponse[]>(
      "/workorders"
    );

    return response.data;
  },

  // ============================================================
  // GET WORK ORDER BY ID
  // GET /api/workorders/{id}
  // ============================================================

  getWorkOrderById: async (
    id: number
  ): Promise<WorkOrderResponse> => {
    const response = await api.get<WorkOrderResponse>(
      `/workorders/${id}`
    );

    return response.data;
  },

  // ============================================================
  // UPDATE MY WORK ORDER
  // PUT /api/workorders/my/{id}
  // ============================================================

  updateMyWorkOrder: async (
    id: number,
    request: CustomerWorkOrderRequest
  ): Promise<WorkOrderResponse> => {
    const response = await api.put<WorkOrderResponse>(
      `/workorders/my/${id}`,
      request
    );

    return response.data;
  },

  // ============================================================
  // CANCEL MY WORK ORDER
  // PATCH /api/workorders/my/{id}/cancel
  // ============================================================

  cancelMyWorkOrder: async (
    id: number
  ): Promise<WorkOrderResponse> => {
    const response = await api.patch<WorkOrderResponse>(
      `/workorders/my/${id}/cancel`
    );

    return response.data;
  },

  // ============================================================
  // ASSIGN TECHNICIAN
  // PATCH /api/workorders/{id}/assign
  // ============================================================

  assignTechnician: async (
    id: number,
    request: {
      technicianId: number;
      remarks: string;
    }
  ): Promise<WorkOrderResponse> => {
    const response = await api.patch<WorkOrderResponse>(
      `/workorders/${id}/assign`,
      request
    );

    return response.data;
  },
};