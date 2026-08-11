export type StaffRole = "Dispatcher" | "Technician";

export type StaffStatus = "Active" | "Inactive";

export interface ManagerStaff {
  id: string;
  employeeId: string;

  name: string;
  email: string;
  phone: string;

  role: StaffRole;

  specialization: string;

  status: StaffStatus;

  joinedDate: string;
}

export const managerStaff: ManagerStaff[] = [
  {
    id: "USR-001",
    employeeId: "DISP-001",

    name: "Priya Sharma",
    email: "priya.sharma@keystone.com",
    phone: "+91 9988776655",

    role: "Dispatcher",

    specialization: "Work Order Coordination",

    status: "Active",

    joinedDate: "2025-08-12",
  },

  {
    id: "USR-002",
    employeeId: "TECH-001",

    name: "Rahul Kumar",
    email: "rahul.kumar@keystone.com",
    phone: "+91 9876543210",

    role: "Technician",

    specialization: "HVAC",

    status: "Active",

    joinedDate: "2025-09-05",
  },

  {
    id: "USR-003",
    employeeId: "TECH-002",

    name: "Arun Joseph",
    email: "arun.joseph@keystone.com",
    phone: "+91 9123456789",

    role: "Technician",

    specialization: "Electrical",

    status: "Active",

    joinedDate: "2025-10-18",
  },

  {
    id: "USR-004",
    employeeId: "DISP-002",

    name: "Sneha Patil",
    email: "sneha.patil@keystone.com",
    phone: "+91 9876512345",

    role: "Dispatcher",

    specialization: "Scheduling & Dispatch",

    status: "Active",

    joinedDate: "2026-01-10",
  },

  {
    id: "USR-005",
    employeeId: "TECH-003",

    name: "Vikram Singh",
    email: "vikram.singh@keystone.com",
    phone: "+91 9988771122",

    role: "Technician",

    specialization: "Plumbing",

    status: "Inactive",

    joinedDate: "2025-06-22",
  },
];