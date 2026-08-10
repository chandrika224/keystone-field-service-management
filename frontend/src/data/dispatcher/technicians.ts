import type { Technician } from "@/types/workOrder";

export const technicians: Technician[] = [
  {
    id: "TECH-001",
    name: "Rohit Kumar",
    specialization: "AC Repair",
    email: "rohit@example.com",
    phone: "+91 9876543210",
    status: "Available",
    currentJobs: 1,
  },
  {
    id: "TECH-002",
    name: "David Joseph",
    specialization: "Electrical",
    email: "david@example.com",
    phone: "+91 9988776655",
    status: "Available",
    currentJobs: 2,
  },
  {
    id: "TECH-003",
    name: "Mike Johnson",
    specialization: "Plumbing",
    email: "mike@example.com",
    phone: "+91 9123456789",
    status: "Busy",
    currentJobs: 4,
  },
  {
    id: "TECH-004",
    name: "Rahul Sharma",
    specialization: "Cleaning",
    email: "rahul@example.com",
    phone: "+91 9876512345",
    status: "Available",
    currentJobs: 0,
  },
];