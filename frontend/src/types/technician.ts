export type TechnicianRole = "TECHNICIAN";

export interface Technician {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  role: TechnicianRole;
  active: boolean;
}