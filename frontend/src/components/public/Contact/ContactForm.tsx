
import { Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please complete all fields.");
      return;
    }

    setIsSubmitting(true);

    // Temporary frontend submission.
    // Connect this to your Spring Boot API later.

    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description:
          "Thank you for contacting the Meridian team.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section className="bg-background">

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

          {/* Left side */}

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Send us a message
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Have a question?
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
              Tell us a little about what you need and
              we'll have the right information ready to
              help you.
            </p>

            <div className="mt-8 rounded-2xl border bg-muted/30 p-6">

              <h3 className="font-semibold">
                What can you contact us about?
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">

                <li>
                  • Questions about Meridian
                </li>

                <li>
                  • Field service management requirements
                </li>

                <li>
                  • Platform demonstrations
                </li>

                <li>
                  • Technical or account assistance
                </li>

              </ul>

            </div>

          </div>


          {/* Form */}

          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}

              <div className="space-y-2">

                <label
                  htmlFor="name"
                  className="text-sm font-medium"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                />

              </div>


              {/* Email */}

              <div className="space-y-2">

                <label
                  htmlFor="email"
                  className="text-sm font-medium"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                />

              </div>


              {/* Subject */}

              <div className="space-y-2">

                <label
                  htmlFor="subject"
                  className="text-sm font-medium"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                />

              </div>


              {/* Message */}

              <div className="space-y-2">

                <label
                  htmlFor="message"
                  className="text-sm font-medium"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your requirements..."
                  rows={6}
                  className="w-full resize-none rounded-md border bg-background px-3 py-3 text-sm outline-none transition focus:ring-2 focus:ring-ring"
                />

              </div>


              {/* Submit */}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gap-2 sm:w-auto"
              >

                <Send className="h-4 w-4" />

                {isSubmitting
                  ? "Sending..."
                  : "Send Message"}

              </Button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}