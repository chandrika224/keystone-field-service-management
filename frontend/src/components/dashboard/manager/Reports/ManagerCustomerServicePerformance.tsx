
import {
  Building2,
  CheckCircle2,
  Clock3,
  Wrench,
} from "lucide-react";

import type { DispatcherWorkOrder } from "@/types/workOrder";

interface ManagerCustomerServicePerformanceProps {
  workOrders: DispatcherWorkOrder[];
}

const COMPLETED_STATUSES = ["COMPLETED", "CLOSED"];

export default function ManagerCustomerServicePerformance({
  workOrders = [],
}: ManagerCustomerServicePerformanceProps) {
  const customers = Object.values(
    workOrders.reduce<
      Record<
        string,
        {
          id: string;
          customer: string;
          workOrders: number;
          completed: number;
          pending: number;
        }
      >
    >((result, order) => {
      const customer = order.customerName?.trim() || "Unknown Customer";

      if (!result[customer]) {
        result[customer] = {
          id: customer,
          customer,
          workOrders: 0,
          completed: 0,
          pending: 0,
        };
      }

      result[customer].workOrders++;

      if (COMPLETED_STATUSES.includes(order.status)) {
        result[customer].completed++;
      } else {
        result[customer].pending++;
      }

      return result;
    }, {})
  ).sort((a, b) => b.workOrders - a.workOrders);

  const services = Object.values(
    workOrders.reduce<
      Record<
        string,
        {
          service: string;
          workOrders: number;
          completed: number;
        }
      >
    >((result, order) => {
      const service = order.serviceType?.trim() || "Unspecified";

      if (!result[service]) {
        result[service] = {
          service,
          workOrders: 0,
          completed: 0,
        };
      }

      result[service].workOrders++;

      if (COMPLETED_STATUSES.includes(order.status)) {
        result[service].completed++;
      }

      return result;
    }, {})
  ).sort((a, b) => b.workOrders - a.workOrders);

  const completionRate = (completed: number, total: number) =>
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* Customer Performance */}
      <div className="rounded-xl border bg-card shadow-sm">
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

        <div className="divide-y">
          {customers.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No customer data available.
              </p>
            </div>
          ) : (
            customers.map((customer) => {
              const rate = completionRate(
                customer.completed,
                customer.workOrders
              );

              return (
                <div
                  key={customer.id}
                  className="space-y-4 p-5 transition-colors hover:bg-muted/30"
                >
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
                      {rate}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{ width: `${rate}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Work Orders
                      </p>
                      <p className="mt-1 font-semibold">
                        {customer.workOrders}
                      </p>
                    </div>

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

      {/* Service Performance */}
      <div className="rounded-xl border bg-card shadow-sm">
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

        <div className="divide-y">
          {services.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No service data available.
              </p>
            </div>
          ) : (
            services.map((service) => {
              const rate = completionRate(
                service.completed,
                service.workOrders
              );

              return (
                <div
                  key={service.service}
                  className="space-y-4 p-5 transition-colors hover:bg-muted/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold">
                      {service.service}
                    </p>
                    <span className="text-sm font-semibold">
                      {rate}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{ width: `${rate}%` }}
                    />
                  </div>

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
