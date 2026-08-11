import {
  ClipboardList,
  CalendarDays,
  Users,
  Package,
  BarChart3,
  Building2,
} from "lucide-react";

const capabilities = [
  {
    icon: ClipboardList,
    title: "Work Order Management",
    description:
      "Create, organize and track service work orders from request to completion with clear job information and status tracking.",
  },
  {
    icon: CalendarDays,
    title: "Scheduling & Assignments",
    description:
      "Coordinate field activities by assigning technicians to jobs and managing scheduled service work efficiently.",
  },
  {
    icon: Users,
    title: "Technician Management",
    description:
      "Manage technician assignments, availability and field activities while giving technicians their own dedicated workspace.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Track materials, parts and equipment used during field service and monitor inventory availability.",
  },
  {
    icon: BarChart3,
    title: "Reports & Work Documentation",
    description:
      "Technicians can create work reports, save drafts and submit completed reports for operational review.",
  },
  {
    icon: Building2,
    title: "Customers & Sites",
    description:
      "Keep customer and service-site information organized so teams have the right information when managing field work.",
  },
];

export default function ServiceCapabilities() {
  return (
    <section className="bg-muted/30">

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Platform capabilities
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your field team needs
          </h2>

          <p className="mt-4 text-muted-foreground">
            Meridian brings the core parts of field service
            management together in one connected platform.
          </p>

        </div>


        {/* Capabilities */}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {capabilities.map((capability) => {

            const Icon = capability.icon;

            return (
              <div
                key={capability.title}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >

                {/* Icon */}

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">

                  <Icon className="h-6 w-6" />

                </div>


                {/* Content */}

                <h3 className="mt-5 text-lg font-semibold">
                  {capability.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {capability.description}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}