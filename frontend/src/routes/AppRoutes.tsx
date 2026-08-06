import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";

import Home from "@/pages/public/Home";
import About from "@/pages/public/About";
import Services from "@/pages/public/Services";
import Contact from "@/pages/public/Contact";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

import CustomerDashboard from "@/pages/customer/Dashboard";
import DispatcherDashboard from "@/pages/dispatcher/Dashboard";
import TechnicianDashboard from "@/pages/technician/Dashboard";
import ManagerDashboard from "@/pages/manager/Dashboard";

import ProtectedRoute from "@/guards/ProtectedRoute";
import PublicRoute from "@/guards/PublicRoute";

import WorkOrders from "@/pages/customer/WorkOrders";
import Profile from "@/pages/customer/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Authentication */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Route>

      {/* Dashboard */}
      {/* Protected Dashboard */}
      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>

          <Route
            path="/customer/dashboard"
            element={<CustomerDashboard />}
          />
          <Route
            path="/customer"
            element={<CustomerDashboard />}
          />

          <Route
            path="/customer/work-orders"
            element={<WorkOrders />}
          />

          <Route
            path="/customer/profile"
            element={<Profile />}
          />

          <Route
            path="/dispatcher/dashboard"
            element={<DispatcherDashboard />}
          />

          <Route
            path="/technician/dashboard"
            element={<TechnicianDashboard />}
          />

          <Route
            path="/manager/dashboard"
            element={<ManagerDashboard />}
          />

          

        </Route>

      </Route>
    </Routes>
  );
}