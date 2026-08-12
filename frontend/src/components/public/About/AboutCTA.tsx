import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function AboutCTA() {
  return (
    <section className="border-t bg-muted/30">

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-3xl border bg-card px-6 py-14 text-center shadow-sm sm:px-12 sm:py-16">

          {/* Background decoration */}

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />


          <div className="relative mx-auto max-w-3xl">

            {/* Icon */}

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

              <MessageCircle className="h-6 w-6" />

            </div>


            {/* Heading */}

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">

              Ready to simplify your
              <span className="block text-blue-600">
                field operations?
              </span>

            </h2>


            {/* Description */}

            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">

              Explore Meridian or get in touch with us to learn
              more about how the platform brings field service
              operations together.

            </p>


            {/* Actions */}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Button
                asChild
                size="lg"
                className="gap-2"
              >

                <Link to="/services">

                  Explore Services

                  <ArrowRight className="h-4 w-4" />

                </Link>

              </Button>


              <Button
                asChild
                size="lg"
                variant="outline"
              >

                <Link to="/contact">
                  Contact Us
                </Link>

              </Button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}