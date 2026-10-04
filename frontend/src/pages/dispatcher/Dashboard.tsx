import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  UserCheck,
  Users,
  Clock3,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { workOrderService } from "@/services/workOrderService";
import type {
  DispatcherWorkOrder,
  WorkOrderStatus,
} from "@/types/workOrder";

const OPEN_STATUSES: WorkOrderStatus[] = [
  "NEW",
  "ASSIGNED",
  "ACCEPTED",
  "IN_PROGRESS",
  "ON_HOLD",
];

const CLOSED_STATUSES: WorkOrderStatus[] = [
  "COMPLETED",
  "CLOSED",
  "CANCELLED",
];

// Get today's date using the browser's local calendar date.
function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Handles both date-only values (YYYY-MM-DD) and date-time strings.
function getScheduledDateKey(value: string): string {
  if (!value) return "";

  // A date-only string should not be parsed as UTC and shifted by timezone.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value.slice(0, 10) : getLocalDateKey(date);
}

function formatScheduleTime(value: string): string {
  if (!value) return "Time not set";

  // Date-only values don't include a scheduled time.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return "Time not set";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Time not set";

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatStatus(status: WorkOrderStatus): string {
  switch (status) {
    case "NEW":
      return "New";
    case "ASSIGNED":
      return "Assigned";
    case "ACCEPTED":
      return "Accepted";
    case "IN_PROGRESS":
      return "In Progress";
    case "ON_HOLD":
      return "On Hold";
    case "COMPLETED":
      return "Completed";
    case "CLOSED":
      return "Closed";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
}

function getStatusBadgeClass(status: WorkOrderStatus): string {
  if (status === "IN_PROGRESS" || status === "ACCEPTED") {
    return "bg-green-100 text-green-700";
  }

  if (status === "NEW" || status === "ON_HOLD") {
    return "bg-orange-100 text-orange-700";
  }

  return "bg-blue-100 text-blue-700";
}

export default function DispatcherDashboard() {
  const [workOrders, setWorkOrders] = useState<DispatcherWorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadWorkOrders = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const data = await workOrderService.getAllWorkOrders();
      setWorkOrders(data);
    } catch (err) {
      console.error("Failed to load dispatcher work orders:", err);
      setError("Could not load work orders. Check your connection and try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadWorkOrders();

    const intervalId = window.setInterval(() => {
      void loadWorkOrders(true);
    }, 30_000);

    return () => window.clearInterval(intervalId);
  }, [loadWorkOrders, refreshKey]);

  const openWorkOrders = useMemo(
    () => workOrders.filter((order) => OPEN_STATUSES.includes(order.status)),
    [workOrders]
  );

  const unassignedCount = openWorkOrders.filter(
    (order) => order.technicianId == null
  ).length;

  const assignedCount = openWorkOrders.filter(
    (order) => order.technicianId != null
  ).length;

  const assignedTechnicianCount = new Set(
    openWorkOrders
      .map((order) => order.technicianId)
      .filter((id): id is number => id != null)
  ).size;

  const todayKey = getLocalDateKey(new Date());

  const todaySchedule = useMemo(
    () =>
      workOrders
        .filter(
          (order) =>
            getScheduledDateKey(order.scheduledDate) === todayKey &&
            !CLOSED_STATUSES.includes(order.status)
        )
        .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate)),
    [workOrders, todayKey]
  );

  const statusCounts = useMemo(
    () => ({
      pending: workOrders.filter((order) => order.status === "NEW").length,
      assigned: workOrders.filter(
        (order) => order.status === "ASSIGNED" || order.status === "ACCEPTED"
      ).length,
      inProgress: workOrders.filter(
        (order) => order.status === "IN_PROGRESS" || order.status === "ON_HOLD"
      ).length,
      completed: workOrders.filter(
        (order) => order.status === "COMPLETED" || order.status === "CLOSED"
      ).length,
    }),
    [workOrders]
  );

  const handleRefresh = () => {
    setRefreshKey((current) => current + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionHeader
          title="Dispatcher Dashboard"
          subtitle="Monitor work orders, technician assignments, and today's field operations."
        />

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={handleRefresh}
            className="font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Open Work Orders"
          value={loading ? "—" : openWorkOrders.length}
          note="Not yet closed or cancelled"
          icon={<ClipboardList className="h-6 w-6" />}
          iconClass="bg-blue-100 text-blue-600"
        />

        <KpiCard
          label="Unassigned Jobs"
          value={loading ? "—" : unassignedCount}
          note="Open orders without a technician"
          icon={<Clock3 className="h-6 w-6" />}
          iconClass="bg-orange-100 text-orange-600"
        />

        <KpiCard
          label="Assigned Jobs"
          value={loading ? "—" : assignedCount}
          note={
            loading
              ? "Loading assignments..."
              : `${assignedTechnicianCount} technicians with open assignments`
          }
          icon={<UserCheck className="h-6 w-6" />}
          iconClass="bg-green-100 text-green-600"
        />

        <KpiCard
          label="Available Technicians"
          value="—"
          note="Technician status API not connected"
          icon={<Users className="h-6 w-6" />}
          iconClass="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Today's Schedule and Technician Status */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Today's Schedule</h2>
                <p className="text-sm text-muted-foreground">
                  Overview of today's scheduled work orders
                </p>
              </div>

              <Link
                to="/dispatcher/work-orders"
                className="shrink-0 text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {loading ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Loading today's schedule...
                </p>
              ) : todaySchedule.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No work orders scheduled for today.
                </p>
              ) : (
                todaySchedule.map((order) => (
                  <ScheduleItem
                    key={order.id}
                    time={formatScheduleTime(order.scheduledDate)}
                    title={order.title}
                    location={order.address || order.siteName || "Location not provided"}
                    technician={order.technicianName || "Unassigned"}
                    status={order.status}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div>
              <h2 className="text-lg font-semibold">Technician Status</h2>
              <p className="text-sm text-muted-foreground">
                Live availability requires technician-status data
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
              This panel will show available, on-job, and offline technicians
              after we connect the technician API.
            </div>

            <div className="mt-6 border-t pt-4">
              <Link
                to="/dispatcher/technicians"
                className="text-sm font-medium text-primary hover:underline"
              >
                View technicians
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Work Order Overview */}
      <Card>
        <CardContent className="p-6">
          <div>
            <h2 className="text-lg font-semibold">Work Order Overview</h2>
            <p className="text-sm text-muted-foreground">
              Current status of all work orders
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <WorkOrderStatus
              label="Pending"
              count={loading ? "—" : statusCounts.pending}
            />
            <WorkOrderStatus
              label="Assigned"
              count={loading ? "—" : statusCounts.assigned}
            />
            <WorkOrderStatus
              label="In Progress / On Hold"
              count={loading ? "—" : statusCounts.inProgress}
            />
            <WorkOrderStatus
              label="Completed / Closed"
              count={loading ? "—" : statusCounts.completed}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <div>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">
              Common dispatcher actions
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/dispatcher/work-orders"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              + Create Work Order
            </Link>

            <Link
              to="/dispatcher/assignments"
              className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              Assign Technician
            </Link>

            <Link
              to="/dispatcher/work-orders"
              className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              View Work Orders
            </Link>

            <Link
              to="/dispatcher/customers"
              className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              View Customers
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- KPI Card ---------------- */

function KpiCard({
  label,
  value,
  note,
  icon,
  iconClass,
}: {
  label: string;
  value: number | string;
  note: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <h2 className="mt-2 text-3xl font-bold">{value}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{note}</p>
          </div>

          <div className={`rounded-xl p-3 ${iconClass}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------- Schedule Item ---------------- */

function ScheduleItem({
  time,
  title,
  location,
  technician,
  status,
}: {
  time: string;
  title: string;
  location: string;
  technician: string;
  status: WorkOrderStatus;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border p-4">
      <div className="min-w-[85px] text-sm font-medium">{time}</div>

      <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-100" />

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{title}</p>
        <p className="truncate text-sm text-muted-foreground">
          {location} • {technician}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(
          status
        )}`}
      >
        {formatStatus(status)}
      </span>
    </div>
  );
}

/* ---------------- Work Order Status ---------------- */

function WorkOrderStatus({
  label,
  count,
}: {
  label: string;
  count: number | string;
}) {
  return (
    <div className="rounded-xl border bg-muted/30 p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{count}</p>
    </div>
  );
}