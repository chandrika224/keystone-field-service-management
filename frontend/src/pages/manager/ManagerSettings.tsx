import { useState } from "react";

import { toast } from "sonner";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import ManagerCompanyProfile
  from "@/components/dashboard/manager/Settings/ManagerCompanyProfile";

import ManagerProfileSettings
  from "@/components/dashboard/manager/Settings/ManagerProfileSettings";

import ManagerStaffAccess
  from "@/components/dashboard/manager/Settings/ManagerStaffAccess";

import ManagerNotificationSettings
  from "@/components/dashboard/manager/Settings/ManagerNotificationSettings";

import {
  managerCompanySettings,
  type ManagerCompanySettings,
} from "@/data/manager/settings";

import {
  managerProfile,
  type ManagerProfile,
} from "@/data/manager/managerProfile";

import {
  managerPermissions,
} from "@/data/manager/permissions";

import {
  managerNotificationSettings,
  type ManagerNotificationSettings as NotificationSettingsType,
} from "@/data/manager/notificationSettings";


export default function ManagerSettings() {

  /* ==================================================
     COMPANY SETTINGS
  ================================================== */

  const [settings, setSettings] =
    useState<ManagerCompanySettings>(
      managerCompanySettings
    );

  const handleSaveCompany = (
    updatedSettings: ManagerCompanySettings
  ) => {

    setSettings(updatedSettings);

    toast.success(
      "Company profile updated",
      {
        description:
          "Your company information has been saved successfully.",
      }
    );
  };


  /* ==================================================
     MANAGER PROFILE
  ================================================== */

  const [profile, setProfile] =
    useState<ManagerProfile>(
      managerProfile
    );

  const handleSaveProfile = (
    updatedProfile: ManagerProfile
  ) => {

    setProfile(updatedProfile);

    toast.success(
      "Profile updated successfully",
      {
        description:
          "Your manager account information has been saved.",
      }
    );
  };


  /* ==================================================
     NOTIFICATION SETTINGS
  ================================================== */

  const [
    notificationSettings,
    setNotificationSettings,
  ] = useState<NotificationSettingsType>(
    managerNotificationSettings
  );


  const handleSaveNotifications = (
    updatedSettings: NotificationSettingsType
  ) => {

    setNotificationSettings(
      updatedSettings
    );

    toast.success(
      "Notification preferences updated",
      {
        description:
          "Your notification preferences have been saved.",
      }
    );
  };


  /* ==================================================
     RENDER
  ================================================== */

  return (
    <div className="space-y-6">

      {/* Page Header */}

      <SectionHeader
        title="Settings"
        subtitle="Manage your organization and manager preferences."
      />


      {/* Company Profile */}

      <ManagerCompanyProfile
        settings={settings}
        onSave={handleSaveCompany}
      />


      {/* Manager Profile */}

      <ManagerProfileSettings
        profile={profile}
        onSave={handleSaveProfile}
      />


      {/* Staff Access & Permissions */}

      <ManagerStaffAccess
        permissions={managerPermissions}
      />


      {/* Notifications & Preferences */}

      <ManagerNotificationSettings
        settings={notificationSettings}
        onSave={handleSaveNotifications}
      />

    </div>
  );
}