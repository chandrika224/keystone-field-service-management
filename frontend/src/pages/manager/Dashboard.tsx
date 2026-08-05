import WelcomeBanner from "@/components/dashboard/shared/WelcomeBanner";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <WelcomeBanner
        title="Management Dashboard"
        subtitle="Monitor business performance."
      />
      <Outlet />
    </div>
  );
}