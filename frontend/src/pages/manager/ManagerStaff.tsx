import { useEffect, useMemo, useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import {
  type ManagerStaff,
  type StaffRole,
  type StaffStatus,
} from "@/data/manager/staff";

import {
  getAllStaff,
  updateStaff,
  updateStaffStatus,
} from "@/services/staffService";

import type {
  BackendStaffRole,
} from "@/data/manager/staff";

import ManagerStaffToolbar
  from "@/components/dashboard/manager/Staff/ManagerStaffToolbar";

import ManagerStaffList
  from "@/components/dashboard/manager/Staff/ManagerStaffList";

import ManagerAddStaffDrawer
  from "@/components/dashboard/manager/Staff/ManagerAddStaffDrawer";

import ManagerStaffDetailsDrawer
  from "@/components/dashboard/manager/Staff/ManagerStaffDetailsDrawer";

import ManagerEditStaffDrawer
  from "@/components/dashboard/manager/Staff/ManagerEditStaffDrawer";

import { toast } from "sonner";


export default function ManagerStaff() {

  /* --------------------------------------------------
     STAFF DATA
  -------------------------------------------------- */

  const [staff, setStaff] =
    useState<ManagerStaff[]>([]);

  const [loading, setLoading] =
    useState(true);


  /* --------------------------------------------------
     SEARCH & FILTERS
  -------------------------------------------------- */

  const [search, setSearch] =
    useState("");

  const [role, setRole] =
    useState<"All" | StaffRole>("All");

  const [status, setStatus] =
    useState<"All" | StaffStatus>("All");


  /* --------------------------------------------------
     ADD STAFF DRAWER
  -------------------------------------------------- */

  const [addStaffOpen, setAddStaffOpen] =
    useState(false);


  /* --------------------------------------------------
     DETAILS DRAWER
  -------------------------------------------------- */

  const [selectedStaff, setSelectedStaff] =
    useState<ManagerStaff | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);


  /* --------------------------------------------------
     EDIT STAFF DRAWER
  -------------------------------------------------- */

  const [editStaff, setEditStaff] =
    useState<ManagerStaff | null>(null);

  const [editOpen, setEditOpen] =
    useState(false);


  /* --------------------------------------------------
     TEMPORARY PASSWORD
  -------------------------------------------------- */

  const [temporaryPassword, setTemporaryPassword] =
    useState<string | null>(null);


  /* --------------------------------------------------
     LOAD STAFF FROM BACKEND
  -------------------------------------------------- */

  useEffect(() => {

    const loadStaff = async () => {

      try {

        setLoading(true);

        const data =
          await getAllStaff();

        console.log(
          "Staff loaded from backend:",
          data
        );

        setStaff(data);

      } catch (error) {

        console.error(
          "Failed to load staff:",
          error
        );

        toast.error(
          "Failed to load staff"
        );

      } finally {

        setLoading(false);

      }
    };

    loadStaff();

  }, []);


  /* --------------------------------------------------
     FILTER STAFF
  -------------------------------------------------- */

  const filteredStaff = useMemo(() => {

    const searchValue =
      search.toLowerCase().trim();

    return staff.filter((member) => {

      const matchesSearch =
        member.name
          .toLowerCase()
          .includes(searchValue) ||

        member.employeeId
          .toLowerCase()
          .includes(searchValue) ||

        member.email
          .toLowerCase()
          .includes(searchValue) ||

        member.phone
          .toLowerCase()
          .includes(searchValue);


      const matchesRole =
        role === "All" ||
        member.role === role;


      const matchesStatus =
        status === "All" ||
        member.status === status;


      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );

    });

  }, [
    staff,
    search,
    role,
    status,
  ]);


  /* --------------------------------------------------
     OPEN ADD STAFF
  -------------------------------------------------- */

  const handleAddStaff = () => {

    setAddStaffOpen(true);

  };


  /* --------------------------------------------------
     VIEW STAFF
  -------------------------------------------------- */

  const handleViewStaff = (
    member: ManagerStaff
  ) => {

    console.log(
      "Manager viewed staff:",
      member
    );

    setSelectedStaff(member);

    setDetailsOpen(true);

  };


  /* --------------------------------------------------
     EDIT STAFF
  -------------------------------------------------- */

  const handleEditStaff = (
    member: ManagerStaff
  ) => {

    console.log(
      "Manager editing staff:",
      member
    );

    setEditStaff(member);

    setEditOpen(true);

  };


  /* --------------------------------------------------
     SAVE EDITED STAFF
     
     TEMPORARILY updates UI only.
     We will connect PUT API next.
  -------------------------------------------------- */

