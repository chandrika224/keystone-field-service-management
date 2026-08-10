import WelcomeBanner from "@/components/dashboard/shared/WelcomeBanner";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/dashboard/shared/StatsCard";
import StatsGrid from "@/components/dashboard/shared/StatsGrid";
import { customerDashboardStats } from "@/data/dashboard/customerDashboardData";
import {
  ClipboardList,
  CircleCheckBig,
  Clock3,
  Users,
} from "lucide-react";
import QuickActions from "@/components/dashboard/shared/QuickActions";
import { customerQuickActions } from "@/data/dashboard/customerQuickActions";
import RecentWorkOrders from "@/components/dashboard/customer/RecentWorkOrders";
import UpcomingSchedule from "@/components/dashboard/customer/UpcomingSchedule";
import RecentActivity from "@/components/dashboard/customer/RecentActivity";
import NotificationsPanel from "@/components/dashboard/customer/NotificationsPanel";
import SupportCenter from "@/components/dashboard/customer/SupportCenter";

export default function CustomerDashboard() {
  return (
    <div className="space-y-8">

      <WelcomeBanner
        title="Welcome Back 👋"
        subtitle="Manage your service requests from one place."
      />

      <SectionHeader
        title="Recent Work Orders"
        subtitle="Track your latest requests."
        action={
          <Button variant="outline">
            View All
          </Button>
        }
      />

      <StatsGrid>
        {customerDashboardStats.map((stat) => (
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

      <SectionHeader
        title="Quick Actions"
        subtitle="Frequently used actions"
      />

      <QuickActions
        actions={customerQuickActions}
      />

      <div className="grid gap-6 lg:grid-cols-2">

  <div className="space-y-4">

      <SectionHeader
        title="Recent Work Orders"
        subtitle="Track your latest service requests"
      />

      <RecentWorkOrders />

    </div>

    <div className="space-y-4">

      <SectionHeader
        title="Upcoming Schedule"
        subtitle="Your upcoming service appointments"
      />

      <UpcomingSchedule />

    </div>

  </div>
      <SectionHeader
      title="Recent Activity"
      subtitle="Latest updates on your account"
    />

    <RecentActivity />

    <SectionHeader
      title="Support Center"
      subtitle="Need help? Reach out to our support team."
    />

    <SupportCenter />
              
    </div>
  );
}