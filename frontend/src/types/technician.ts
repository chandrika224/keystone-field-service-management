export type TechnicianSpecialization =
  | "GENERAL"
  | "HVAC"
  | "ELECTRICIAN"
  | "PLUMBER"
  | "CARPENTER"
  | "PAINTER";

export interface Technician {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: TechnicianSpecialization;
  active: boolean;
  available: boolean;
  role: "TECHNICIAN";
}