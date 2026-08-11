export interface TechnicianNotificationSettings {
  workOrderAssigned: boolean;
  workOrderUpdated: boolean;
  scheduleChanged: boolean;
  jobStatusChanged: boolean;
  managerMessages: boolean;
  inventoryAlerts: boolean;
  reportReviewed: boolean;

  emailNotifications: boolean;
  inAppNotifications: boolean;
}

export const technicianNotificationSettings: TechnicianNotificationSettings = {
  workOrderAssigned: true,
  workOrderUpdated: true,
  scheduleChanged: true,
  jobStatusChanged: true,
  managerMessages: true,
  inventoryAlerts: true,
  reportReviewed: true,

  emailNotifications: true,
  inAppNotifications: true,
};