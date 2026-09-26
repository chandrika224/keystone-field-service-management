import { useEffect, useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import ManagerTechniciansToolbar from "@/components/dashboard/manager/Technicians/ManagerTechniciansToolbar";
import ManagerTechniciansTable from "@/components/dashboard/manager/Technicians/ManagerTechniciansTable";
import ManagerTechnicianDetailsDrawer from "@/components/dashboard/manager/Technicians/ManagerTechnicianDetailsDrawer";

import { technicianService } from "@/services/technicianService";
import type { Technician } from "@/types/technician";

export default function ManagerTechnicians() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await technicianService.getAllTechnicians();
        setTechnicians(data);
      } catch (err) {
        console.error("Failed to fetch technicians:", err);
        setError("Unable to load technicians. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void fetchTechnicians();
  }, []);

const [detailLoading, setDetailLoading] = useState(false);
const [detailError, setDetailError] = useState<string | null>(null);

const handleViewTechnician = async (technician: Technician) => {
  setSelectedTechnician(technician);
  setDrawerOpen(true);
  setDetailLoading(true);
  setDetailError(null);

  try {
    const data = await technicianService.getTechnicianById(technician.id);
    setSelectedTechnician(data);
  } catch (err) {
    console.error("Failed to fetch technician details:", err);
    setDetailError("Unable to load the latest technician details.");
  } finally {
    setDetailLoading(false);
  }
};

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

      {loading ? (
        <div className="rounded-lg border px-6 py-10 text-center text-muted-foreground">
          Loading technicians...
        </div>
      ) : error ? (
        <div role="alert" className="rounded-lg border px-6 py-10 text-center">
          <p className="text-destructive">{error}</p>
          <button
            type="button"
            className="mt-3 text-sm underline"
            onClick={() => {
              setLoading(true);
              setError(null);
              technicianService
                .getAllTechnicians()
                .then(setTechnicians)
                .catch((err) => {
                  console.error("Failed to fetch technicians:", err);
                  setError("Unable to load technicians. Please try again.");
                })
                .finally(() => setLoading(false));
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <ManagerTechniciansTable
          technicians={technicians}
          search={search}
          status={status}
          onView={handleViewTechnician}
        />
      )}

      <ManagerTechnicianDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        technician={selectedTechnician}
      />
    </div>
  );
}