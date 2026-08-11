import {
  ClipboardList,
  Users,
  CalendarDays,
  Package,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Work Order Management",
    description:
      "Create, assign and track work orders from creation through completion with clear status visibility.",
  },
  {
    icon: Users,
    title: "Technician Management",
    description:
      "Manage technicians, assignments and field activities while keeping teams organized and productive.",
  },
  {
    icon: CalendarDays,
    title: "Smart Scheduling",
    description:
      "Keep track of technician schedules, assigned jobs and planned field activities in one place.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Monitor materials, parts and equipment available to technicians and track material usage.",
  },
  {
    icon: BarChart3,
    title: "Reports & Insights",
    description:
      "Create, submit and review field reports to maintain accurate records of completed work.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Provide dedicated experiences for managers, dispatchers, technicians and customers.",
  },
];

export default function CoreFeaturesSection() {
  return (
    <section className="border-t bg-muted/30">

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Section Header */}

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Powerful capabilities
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your field team needs
          </h2>

          <p className="mt-4 text-muted-foreground">
            Meridian brings the essential tools for managing
            field service operations into one connected platform.
          </p>

        </div>


        {/* Features */}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >

                {/* Icon */}

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">

                  <Icon className="h-5 w-5" />

                </div>


                {/* Content */}

                <h3 className="mt-5 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}