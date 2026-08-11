export interface ManagerNotificationSettings {
  workOrderAssigned: boolean;
  workOrderStatusChanged: boolean;
  technicianActivity: boolean;
  lowInventory: boolean;
  customerSiteUpdates: boolean;
  staffAccountActivity: boolean;

  emailNotifications: boolean;
  inAppNotifications: boolean;
}

export const managerNotificationSettings: ManagerNotificationSettings = {
  workOrderAssigned: true,
  workOrderStatusChanged: true,
  technicianActivity: true,
  lowInventory: true,
  customerSiteUpdates: true,
  staffAccountActivity: false,

  emailNotifications: true,
  inAppNotifications: true,
};