import { Building2, CheckCircle2, ClipboardList } from "lucide-react";

import StatsCard from "@/components/dashboard/shared/StatsCard";
import StatsGrid from "@/components/dashboard/shared/StatsGrid";

interface SiteStatsProps {
  totalSites: number;
  activeSites: number;
  openWorkOrders: number;
}

export default function SiteStats({
  totalSites,
  activeSites,
  openWorkOrders,
}: SiteStatsProps) {
  return (
    <StatsGrid>
      <StatsCard
        title="Total Sites"
        value={totalSites}
        description="All registered locations"
        icon={Building2}
      />

      <StatsCard
        title="Active Sites"
        value={activeSites}
        description="Currently available for service"
        icon={CheckCircle2}
      />

      <StatsCard
        title="Open Work Orders"
        value={openWorkOrders}
        description="Across your sites"
        icon={ClipboardList}
      />
    </StatsGrid>
  );
}