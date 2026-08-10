import WelcomeBanner from "@/components/dashboard/shared/WelcomeBanner";
import { technicianJobs } from "@/data/technician/jobs";

import TechnicianDashboardStats
  from "@/components/dashboard/technician/TechnicianDashboardStats";

import TechnicianTodayTasks
  from "@/components/dashboard/technician/TechnicianTodayTasks";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";

export default function TechnicianDashboard() {
  return (
    <div className="space-y-6">

      <SectionHeader
        title="Technician Dashboard"
        subtitle="Complete your assigned jobs."
      />

      <TechnicianDashboardStats
        jobs={technicianJobs}
      />

      <TechnicianTodayTasks
        jobs={technicianJobs}
        onView={(job) => {
          console.log("Technician job clicked:", job);
        }}
      />

    </div>
  );
}