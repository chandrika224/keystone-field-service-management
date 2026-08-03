import { Outlet } from "react-router-dom";

import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Wrench,
  Settings,
} from "lucide-react";
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Work Orders",
    icon: ClipboardList,
    href: "/work-orders",
  },
  {
    title: "Technicians",
    icon: Users,
    href: "/technicians",
  },
  {
    title: "Assets",
    icon: Wrench,
    href: "/assets",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <SideBar menu={menu} />

      {/* Main Section */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <NavBar />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}