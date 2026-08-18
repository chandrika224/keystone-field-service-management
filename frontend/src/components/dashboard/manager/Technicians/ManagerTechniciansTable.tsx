import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import type { Technician } from "@/types/workOrder";

interface ManagerTechniciansTableProps {
  technicians: Technician[];
  search: string;
  status: string;
  onView: (technician: Technician) => void;
}

export default function ManagerTechniciansTable({
  technicians,
  search,
  status,
  onView,
}: ManagerTechniciansTableProps) {

  const searchValue = search.trim().toLowerCase();

  const filteredTechnicians = technicians.filter((technician) => {

    const technicianName =
      `${technician.firstName} ${technician.lastName}`.toLowerCase();

    const matchesSearch =
      !searchValue ||
      technicianName.includes(searchValue) ||
      technician.email.toLowerCase().includes(searchValue) ||
      technician.specialization
        .toLowerCase()
        .includes(searchValue);

    const technicianStatus =
      technician.active ? "ACTIVE" : "INACTIVE";

    const matchesStatus =
      status === "ALL" ||
      technicianStatus === status.toUpperCase();

    return matchesSearch && matchesStatus;
  });


  return (
    <div className="overflow-hidden rounded-lg border">

      <table className="w-full">

        <thead className="bg-muted">

          <tr>

            <th className="px-6 py-4 text-left">
              Technician
            </th>

            <th className="px-6 py-4 text-left">
              Specialization
            </th>

            <th className="px-6 py-4 text-left">
              Active Jobs
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-right">
              Action
            </th>

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

              const technicianName =
                `${technician.firstName} ${technician.lastName}`.trim();

              const initials =
                `${technician.firstName?.[0] ?? ""}${technician.lastName?.[0] ?? ""}`
                  .toUpperCase();

              return (

                <tr
                  key={technician.id}
                  className="border-t"
                >

                  {/* Technician */}

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <Avatar>

                        <AvatarFallback>
                          {initials}
                        </AvatarFallback>

                      </Avatar>


                      <div>

                        <p className="font-medium">
                          {technicianName || "Unknown Technician"}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {technician.email}
                        </p>

                      </div>

                    </div>

                  </td>


                  {/* Specialization */}

                  <td className="px-6 py-4">

                    {technician.specialization || "N/A"}

                  </td>


                  {/* Active Jobs */}

                  <td className="px-6 py-4">

                    <span className="font-medium">
                      {technician.activeJobs}
                    </span>

                  </td>


                  {/* Status */}

                  <td className="px-6 py-4">

                    <Badge
                      variant={
                        technician.active
                          ? "default"
                          : "destructive"
                      }
                    >
                      {technician.active
                        ? "Active"
                        : "Inactive"}
                    </Badge>

                  </td>


                  {/* Action */}

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