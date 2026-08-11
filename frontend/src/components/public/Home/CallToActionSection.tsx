import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function CallToActionSection() {
  return (
    <section className="border-t bg-muted/30">

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-14 shadow-sm sm:px-12 sm:py-16">

          {/* Decorative background */}

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />


          <div className="relative mx-auto max-w-3xl text-center">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground">

              <CheckCircle2 className="h-4 w-4 text-blue-600" />

              <span>
                Built for modern field service teams
              </span>

            </div>


            {/* Heading */}

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">

              Ready to simplify your
              <span className="text-blue-600">
                {" "}field operations?
              </span>

            </h2>


            {/* Description */}

            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">

              Bring work orders, technicians, scheduling,
              inventory and reporting together with Meridian.

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

                <Link to="/login">
                  Sign In
                </Link>

              </Button>

            </div>


            {/* Supporting text */}

            <p className="mt-5 text-xs text-muted-foreground">
              Manage your field service operations from one
              centralized platform.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}