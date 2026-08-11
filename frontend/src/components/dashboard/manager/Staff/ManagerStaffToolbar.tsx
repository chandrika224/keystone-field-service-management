import {
  Plus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  StaffRole,
  StaffStatus,
} from "@/data/manager/staff";

interface ManagerStaffToolbarProps {
  search: string;

  role: "All" | StaffRole;

  status: "All" | StaffStatus;

  onSearchChange: (value: string) => void;

  onRoleChange: (
    value: "All" | StaffRole
  ) => void;

  onStatusChange: (
    value: "All" | StaffStatus
  ) => void;

  onAddStaff: () => void;
}

export default function ManagerStaffToolbar({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onAddStaff,
}: ManagerStaffToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 lg:flex-row lg:items-center">
      
      {/* Search */}

      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search staff..."
          className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Role */}

      <select
        value={role}
        onChange={(event) =>
          onRoleChange(
            event.target.value as "All" | StaffRole
          )
        }
        className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="All">
          All Roles
        </option>

        <option value="Dispatcher">
          Dispatchers
        </option>

        <option value="Technician">
          Technicians
        </option>
      </select>

      {/* Status */}

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(
            event.target.value as "All" | StaffStatus
          )
        }
        className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="All">
          All Status
        </option>

        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>
      </select>

      {/* Add Staff */}

      <Button
        type="button"
        onClick={onAddStaff}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />

        Add Staff
      </Button>
    </div>
  );
}