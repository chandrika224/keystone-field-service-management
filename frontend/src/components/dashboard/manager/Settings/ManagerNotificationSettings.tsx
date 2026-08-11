import type { ElementType } from "react";

import {
  Bell,
  ClipboardList,
  Package,
  Users,
  UserRound,
  Mail,
  Monitor,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  ManagerNotificationSettings as NotificationSettings,
} from "@/data/manager/notificationSettings";

interface ManagerNotificationSettingsProps {
  settings: NotificationSettings;
  onSave: (settings: NotificationSettings) => void;
}

export default function ManagerNotificationSettings({
  settings,
  onSave,
}: ManagerNotificationSettingsProps) {
  const handleToggle = (
    field: keyof NotificationSettings
  ) => {
    onSave({
      ...settings,
      [field]: !settings[field],
    });
  };

  return (
    <div className="rounded-xl border bg-card">

      {/* Header */}

      <div className="border-b p-6">
        <div className="flex items-start gap-3">

          <div className="rounded-lg bg-primary/10 p-2">
            <Bell className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Notifications & Preferences
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Choose which activities you want to be notified about.
            </p>
          </div>

        </div>
      </div>

      {/* Notification Preferences */}

      <div className="divide-y">

        <NotificationRow
          icon={ClipboardList}
          title="Work Order Assigned"
          description="Notify me when a work order is assigned to a technician."
          checked={settings.workOrderAssigned}
          onChange={() =>
            handleToggle("workOrderAssigned")
          }
        />

        <NotificationRow
          icon={ClipboardList}
          title="Work Order Status Changes"
          description="Notify me when the status of a work order changes."
          checked={settings.workOrderStatusChanged}
          onChange={() =>
            handleToggle("workOrderStatusChanged")
          }
        />

        <NotificationRow
          icon={Users}
          title="Technician Activity"
          description="Notify me about important technician activity and updates."
          checked={settings.technicianActivity}
          onChange={() =>
            handleToggle("technicianActivity")
          }
        />

        <NotificationRow
          icon={Package}
          title="Low Inventory"
          description="Notify me when inventory reaches or falls below the minimum level."
          checked={settings.lowInventory}
          onChange={() =>
            handleToggle("lowInventory")
          }
        />

        <NotificationRow
          icon={MapPin}
          title="Customer & Site Updates"
          description="Notify me when customer or site information is updated."
          checked={settings.customerSiteUpdates}
          onChange={() =>
            handleToggle("customerSiteUpdates")
          }
        />

        <NotificationRow
          icon={UserRound}
          title="Staff Account Activity"
          description="Notify me when staff accounts are activated or deactivated."
          checked={settings.staffAccountActivity}
          onChange={() =>
            handleToggle("staffAccountActivity")
          }
        />

      </div>

      {/* Notification Delivery */}

      <div className="border-t p-6">

        <div className="mb-5">
          <h3 className="font-semibold">
            Notification Delivery
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose how you receive notifications.
          </p>
        </div>

        <div className="space-y-4">

          <NotificationRow
            icon={Mail}
            title="Email Notifications"
            description="Receive important system notifications through email."
            checked={settings.emailNotifications}
            onChange={() =>
              handleToggle("emailNotifications")
            }
          />

          <NotificationRow
            icon={Monitor}
            title="In-App Notifications"
            description="Show notifications inside the Keystone dashboard."
            checked={settings.inAppNotifications}
            onChange={() =>
              handleToggle("inAppNotifications")
            }
          />

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-muted/20 p-6">

        <div className="flex justify-end">

          <Button
            type="button"
            onClick={() => onSave(settings)}
          >
            Save Preferences
          </Button>

        </div>

      </div>

    </div>
  );
}


/* ==================================================
   NOTIFICATION ROW
================================================== */

interface NotificationRowProps {
  icon: ElementType;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

function NotificationRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}: NotificationRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-6">

      <div className="flex items-start gap-3">

        <div className="rounded-lg bg-muted p-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>

        <div>
          <p className="text-sm font-medium">
            {title}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        aria-label={`Toggle ${title}`}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked
            ? "bg-primary"
            : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>

    </div>
  );
}