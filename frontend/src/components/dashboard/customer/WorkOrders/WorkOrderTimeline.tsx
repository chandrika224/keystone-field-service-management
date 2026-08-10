import { CheckCircle2, Circle } from "lucide-react";
import type { WorkOrderStatus } from "@/types/workOrder";

interface WorkOrderTimelineProps {
  status: WorkOrderStatus;
}

export default function WorkOrderTimeline({
  status,
}: WorkOrderTimelineProps) {

  const timeline = [
    {
      title: "Request Created",
      description: "Your service request has been submitted.",
    },
    {
      title: "Technician Assigned",
      description: "A technician has been assigned.",
    },
    {
      title: "Work In Progress",
      description: "Technician is working on your request.",
    },
    {
      title: "Quality Inspection",
      description: "Final inspection in progress.",
    },
    {
      title: "Completed",
      description: "Service completed successfully.",
    },
  ];

  const completedSteps: Record<WorkOrderStatus, number> = {
    NEW: 1,
    ASSIGNED: 2,
    IN_PROGRESS: 3,
    ON_HOLD: 3,
    COMPLETED: 5,
    CLOSED: 5,
    CANCELLED: 1,
  };

  console.log("Timeline Status:", status);
  console.log("Completed Steps:", completedSteps[status]);

  return (
    <div className="space-y-4">

      <h3 className="text-lg font-semibold">
        Progress Timeline
      </h3>

      {timeline.map((step, index) => {

        const completed = index < completedSteps[status];

        return (
          <div
            key={step.title}
            className="flex gap-4"
          >

            <div className="mt-1">
              {completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>

            <div>
              <h4 className="font-medium">
                {step.title}
              </h4>

              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>

          </div>
        );
      })}

    </div>
  );
}