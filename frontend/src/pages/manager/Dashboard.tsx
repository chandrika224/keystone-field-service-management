import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import ManagerDashboardStats from "@/components/dashboard/manager/ManagerDashboardStats";
import ManagerRecentWorkOrders from "@/components/dashboard/manager/ManagerRecentWorkOrders";
import ManagerTechnicianOverview from "@/components/dashboard/manager/ManagerTechnicianOverview";

import type {
  Technician,
  WorkOrderResponse,
} from "@/types/workOrder";

import { workOrderService } from "@/services/workOrderService";
import { getAllTechnicians } from "@/services/technicianService";

export default function ManagerDashboard() {
  const [workOrders, setWorkOrders] =
    useState<WorkOrderResponse[]>([]);

  const [technicians, setTechnicians] =
    useState<Technician[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      const [ordersRes, techsRes] =
        await Promise.all([
          // Manager needs ALL work orders
          workOrderService.getAllWorkOrders(),

          // All technicians
          getAllTechnicians(),
        ]);

      setWorkOrders(ordersRes);

      // Backend already provides activeJobs
      setTechnicians(techsRes);

    } catch (error) {
      console.error(
        "Failed to load manager dashboard data:",
        error
      );

      toast.error(
        "Failed to fetch dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);


  // ============================================================
  // DASHBOARD METRICS
  // ============================================================

  const totalWorkOrders =
    workOrders.length;

  const activeJobs =
    workOrders.filter(
      (order) =>
        order.status === "ASSIGNED" ||
        order.status === "IN_PROGRESS"
    ).length;

  const completedJobs =
    workOrders.filter(
      (order) =>
        order.status === "COMPLETED"
    ).length;

  const availableTechnicians =
    technicians.filter(
      (technician) =>
        technician.active &&
        technician.activeJobs === 0
    ).length;


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="space-y-6">

        <SectionHeader
          title="Manager Dashboard"
          subtitle="Monitor field service operations and team performance."
        />

        <div className="flex h-64 items-center justify-center rounded-lg border bg-card text-muted-foreground">

          <Loader2
            className="mr-2 h-6 w-6 animate-spin text-primary"
          />

          <span>
            Loading operations data...
          </span>

        </div>

      </div>
    );
  }


  // ============================================================
  // DASHBOARD
  // ============================================================

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Manager Dashboard"
        subtitle="Monitor field service operations and team performance."
      />

      <ManagerDashboardStats
        totalWorkOrders={totalWorkOrders}
        activeJobs={activeJobs}
        completedJobs={completedJobs}
        availableTechnicians={availableTechnicians}
      />

      <ManagerRecentWorkOrders
        workOrders={workOrders}
        onView={(workOrder) => {
          console.log(
            "Manager viewed work order:",
            workOrder
          );
        }}
      />

      <ManagerTechnicianOverview
        technicians={technicians}
      />

    </div>
  );
}