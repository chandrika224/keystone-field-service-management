import PublicNavbar from "@/components/navigation/PublicNavbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNavbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}