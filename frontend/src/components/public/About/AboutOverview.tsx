import {
  ClipboardList,
  Users,
  BarChart3,
} from "lucide-react";

const points = [
  {
    icon: ClipboardList,
    title: "Centralized Operations",
    description:
      "Keep work orders, schedules, field activities and operational information organized in one place.",
  },
  {
    icon: Users,
    title: "Connected Teams",
    description:
      "Give managers, dispatchers, technicians and customers access to the information relevant to their role.",
  },
  {
    icon: BarChart3,
    title: "Better Visibility",
    description:
      "Track service activity, inventory usage and work reports to gain a clearer view of field operations.",
  },
];

export default function AboutOverview() {
  return (
    <section className="bg-muted/30">

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Text */}

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              About Meridian
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              One platform for the complete service lifecycle.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Field service operations involve many moving parts.
              Work needs to be assigned, technicians need the
              right information, materials need to be tracked and
              completed work needs to be documented.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Meridian brings these activities together through
              role-based workflows, helping teams coordinate field
              work from the initial request through completion.
            </p>

          </div>


          {/* Points */}

          <div className="space-y-5">

            {points.map((point) => {

              const Icon = point.icon;

              return (
                <div
                  key={point.title}
                  className="flex gap-4 rounded-2xl border bg-card p-5 shadow-sm"
                >

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                    <Icon className="h-5 w-5" />

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {point.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {point.description}
                    </p>

                  </div>

                </div>
              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
}