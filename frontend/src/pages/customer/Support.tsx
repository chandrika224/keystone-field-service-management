import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Send, HelpCircle } from "lucide-react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Support() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!subject.trim()) {
      toast.error("Please enter a subject.");
      return;
    }

    if (!message.trim()) {
      toast.error("Please describe your issue.");
      return;
    }

    if (message.trim().length < 10) {
      toast.error(
        "Please provide at least 10 characters."
      );
      return;
    }

    // Temporary until Support API is created
    console.log("Support Request:", {
      subject,
      message,
    });

    toast.success(
      "Support request submitted successfully."
    );

    setSubject("");
    setMessage("");
  };

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Support Center"
        subtitle="We're here to help you with your service requests."
      />

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Contact options */}

        <div className="space-y-4">

          <div className="rounded-2xl border bg-card p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>

            <h3 className="font-semibold">
              Call Support
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Speak directly with our support team.
            </p>

            <p className="mt-4 font-medium">
              +91 1800 123 4567
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>

            <h3 className="font-semibold">
              Email Support
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Send us your question or issue.
            </p>

            <p className="mt-4 font-medium">
              support@keystone.com
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>

            <h3 className="font-semibold">
              Help Center
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Find answers to common questions.
            </p>

            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() =>
                toast.info(
                  "Help Center coming soon."
                )
              }
            >
              View FAQs
            </Button>
          </div>

        </div>

        {/* Support form */}

        <div className="rounded-2xl border bg-card p-6 lg:col-span-2">

          <h2 className="text-xl font-semibold">
            Contact Support
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Tell us what you need help with.
          </p>

          <div className="mt-6 space-y-5">

            <div className="space-y-2">
              <Label>Subject</Label>

              <Input
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                placeholder="What do you need help with?"
              />
            </div>

            <div className="space-y-2">
              <Label>Message</Label>

              <Textarea
                rows={8}
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Describe your issue..."
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSubmit}>
                <Send className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}