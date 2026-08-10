import { Button } from "@/components/ui/button";

import type { TechnicianJob } from "@/data/technician/jobs";

interface TechnicianTodayTasksProps {
  jobs: TechnicianJob[];
  onView: (job: TechnicianJob) => void;
}

export default function TechnicianTodayTasks({
  jobs,
  onView,
}: TechnicianTodayTasksProps) {
  const todayJobs = jobs.filter(
    (job) => job.scheduledDate === "10 Aug 2026"
  );

  return (
    <div className="rounded-lg border">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">
          Today's Tasks
        </h2>

        <p className="text-sm text-muted-foreground">
          Complete your assigned jobs.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-4 text-left">
                Work Order
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Service
              </th>

              <th className="px-6 py-4 text-left">
                Priority
              </th>

              <th className="px-6 py-4 text-left">
                Time
              </th>

              <th className="px-6 py-4 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {todayJobs.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-muted-foreground"
                >
                  No tasks scheduled for today.
                </td>
              </tr>
            ) : (
              todayJobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">
                        {job.workOrderCode}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {job.site}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {job.customer}
                  </td>

                  <td className="px-6 py-4">
                    {job.service}
                  </td>

                  <td className="px-6 py-4">
                    {job.priority}
                  </td>

                  <td className="px-6 py-4">
                    {job.scheduledTime}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        console.log(
                          "Technician job clicked:",
                          job
                        );

                        onView(job);
                      }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}