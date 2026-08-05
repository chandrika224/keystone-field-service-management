import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute() {

  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
  return (
    <div className="flex h-screen items-center justify-center">
      Loading...
    </div>
  );
}
}