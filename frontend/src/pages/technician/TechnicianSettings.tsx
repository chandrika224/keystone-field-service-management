import { useState } from "react";

import { toast } from "sonner";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import TechnicianProfileSettings
  from "@/components/dashboard/technician/Settings/TechnicianProfileSettings";

import TechnicianNotificationSettings
  from "@/components/dashboard/technician/Settings/TechnicianNotificationSettings";

import {
  technicianSettings,
  type TechnicianSettings,
} from "@/data/technician/settings";

import {
  technicianNotificationSettings,
  type TechnicianNotificationSettings as TechnicianNotificationSettingsData,
} from "@/data/technician/notificationSettings";


export default function TechnicianSettings() {

  /* --------------------------------------------------
     PROFILE SETTINGS
  -------------------------------------------------- */

  const [settings, setSettings] =
    useState<TechnicianSettings>(
      technicianSettings
    );


  /* --------------------------------------------------
     NOTIFICATION SETTINGS
  -------------------------------------------------- */

  const [notificationSettings, setNotificationSettings] =
    useState<TechnicianNotificationSettingsData>(
      technicianNotificationSettings
    );


  /* --------------------------------------------------
     SAVE PROFILE
  -------------------------------------------------- */

  const handleSaveProfile = (
    updatedSettings: TechnicianSettings
  ) => {

    setSettings(updatedSettings);

    toast.success(
      "Profile updated successfully",
      {
        description:
          "Your technician profile has been updated.",
      }
    );

  };


  /* --------------------------------------------------
     SAVE NOTIFICATIONS
  -------------------------------------------------- */

  const handleSaveNotifications = (
    updatedSettings: TechnicianNotificationSettingsData
  ) => {

    setNotificationSettings(
      updatedSettings
    );

    toast.success(
      "Notification preferences updated",
      {
        description:
          "Your technician notification preferences have been saved.",
      }
    );

  };


  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Settings"
        subtitle="Manage your technician account and preferences."
      />


      {/* PROFILE */}

      <TechnicianProfileSettings
        settings={settings}
        onSave={handleSaveProfile}
      />


      {/* NOTIFICATIONS */}

      <TechnicianNotificationSettings
        settings={notificationSettings}
        onSave={handleSaveNotifications}
      />

    </div>
  );
}