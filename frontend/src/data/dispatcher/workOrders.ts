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

  {
    id: "WO-1002",
    customer: "ABC Industries",
    service: "Electrical Maintenance",
    priority: "Medium",
    status: "ASSIGNED",
    technician: "Rohit Kumar",
    date: "07 Aug 2026",
  },
  
   {
    id: "WO-1003",
    customer: "XYZ Corporation",
    service: "Plumbing Repair",
    priority: "Low",
    status: "IN_PROGRESS",
    technician: "Mike Johnson",
    date: "08 Aug 2026",
  },
];