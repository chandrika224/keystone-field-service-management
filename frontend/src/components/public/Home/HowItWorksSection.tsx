import {
  ClipboardPlus,
  UserCheck,
  FileCheck2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardPlus,
    title: "Create a Work Order",
    description:
      "Create a service request with customer, site and job details so the work can be organized and tracked.",
  },
  {
    number: "02",
    icon: UserCheck,
    title: "Assign & Schedule",
    description:
      "Dispatchers can assign the right technician and schedule the job based on field requirements.",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Complete & Report",
    description:
      "Technicians complete the assigned work, record materials and submit a detailed work report.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-background">

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Simple workflow
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From service request to completion
          </h2>

          <p className="mt-4 text-muted-foreground">
            Meridian connects every stage of the field service
            workflow so your team can work from one source of truth.
          </p>

        </div>


        {/* Steps */}

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">

          {/* Connecting line */}

          <div className="absolute left-[16%] right-[16%] top-16 hidden h-px bg-border md:block" />


          {steps.map((step, index) => {

            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >

                {/* Icon */}

                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border bg-card text-blue-600 shadow-sm">

                  <Icon className="h-7 w-7" />

                </div>


                {/* Number */}

                <span className="mt-5 text-xs font-bold tracking-widest text-blue-600">
                  {step.number}
                </span>


                {/* Title */}

                <h3 className="mt-2 text-lg font-semibold">
                  {step.title}
                </h3>


                {/* Description */}

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>


                {/* Mobile arrow */}

                {index < steps.length - 1 && (
                  <ArrowRight className="mt-6 h-5 w-5 text-muted-foreground md:hidden" />
                )}

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}