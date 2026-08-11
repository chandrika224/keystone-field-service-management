import {
  Eye,
  Mail,
  MoreHorizontal,
  Pencil,
  Phone,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { ManagerStaff } from "@/data/manager/staff";

interface ManagerStaffListProps {
  staff: ManagerStaff[];

  onView: (member: ManagerStaff) => void;

  onEdit: (member: ManagerStaff) => void;

  onToggleStatus: (member: ManagerStaff) => void;
}

export default function ManagerStaffList({
  staff,
  onView,
  onEdit,
  onToggleStatus,
}: ManagerStaffListProps) {
  if (staff.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-10 text-center">
        <UserRound className="mx-auto h-10 w-10 text-muted-foreground" />

        <h3 className="mt-4 text-lg font-semibold">
          No staff found
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card">

      {/* Desktop */}

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">

          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium">
                Staff
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium">
                Role
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium">
                Specialization
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium">
                Joined
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {staff.map((member) => (
              <tr
                key={member.id}
                className="border-b last:border-b-0 hover:bg-muted/20"
              >

                {/* Staff */}

                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">
                      {member.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {member.employeeId}
                    </p>
                  </div>
                </td>

                {/* Role */}

                <td className="px-6 py-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {member.role}
                  </span>
                </td>

                {/* Specialization */}

                <td className="px-6 py-4 text-sm">
                  {member.specialization}
                </td>

                {/* Status */}

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      member.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>

                {/* Joined */}

                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {member.joinedDate}
                </td>

                {/* Actions */}

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(member)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(member)}
                    >
                      <Pencil className="mr-1 h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onToggleStatus(member)
                      }
                    >
                      <MoreHorizontal className="mr-1 h-4 w-4" />

                      {member.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </Button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Mobile */}

      <div className="space-y-3 p-4 md:hidden">
        {staff.map((member) => (
          <div
            key={member.id}
            className="rounded-lg border p-4"
          >

            <div className="flex items-start justify-between gap-3">

              <div>
                <p className="font-semibold">
                  {member.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {member.employeeId}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  member.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {member.status}
              </span>

            </div>

            <div className="mt-4 space-y-2 text-sm">

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {member.email}
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {member.phone}
              </div>

              <p className="text-muted-foreground">
                {member.role} · {member.specialization}
              </p>

            </div>

            <div className="mt-4 flex gap-2 border-t pt-3">

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onView(member)}
              >
                <Eye className="mr-1 h-4 w-4" />
                View
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onEdit(member)}
              >
                <Pencil className="mr-1 h-4 w-4" />
                Edit
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  onToggleStatus(member)
                }
              >
                {member.status === "Active"
                  ? "Deactivate"
                  : "Activate"}
              </Button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}