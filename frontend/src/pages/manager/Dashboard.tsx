import ManagerDashboardStats
  from "@/components/dashboard/manager/ManagerDashboardStats";

import SectionHeader
  from "@/components/dashboard/shared/SectionHeader";

import { dispatcherWorkOrders } from "@/data/dispatcher/workOrders";
import ManagerRecentWorkOrders
from "@/components/dashboard/manager/ManagerRecentWorkOrders";

import ManagerTechnicianOverview
  from "@/components/dashboard/manager/ManagerTechnicianOverview";

import { technicians }
  from "@/data/dispatcher/technicians";

export default function ManagerDashboard() {
  return (
    <div className="space-y-6">

      <SectionHeader
        title="Manager Dashboard"
        subtitle="Monitor field service operations and team performance."
      />

      <ManagerDashboardStats
        totalWorkOrders={24}
        activeJobs={8}
        completedJobs={14}
        availableTechnicians={5}
      />

      <ManagerRecentWorkOrders
        workOrders={dispatcherWorkOrders}
        onView={(workOrder) => {
          console.log("Manager viewed work order:", workOrder);
        }}
      />

      <ManagerTechnicianOverview
        technicians={technicians}
      />

    </div>
  );
}