import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import WelcomeBanner from "@/components/dashboard/shared/WelcomeBanner";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/dashboard/shared/StatsCard";
import StatsGrid from "@/components/dashboard/shared/StatsGrid";

import { customerDashboardStats } from "@/data/dashboard/customerDashboardData";
import QuickActions from "@/components/dashboard/shared/QuickActions";
import { customerQuickActions } from "@/data/dashboard/customerQuickActions";

import RecentWorkOrders from "@/components/dashboard/customer/RecentWorkOrders";
import UpcomingSchedule from "@/components/dashboard/customer/UpcomingSchedule";
import RecentActivity from "@/components/dashboard/customer/RecentActivity";
import SupportCenter from "@/components/dashboard/customer/SupportCenter";

import { workOrderService } from "@/services/workOrderService";

// Infer the exact order type from the service method's return value.
type CustomerWorkOrder = Awaited<
  ReturnType<typeof workOrderService.getMyWorkOrders>
>[number];

type CustomerDashboardProps = {
  email: string;
};

const ACTIVE_STATUSES = [
  "NEW",
  "ASSIGNED",
  "ACCEPTED",
  "IN_PROGRESS",
  "ON_HOLD",
];

const CLOSED_STATUSES = ["COMPLETED", "CLOSED"];
const CANCELLED_STATUSES = ["CANCELLED"];

export default function CustomerDashboard({
  email,
}: CustomerDashboardProps) {
  const navigate = useNavigate();

  const [workOrders, setWorkOrders] = useState<CustomerWorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const quickActions = customerQuickActions(navigate);

  useEffect(() => {
  let isCurrent = true;

  async function loadWorkOrders() {
    console.log("[CustomerDashboard] email prop:", email);

    if (!email?.trim()) {
      setWorkOrders([]);
      setError("Customer email is missing. Check the dashboard's email prop.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await workOrderService.getMyWorkOrders(email.trim());

      console.log("[CustomerDashboard] API response:", data);
      console.log(
        "[CustomerDashboard] Is array:",
        Array.isArray(data),
        "Count:",
        Array.isArray(data) ? data.length : "not an array"
      );

      if (!Array.isArray(data)) {
        throw new Error("Expected the API to return an array of work orders.");
      }

      if (isCurrent) {
        setWorkOrders(data);
      }
    } catch (err) {
      console.error("[CustomerDashboard] Fetch failed:", err);

      if (isCurrent) {
        setError(
          err instanceof Error
            ? err.message
            : "Couldn't load your work orders. Please try again."
        );
      }
    } finally {
      if (isCurrent) {
        setLoading(false);
      }
    }
  }

  loadWorkOrders();

  return () => {
    isCurrent = false;
  };
}, [email, reloadKey]);

  const {
    activeCount,
    completedCount,
    upcomingCount,
    recentWorkOrders,
    upcomingWorkOrders,
  } = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const active = workOrders.filter((order) =>
      ACTIVE_STATUSES.includes(order.status)
    );

    const completed = workOrders.filter((order) =>
      CLOSED_STATUSES.includes(order.status)
    );

    const upcoming = workOrders
      .filter((order) => {
        if (
          CLOSED_STATUSES.includes(order.status) ||
          CANCELLED_STATUSES.includes(order.status) ||
          !order.scheduledDate
        ) {
          return false;
        }

        const scheduledDate = new Date(order.scheduledDate);
        if (Number.isNaN(scheduledDate.getTime())) return false;

        scheduledDate.setHours(0, 0, 0, 0);
        return scheduledDate >= now;
      })
      .sort(
        (a, b) =>
          new Date(a.scheduledDate).getTime() -
          new Date(b.scheduledDate).getTime()
      );

    const recent = [...workOrders]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    return {
      activeCount: active.length,
      completedCount: completed.length,
      upcomingCount: upcoming.length,
      recentWorkOrders: recent,
      upcomingWorkOrders: upcoming.slice(0, 5),
    };
  }, [workOrders]);

  // Keep the existing card styling/icons, but replace mock values with live counts.
  const liveStats = customerDashboardStats.map((stat) => {
    const title = stat.title.toLowerCase();

    let value: number;

    if (title.includes("active") || title.includes("ongoing")) {
      value = activeCount;
    } else if (title.includes("complete") || title.includes("closed")) {
      value = completedCount;
    } else if (title.includes("upcoming") || title.includes("schedule")) {
      value = upcomingCount;
    } else {
      // Default summary card: total requests/orders.
      value = workOrders.length;
    }

    return {
      ...stat,
      value: loading ? "—" : value,
      description: loading ? "Loading…" : stat.description,
      trend: undefined,
      trendType: undefined,
    };
  });

  return (
    <div className="space-y-8">
      <WelcomeBanner
        title="Welcome Back 👋"
        subtitle="Manage your service requests from one place."
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Your Overview</h2>
          <p className="text-sm text-muted-foreground">
            A snapshot of your service requests.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/customer/work-orders")}
        >
          View All Work Orders
        </Button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
        >
          <p className="text-sm">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            Try Again
          </Button>
        </div>
      )}

      <StatsGrid>
        {liveStats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            trendType={stat.trendType}
          />
        ))}
      </StatsGrid>

      <section className="space-y-4">
        <SectionHeader
          title="Quick Actions"
          subtitle="Frequently used actions"
        />
        <QuickActions actions={quickActions} />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-4">
          <SectionHeader
            title="Recent Work Orders"
            subtitle="Track your latest service requests"
          />

          {loading ? (
            <div className="rounded-xl border p-6 text-sm text-muted-foreground">
              Loading your recent work orders…
            </div>
          ) : (
            <RecentWorkOrders workOrders={recentWorkOrders} />
          )}
        </section>

        <section className="space-y-4">
          <SectionHeader
            title="Upcoming Schedule"
            subtitle="Your upcoming service appointments"
          />

          {loading ? (
            <div className="rounded-xl border p-6 text-sm text-muted-foreground">
              Loading your upcoming appointments…
            </div>
          ) : (
            <UpcomingSchedule workOrders={upcomingWorkOrders} />
          )}
        </section>
      </div>

      <section className="space-y-4">
        <SectionHeader
          title="Recent Activity"
          subtitle="Latest updates on your account"
        />
        <RecentActivity />
      </section>

      <section className="space-y-4">
        <SectionHeader
          title="Support Center"
          subtitle="Need help? Reach out to our support team."
        />
        <SupportCenter />
      </section>
    </div>
  );
}