import { Outlet } from "react-router-dom";

import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Wrench,
  Settings,
} from "lucide-react";
import SideBar from "../SideBar";
import NavBar from "../NavBar";

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

      <SideBar menu={menu} />

      <div className="flex flex-1 flex-col">

        <NavBar />

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
