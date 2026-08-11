export type TechnicianReportStatus =
  | "Draft"
  | "Submitted"
  | "Approved"
  | "Rejected";

export interface TechnicianWorkReport {
  id: string;

  workOrderId: string;

  title: string;

  customerName: string;

  siteName: string;

  technicianName: string;

  reportDate: string;

  status: TechnicianReportStatus;

  workPerformed: string;

  observations: string;

  materialsUsed: string[];

  hoursWorked: number;

  technicianNotes: string;
}

export const technicianReports: TechnicianWorkReport[] = [
  {
    id: "REP-001",
    workOrderId: "WO-1001",
    title: "AC Maintenance",
    customerName: "ABC Industries",
    siteName: "Bangalore Plant",
    technicianName: "Rahul Sharma",
    reportDate: "2026-08-10",
    status: "Submitted",
    workPerformed:
      "Performed preventive maintenance and cleaned the AC unit.",
    observations:
      "Unit was functioning normally after maintenance.",
    materialsUsed: [
      "Air Filter",
      "Cleaning Solution",
    ],
    hoursWorked: 3,
    technicianNotes:
      "System tested successfully after maintenance.",
  },
  {
    id: "REP-002",
    workOrderId: "WO-1002",
    title: "Electrical Repair",
    customerName: "XYZ Manufacturing",
    siteName: "Electronic City",
    technicianName: "Rahul Sharma",
    reportDate: "2026-08-11",
    status: "Draft",
    workPerformed: "",
    observations: "",
    materialsUsed: [],
    hoursWorked: 0,
    technicianNotes: "",
  },
];