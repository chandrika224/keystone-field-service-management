export interface ManagerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Manager";
  status: "Active" | "Inactive";
  lastLogin: string;
}

export const managerProfile: ManagerProfile = {
  id: "MGR-001",
  name: "Keystone Manager",
  email: "manager@keystone.com",
  phone: "+91 9876543210",
  role: "Manager",
  status: "Active",
  lastLogin: "2026-08-11 09:42 AM",
};