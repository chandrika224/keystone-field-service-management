import { Button } from "@/components/ui/button";

import type { TechnicianWorkOrder } from "@/types/workOrder";

interface TechnicianTodayTasksProps {
  jobs: TechnicianWorkOrder[];
  onView: (job: TechnicianWorkOrder) => void;
}

function formatServiceType(serviceType: string | null) {
  if (!serviceType) {
    return "—";
  }

  return serviceType
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function formatDate(date: string | null) {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString();
}

export default function TechnicianTodayTasks({
  jobs,
  onView,
}: TechnicianTodayTasksProps) {
  return (
    <div className="rounded-lg border">

      {/* ---------------------------------------------
          HEADER
      --------------------------------------------- */}

      <div className="border-b p-6">

        <h2 className="text-xl font-semibold">
          Today's Tasks
        </h2>

        <p className="text-sm text-muted-foreground">
          Complete your assigned jobs.
        </p>

      </div>


      {/* ---------------------------------------------
          TABLE
      --------------------------------------------- */}

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

            {jobs.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-muted-foreground"
                >
                  No tasks scheduled for today.
                </td>

              </tr>

            ) : (

              jobs.map((job) => (

                <tr
                  key={job.id}
                  className="border-t"
                >

                  {/* ---------------------------------
                      WORK ORDER
                  --------------------------------- */}

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


                  {/* ---------------------------------
                      CUSTOMER
                  --------------------------------- */}

                  <td className="px-6 py-4">
                    {job.customerName ?? "—"}
                  </td>


                  {/* ---------------------------------
                      SERVICE
                  --------------------------------- */}

                  <td className="px-6 py-4">
                    {formatServiceType(job.serviceType)}
                  </td>


                  {/* ---------------------------------
                      PRIORITY
                  --------------------------------- */}

                  <td className="px-6 py-4">
                    {job.priority}
                  </td>


                  {/* ---------------------------------
                      STATUS
                  --------------------------------- */}

                  <td className="px-6 py-4">
                    {formatStatus(job.status)}
                  </td>


                  {/* ---------------------------------
                      SCHEDULED DATE
                  --------------------------------- */}

                  <td className="px-6 py-4">
                    {formatDate(job.scheduledDate)}
                  </td>


                  {/* ---------------------------------
                      ACTION
                  --------------------------------- */}

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