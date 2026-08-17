import api from "@/lib/api";


export interface Technician {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  role: "TECHNICIAN";
  active: boolean;
}

export const getAllTechnicians = async (): Promise<Technician[]> => {
  const response = await api.get("/technicians");
  return response.data;
};

export const getTechnicianById = async (
  id: number
): Promise<Technician> => {
  const response = await api.get(`/technicians/${id}`);
  return response.data;
};