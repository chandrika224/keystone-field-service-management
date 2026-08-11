import { useEffect, useState } from "react";

import { UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type {
  TechnicianSettings,
} from "@/data/technician/settings";

interface TechnicianProfileSettingsProps {
  settings: TechnicianSettings;

  onSave: (
    settings: TechnicianSettings
  ) => void;
}

export default function TechnicianProfileSettings({
  settings,
  onSave,
}: TechnicianProfileSettingsProps) {

  const [name, setName] =
    useState(settings.name);

  const [email, setEmail] =
    useState(settings.email);

  const [phone, setPhone] =
    useState(settings.phone);

  const [specialization, setSpecialization] =
    useState(settings.specialization);


  useEffect(() => {
    setName(settings.name);
    setEmail(settings.email);
    setPhone(settings.phone);
    setSpecialization(
      settings.specialization
    );
  }, [settings]);


  const handleSave = () => {

    if (!name.trim()) {
      return;
    }

    if (!email.trim()) {
      return;
    }

    if (!phone.trim()) {
      return;
    }

    if (!specialization.trim()) {
      return;
    }

    onSave({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      specialization:
        specialization.trim(),
    });
  };


  return (
    <div className="rounded-xl border bg-card">

      {/* Header */}

      <div className="border-b p-6">

        <div className="flex items-start gap-3">

          <div className="rounded-lg bg-primary/10 p-2">

            <UserRound
              className="h-5 w-5 text-primary"
            />

          </div>

          <div>

            <h2 className="text-lg font-semibold">
              Profile Settings
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your technician account information.
            </p>

          </div>

        </div>

      </div>


      {/* Form */}

      <div className="grid gap-5 p-6 md:grid-cols-2">

        {/* Name */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Full Name
          </label>

          <Input
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Enter your name"
          />

        </div>


        {/* Email */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Email
          </label>

          <Input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="technician@company.com"
          />

        </div>


        {/* Phone */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Phone
          </label>

          <Input
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            placeholder="+91 9876543210"
          />

        </div>


        {/* Specialization */}

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Specialization
          </label>

          <Input
            value={specialization}
            onChange={(event) =>
              setSpecialization(
                event.target.value
              )
            }
            placeholder="HVAC Technician"
          />

        </div>

      </div>


      {/* Footer */}

      <div className="flex justify-end border-t bg-muted/20 p-6">

        <Button
          type="button"
          onClick={handleSave}
        >
          Save Changes
        </Button>

      </div>

    </div>
  );
}