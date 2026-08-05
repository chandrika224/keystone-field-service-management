import type { CustomerWorkOrder } from "@/types/workOrder";

export const customerWorkOrders: CustomerWorkOrder[] = [
  {
    id: "WO-1001",
    service: "AC Repair",
    technician: "John Doe",
    status: "IN_PROGRESS",
    date: "05 Aug 2026",
  },
  {
    id: "WO-1002",
    service: "Electrical Inspection",
    technician: "Mike Ross",
    status: "COMPLETED",
    date: "02 Aug 2026",
  },
  {
    id: "WO-1003",
    service: "Plumbing Service",
    technician: "Unassigned",
    status: "NEW",
    date: "01 Aug 2026",
  },
];

export const test = "Hello";