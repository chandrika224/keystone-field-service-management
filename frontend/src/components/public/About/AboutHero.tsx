import { CheckCircle2 } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b bg-background">

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      </div>


      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-sm">

            <CheckCircle2 className="h-4 w-4 text-blue-600" />

            <span>
              Field service management, connected
            </span>

          </div>


          <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">

            Simplifying the way
            <span className="block text-blue-600">
              field teams work.
            </span>

          </h1>


          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">

            Meridian is a field service management platform
            designed to connect managers, dispatchers,
            technicians and customers through one
            centralized system.

          </p>

        </div>

      </div>

    </section>
  );
}