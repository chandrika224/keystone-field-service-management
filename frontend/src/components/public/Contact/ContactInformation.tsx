import {
  Mail,
  MapPin,
  Clock3,
} from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    value: "support@meridian-fsm.com",
    description:
      "Send us your questions or service inquiries.",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Bengaluru, Karnataka, India",
    description:
      "Serving field service teams from Bengaluru.",
  },
  {
    icon: Clock3,
    title: "Availability",
    value: "Monday – Friday",
    description:
      "We're available during standard business hours.",
  },
];

export default function ContactInformation() {
  return (
    <section className="bg-muted/30">

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="grid gap-6 md:grid-cols-3">

          {contactItems.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                  <Icon className="h-5 w-5" />

                </div>


                <h2 className="mt-5 font-semibold">
                  {item.title}
                </h2>


                <p className="mt-2 font-medium">
                  {item.value}
                </p>


                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}