export type SchedulePriority =
  | "High"
  | "Medium"
  | "Low";

export type ScheduleStatus =
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export interface TechnicianScheduleItem {
  id: string;

  workOrderId: string;

  title: string;

  customerName: string;

  siteName: string;

  location: string;

  scheduledDate: string;

  startTime: string;

  endTime: string;

  priority: SchedulePriority;

  status: ScheduleStatus;

  description: string;
}

export const technicianSchedule: TechnicianScheduleItem[] = [
  {
    id: "SCH-001",
    workOrderId: "WO-1024",
    title: "AC Unit Repair",
    customerName: "ABC Industries",
    siteName: "Whitefield Branch",
    location: "Whitefield, Bengaluru",
    scheduledDate: "2026-08-11",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    priority: "High",
    status: "Scheduled",
    description:
      "Inspect and repair the main AC unit reported by the customer.",
  },

  {
    id: "SCH-002",
    workOrderId: "WO-1027",
    title: "Electrical Maintenance",
    customerName: "XYZ Pvt Ltd",
    siteName: "Indiranagar Office",
    location: "Indiranagar, Bengaluru",
    scheduledDate: "2026-08-11",
    startTime: "11:30 AM",
    endTime: "01:00 PM",
    priority: "Medium",
    status: "Scheduled",
    description:
      "Perform scheduled electrical inspection and maintenance.",
  },

  {
    id: "SCH-003",
    workOrderId: "WO-1031",
    title: "Equipment Inspection",
    customerName: "Metro Services",
    siteName: "Marathahalli Site",
    location: "Marathahalli, Bengaluru",
    scheduledDate: "2026-08-11",
    startTime: "02:30 PM",
    endTime: "04:00 PM",
    priority: "Low",
    status: "Scheduled",
    description:
      "Inspect field equipment and record maintenance requirements.",
  },

  {
    id: "SCH-004",
    workOrderId: "WO-1035",
    title: "Generator Service",
    customerName: "Prime Logistics",
    siteName: "Electronic City Facility",
    location: "Electronic City, Bengaluru",
    scheduledDate: "2026-08-12",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    priority: "High",
    status: "Scheduled",
    description:
      "Perform preventive maintenance on the backup generator.",
  },
];