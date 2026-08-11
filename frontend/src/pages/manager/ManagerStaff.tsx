import { useMemo, useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import {
  managerStaff,
  type ManagerStaff,
  type StaffRole,
  type StaffStatus,
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
    useState<ManagerStaff[]>(managerStaff);

  /* --------------------------------------------------
     SEARCH & FILTERS
  -------------------------------------------------- */

  const [search, setSearch] = useState("");

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
  }, [staff, search, role, status]);

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
  -------------------------------------------------- */

  const handleSaveStaff = (
  updatedStaff: ManagerStaff
    ) => {
      setStaff((currentStaff) =>
        currentStaff.map((member) =>
          member.id === updatedStaff.id
            ? updatedStaff
            : member
        )
      );

      setEditOpen(false);

      toast.success("Staff updated successfully", {
        description: `${updatedStaff.name}'s details have been updated.`,
      });
    };
  /* --------------------------------------------------
     ACTIVATE / DEACTIVATE
  -------------------------------------------------- */

  const handleToggleStatus = (
  member: ManagerStaff
) => {
  const newStatus =
    member.status === "Active"
      ? "Inactive"
      : "Active";

  setStaff((currentStaff) =>
    currentStaff.map((item) =>
      item.id === member.id
        ? {
            ...item,
            status: newStatus,
          }
        : item
    )
  );

  toast.success(
    newStatus === "Active"
      ? "Staff activated"
      : "Staff deactivated",
    {
      description: `${member.name} is now ${newStatus.toLowerCase()}.`,
    }
  );
};

  /* --------------------------------------------------
     ADD NEW STAFF TO LIST
  -------------------------------------------------- */

  const handleStaffAdded = (
  newStaff: ManagerStaff
) => {
  setStaff((currentStaff) => [
    ...currentStaff,
    newStaff,
  ]);

  setAddStaffOpen(false);

  toast.success("Staff added successfully", {
    description: `${newStaff.name} has been added as a ${newStaff.role}.`,
  });
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

      <ManagerStaffList
        staff={filteredStaff}
        onView={handleViewStaff}
        onEdit={handleEditStaff}
        onToggleStatus={handleToggleStatus}
      />

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

    </div>
  );
}