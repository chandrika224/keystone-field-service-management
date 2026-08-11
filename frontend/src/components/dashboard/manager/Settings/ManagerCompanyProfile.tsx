import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  type ManagerCompanySettings,
} from "@/data/manager/settings";

interface ManagerCompanyProfileProps {
  settings: ManagerCompanySettings;
  onSave: (settings: ManagerCompanySettings) => void;
}

export default function ManagerCompanyProfile({
  settings,
  onSave,
}: ManagerCompanyProfileProps) {

  const [form, setForm] =
    useState<ManagerCompanySettings>(settings);

  const handleChange = (
    field: keyof ManagerCompanySettings,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    onSave(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-card p-6"
    >

      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Company Profile
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your organization's information.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        {/* Company Name */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Company Name
          </label>

          <Input
            value={form.companyName}
            onChange={(event) =>
              handleChange(
                "companyName",
                event.target.value
              )
            }
          />
        </div>

        {/* Company Email */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Company Email
          </label>

          <Input
            type="email"
            value={form.companyEmail}
            onChange={(event) =>
              handleChange(
                "companyEmail",
                event.target.value
              )
            }
          />
        </div>

        {/* Phone */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Phone
          </label>

          <Input
            value={form.phone}
            onChange={(event) =>
              handleChange(
                "phone",
                event.target.value
              )
            }
          />
        </div>

        {/* Website */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Website
          </label>

          <Input
            value={form.website}
            onChange={(event) =>
              handleChange(
                "website",
                event.target.value
              )
            }
          />
        </div>

        {/* Address */}

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">
            Address
          </label>

          <Input
            value={form.address}
            onChange={(event) =>
              handleChange(
                "address",
                event.target.value
              )
            }
          />
        </div>

        {/* City */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            City
          </label>

          <Input
            value={form.city}
            onChange={(event) =>
              handleChange(
                "city",
                event.target.value
              )
            }
          />
        </div>

        {/* State */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            State
          </label>

          <Input
            value={form.state}
            onChange={(event) =>
              handleChange(
                "state",
                event.target.value
              )
            }
          />
        </div>

        {/* Postal Code */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Postal Code
          </label>

          <Input
            value={form.postalCode}
            onChange={(event) =>
              handleChange(
                "postalCode",
                event.target.value
              )
            }
          />
        </div>

        {/* Timezone */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Timezone
          </label>

          <Input
            value={form.timezone}
            onChange={(event) =>
              handleChange(
                "timezone",
                event.target.value
              )
            }
          />
        </div>

      </div>

      <div className="mt-6 flex justify-end border-t pt-5">
        <Button type="submit">
          Save Changes
        </Button>
      </div>

    </form>
  );
}