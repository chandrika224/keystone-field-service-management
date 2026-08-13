
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute() {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  const location = useLocation();

  // Wait until authentication state is known
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // User is not authenticated
  // Redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // User is authenticated
  // Allow access to protected pages
  return <Outlet />;
}

