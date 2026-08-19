import api from "@/lib/api";

// ============================================================
// TYPES
// ============================================================

export type WorkOrderPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export type WorkOrderStatus =
  | "NEW"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "COMPLETED"
  | "CLOSED"
  | "CANCELLED";

export interface CustomerWorkOrderResponse {
  id: number;

  title: string;

  description: string;

  priority: WorkOrderPriority;

  status: WorkOrderStatus;

  scheduledDate: string;

  completedDate?: string | null;

  slaDueDate?: string | null;

  slaBreached?: boolean;

  customerName?: string;

  technicianName?: string;
}

export interface CreateCustomerWorkOrderRequest {
  title: string;

  description: string;

  priority: WorkOrderPriority;

  scheduledDate: string;
}

// ============================================================
// WORK ORDER SERVICE
// ============================================================

export const workOrderService = {

  // ==========================================================
  // GET ALL WORK ORDERS
  // GET /api/workorders
  // ==========================================================

  getAllWorkOrders: async (): Promise<
    CustomerWorkOrderResponse[]
  > => {

    const response =
      await api.get<CustomerWorkOrderResponse[]>(
        "/workorders"
      );

    return response.data;
  },


  // ==========================================================
  // GET WORK ORDER BY ID
  // GET /api/workorders/{id}
  // ==========================================================
    getWorkOrderById: async (
      id: number
    ): Promise<CustomerWorkOrderResponse> => {

      console.log(
        "getWorkOrderById called with:",
        id,
        "type:",
        typeof id
      );

      const response =
        await api.get<CustomerWorkOrderResponse>(
          `/workorders/${id}`
        );

      return response.data;
    },
  // ==========================================================
  // GET MY WORK ORDERS
  // GET /api/workorders/my
  // ==========================================================

  getMyWorkOrders: async (): Promise<
    CustomerWorkOrderResponse[]
  > => {

    const response =
      await api.get<CustomerWorkOrderResponse[]>(
        "/workorders/my"
      );

    return response.data;
  },


  // ==========================================================
  // CREATE MY WORK ORDER
  // POST /api/workorders/my
  // ==========================================================

  createMyWorkOrder: async (
    request: CreateCustomerWorkOrderRequest
  ): Promise<CustomerWorkOrderResponse> => {

    const response =
      await api.post<CustomerWorkOrderResponse>(
        "/workorders/my",
        request
      );

    return response.data;
  },


  // ==========================================================
  // UPDATE MY WORK ORDER
  // PUT /api/workorders/my/{id}
  // ==========================================================

  updateMyWorkOrder: async (
    id: number,
    request: CreateCustomerWorkOrderRequest
  ): Promise<CustomerWorkOrderResponse> => {

    const response =
      await api.put<CustomerWorkOrderResponse>(
        `/workorders/my/${id}`,
        request
      );

    return response.data;
  },

};