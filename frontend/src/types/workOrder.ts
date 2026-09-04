export type WorkOrderStatus =
  | "NEW"
  | "ASSIGNED"
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
  id: string;

  title: string;
  description: string;

  priority: WorkOrderPriority;

  status: WorkOrderStatus;

  scheduledDate: string;

  technician: string;

  // Keep these because your existing UI uses them
  service: string;
  date: string;
}

export interface DispatcherWorkOrder {
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

export interface Technician {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  status: "Available" | "Busy";
  currentJobs: number;
}