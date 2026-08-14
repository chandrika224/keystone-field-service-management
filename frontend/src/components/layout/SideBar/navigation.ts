import {
  LayoutDashboard,
  ClipboardList,
  Users,
  MapPinned,
  Wrench,
  Package,
  BarChart3,
  Settings,
  User,
  Clock3,
  CalendarDays,
} from "lucide-react";
import type { SidebarNavigationItem } from "./types";



/* ---------------- Customer ---------------- */

export const customerNavigation: SidebarNavigationItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/customer/dashboard",
  },
  {
    title: "My Work Orders",
    icon: ClipboardList,
    path: "/customer/work-orders",
  },
  {
    title: "Profile",
    icon: User,
    path: "/customer/profile",
  },
];

/* ---------------- Dispatcher ---------------- */

export const dispatcherNavigation: SidebarNavigationItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dispatcher/dashboard",
  },
  {
    title: "Work Orders",
    icon: ClipboardList,
    path: "/dispatcher/work-orders",
  },
  {
    title: "Assignments",
    icon: Wrench,
    path: "/dispatcher/assignments",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/dispatcher/customers",
  },
  {
    title: "Sites",
    icon: MapPinned,
    path: "/dispatcher/sites",
  },
  {
    title: "Technicians",
    icon: User,
    path: "/dispatcher/technicians",
  },
];

/* ---------------- Technician ---------------- */

/* ---------------- Technician ---------------- */

export const technicianNavigation: SidebarNavigationItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/technician/dashboard",
  },
  {
    title: "Assigned Jobs",
    icon: ClipboardList,
    path: "/technician/work-orders",
  },
  {
    title: "Schedule",
    icon: CalendarDays,
    path: "/technician/schedule",
  },

  {
    title: "Inventory",
    icon: Package,
    path: "/technician/inventory",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/technician/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/technician/settings",
  },
];

/* ---------------- Manager ---------------- */

export const managerNavigation: SidebarNavigationItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/manager/dashboard",
  },
  {
    title: "Work Orders",
    icon: ClipboardList,
    path: "/manager/work-orders",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/manager/customers",
  },
  {
    title: "Staffs",
    icon: Users,
    path: "/manager/staff",
  },
  {
    title: "Technicians",
    icon: User,
    path: "/manager/technicians",
  },
   {
    title: "Sites",
    icon: MapPinned,
    path: "/manager/sites",
  },
  {
    title: "Inventory",
    icon: Package,
    path: "/manager/inventory",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/manager/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/manager/settings",
  },
];

export function getSidebarNavigation(role: string) {
  switch (role) {
    case "customer":
      return customerNavigation;

    case "dispatcher":
      return dispatcherNavigation;

    case "technician":
      return technicianNavigation;

    case "manager":
      return managerNavigation;

    default:
      return [];
  }
}