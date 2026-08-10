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

  const filteredTechnicians = technicians.filter((technician) => {

    const searchValue = search.toLowerCase();

    const matchesSearch =
      technician.name
        .toLowerCase()
        .includes(searchValue) ||

      technician.specialization
        .toLowerCase()
        .includes(searchValue);

    const matchesStatus =
      status === "ALL" ||
      technician.status === status;

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

              const initials = technician.name
                .split(" ")
                .map((word) => word[0])
                .join("");

              return (
                <tr
                  key={technician.id}
                  className="border-t"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <Avatar>
                        <AvatarFallback>
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <div>

                        <p className="font-medium">
                          {technician.name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {technician.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4">
                    {technician.specialization}
                  </td>

                  <td className="px-6 py-4">
                    {technician.currentJobs}
                  </td>

                  <td className="px-6 py-4">

                    <Badge
                      variant={
                        technician.status === "Available"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {technician.status}
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