import { Outlet } from "react-router-dom";
import AuthBranding from "@/components/auth/AuthBranding";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-background">

      <AuthBranding />

      <div
        className="
          flex
          flex-1
          items-center
          justify-center
          p-8
        "
      >
        <Outlet />
      </div>

    </div>
  );
}