import DispatcherTechniciansTable from "@/components/dashboard/dispatcher/Technicians/DispatcherTechniciansTable";
import DispatcherTechniciansToolbar from "@/components/dashboard/dispatcher/Technicians/DispatcherTechniciansToolbar";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import type { Technician } from "@/types/workOrder";
import DispatcherTechnicianDetailsDrawer from "@/components/dashboard/dispatcher/Technicians/DispatcherTechnicianDetailsDrawer";


import { useState } from "react";
import { technicians } from "@/data/dispatcher/technicians";

export default function DispatcherTechnicians() {

  // ...existing code...
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [techniciansData, setTechniciansData] =
      useState<Technician[]>(technicians);

    const [selectedTechnician, setSelectedTechnician] =
      useState<Technician | null>(null);

    const [drawerOpen, setDrawerOpen] =
      useState(false);
// ...existing code...

  return (
  <div className="space-y-6">

    <SectionHeader
      title="Technicians"
      subtitle="Manage technician availability and assignments."
    />

    <DispatcherTechniciansToolbar
      search={search}
      onSearchChange={setSearch}
      status={status}
      onStatusChange={(value) => {
        if (value !== null) {
          setStatus(value);
        }
      }}
    />

    <DispatcherTechniciansTable
        technicians={techniciansData}
        search={search}
        status={status}
        onView={(technician) => {
          console.log("Parent received:", technician);

          setSelectedTechnician(technician);
          setDrawerOpen(true);
        }}
      />

      <DispatcherTechnicianDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        technician={selectedTechnician}
        onChangeStatus={(technician) => {
          console.log("Change status:", technician);
        }}
      />

  </div>
);
}