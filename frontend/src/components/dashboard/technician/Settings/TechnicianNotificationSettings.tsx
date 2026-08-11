import {
  Bell,
  ClipboardList,
  CalendarDays,
  MessageSquare,
  Package,
  FileCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type {
  TechnicianNotificationSettings as TechnicianNotificationSettingsType,
} from "@/data/technician/notificationSettings";


interface TechnicianNotificationSettingsProps {
  settings: TechnicianNotificationSettingsType;

  onSave: (
    settings: TechnicianNotificationSettingsType
  ) => void;
}


export default function TechnicianNotificationSettings({
  settings,
  onSave,
}: TechnicianNotificationSettingsProps) {


  const handleToggle = (
    field: keyof TechnicianNotificationSettingsType
  ) => {

    onSave({
      ...settings,
      [field]: !settings[field],
    });

  };


  return (
    <div className="rounded-xl border bg-card">


      {/* HEADER */}

      <div className="border-b p-6">

        <div className="flex items-start gap-3">

          <div className="rounded-lg bg-primary/10 p-2">

            <Bell
              className="h-5 w-5 text-primary"
            />

          </div>

          <div>

            <h2 className="text-lg font-semibold">
              Notifications & Preferences
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Choose which technician activities you want to be notified about.
            </p>

          </div>

        </div>

      </div>


      {/* NOTIFICATION OPTIONS */}

      <div className="divide-y">


        <NotificationRow
          icon={ClipboardList}
          title="Work Order Assigned"
          description="Notify me when a new work order is assigned to me."
          checked={settings.workOrderAssigned}
          onChange={() =>
            handleToggle("workOrderAssigned")
          }
        />


        <NotificationRow
          icon={ClipboardList}
          title="Work Order Updates"
          description="Notify me when information about my assigned work order changes."
          checked={settings.workOrderUpdated}
          onChange={() =>
            handleToggle("workOrderUpdated")
          }
        />


        <NotificationRow
          icon={CalendarDays}
          title="Schedule Changes"
          description="Notify me when my job schedule changes."
          checked={settings.scheduleChanged}
          onChange={() =>
            handleToggle("scheduleChanged")
          }
        />


        <NotificationRow
          icon={ClipboardList}
          title="Job Status Changes"
          description="Notify me when the status of my assigned job changes."
          checked={settings.jobStatusChanged}
          onChange={() =>
            handleToggle("jobStatusChanged")
          }
        />


        <NotificationRow
          icon={MessageSquare}
          title="Manager Messages"
          description="Notify me when my manager sends an important message."
          checked={settings.managerMessages}
          onChange={() =>
            handleToggle("managerMessages")
          }
        />


        <NotificationRow
          icon={Package}
          title="Inventory Alerts"
          description="Notify me about low-stock or unavailable materials."
          checked={settings.inventoryAlerts}
          onChange={() =>
            handleToggle("inventoryAlerts")
          }
        />


        <NotificationRow
          icon={FileCheck}
          title="Report Review"
          description="Notify me when a submitted work report is approved or rejected."
          checked={settings.reportReviewed}
          onChange={() =>
            handleToggle("reportReviewed")
          }
        />

      </div>


      {/* DELIVERY */}

      <div className="border-t p-6">

        <div className="mb-5">

          <h3 className="font-semibold">
            Notification Delivery
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose how you want to receive notifications.
          </p>

        </div>


        <div className="space-y-4">


          <NotificationRow
            icon={Bell}
            title="In-App Notifications"
            description="Show notifications inside the Keystone dashboard."
            checked={settings.inAppNotifications}
            onChange={() =>
              handleToggle("inAppNotifications")
            }
          />


          <NotificationRow
            icon={MessageSquare}
            title="Email Notifications"
            description="Receive important notifications through your company email."
            checked={settings.emailNotifications}
            onChange={() =>
              handleToggle("emailNotifications")
            }
          />

        </div>

      </div>


      {/* FOOTER */}

      <div className="flex justify-end border-t bg-muted/20 p-6">

        <Button
          type="button"
          onClick={() =>
            onSave(settings)
          }
        >
          Save Preferences
        </Button>

      </div>

    </div>
  );
}


/* --------------------------------------------------
   NOTIFICATION ROW
-------------------------------------------------- */

interface NotificationRowProps {
  icon: React.ElementType;

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

          <Icon
            className="h-4 w-4 text-muted-foreground"
          />

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