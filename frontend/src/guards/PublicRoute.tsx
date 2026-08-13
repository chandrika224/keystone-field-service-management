
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function PublicRoute() {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  // Wait until authentication state is known
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Already authenticated
  // Do not allow access to login/register pages
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Not authenticated
  // Allow access to login/register/forgot/reset pages
  return <Outlet />;
}

