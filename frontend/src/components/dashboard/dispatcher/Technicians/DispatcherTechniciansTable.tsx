import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StatusBadge from "@/components/common/StatusBadge";

import type { Technician } from "@/types/workOrder";

interface DispatcherTechniciansTableProps {
  technicians: Technician[];
  search: string;
  status: string;
  onView: (technician: Technician) => void;
}

export default function DispatcherTechniciansTable({
  technicians,
  search,
  status,
  onView,
}: DispatcherTechniciansTableProps) {

  const filteredTechnicians = technicians.filter((tech) => {

    // Create full name from backend fields
    const fullName =
      `${tech.firstName} ${tech.lastName}`;

    // Search by name or specialization
    const matchesSearch =
      fullName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      tech.specialization
        .toLowerCase()
        .includes(search.toLowerCase());

    // Backend gives us active: boolean
    const technicianStatus =
      tech.active ? "Available" : "Inactive";

    const matchesStatus =
      status === "ALL" ||
      technicianStatus === status;

    return matchesSearch && matchesStatus;
  });


  return (
    <div className="overflow-hidden rounded-xl border">

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
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Active Jobs
            </th>

            <th className="px-6 py-4 text-right">
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {filteredTechnicians.map((tech) => {

            const fullName =
              `${tech.firstName} ${tech.lastName}`;

            const technicianStatus =
              tech.active ? "Available" : "Inactive";

            const initials =
              `${tech.firstName?.[0] ?? ""}
               ${tech.lastName?.[0] ?? ""}`.trim();


            return (
              <tr
                key={tech.id}
                className="border-t"
              >

                {/* =================================================
                    TECHNICIAN
                ================================================= */}

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <Avatar>

                      <AvatarFallback>
                        {initials}
                      </AvatarFallback>

                    </Avatar>


                    <div>

                      <p className="font-medium">
                        {fullName}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {tech.email}
                      </p>

                    </div>

                  </div>

                </td>


                {/* =================================================
                    SPECIALIZATION
                ================================================= */}

                <td className="px-6 py-4">
                  {tech.specialization}
                </td>


                {/* =================================================
                    STATUS
                ================================================= */}

                <td className="px-6 py-4">

                  <StatusBadge
                    status={
                      technicianStatus === "Available"
                        ? "COMPLETED"
                        : "ASSIGNED"
                    }
                  />

                </td>


                {/* =================================================
                    ACTIVE JOBS
                ================================================= */}

                <td className="px-6 py-4">

                  {tech.currentJobs ?? 0}

                </td>


                {/* =================================================
                    VIEW
                ================================================= */}

                <td className="px-6 py-4 text-right">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      console.log(
                        "View clicked:",
                        tech
                      );

                      onView(tech);
                    }}
                  >
                    View
                  </Button>

                </td>

              </tr>
            );

          })}


          {/* =====================================================
              NO TECHNICIANS
          ===================================================== */}

          {filteredTechnicians.length === 0 && (

            <tr>

              <td
                colSpan={5}
                className="px-6 py-8 text-center text-muted-foreground"
              >
                No technicians found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}