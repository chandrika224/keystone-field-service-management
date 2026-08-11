import {
  ShieldCheck,
  ClipboardList,
  Wrench,
  UserRound,
  ArrowRight,
} from "lucide-react";

const roles = [
  {
    icon: ShieldCheck,
    title: "Manager",
    description:
      "Get a complete view of operations, manage teams, monitor inventory and review field reports.",
    features: [
      "Operational overview",
      "Team management",
      "Inventory monitoring",
      "Reports & settings",
    ],
  },
  {
    icon: ClipboardList,
    title: "Dispatcher",
    description:
      "Coordinate field operations by managing work orders, customers, sites and technician assignments.",
    features: [
      "Work order management",
      "Technician assignments",
      "Customer & site management",
      "Scheduling",
    ],
  },
  {
    icon: Wrench,
    title: "Technician",
    description:
      "Manage assigned field jobs, schedules, materials and work reports directly from the technician workspace.",
    features: [
      "Assigned jobs",
      "Job tracking",
      "Inventory usage",
      "Work reports",
    ],
  },
  {
    icon: UserRound,
    title: "Customer",
    description:
      "Stay informed about service requests and track the progress of work associated with your sites.",
    features: [
      "Work orders",
      "Service status",
      "Profile management",
      "Service visibility",
    ],
  },
];

export default function RolesSection() {
  return (
    <section className="border-t bg-muted/30">

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Built for every team
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            One platform. Every role connected.
          </h2>

          <p className="mt-4 text-muted-foreground">
            Meridian gives every member of your service organization
            the tools they need while keeping everyone connected.
          </p>

        </div>


        {/* Role Cards */}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {roles.map((role) => {

            const Icon = role.icon;

            return (
              <div
                key={role.title}
                className="group rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >

                {/* Icon */}

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">

                  <Icon className="h-5 w-5" />

                </div>


                {/* Title */}

                <h3 className="mt-5 text-lg font-semibold">
                  {role.title}
                </h3>


                {/* Description */}

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {role.description}
                </p>


                {/* Features */}

                <div className="mt-5 space-y-2">

                  {role.features.map((feature) => (

                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >

                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-blue-600" />

                      <span>
                        {feature}
                      </span>

                    </div>

                  ))}

                </div>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}