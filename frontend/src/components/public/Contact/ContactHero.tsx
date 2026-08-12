import { Mail, MessageCircle } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b bg-background">

      {/* Background decoration */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      </div>


      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

        <div className="mx-auto max-w-3xl text-center">

          {/* Icon */}

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

            <MessageCircle className="h-6 w-6" />

          </div>


          {/* Heading */}

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">

            Let's talk about your
            <span className="block text-blue-600">
              field service operations.
            </span>

          </h1>


          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">

            Have a question about Meridian, want to learn
            more about the platform, or need help getting
            started? We'd be happy to hear from you.

          </p>


          {/* Email */}

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm shadow-sm">

            <Mail className="h-4 w-4 text-blue-600" />

            <span className="text-muted-foreground">
              Get in touch with the Meridian team
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}