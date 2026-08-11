import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b bg-background">

      {/* Background decoration */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      </div>


      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-sm">

            <CheckCircle2 className="h-4 w-4 text-blue-600" />

            <span>
              Complete field service management
            </span>

          </div>


          {/* Heading */}

          <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">

            Everything you need to
            <span className="block text-blue-600">
              manage field operations.
            </span>

          </h1>


          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">

            Meridian connects work orders, technicians,
            scheduling, inventory, reporting and customers
            in one centralized field service platform.

          </p>


          {/* Actions */}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Button
              asChild
              size="lg"
              className="gap-2"
            >

              <Link to="/register">

                Get Started

                <ArrowRight className="h-4 w-4" />

              </Link>

            </Button>


            <Button
              asChild
              size="lg"
              variant="outline"
            >

              <Link to="/contact">
                Talk to Us
              </Link>

            </Button>

          </div>

        </div>


        {/* Bottom highlights */}

        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">

          <div className="rounded-xl border bg-card p-5 text-center shadow-sm">

            <p className="text-2xl font-bold">
              1
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Connected platform
            </p>

          </div>


          <div className="rounded-xl border bg-card p-5 text-center shadow-sm">

            <p className="text-2xl font-bold">
              4
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              User roles
            </p>

          </div>


          <div className="rounded-xl border bg-card p-5 text-center shadow-sm">

            <p className="text-2xl font-bold">
              6+
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Core capabilities
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}