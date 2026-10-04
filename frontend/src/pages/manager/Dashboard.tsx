import { useEffect, useState } from "react";

import ManagerDashboardStats
  from "@/components/dashboard/manager/ManagerDashboardStats";
import SectionHeader
  from "@/components/dashboard/shared/SectionHeader";
import ManagerRecentWorkOrders
  from "@/components/dashboard/manager/ManagerRecentWorkOrders";
import ManagerTechnicianOverview
  from "@/components/dashboard/manager/ManagerTechnicianOverview";

import { technicians } from "@/data/dispatcher/technicians";

import { workOrderService } from "@/services/workOrderService";
import { technicianService } from "@/services/technicianService";
import type { DispatcherWorkOrder } from "@/types/workOrder";

interface ManagerStats {
  totalWorkOrders: number;
  activeJobs: number;
  completedJobs: number;
  availableTechnicians: number;
}

const initialStats: ManagerStats = {
  totalWorkOrders: 0,
  activeJobs: 0,
  completedJobs: 0,
  availableTechnicians: 0,
};

export default function ManagerDashboard() {
  const [stats, setStats] = useState<ManagerStats>(initialStats);
  const [workOrders, setWorkOrders] = useState<DispatcherWorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadManagerDashboard() {
      try {
        setLoading(true);
        setError("");

        const [fetchedWorkOrders, availableTechnicians] =
          await Promise.all([
            workOrderService.getAllWorkOrders(),
            technicianService.getAvailableTechnicians(),
          ]);

        if (!isMounted) return;

        setWorkOrders(fetchedWorkOrders);

        const activeJobs = fetchedWorkOrders.filter(
          (workOrder) =>
            workOrder.status === "IN_PROGRESS" ||
            workOrder.status === "ON_HOLD"
        ).length;

        const completedJobs = fetchedWorkOrders.filter(
          (workOrder) =>
            workOrder.status === "COMPLETED" ||
            workOrder.status === "CLOSED"
        ).length;

        setStats({
          totalWorkOrders: fetchedWorkOrders.length,
          activeJobs,
          completedJobs,
          availableTechnicians: availableTechnicians.length,
        });
      } catch (err) {
        console.error(
          "Failed to load manager dashboard:",
          err
        );

        if (isMounted) {
          setError(
            "Could not load dashboard data. Check the API connection and try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadManagerDashboard();

    return () => {
      isMounted = false;
    };
  }, [retryKey]);

  const recentWorkOrderSummaries = workOrders.map((workOrder) => ({
    id: workOrder.id,
    customer: workOrder.customerName,
    service: workOrder.serviceType ?? "—",
    priority: workOrder.priority,
    status: workOrder.status,
  }));

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Manager Dashboard"
        subtitle="Monitor field service operations and team performance."
      />

      {loading ? (
        <p className="text-sm text-muted-foreground">
          Loading dashboard statistics...
        </p>
      ) : error ? (
        <div className="rounded-md border border-destructive/30 p-4">
          <p className="text-sm text-destructive">
            {error}
          </p>

          <button
            type="button"
            className="mt-2 text-sm font-medium underline"
            onClick={() => setRetryKey((key) => key + 1)}
          >
            Try again
          </button>
        </div>
      ) : (
        <ManagerDashboardStats
          totalWorkOrders={stats.totalWorkOrders}
          activeJobs={stats.activeJobs}
          completedJobs={stats.completedJobs}
          availableTechnicians={stats.availableTechnicians}
        />
      )}

      <ManagerRecentWorkOrders
        workOrders={recentWorkOrderSummaries}
      />

      {/* Still using local/mock data; we'll connect this next. */}
      <ManagerTechnicianOverview
        technicians={technicians}
      />
    </div>
  );
}