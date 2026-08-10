import { useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import ManagerTechniciansToolbar
  from "@/components/dashboard/manager/Technicians/ManagerTechniciansToolbar";

import ManagerTechniciansTable
  from "@/components/dashboard/manager/Technicians/ManagerTechniciansTable";

import type { Technician } from "@/types/workOrder";

import { technicians } from "@/data/dispatcher/technicians";

import ManagerTechnicianDetailsDrawer
  from "@/components/dashboard/manager/Technicians/ManagerTechnicianDetailsDrawer";

export default function ManagerTechnicians() {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Technicians"
        subtitle="Monitor technician availability and workload."
      />

      <ManagerTechniciansToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <ManagerTechniciansTable
        technicians={technicians}
        search={search}
        status={status}
        onView={(technician) => {

          console.log(
            "Manager viewed technician:",
            technician
          );

          setSelectedTechnician(technician);
          setDrawerOpen(true);
        }}
      />

      <ManagerTechnicianDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        technician={selectedTechnician}
      />

    </div>
  );
}