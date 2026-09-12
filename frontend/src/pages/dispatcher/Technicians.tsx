import DispatcherTechniciansTable from "@/components/dashboard/dispatcher/Technicians/DispatcherTechniciansTable";
import DispatcherTechniciansToolbar from "@/components/dashboard/dispatcher/Technicians/DispatcherTechniciansToolbar";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import DispatcherTechnicianDetailsDrawer from "@/components/dashboard/dispatcher/Technicians/DispatcherTechnicianDetailsDrawer";

import { useEffect, useState } from "react";

import { technicianService } from "@/services/technicianService";

import { toast } from "sonner";
import type { Technician } from "@/types/technician";


export default function DispatcherTechnicians() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [techniciansData, setTechniciansData] =
    useState<Technician[]>([]);

  const [loading, setLoading] = useState(false);

  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  // ============================================================
  // FETCH ALL TECHNICIANS
  // GET /api/technicians
  // ============================================================

  useEffect(() => {
    const loadTechnicians = async () => {
      try {
        setLoading(true);

        console.log("Fetching all technicians...");

        const data =
          await technicianService.getAllTechnicians();

        console.log(
          "Technicians received:",
          data
        );

        setTechniciansData(data);
      } catch (error) {
        console.error(
          "Failed to load technicians:",
          error
        );

        toast.error(
          "Failed to load technicians."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTechnicians();
  }, []);

  // ============================================================
  // VIEW TECHNICIAN DETAILS
  // GET /api/technicians/{id}
  // ============================================================

  const handleViewTechnician = async (
    technician: Technician
  ) => {
    try {
      console.log(
        "Fetching technician details:",
        technician.id
      );

      const data =
        await technicianService.getTechnicianById(
          technician.id
        );

      console.log(
        "Technician details received:",
        data
      );

      setSelectedTechnician(data);
      setDrawerOpen(true);

    } catch (error) {
      console.error(
        "Failed to load technician details:",
        error
      );

      toast.error(
        "Failed to load technician details."
      );
    }
  };

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Technicians"
        subtitle="Manage technician availability and assignments."
      />

      {/* ========================================================
          TOOLBAR
      ======================================================== */}

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

      {/* ========================================================
          TECHNICIANS TABLE
      ======================================================== */}

      <DispatcherTechniciansTable
        technicians={techniciansData}
        search={search}
        status={status}
        onView={handleViewTechnician}
      />

      {/* ========================================================
          TECHNICIAN DETAILS DRAWER
      ======================================================== */}

      <DispatcherTechnicianDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        technician={selectedTechnician}
        onChangeStatus={(technician) => {
          console.log(
            "Change status:",
            technician
          );
        }}
      />

    </div>
  );
}