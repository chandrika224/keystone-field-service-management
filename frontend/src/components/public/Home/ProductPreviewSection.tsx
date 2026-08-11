import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Package,
  BarChart3,
  CalendarDays,
} from "lucide-react";

const modules = [
  {
    icon: ClipboardList,
    label: "Work Orders",
    value: "24",
  },
  {
    icon: Users,
    label: "Technicians",
    value: "18",
  },
  {
    icon: CalendarDays,
    label: "Scheduled Jobs",
    value: "12",
  },
  {
    icon: Package,
    label: "Inventory Items",
    value: "148",
  },
];

export default function ProductPreviewSection() {
  return (
    <section className="border-t bg-background">

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left Content */}

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              One connected workspace
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              See your field operations at a glance
            </h2>

            <p className="mt-5 max-w-xl text-muted-foreground">
              Meridian brings your operational data together so
              managers and field teams can quickly understand what
              is happening across the organization.
            </p>


            {/* Benefits */}

            <div className="mt-8 space-y-5">

              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">

                  <LayoutDashboard className="h-4 w-4" />

                </div>

                <div>

                  <h3 className="text-sm font-semibold">
                    Centralized dashboard
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Monitor jobs, teams and operational activity
                    from one place.
                  </p>

                </div>

              </div>


              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">

                  <BarChart3 className="h-4 w-4" />

                </div>

                <div>

                  <h3 className="text-sm font-semibold">
                    Operational visibility
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Track progress and identify important field
                    service activities quickly.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* Dashboard Preview */}

          <div className="rounded-2xl border bg-card p-4 shadow-xl">

            {/* Browser Header */}

            <div className="flex items-center gap-2 border-b pb-4">

              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />

              <div className="ml-3 flex-1 rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground">
                meridian.app/dashboard
              </div>

            </div>


            {/* Dashboard */}

            <div className="mt-4 flex gap-4">

              {/* Sidebar */}

              <div className="hidden w-32 shrink-0 space-y-2 rounded-lg bg-muted/50 p-3 sm:block">

                <div className="mb-5 flex items-center gap-2">

                  <div className="h-6 w-6 rounded-md bg-blue-600" />

                  <span className="text-xs font-semibold">
                    Meridian
                  </span>

                </div>


                <div className="rounded-md bg-blue-100 px-2 py-2 text-xs text-blue-700">
                  Dashboard
                </div>

                <div className="px-2 py-2 text-xs text-muted-foreground">
                  Work Orders
                </div>

                <div className="px-2 py-2 text-xs text-muted-foreground">
                  Technicians
                </div>

                <div className="px-2 py-2 text-xs text-muted-foreground">
                  Inventory
                </div>

                <div className="px-2 py-2 text-xs text-muted-foreground">
                  Reports
                </div>

              </div>


              {/* Main Dashboard */}

              <div className="min-w-0 flex-1">

                <div>

                  <p className="text-sm font-semibold">
                    Dashboard
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Field operations overview
                  </p>

                </div>


                {/* Stats */}

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">

                  {modules.map((module) => {

                    const Icon = module.icon;

                    return (
                      <div
                        key={module.label}
                        className="rounded-lg border p-3"
                      >

                        <Icon className="h-4 w-4 text-blue-600" />

                        <p className="mt-2 text-lg font-bold">
                          {module.value}
                        </p>

                        <p className="text-[10px] text-muted-foreground">
                          {module.label}
                        </p>

                      </div>
                    );

                  })}

                </div>


                {/* Activity */}

                <div className="mt-4 rounded-lg border p-4">

                  <div className="flex items-center justify-between">

                    <p className="text-xs font-semibold">
                      Recent Work Orders
                    </p>

                    <span className="text-[10px] text-blue-600">
                      View all
                    </span>

                  </div>


                  <div className="mt-4 space-y-3">

                    <div className="flex items-center justify-between border-b pb-3">

                      <div>

                        <p className="text-xs font-medium">
                          Equipment Maintenance
                        </p>

                        <p className="text-[10px] text-muted-foreground">
                          WO-1024 • Bengaluru
                        </p>

                      </div>

                      <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] text-green-700">
                        Completed
                      </span>

                    </div>


                    <div className="flex items-center justify-between border-b pb-3">

                      <div>

                        <p className="text-xs font-medium">
                          HVAC Inspection
                        </p>

                        <p className="text-[10px] text-muted-foreground">
                          WO-1025 • Whitefield
                        </p>

                      </div>

                      <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] text-blue-700">
                        In Progress
                      </span>

                    </div>


                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs font-medium">
                          Generator Service
                        </p>

                        <p className="text-[10px] text-muted-foreground">
                          WO-1026 • Electronic City
                        </p>

                      </div>

                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-[10px] text-yellow-700">
                        Scheduled
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}