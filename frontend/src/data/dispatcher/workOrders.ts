import type { CustomerWorkOrder, WorkOrderStatus } from "@/types/workOrder";

export const dispatcherWorkOrders: {
  id: string;
  customer: string;
  service: string;
  priority: "High" | "Medium" | "Low";
  status: WorkOrderStatus;
  technician: string;
  date: string;
}[] = [
  {
    id: "WO-1001",
    customer: "John Doe",
    service: "AC Repair",
    priority: "High",
    status: "NEW",
    technician: "Unassigned",
    date: "07 Aug 2026",
  },
  // ...
];