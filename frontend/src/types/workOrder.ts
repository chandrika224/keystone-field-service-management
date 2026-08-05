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