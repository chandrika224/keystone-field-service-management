import Navbar from "@/components/layout/NavBar";
import Sidebar from "@/components/layout/SideBar/Sidebar";
import { Outlet } from "react-router-dom";


export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Page */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}