import ManagerWorkOrderTrendsChart
  from "@/components/dashboard/manager/Reports/ManagerWorkOrderTrendsChart";

import ManagerWorkOrderStatusChart
  from "@/components/dashboard/manager/Reports/ManagerWorkOrderStatusChart";

import ManagerServiceDistributionChart
  from "@/components/dashboard/manager/Reports/ManagerServiceDistributionChart";

import ManagerTechnicianPerformanceChart
  from "@/components/dashboard/manager/Reports/ManagerTechnicianPerformanceChart";

import {
  reportSummary,
  workOrderPerformance,
  servicePerformance,
  technicianPerformance,
} from "@/data/manager/reports";

interface ManagerReportsAnalyticsProps {
  workOrderData: typeof workOrderPerformance;
}

export default function ManagerReportsAnalytics({
  workOrderData,
}: ManagerReportsAnalyticsProps) {
  return (
    <div className="space-y-6">

      {/* ========================================= */}
      {/* Work Order Trends */}
      {/* ========================================= */}

      <ManagerWorkOrderTrendsChart
        data={workOrderData}
      />

      {/* ========================================= */}
      {/* Status + Service */}
      {/* ========================================= */}

      <div className="grid gap-6 lg:grid-cols-2">

        <ManagerWorkOrderStatusChart
          summary={reportSummary}
        />

        <ManagerServiceDistributionChart
          data={servicePerformance}
        />

      </div>

      {/* ========================================= */}
      {/* Technician Performance */}
      {/* ========================================= */}

      <ManagerTechnicianPerformanceChart
        data={technicianPerformance}
      />

    </div>
  );
}