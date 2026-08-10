import {
  Building2,
  CheckCircle2,
  Clock3,
  Wrench,
} from "lucide-react";

import type {
  CustomerPerformance,
  ServicePerformance,
} from "@/data/manager/reports";

import {
  getCustomerCompletionRate,
  getServiceCompletionRate,
} from "@/data/manager/reports";

interface ManagerCustomerServicePerformanceProps {
  customers: CustomerPerformance[];
  services: ServicePerformance[];
}

export default function ManagerCustomerServicePerformance({
  customers,
  services,
}: ManagerCustomerServicePerformanceProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">

      {/* ================================================== */}
      {/* Customer Performance */}
      {/* ================================================== */}

      <div className="rounded-xl border bg-card shadow-sm">

        {/* Header */}

        <div className="border-b p-5">
          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-muted p-2">
              <Building2 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Customer Performance
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Work order performance by customer.
              </p>
            </div>

          </div>
        </div>

        {/* Customer List */}

        <div className="divide-y">

          {customers.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No customer data available.
              </p>
            </div>
          ) : (
            customers.map((customer) => {

              const completionRate =
                getCustomerCompletionRate(customer);

              return (
                <div
                  key={customer.id}
                  className="space-y-4 p-5 transition-colors hover:bg-muted/30"
                >

                  {/* Customer Name */}

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="font-semibold">
                        {customer.customer}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {customer.id}
                      </p>
                    </div>

                    <span className="text-sm font-semibold">
                      {completionRate}%
                    </span>

                  </div>

                  {/* Progress */}

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{
                        width: `${completionRate}%`,
                      }}
                    />
                  </div>

                  {/* Stats */}

                  <div className="grid grid-cols-3 gap-3">

                    {/* Total */}

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Work Orders
                      </p>

                      <p className="mt-1 font-semibold">
                        {customer.workOrders}
                      </p>
                    </div>

                    {/* Completed */}

                    <div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />

                        <p className="text-xs text-muted-foreground">
                          Completed
                        </p>
                      </div>

                      <p className="mt-1 font-semibold">
                        {customer.completed}
                      </p>
                    </div>

                    {/* Pending */}

                    <div>
                      <div className="flex items-center gap-1">
                        <Clock3 className="h-3.5 w-3.5 text-yellow-600" />

                        <p className="text-xs text-muted-foreground">
                          Pending
                        </p>
                      </div>

                      <p className="mt-1 font-semibold">
                        {customer.pending}
                      </p>
                    </div>

                  </div>

                </div>
              );
            })
          )}

        </div>
      </div>

      {/* ================================================== */}
      {/* Service Performance */}
      {/* ================================================== */}

      <div className="rounded-xl border bg-card shadow-sm">

        {/* Header */}

        <div className="border-b p-5">
          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-muted p-2">
              <Wrench className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Service Performance
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Performance by service type.
              </p>
            </div>

          </div>
        </div>

        {/* Service List */}

        <div className="divide-y">

          {services.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No service data available.
              </p>
            </div>
          ) : (
            services.map((service) => {

              const completionRate =
                getServiceCompletionRate(service);

              return (
                <div
                  key={service.service}
                  className="space-y-4 p-5 transition-colors hover:bg-muted/30"
                >

                  {/* Service Name */}

                  <div className="flex items-center justify-between gap-4">

                    <p className="font-semibold">
                      {service.service}
                    </p>

                    <span className="text-sm font-semibold">
                      {completionRate}%
                    </span>

                  </div>

                  {/* Progress */}

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{
                        width: `${completionRate}%`,
                      }}
                    />
                  </div>

                  {/* Stats */}

                  <div className="flex items-center justify-between text-sm">

                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-muted-foreground" />

                      <span className="text-muted-foreground">
                        Work Orders
                      </span>

                      <span className="font-semibold">
                        {service.workOrders}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />

                      <span className="text-muted-foreground">
                        Completed
                      </span>

                      <span className="font-semibold">
                        {service.completed}
                      </span>
                    </div>

                  </div>

                </div>
              );
            })
          )}

        </div>
      </div>

    </div>
  );
}