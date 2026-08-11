import PublicNavbar from "@/components/navigation/PublicNavbar";
import PublicFooter from "@/components/public/PublicFooter";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">

      <PublicNavbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <PublicFooter />

    </div>
  );
}