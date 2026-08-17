import { useEffect, useState } from "react";

import DispatcherTechniciansTable
  from "@/components/dashboard/dispatcher/Technicians/DispatcherTechniciansTable";

import DispatcherTechniciansToolbar
  from "@/components/dashboard/dispatcher/Technicians/DispatcherTechniciansToolbar";

import SectionHeader
  from "@/components/dashboard/shared/SectionHeader";

import DispatcherTechnicianDetailsDrawer
  from "@/components/dashboard/dispatcher/Technicians/DispatcherTechnicianDetailsDrawer";

import type { Technician } from "@/types/workOrder";

import { getAllTechnicians }
  from "../../services/technicianService";


export default function DispatcherTechnicians() {

  // ============================================================
  // STATE
  // ============================================================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const [techniciansData, setTechniciansData] =
    useState<Technician[]>([]);

  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);


  // ============================================================
  // LOAD TECHNICIANS FROM BACKEND
  // ============================================================

  useEffect(() => {

    const loadTechnicians = async () => {

      try {

        setLoading(true);
        setError(null);

        const data =
          await getAllTechnicians();

        console.log(
          "Technicians from backend:",
          data
        );

        setTechniciansData(data);

      } catch (error) {

        console.error(
          "Failed to load technicians:",
          error
        );

        setError(
          "Failed to load technicians"
        );

      } finally {

        setLoading(false);

      }
    };

    loadTechnicians();

  }, []);


  // ============================================================
  // VIEW TECHNICIAN
  // ============================================================

  const handleViewTechnician = (
    technician: Technician
  ) => {

    console.log(
      "Selected technician:",
      technician
    );

    setSelectedTechnician(technician);

    setDrawerOpen(true);
  };


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (
      <div className="space-y-6">

        <SectionHeader
          title="Technicians"
          subtitle="Manage technician availability and assignments."
        />

        <div className="rounded-xl border p-6">
          Loading technicians...
        </div>

      </div>
    );
  }


  // ============================================================
  // ERROR
  // ============================================================

  if (error) {

    return (
      <div className="space-y-6">

        <SectionHeader
          title="Technicians"
          subtitle="Manage technician availability and assignments."
        />

        <div className="rounded-xl border p-6 text-red-500">
          {error}
        </div>

      </div>
    );
  }


  // ============================================================
  // UI
  // ============================================================

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