
import { Routes, Route } from "react-router-dom";

// ============================================================
// LAYOUTS
// ============================================================

import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";

// ============================================================
// ROUTE GUARDS
// ============================================================

import PublicRoute from "@/guards/PublicRoute";
import ProtectedRoute from "@/guards/ProtectedRoute";

// ============================================================
// PUBLIC PAGES
// ============================================================

import Home from "@/pages/public/Home";
import About from "@/pages/public/About";
import Services from "@/pages/public/Services";
import Contact from "@/pages/public/Contact";

// ============================================================
// AUTH PAGES
// ============================================================

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

// ============================================================
// CUSTOMER PAGES
// ============================================================

import CustomerDashboard from "@/pages/customer/Dashboard";
import WorkOrders from "@/pages/customer/WorkOrders";
import Profile from "@/pages/customer/Profile";
import CustomerSupport from "@/pages/customer/Support";

// ============================================================
// DISPATCHER PAGES
// ============================================================

import DispatcherDashboard from "@/pages/dispatcher/Dashboard";
import DispatcherWorkOrders from "@/pages/dispatcher/WorkOrders";
import DispatcherTechnicians from "@/pages/dispatcher/Technicians";
import DispatcherAssignment from "@/pages/dispatcher/Assignment";
import DispatcherCustomers from "@/pages/dispatcher/Customers";
import DispatcherSites from "@/pages/dispatcher/Sites";

// ============================================================
// TECHNICIAN PAGES
// ============================================================

import TechnicianDashboard from "@/pages/technician/Dashboard";
import AssignedJobs from "@/pages/technician/AssignedJobs";
import JobTrack from "@/pages/technician/JobTrack";
import TechnicianSchedule from "@/pages/technician/TechnicianSchedule";
import TechnicianInventory from "@/pages/technician/TechnicianInventory";
import TechnicianReports from "@/pages/technician/TechnicianReports";
import TechnicianSettings from "@/pages/technician/TechnicianSettings";

// ============================================================
// MANAGER PAGES
// ============================================================

import ManagerDashboard from "@/pages/manager/Dashboard";
import ManagerWorkOrders from "@/pages/manager/ManagerWorkOrders";
import ManagerTechnicians from "@/pages/manager/ManagerTechnicians";
import ManagerCustomers from "@/pages/manager/ManagerCustomers";
import ManagerSites from "@/pages/manager/ManagerSites";
import ManagerInventory from "@/pages/manager/ManagerInventory";
import ManagerReports from "@/pages/manager/ManagerReports";
import ManagerStaff from "@/pages/manager/ManagerStaff";
import ManagerSettings from "@/pages/manager/ManagerSettings";

// ============================================================
// APP ROUTES
// ============================================================

export default function AppRoutes() {
  return (
    <Routes>

      {/* ======================================================
          PUBLIC WEBSITE
          ====================================================== */}

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Route>


      {/* ======================================================
          PUBLIC AUTHENTICATION

          These pages are accessible when NOT authenticated.
          ====================================================== */}

        <Route element={<AuthLayout />}>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

        </Route>


      {/* ======================================================
          PROTECTED APPLICATION

          Everything inside ProtectedRoute requires login.
          ====================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>


          {/* ==================================================
              CUSTOMER
              ================================================== */}

          <Route
            path="/customer"
            element={<CustomerDashboard />}
          />

          <Route
            path="/customer/dashboard"
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
             path="/customer/support"
             element={<CustomerSupport />}
          />


          {/* ==================================================
              DISPATCHER
              ================================================== */}

          <Route
            path="/dispatcher/dashboard"
            element={<DispatcherDashboard />}
          />

          <Route
            path="/dispatcher/work-orders"
            element={<DispatcherWorkOrders />}
          />

          <Route
            path="/dispatcher/assignments"
            element={<DispatcherAssignment />}
          />

          <Route
            path="/dispatcher/technicians"
            element={<DispatcherTechnicians />}
          />

          <Route
            path="/dispatcher/customers"
            element={<DispatcherCustomers />}
          />

          <Route
            path="/dispatcher/sites"
            element={<DispatcherSites />}
          />


          {/* ==================================================
              TECHNICIAN
              ================================================== */}

          <Route
            path="/technician/dashboard"
            element={<TechnicianDashboard />}
          />

          <Route
            path="/technician/work-orders"
            element={<AssignedJobs />}
          />

          <Route
            path="/technician/track-jobs"
            element={<JobTrack />}
          />

          <Route
            path="/technician/schedule"
            element={<TechnicianSchedule />}
          />

          <Route
            path="/technician/inventory"
            element={<TechnicianInventory />}
          />

          <Route
            path="/technician/reports"
            element={<TechnicianReports />}
          />

          <Route
            path="/technician/settings"
            element={<TechnicianSettings />}
          />


          {/* ==================================================
              MANAGER
              ================================================== */}

          <Route
            path="/manager/dashboard"
            element={<ManagerDashboard />}
          />

          <Route
            path="/manager/work-orders"
            element={<ManagerWorkOrders />}
          />

          <Route
            path="/manager/technicians"
            element={<ManagerTechnicians />}
          />

          <Route
            path="/manager/customers"
            element={<ManagerCustomers />}
          />

          <Route
            path="/manager/sites"
            element={<ManagerSites />}
          />

          <Route
            path="/manager/inventory"
            element={<ManagerInventory />}
          />

          <Route
            path="/manager/reports"
            element={<ManagerReports />}
          />

          <Route
            path="/manager/staff"
            element={<ManagerStaff />}
          />

          <Route
            path="/manager/settings"
            element={<ManagerSettings />}
          />

        </Route>

      </Route>

    </Routes>
  );
}

