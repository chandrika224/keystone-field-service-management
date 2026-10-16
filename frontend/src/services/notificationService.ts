

// Adjust this import path to match the file where you export
// your existing Axios instance.

import api from "@/lib/api";

export interface NotificationResponse {
  id: number;
  userId: number;
  workOrderId: number | null;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export const notificationService = {
  // Get all notifications
  getAll: async (): Promise<NotificationResponse[]> => {
    const response = await api.get<NotificationResponse[]>(
      "/api/notifications"
    );
    return response.data;
  },

  // Get unread notifications
  getUnread: async (): Promise<NotificationResponse[]> => {
    const response = await api.get<NotificationResponse[]>(
      "/api/notifications/unread"
    );
    return response.data;
  },

  // Get unread count
  getUnreadCount: async (): Promise<number> => {
    const response = await api.get<number>(
      "/api/notifications/unread/count"
    );
    return response.data;
  },

  // Mark one notification as read
  markAsRead: async (
    notificationId: number
  ): Promise<NotificationResponse> => {
    const response = await api.patch<NotificationResponse>(
      `/api/notifications/${notificationId}/read`
    );
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<void> => {
    await api.patch("/api/notifications/read-all");
  },

  // Delete one notification
  delete: async (notificationId: number): Promise<void> => {
    await api.delete(`/api/notifications/${notificationId}`);
  },
};
