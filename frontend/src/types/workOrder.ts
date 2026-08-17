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

export type ServiceType =
  | "ELECTRICAL"
  | "PLUMBING"
  | "HVAC"
  | "APPLIANCE_REPAIR"
  | "GENERAL_MAINTENANCE";

// ============================================================
// TECHNICIAN
// ============================================================

export interface Technician {
  id: number;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  specialization: string;

  role: "TECHNICIAN";

  active: boolean;

  currentJobs?: number;
}

// ============================================================
// CUSTOMER WORK ORDER REQUEST
// ============================================================

export interface CustomerWorkOrderRequest {
  title: string;
  description: string;
  priority: WorkOrderPriority;
  scheduledDate: string;
  serviceType: ServiceType;
  address: string;
}

// ============================================================
// WORK ORDER RESPONSE
// ============================================================

export interface WorkOrderResponse {
  id: number;

  title: string;
  description: string;

  serviceType: ServiceType;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;

  scheduledDate: string;
  completedDate: string | null;

  address: string | null;

  // Customer
  customerId: number;
  customerName: string;

  // Technician
  technicianId: number | null;
  technicianName: string | null;

  // Timestamps
  createdAt: string;
  assignedAt: string | null;
  startedAt: string | null;
  completedAt: string | null;

  // SLA
  slaDueDate: string;
  slaBreached: boolean;

  message: string | null;
}

// ============================================================
// CUSTOMER WORK ORDER
// ============================================================

export interface CustomerWorkOrder {
  id: string;

  title: string;

  serviceType: string;
  address: string;

  description: string;

  priority: WorkOrderPriority;
  status: WorkOrderStatus;

  scheduledDate: string;

  service: string;
  technician: string;
  date: string;
}

// ============================================================
// DISPATCHER WORK ORDER
// ============================================================

export interface DispatcherWorkOrder {
  id: string;

  title: string;

  customer: string;

  service: ServiceType;

  priority: WorkOrderPriority;

  status: WorkOrderStatus;

  technician: string;

  scheduledDate: string;
}