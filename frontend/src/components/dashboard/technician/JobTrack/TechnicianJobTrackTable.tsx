import { Badge } from "@/components/ui/badge";

import type { TechnicianJob } from "@/data/technician/jobs";

interface TechnicianJobTrackTableProps {
  jobs: TechnicianJob[];
  search: string;
  status: string;
}

export default function TechnicianJobTrackTable({
  jobs,
  search,
  status,
}: TechnicianJobTrackTableProps) {

  const filteredJobs = jobs.filter((job) => {

    const searchValue = search.toLowerCase();

    const matchesSearch =
      job.workOrderCode
        .toLowerCase()
        .includes(searchValue) ||

      job.customer
        .toLowerCase()
        .includes(searchValue) ||

      job.service
        .toLowerCase()
        .includes(searchValue);

    const matchesStatus =
      status === "ALL" ||
      job.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="overflow-hidden rounded-lg border">

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

          </tr>

        </thead>

        <tbody>

          {filteredJobs.length === 0 ? (

            <tr>

              <td
                colSpan={6}
                className="px-6 py-10 text-center text-muted-foreground"
              >
                No jobs found.
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
                      {job.id}
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

                  <Badge variant="outline">
                    {job.priority}
                  </Badge>

                </td>

                <td className="px-6 py-4">

                  <Badge>
                    {job.status.replace("_", " ")}
                  </Badge>

                </td>

                <td className="px-6 py-4">

                  <div>

                    <p>
                      {job.scheduledDate}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {job.scheduledTime}
                    </p>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}