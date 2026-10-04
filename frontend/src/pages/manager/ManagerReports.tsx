import { useEffect, useMemo, useState } from "react";

import SectionHeader
  from "@/components/dashboard/shared/SectionHeader";

import ManagerReportsStats
  from "@/components/dashboard/manager/Reports/ManagerReportsStats";

import ManagerReportsToolbar
  from "@/components/dashboard/manager/Reports/ManagerReportsToolbar";

import ManagerReportsAnalytics
  from "@/components/dashboard/manager/Reports/ManagerReportsAnalytics";

import ManagerTechnicianPerformance
  from "@/components/dashboard/manager/Reports/ManagerTechnicianPerformance";

import ManagerCustomerServicePerformance
  from "@/components/dashboard/manager/Reports/ManagerCustomerServicePerformance";

import {
  technicianPerformance,
  customerPerformance,
  servicePerformance,
  workOrderPerformance,
} from "@/data/manager/reports";

import type { ReportSummary } from "@/data/manager/reports";
import { workOrderService } from "@/services/workOrderService";
import type { DispatcherWorkOrder } from "@/types/workOrder";

const initialSummary: ReportSummary = {
  totalWorkOrders: 0,
  completedWorkOrders: 0,
  pendingWorkOrders: 0,
  cancelledWorkOrders: 0,
  completionRate: 0,
};

export default function ManagerReports() {
  const [period, setPeriod] = useState("Last 6 Months");
  const [customer, setCustomer] = useState("All");

  const [summary, setSummary] = useState<ReportSummary>(initialSummary);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadReportSummary() {
      try {
        setLoading(true);
        setError("");

        const workOrders: DispatcherWorkOrder[] =
          await workOrderService.getAllWorkOrders();

        if (!isMounted) return;

        const completedWorkOrders = workOrders.filter(
          (order) =>
            order.status === "COMPLETED" ||
            order.status === "CLOSED"
        ).length;

        const cancelledWorkOrders = workOrders.filter(
          (order) => order.status === "CANCELLED"
        ).length;

        const pendingWorkOrders = workOrders.filter(
          (order) =>
            order.status === "NEW" ||
            order.status === "ASSIGNED" ||
            order.status === "ACCEPTED" ||
            order.status === "IN_PROGRESS" ||
            order.status === "ON_HOLD"
        ).length;

        const totalWorkOrders = workOrders.length;

        const completionRate =
          totalWorkOrders === 0
            ? 0
            : Math.round(
                (completedWorkOrders / totalWorkOrders) * 100
              );

        setSummary({
          totalWorkOrders,
          completedWorkOrders,
          pendingWorkOrders,
          cancelledWorkOrders,
          completionRate,
        });
      } catch (err) {
        console.error("Failed to load manager report summary:", err);

        if (isMounted) {
          setError(
            "Could not load report summary. Check the API connection and try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadReportSummary();

    return () => {
      isMounted = false;
    };
  }, [retryKey]);

  // These customer options and detail datasets are still local/mock data.
  const customers = useMemo(() => {
    return customerPerformance.map((item) => item.customer);
  }, []);

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
  };

  const handleCustomerChange = (value: string) => {
    setCustomer(value);
  };

  const handleClearFilters = () => {
    setPeriod("Last 6 Months");
    setCustomer("All");
  };

  const filteredCustomers = useMemo(() => {
    if (customer === "All") {
      return customerPerformance;
    }

    return customerPerformance.filter(
      (item) => item.customer === customer
    );
  }, [customer]);

  // This month mapping is still fixed demo data, not a live date range.
  const getPeriodMonths = (selectedPeriod: string) => {
    switch (selectedPeriod) {
      case "This Month":
        return ["Jun"];

      case "Last Month":
        return ["May"];

      case "This Quarter":
        return ["Apr", "May", "Jun"];

      case "This Year":
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

      case "Last 6 Months":
      default:
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    }
  };

  const filteredWorkOrderPerformance = useMemo(() => {
    const months = getPeriodMonths(period);

    return workOrderPerformance.filter((item) =>
      months.includes(item.period)
    );
  }, [period]);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Reports"
        subtitle="Operational performance and field-service analytics."
      />

      {loading ? (
        <p className="text-sm text-muted-foreground">
          Loading report summary...
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
        <ManagerReportsStats summary={summary} />
      )}

      <ManagerReportsToolbar
        period={period}
        customer={customer}
        customers={customers}
        onPeriodChange={handlePeriodChange}
        onCustomerChange={handleCustomerChange}
        onClearFilters={handleClearFilters}
      />

      <ManagerReportsAnalytics
        workOrderData={filteredWorkOrderPerformance}
      />

      <ManagerTechnicianPerformance
        technicians={technicianPerformance}
      />

      <ManagerCustomerServicePerformance
        customers={filteredCustomers}
        services={servicePerformance}
      />
    </div>
  );
}