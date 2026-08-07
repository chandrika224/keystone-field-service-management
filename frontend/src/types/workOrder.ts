export type WorkOrderStatus =
  | "NEW"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "COMPLETED"
  | "CLOSED"
  | "CANCELLED";

export interface CustomerWorkOrder {
  id: string;
  service: string;
  technician: string;
  status: WorkOrderStatus;
  date: string;
}

export interface DispatcherWorkOrder extends CustomerWorkOrder {
  customer: string;
  priority: "High" | "Medium" | "Low";
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