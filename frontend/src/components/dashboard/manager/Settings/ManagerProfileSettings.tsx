import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { ManagerProfile } from "@/data/manager/managerProfile";

interface ManagerProfileSettingsProps {
  profile: ManagerProfile;
  onSave: (profile: ManagerProfile) => void;
}

export default function ManagerProfileSettings({
  profile,
  onSave,
}: ManagerProfileSettingsProps) {
  const [form, setForm] =
    useState<ManagerProfile>(profile);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleChange = (
    field: keyof ManagerProfile,
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
    <div className="space-y-6">

      {/* Profile */}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border bg-card p-6"
      >
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Manager Profile
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your personal account information.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Full Name
            </label>

            <Input
              value={form.name}
              onChange={(event) =>
                handleChange(
                  "name",
                  event.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              value={form.email}
              onChange={(event) =>
                handleChange(
                  "email",
                  event.target.value
                )
              }
            />
          </div>

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

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Role
            </label>

            <Input
              value={form.role}
              disabled
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end border-t pt-5">
          <Button type="submit">
            Save Profile
          </Button>
        </div>
      </form>

      {/* Account Information */}

      <div className="rounded-xl border bg-card p-6">

        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Account Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Current status of your manager account.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Account ID
            </p>

            <p className="mt-1 font-medium">
              {form.id}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Status
            </p>

            <p className="mt-1 font-medium text-green-600">
              {form.status}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Last Login
            </p>

            <p className="mt-1 font-medium">
              {form.lastLogin}
            </p>
          </div>

        </div>
      </div>

      {/* Change Password */}

      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
          ) {
            return;
          }

          if (newPassword !== confirmPassword) {
            return;
          }

          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }}
        className="rounded-xl border bg-card p-6"
      >

        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Change Password
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your manager account password.
          </p>
        </div>

        <div className="space-y-5">

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Current Password
            </label>

            <Input
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(
                  event.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              New Password
            </label>

            <Input
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(
                  event.target.value
                )
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Confirm New Password
            </label>

            <Input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end border-t pt-5">
          <Button type="submit">
            Change Password
          </Button>
        </div>

      </form>

    </div>
  );
}