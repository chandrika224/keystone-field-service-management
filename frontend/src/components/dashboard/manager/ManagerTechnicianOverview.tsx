import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import type { Technician } from "@/types/workOrder";

interface ManagerTechnicianOverviewProps {
  technicians: Technician[];
}

export default function ManagerTechnicianOverview({
  technicians,
}: ManagerTechnicianOverviewProps) {
  return (
    <div className="rounded-lg border bg-card">

      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Technician Overview
        </h2>

        <p className="text-sm text-muted-foreground">
          Current technician workload and availability.
        </p>
      </div>

      <div className="divide-y">

        {technicians.length === 0 ? (

          <div className="px-6 py-10 text-center text-muted-foreground">
            No technicians found.
          </div>

        ) : (

          technicians.map((technician) => {

            const firstName =
              technician.firstName ?? "";

            const lastName =
              technician.lastName ?? "";

            const fullName =
              `${firstName} ${lastName}`.trim() ||
              "Unknown Technician";

            const initials =
              `${firstName.charAt(0)}${lastName.charAt(0)}`
                .toUpperCase() || "T";

            return (
              <div
                key={technician.id}
                className="flex items-center justify-between px-6 py-4"
              >

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
                      {technician.specialization || "No specialization"}
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-4">

                  <div className="text-right">

                    <p className="text-sm font-medium">
                      {technician.activeJobs} active jobs
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {technician.activeJobs === 0
                        ? "Available"
                        : "Working"}
                    </p>

                  </div>


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

                </div>

              </div>
            );
          })

        )}

      </div>

    </div>
  );
}