/* =================================================
   FRONTEND STAFF TYPES
================================================= */

export type StaffRole =
  | "Dispatcher"
  | "Technician";

export type StaffStatus =
  | "Active"
  | "Inactive";


/* =================================================
   BACKEND STAFF ROLE
================================================= */

export type BackendStaffRole =
  | "DISPATCHER"
  | "TECHNICIAN";


/* =================================================
   FRONTEND STAFF MODEL
================================================= */

export interface ManagerStaff {
  id: string;

  employeeId: string;

  name: string;

  email: string;

  phone: string;

  role: StaffRole;

  specialization: string;

  status: StaffStatus;

  joinedDate: string;
}


/* =================================================
   CREATE STAFF REQUEST
================================================= */

export interface CreateStaffRequest {
  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  role: BackendStaffRole;

  specialization: string;
}


/* =================================================
   STAFF RESPONSE
   GET /api/staff
   GET /api/staff/{id}
   PUT /api/staff/{id}
================================================= */

export interface StaffResponse {
  id: number;

  employeeId: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  role: BackendStaffRole;

  specialization: string;

  active: boolean;

  joinedDate: string;

  /*
   * Only returned when creating staff.
   * Therefore it should NOT be mandatory.
   */
  temporaryPassword?: string;
}


/* =================================================
   UPDATE STAFF REQUEST
================================================= */

export interface UpdateStaffRequest {
  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  specialization: string;
}


/* =================================================
   STAFF STATUS UPDATE REQUEST
================================================= */

export interface StaffStatusUpdateRequest {
  active: boolean;
}