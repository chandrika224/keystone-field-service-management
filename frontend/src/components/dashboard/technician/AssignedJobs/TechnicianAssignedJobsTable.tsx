import { Button } from "@/components/ui/button";

import type { TechnicianWorkOrder } from "@/types/workOrder";

interface TechnicianAssignedJobsTableProps {
  jobs: TechnicianWorkOrder[];
  search: string;
  status: string;
  onView: (job: TechnicianWorkOrder) => void;
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
      job.id.toString().includes(searchValue) ||
      job.title.toLowerCase().includes(searchValue) ||
      (job.customerName ?? "")
        .toLowerCase()
        .includes(searchValue) ||
      (job.siteName ?? "")
        .toLowerCase()
        .includes(searchValue) ||
      (job.serviceType ?? "")
        .toLowerCase()
        .includes(searchValue);

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

                {/* Work Order */}

                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">
                      #{job.id} — {job.title}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {job.siteName ?? "No site"}
                    </p>
                  </div>
                </td>


                {/* Customer */}

                <td className="px-6 py-4">
                  {job.customerName ?? "—"}
                </td>


                {/* Service */}

                <td className="px-6 py-4">
                  {job.serviceType ?? "—"}
                </td>


                {/* Priority */}

                <td className="px-6 py-4">
                  {job.priority}
                </td>


                {/* Status */}

                <td className="px-6 py-4">
                  {job.status.replaceAll("_", " ")}
                </td>


                {/* Scheduled */}

                <td className="px-6 py-4">
                  {job.scheduledDate ?? "—"}
                </td>


                {/* Action */}

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