
import ManagerWorkOrderTrendsChart from "@/components/dashboard/manager/Reports/ManagerWorkOrderTrendsChart";
import ManagerWorkOrderStatusChart from "@/components/dashboard/manager/Reports/ManagerWorkOrderStatusChart";
import ManagerServiceDistributionChart from "@/components/dashboard/manager/Reports/ManagerServiceDistributionChart";
import ManagerTechnicianPerformanceChart from "@/components/dashboard/manager/Reports/ManagerTechnicianPerformanceChart";

import type { DispatcherWorkOrder } from "@/types/workOrder";
import type { ReportSummary } from "@/data/manager/reports";

interface ManagerReportsAnalyticsProps {
  workOrderData: DispatcherWorkOrder[];
  summary: ReportSummary;
}

export default function ManagerReportsAnalytics({
  workOrderData = [],
  summary,
}: ManagerReportsAnalyticsProps) {
  return (
    <div className="space-y-6">
      <ManagerWorkOrderTrendsChart data={workOrderData} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ManagerWorkOrderStatusChart summary={summary} />

        <ManagerServiceDistributionChart
          workOrders={workOrderData}
        />
      </div>

      <ManagerTechnicianPerformanceChart
        workOrders={workOrderData}
      />
    </div>
  );
}
