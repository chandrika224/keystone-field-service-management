import {
  ClipboardPlus,
  UserCheck,
  Wrench,
  Package,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

const workflowSteps = [
  {
    number: "01",
    icon: ClipboardPlus,
    title: "Create Work Order",
    description:
      "A service request is captured as a work order with customer, site and job details.",
  },
  {
    number: "02",
    icon: UserCheck,
    title: "Assign Technician",
    description:
      "Dispatchers coordinate the work by assigning the right technician to the job.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Perform Field Work",
    description:
      "Technicians access their assigned jobs, track work and complete the required field activities.",
  },
  {
    number: "04",
    icon: Package,
    title: "Use Materials",
    description:
      "Technicians record materials and parts consumed during the service operation.",
  },
  {
    number: "05",
    icon: FileCheck,
    title: "Submit Work Report",
    description:
      "The technician documents completed work and submits a report for review.",
  },
  {
    number: "06",
    icon: CheckCircle2,
    title: "Complete & Review",
    description:
      "Managers can review operational activity and monitor the completed service process.",
  },
];

export default function ServiceWorkflow() {
  return (
    <section className="border-t bg-background">

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From service request to completion
          </h2>

          <p className="mt-4 text-muted-foreground">
            Meridian connects every stage of the field service
            workflow so teams can work together efficiently.
          </p>

        </div>


        {/* Workflow */}

        <div className="relative mt-14">

          {/* Connecting line */}

          <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-border md:block" />


          <div className="space-y-8">

            {workflowSteps.map((step) => {

              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative flex gap-5"
                >

                  {/* Step Icon */}

                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-card text-blue-600 shadow-sm">

                    <Icon className="h-5 w-5" />

                  </div>


                  {/* Content */}

                  <div className="flex-1 rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-center gap-3">

                        <span className="text-xs font-semibold text-blue-600">
                          STEP {step.number}
                        </span>

                        <h3 className="font-semibold">
                          {step.title}
                        </h3>

                      </div>

                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {step.description}
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