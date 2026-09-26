import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import type { Technician } from "@/types/technician";

interface ManagerTechniciansTableProps {
  technicians: Technician[];
  search: string;
  status: string;
  onView: (technician: Technician) => void;
}

function getTechnicianStatus(technician: Technician) {
  if (!technician.active) return "Inactive";
  return technician.available ? "Available" : "Unavailable";
}

export default function ManagerTechniciansTable({
  technicians,
  search,
  status,
  onView,
}: ManagerTechniciansTableProps) {
  const searchValue = search.trim().toLowerCase();

  const filteredTechnicians = technicians.filter((technician) => {
    const fullName = `${technician.firstName} ${technician.lastName}`;

    const matchesSearch =
      fullName.toLowerCase().includes(searchValue) ||
      technician.email.toLowerCase().includes(searchValue) ||
      technician.specialization.toLowerCase().includes(searchValue);

    const matchesStatus =
      status === "ALL" ||
      getTechnicianStatus(technician) === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-4 text-left">Technician</th>
            <th className="px-6 py-4 text-left">Specialization</th>
            <th className="px-6 py-4 text-left">Phone</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredTechnicians.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-10 text-center text-muted-foreground"
              >
                No technicians found.
              </td>
            </tr>
          ) : (
            filteredTechnicians.map((technician) => {
              const fullName =
                `${technician.firstName} ${technician.lastName}`;

              const initials = fullName
                .trim()
                .split(/\s+/)
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              const technicianStatus = getTechnicianStatus(technician);

              return (
                <tr key={technician.id} className="border-t">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">{fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          {technician.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {technician.specialization}
                  </td>

                  <td className="px-6 py-4">{technician.phone}</td>

                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        technicianStatus === "Available"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {technicianStatus}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(technician)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}