import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import type { Technician } from "@/types/workOrder";

interface ManagerTechnicianOverviewProps {
  technicians: Technician[];
}

export default function ManagerTechnicianOverview({
  technicians,
}: ManagerTechnicianOverviewProps) {

  const availableCount = technicians.filter(
    (technician) => technician.status === "Available"
  ).length;

  const busyCount = technicians.filter(
    (technician) => technician.status === "Busy"
  ).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Technician Overview</CardTitle>

          <div className="flex gap-2">
            <Badge variant="outline">
              Available: {availableCount}
            </Badge>

            <Badge variant="outline">
              Busy: {busyCount}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>

        {technicians.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No technicians available.
          </div>
        ) : (
          <div className="space-y-4">

            {technicians.map((technician) => {

              const initials = technician.name
                .split(" ")
                .map((word) => word[0])
                .join("");

              return (
                <div
                  key={technician.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >

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
                        {technician.specialization}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Active Jobs
                      </p>

                      <p className="font-semibold">
                        {technician.currentJobs}
                      </p>
                    </div>

                    <Badge
                      variant={
                        technician.status === "Available"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {technician.status}
                    </Badge>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </CardContent>
    </Card>
  );
}