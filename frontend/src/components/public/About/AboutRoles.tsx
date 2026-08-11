import {
  ShieldCheck,
  Send,
  Wrench,
  UserRound,
} from "lucide-react";

const roles = [
  {
    icon: ShieldCheck,
    title: "Manager",
    description:
      "Oversees operations, technicians, inventory, reports and system settings.",
  },
  {
    icon: Send,
    title: "Dispatcher",
    description:
      "Coordinates work orders, customers, sites and technician assignments.",
  },
  {
    icon: Wrench,
    title: "Technician",
    description:
      "Manages assigned jobs, schedules, materials, reports and field activities.",
  },
  {
    icon: UserRound,
    title: "Customer",
    description:
      "Accesses work orders and relevant service information through a dedicated experience.",
  },
];

export default function AboutRoles() {
  return (
    <section className="border-t bg-background">

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Role-based platform
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everyone gets the tools they need
          </h2>

          <p className="mt-4 text-muted-foreground">
            Meridian separates responsibilities while keeping
            the entire service workflow connected.
          </p>

        </div>


        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {roles.map((role) => {

            const Icon = role.icon;

            return (
              <div
                key={role.title}
                className="rounded-2xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                  <Icon className="h-6 w-6" />

                </div>

                <h3 className="mt-5 font-semibold">
                  {role.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {role.description}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}