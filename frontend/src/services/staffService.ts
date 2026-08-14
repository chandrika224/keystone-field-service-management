import axios from "axios";

import type {
  CreateStaffRequest,
  StaffResponse,
  ManagerStaff,
  UpdateStaffRequest,
} from "@/data/manager/staff";

import { getAccessToken } from "@/utils/token";

const API_BASE_URL = "http://localhost:8080/api";

/* ------------------------------------------------
   AUTH HEADERS
------------------------------------------------ */

const getAuthHeaders = () => {
  const token = getAccessToken();

  console.log("ACCESS TOKEN:", token);

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

/* ------------------------------------------------
   BACKEND → FRONTEND MAPPER
------------------------------------------------ */

export const mapStaffResponse = (
  staff: StaffResponse
): ManagerStaff => {

  return {
    id: String(staff.id),

    employeeId: staff.employeeId,

    name: `${staff.firstName} ${staff.lastName}`,

    email: staff.email,

    phone: staff.phone ?? "",

    role:
      staff.role === "DISPATCHER"
        ? "Dispatcher"
        : "Technician",

    specialization:
      staff.specialization ?? "",

    status:
      staff.active
        ? "Active"
        : "Inactive",

    joinedDate: staff.joinedDate,
  };
};

/* ------------------------------------------------
   GET ALL STAFF
------------------------------------------------ */

export const getAllStaff = async (): Promise<ManagerStaff[]> => {

  const response = await axios.get<StaffResponse[]>(
    `${API_BASE_URL}/staff`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data.map(mapStaffResponse);
};

/* ------------------------------------------------
   GET STAFF BY ID
------------------------------------------------ */

export const getStaffById = async (
  id: string
): Promise<ManagerStaff> => {

  const response = await axios.get<StaffResponse>(
    `${API_BASE_URL}/staff/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return mapStaffResponse(response.data);
};

/* ------------------------------------------------
   CREATE STAFF
------------------------------------------------ */

export const createStaff = async (
  data: CreateStaffRequest
): Promise<StaffResponse> => {

  console.log("CREATE STAFF API");
  console.log("Payload:", data);

  const response = await axios.post<StaffResponse>(
    `${API_BASE_URL}/staff`,
    data,
    {
      headers: getAuthHeaders(),
    }
  );

  console.log("CREATE STAFF RESPONSE:", response.data);

  return response.data;
};

/* ------------------------------------------------
   UPDATE STAFF
------------------------------------------------ */

export const updateStaff = async (
  id: string,
  data: UpdateStaffRequest
): Promise<ManagerStaff> => {

  console.log("=================================");
  console.log("UPDATE STAFF API CALLED");
  console.log("Staff ID:", id);
  console.log("Update payload:", data);
  console.log("URL:", `${API_BASE_URL}/staff/${id}`);
  console.log("=================================");

  const response = await axios.put<StaffResponse>(
    `${API_BASE_URL}/staff/${id}`,
    data,
    {
      headers: getAuthHeaders(),
    }
  );

  console.log("UPDATE STAFF RESPONSE:", response.data);

  return mapStaffResponse(response.data);
};

/* ------------------------------------------------
   UPDATE STAFF STATUS
------------------------------------------------ */

export const updateStaffStatus = async (
  id: string,
  active: boolean
): Promise<ManagerStaff> => {

  console.log("=================================");
  console.log("UPDATE STAFF STATUS API");
  console.log("Staff ID:", id);
  console.log("Active:", active);
  console.log(
    "URL:",
    `${API_BASE_URL}/staff/${id}/status`
  );
  console.log("=================================");

  const response = await axios.patch<StaffResponse>(
    `${API_BASE_URL}/staff/${id}/status`,
    {
      active,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  console.log(
    "STATUS API RESPONSE:",
    response.data
  );

  return mapStaffResponse(response.data);
};

/* ------------------------------------------------
   DELETE STAFF
------------------------------------------------ */

export const deleteStaff = async (
  id: string
): Promise<string> => {

  console.log("DELETE STAFF API:", id);

  const response = await axios.delete<string>(
    `${API_BASE_URL}/staff/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};