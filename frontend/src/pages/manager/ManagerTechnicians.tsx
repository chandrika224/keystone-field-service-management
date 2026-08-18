import { useEffect, useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import ManagerTechniciansToolbar from "@/components/dashboard/manager/Technicians/ManagerTechniciansToolbar";
import ManagerTechniciansTable from "@/components/dashboard/manager/Technicians/ManagerTechniciansTable";
import ManagerTechnicianDetailsDrawer from "@/components/dashboard/manager/Technicians/ManagerTechnicianDetailsDrawer";

import type { Technician } from "@/types/workOrder";
import { getAllTechnicians } from "@/services/technicianService";

export default function ManagerTechnicians() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const loadTechnicians = async () => {
      try {
        const data = await getAllTechnicians();
        setTechnicians(data);
      } catch (error) {
        console.error("Failed to load technicians:", error);
      }
    };

    loadTechnicians();
  }, []);

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