import { Button } from "@/components/ui/button";
import type { TechnicianJob } from "@/data/technician/jobs";

interface TechnicianAssignedJobsTableProps {
  jobs: TechnicianJob[];
  search: string;
  status: string;
  onView: (job: TechnicianJob) => void;
}

export default function TechnicianAssignedJobsTable({
  jobs,
  search,
  status,
  onView,
}: TechnicianAssignedJobsTableProps) {
  const searchValue = search.toLowerCase().trim();

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.workOrderCode.toLowerCase().includes(searchValue) ||
      job.customer.toLowerCase().includes(searchValue) ||
      job.site.toLowerCase().includes(searchValue) ||
      job.service.toLowerCase().includes(searchValue);

    const matchesStatus =
      status === "ALL" ||
      job.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="overflow-x-auto rounded-lg border">
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
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Scheduled
            </th>

            <th className="px-6 py-4 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredJobs.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-6 py-10 text-center text-muted-foreground"
              >
                No assigned jobs found.
              </td>
            </tr>
          ) : (
            filteredJobs.map((job) => (
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
                  {job.status.replace("_", " ")}
                </td>

                <td className="px-6 py-4">
                  <div>
                    <p>{job.scheduledDate}</p>

                    <p className="text-sm text-muted-foreground">
                      {job.scheduledTime}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      console.log(
                        "Assigned job clicked:",
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
  );
}