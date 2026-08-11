import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">

      {/* Background decoration */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/70 via-background to-background" />

      <div className="absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute -right-32 top-10 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />


      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-2">


          {/* Left Content */}

          <div>

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm text-muted-foreground shadow-sm">

              <CheckCircle2 className="h-4 w-4 text-blue-600" />

              <span>
                Smarter field service management
              </span>

            </div>


            {/* Heading */}

            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">

              Manage your field operations
              <span className="text-blue-600">
                {" "}smarter.
              </span>

            </h1>


            {/* Description */}

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">

              Meridian brings work orders, technicians,
              scheduling, inventory and field reports
              together in one centralized platform.

            </p>


            {/* Buttons */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

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

                <Link to="/services">
                  Explore Services
                </Link>

              </Button>

            </div>


            {/* Trust points */}

            <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">

              <div className="flex items-center gap-2">

                <CheckCircle2 className="h-4 w-4 text-blue-600" />

                Work Order Management

              </div>


              <div className="flex items-center gap-2">

                <CheckCircle2 className="h-4 w-4 text-blue-600" />

                Technician Tracking

              </div>


              <div className="flex items-center gap-2">

                <CheckCircle2 className="h-4 w-4 text-blue-600" />

                Inventory Management

              </div>

            </div>

          </div>


          {/* Right Visual */}

          <div className="relative">

            <div className="rounded-2xl border bg-card p-4 shadow-xl">

              {/* Dashboard header */}

              <div className="flex items-center justify-between border-b pb-4">

                <div>

                  <p className="text-sm font-semibold">
                    Field Operations
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Today's overview
                  </p>

                </div>

                <div className="h-3 w-3 rounded-full bg-green-500" />

              </div>


              {/* Stats */}

              <div className="mt-4 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-blue-50 p-4">

                  <p className="text-xs text-muted-foreground">
                    Active Jobs
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    24
                  </p>

                  <p className="mt-1 text-xs text-green-600">
                    +12% this week
                  </p>

                </div>


                <div className="rounded-xl bg-muted p-4">

                  <p className="text-xs text-muted-foreground">
                    Technicians
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    18
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    15 currently active
                  </p>

                </div>

              </div>


              {/* Schedule */}

              <div className="mt-4 rounded-xl border p-4">

                <div className="flex items-center justify-between">

                  <p className="text-sm font-semibold">
                    Today's Schedule
                  </p>

                  <span className="text-xs text-blue-600">
                    View all
                  </span>

                </div>


                <div className="mt-4 space-y-3">

                  <div className="flex items-center gap-3">

                    <div className="h-9 w-9 rounded-lg bg-blue-100" />

                    <div className="flex-1">

                      <p className="text-sm font-medium">
                        Equipment Maintenance
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Bengaluru • 10:00 AM
                      </p>

                    </div>

                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                      Active
                    </span>

                  </div>


                  <div className="flex items-center gap-3">

                    <div className="h-9 w-9 rounded-lg bg-muted" />

                    <div className="flex-1">

                      <p className="text-sm font-medium">
                        HVAC Inspection
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Whitefield • 1:30 PM
                      </p>

                    </div>

                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                      Scheduled
                    </span>

                  </div>


                  <div className="flex items-center gap-3">

                    <div className="h-9 w-9 rounded-lg bg-muted" />

                    <div className="flex-1">

                      <p className="text-sm font-medium">
                        Generator Service
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Electronic City • 4:00 PM
                      </p>

                    </div>

                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                      Pending
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}