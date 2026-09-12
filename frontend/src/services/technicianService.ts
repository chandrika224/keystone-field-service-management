import api from "@/lib/api";
import type { Technician } from "@/types/technician";

export const technicianService = {
  // ============================================================
  // GET ALL TECHNICIANS
  // GET /api/technicians
  // ============================================================

  getAllTechnicians: async (): Promise<Technician[]> => {
    const response = await api.get<Technician[]>(
      "/technicians"
    );

    return response.data;
  },

  // ============================================================
  // GET AVAILABLE TECHNICIANS
  // GET /api/technicians/available
  // ============================================================

  getAvailableTechnicians: async (): Promise<Technician[]> => {
    const response = await api.get<Technician[]>(
      "/technicians/available"
    );

    return response.data;
  },

  // ============================================================
  // GET TECHNICIAN BY ID
  // GET /api/technicians/{id}
  // ============================================================

  getTechnicianById: async (
    id: number
  ): Promise<Technician> => {
    const response = await api.get<Technician>(
      `/technicians/${id}`
    );

    return response.data;
  },
};