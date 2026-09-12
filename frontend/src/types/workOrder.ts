export type WorkOrderStatus =
  | "NEW"
  | "ASSIGNED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "COMPLETED"
  | "CLOSED"
  | "CANCELLED";

export type WorkOrderPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface CustomerWorkOrder {
  id: number;

  title: string;
  description: string;

  priority: WorkOrderPriority;
  status: WorkOrderStatus;

  scheduledDate: string;

  completedDate: string | null;
  completedAt: string | null;

  siteId: number;
  siteName: string | null;

  address: string | null;

  serviceType: string;

  customerId: number;
  customerName: string;

  technicianId: number | null;
  technicianName: string | null;

  assignedById: number | null;
  assignedAt: string | null;

  createdAt: string;

  startedAt: string | null;

  slaDueDate: string;
  slaBreached: boolean;

  // Existing UI compatibility fields
  service: string;
  date: string;
  technician: string;
}

export interface DispatcherWorkOrder {
  id: number;

  title: string;
  description: string;

  priority: WorkOrderPriority;
  status: WorkOrderStatus;

  scheduledDate: string;

  completedDate: string | null;
  completedAt: string | null;

  siteId: number | null;
  siteName: string | null;

  // This is the customer's registered address
  address: string | null;

  serviceType: string | null;

  customerId: number;
  customerName: string;

  technicianId: number | null;
  technicianName: string | null;

  assignedById: number | null;
  assignedAt: string | null;

  createdAt: string;

  startedAt: string | null;

  slaDueDate: string | null;
  slaBreached: boolean;
}

