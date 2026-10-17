
import { useEffect, useMemo, useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import ManagerReportsStats from "@/components/dashboard/manager/Reports/ManagerReportsStats";
import ManagerReportsToolbar from "@/components/dashboard/manager/Reports/ManagerReportsToolbar";
import ManagerReportsAnalytics from "@/components/dashboard/manager/Reports/ManagerReportsAnalytics";
import ManagerTechnicianPerformance from "@/components/dashboard/manager/Reports/ManagerTechnicianPerformance";
import ManagerCustomerServicePerformance from "@/components/dashboard/manager/Reports/ManagerCustomerServicePerformance";


import { workOrderService } from "@/services/workOrderService";
import type { DispatcherWorkOrder } from "@/types/workOrder";


export default function ManagerReports() {
  const [period, setPeriod] = useState("Last 6 Months");
  const [customer, setCustomer] = useState("All");

  const [workOrders, setWorkOrders] = useState<DispatcherWorkOrder[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadReports() {
      try {
        setLoading(true);
        setError("");

        const result: DispatcherWorkOrder[] =
          await workOrderService.getAllWorkOrders();

        if (!isMounted) return;

        const orders = Array.isArray(result) ? result : [];

        setWorkOrders(orders);

      } catch (err) {
        console.error("Failed to load manager reports:", err);

        if (isMounted) {
          setError(
            "Could not load reports. Check the API connection and try again."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadReports();

    return () => {
      isMounted = false;
    };
  }, [retryKey]);

  const customers = useMemo(
    () => [...new Set(
      workOrders
        .map((order) => order.customerName)
        .filter((name): name is string => Boolean(name))
    )],
    [workOrders]
  );

  const filteredWorkOrders = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "This Month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "Last Month":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      case "This Quarter":
        startDate = new Date(
          now.getFullYear(),
          Math.floor(now.getMonth() / 3) * 3,
          1
        );
        break;
      case "This Year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    }

    return workOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      if (Number.isNaN(orderDate.getTime())) return false;

      const matchesPeriod =
        orderDate >= startDate && orderDate <= now;

      const matchesCustomer =
        customer === "All" || order.customerName === customer;

      return matchesPeriod && matchesCustomer;
    });
  }, [workOrders, period, customer]);

  const filteredSummary = useMemo(() => {
    const completed = filteredWorkOrders.filter(
      (order) =>
        order.status === "COMPLETED" ||
        order.status === "CLOSED"
    ).length;

    const cancelled = filteredWorkOrders.filter(
      (order) => order.status === "CANCELLED"
    ).length;

    const pending = filteredWorkOrders.filter((order) =>
      ["NEW", "ASSIGNED", "ACCEPTED", "IN_PROGRESS", "ON_HOLD"].includes(
        order.status
      )
    ).length;

    return {
      totalWorkOrders: filteredWorkOrders.length,
      completedWorkOrders: completed,
      pendingWorkOrders: pending,
      cancelledWorkOrders: cancelled,
      completionRate:
        filteredWorkOrders.length === 0
          ? 0
          : Math.round((completed / filteredWorkOrders.length) * 100),
    };
  }, [filteredWorkOrders]);

  const handleClearFilters = () => {
    setPeriod("Last 6 Months");
    setCustomer("All");
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Reports"
        subtitle="Operational performance and field-service analytics."
      />

      {loading ? (
        <p className="text-sm text-muted-foreground">
          Loading reports...
        </p>
      ) : error ? (
        <div className="rounded-md border border-destructive/30 p-4">
          <p className="text-sm text-destructive">{error}</p>
          <button
            type="button"
            className="mt-2 text-sm font-medium underline"
            onClick={() => setRetryKey((key) => key + 1)}
          >
            Try again
          </button>
        </div>
      ) : (
        <ManagerReportsStats summary={filteredSummary} />
      )}

      <ManagerReportsToolbar
        period={period}
        customer={customer}
        customers={["All", ...customers]}
        onPeriodChange={setPeriod}
        onCustomerChange={setCustomer}
        onClearFilters={handleClearFilters}
      />

      <ManagerReportsAnalytics
        workOrderData={filteredWorkOrders}
        summary={filteredSummary}
      />

      <ManagerTechnicianPerformance
        workOrders={filteredWorkOrders}
      />

      <ManagerCustomerServicePerformance
        workOrders={filteredWorkOrders}
      />
    </div>
  );
}
