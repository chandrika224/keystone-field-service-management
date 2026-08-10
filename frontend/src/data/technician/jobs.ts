export type TechnicianJobStatus =
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "COMPLETED";

export interface TechnicianJob {
  id: string;
  workOrderCode: string;
  customer: string;
  site: string;
  service: string;
  priority: "High" | "Medium" | "Low";
  status: TechnicianJobStatus;
  scheduledDate: string;
  scheduledTime: string;
}

export const technicianJobs: TechnicianJob[] = [
  {
    id: "JOB-001",
    workOrderCode: "WO-1001",
    customer: "ABC Industries",
    site: "ABC Industries - Main Plant",
    service: "AC Repair",
    priority: "High",
    status: "ASSIGNED",
    scheduledDate: "10 Aug 2026",
    scheduledTime: "10:00 AM",
  },
  {
    id: "JOB-002",
    workOrderCode: "WO-1005",
    customer: "Tech Solutions Pvt Ltd",
    site: "Tech Solutions - Office",
    service: "Electrical Maintenance",
    priority: "Medium",
    status: "IN_PROGRESS",
    scheduledDate: "10 Aug 2026",
    scheduledTime: "01:00 PM",
  },
  {
    id: "JOB-003",
    workOrderCode: "WO-1008",
    customer: "Global Manufacturing",
    site: "Global Manufacturing - Factory",
    service: "Equipment Inspection",
    priority: "Low",
    status: "COMPLETED",
    scheduledDate: "09 Aug 2026",
    scheduledTime: "03:00 PM",
  },
];