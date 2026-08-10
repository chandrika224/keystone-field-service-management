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

    const matchesSearch =
      tech.name.toLowerCase().includes(search.toLowerCase()) ||
      tech.specialization.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "ALL" ||
      tech.status === status;

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

          {filteredTechnicians.map((tech) => (

            <tr
              key={tech.id}
              className="border-t"
            >

              <td className="px-6 py-4">

                <div className="flex items-center gap-3">

                  <Avatar>

                    <AvatarFallback>
                      {tech.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </AvatarFallback>

                  </Avatar>

                  <div>

                    <p className="font-medium">
                      {tech.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {tech.email}
                    </p>

                  </div>

                </div>

              </td>

              <td className="px-6 py-4">
                {tech.specialization}
              </td>

              <td className="px-6 py-4">
                <StatusBadge
                  status={
                    tech.status === "Available"
                      ? "COMPLETED"
                      : "ASSIGNED"
                  }
                />
              </td>

              <td className="px-6 py-4">
                {tech.currentJobs}
              </td>

              <td className="px-6 py-4 text-right">

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log("View clicked:", tech);
                    onView(tech);
                  }}
                >
                  View
                </Button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}