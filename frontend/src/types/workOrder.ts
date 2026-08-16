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


export interface CustomerWorkOrderRequest {
  title: string;
  description: string;
  priority: WorkOrderPriority;
  scheduledDate: string;
  serviceType: ServiceType;
  address: string;
}


export interface WorkOrderResponse {
  id: number;
  title: string;
  description: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  scheduledDate: string;
  completedDate: string | null;
  slaDueDate: string;
  slaBreached: boolean;
  customerName: string;
  technicianName: string;

  // If backend returns these:
  serviceType: ServiceType;
  address: string;
}

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