const handleSaveStaff = async (
  updatedStaff: ManagerStaff
): Promise<void> => {

  console.log("=================================");
  console.log("HANDLE SAVE STAFF");
  console.log("Updated staff:", updatedStaff);
  console.log("=================================");

  try {

    /* -----------------------------------------
       ROLE CONVERSION
    ----------------------------------------- */

    const backendRole: BackendStaffRole =
      updatedStaff.role === "Dispatcher"
        ? "DISPATCHER"
        : "TECHNICIAN";


    /* -----------------------------------------
       SPLIT NAME
    ----------------------------------------- */

    const nameParts =
      updatedStaff.name.trim().split(/\s+/);

    const firstName =
      nameParts[0];

    const lastName =
      nameParts.slice(1).join(" ");


    if (!firstName || !lastName) {

      toast.error(
        "Please enter both first name and last name."
      );

      return;
    }


    /* -----------------------------------------
       BACKEND PAYLOAD
    ----------------------------------------- */

    const payload = {

      firstName,

      lastName,

      email:
        updatedStaff.email.trim(),

      phone:
        updatedStaff.phone.trim(),

      role:
        backendRole,

      specialization:
        updatedStaff.specialization.trim(),

    };


    console.log("=================================");
    console.log("CALLING UPDATE STAFF API");
    console.log("ID:", updatedStaff.id);
    console.log("PAYLOAD:", payload);
    console.log("=================================");


    /* -----------------------------------------
       CALL API
    ----------------------------------------- */

    const updated =
      await updateStaff(
        updatedStaff.id,
        payload
      );


    console.log("=================================");
    console.log("API RESPONSE");
    console.log(updated);
    console.log("=================================");


    /* -----------------------------------------
       UPDATE UI
    ----------------------------------------- */

    setStaff((currentStaff) =>
      currentStaff.map((member) =>
        member.id === updated.id
          ? updated
          : member
      )
    );


    setEditStaff(updated);

    setEditOpen(false);


    toast.success(
      "Staff updated successfully",
      {
        description:
          `${updated.name}'s details have been updated.`,
      }
    );

  } catch (error) {

    console.error(
      "UPDATE STAFF API FAILED:",
      error
    );

    toast.error(
      "Failed to update staff"
    );

  }
};


  /* --------------------------------------------------
     ACTIVATE / DEACTIVATE
     
     TEMPORARILY updates UI only.
     We will connect PATCH API next.
  -------------------------------------------------- */

  const handleToggleStatus = async (
  member: ManagerStaff
) => {

  try {

    console.log(
      "================================="
    );

    console.log(
      "TOGGLE STAFF STATUS"
    );

    console.log(
      "Staff:",
      member
    );

    /* -----------------------------------------
       CURRENT STATUS → NEW STATUS
    ----------------------------------------- */

    const newActive =
      member.status === "Active"
        ? false
        : true;


    console.log(
      "New active value:",
      newActive
    );


    /* -----------------------------------------
       CALL BACKEND
    ----------------------------------------- */

    const updatedStaff =
      await updateStaffStatus(
        member.id,
        newActive
      );


    console.log(
      "Updated staff from backend:",
      updatedStaff
    );


    /* -----------------------------------------
       UPDATE REACT STATE
    ----------------------------------------- */

    setStaff((currentStaff) =>
      currentStaff.map((item) =>
        item.id === updatedStaff.id
          ? updatedStaff
          : item
      )
    );


    /* -----------------------------------------
       SUCCESS MESSAGE
    ----------------------------------------- */

    toast.success(
      updatedStaff.status === "Active"
        ? "Staff activated"
        : "Staff deactivated",
      {
        description:
          `${updatedStaff.name} is now ${updatedStaff.status.toLowerCase()}.`,
      }
    );

  } catch (error) {

    console.error(
      "Failed to update staff status:",
      error
    );

    toast.error(
      "Failed to update staff status"
    );

  }

};

  /* --------------------------------------------------
     STAFF CREATED FROM BACKEND
  -------------------------------------------------- */

  const handleStaffAdded = (
    newStaff: ManagerStaff,
    password: string
  ) => {

    /*
     * newStaff has already been converted
     * using mapStaffResponse().
     *
     * employeeId comes from backend.
     */

    setStaff((currentStaff) => [
      ...currentStaff,
      newStaff,
    ]);


    /*
     * Temporary password is currently
     * returned by backend for testing.
     */

    setTemporaryPassword(password);


    setAddStaffOpen(false);


    toast.success(
      "Staff added successfully",
      {
        description:
          `${newStaff.name} has been added as ${newStaff.role}.`,
      }
    );


    console.log(
      "Created staff:",
      newStaff
    );

    console.log(
      "Temporary password:",
      password
    );

  };


  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <SectionHeader
        title="Staff Management"
        subtitle="Manage dispatchers and technicians in your organization."
      />


      {/* TOOLBAR */}

      <ManagerStaffToolbar
        search={search}
        role={role}
        status={status}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onStatusChange={setStatus}
        onAddStaff={handleAddStaff}
      />


      {/* STAFF LIST */}

      {loading ? (

        <div className="flex items-center justify-center py-12">

          <p className="text-sm text-muted-foreground">
            Loading staff...
          </p>

        </div>

      ) : (

        <ManagerStaffList
          staff={filteredStaff}
          onView={handleViewStaff}
          onEdit={handleEditStaff}
          onToggleStatus={handleToggleStatus}
        />

      )}


      {/* ADD STAFF DRAWER */}

      <ManagerAddStaffDrawer
        open={addStaffOpen}
        onOpenChange={setAddStaffOpen}
        onAddStaff={handleStaffAdded}
      />


      {/* STAFF DETAILS DRAWER */}

      <ManagerStaffDetailsDrawer
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        staff={selectedStaff}
      />


      {/* EDIT STAFF DRAWER */}

      <ManagerEditStaffDrawer
        open={editOpen}
        onOpenChange={setEditOpen}
        staff={editStaff}
        onSave={handleSaveStaff}
      />


      {/* TEMPORARY PASSWORD */}

      {temporaryPassword && (

        <div className="rounded-lg border p-4">

          <div className="font-medium">
            Temporary Password
          </div>

          <div className="mt-1 text-sm">
            The temporary password generated
            for the newly created staff member is:
          </div>

          <div className="mt-2 rounded-md border bg-muted p-3 font-mono">
            {temporaryPassword}
          </div>

          <div className="mt-2 text-xs text-muted-foreground">
            This password is currently displayed
            for testing purposes only.
          </div>

        </div>

      )}

    </div>
  );
}