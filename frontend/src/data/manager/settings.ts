export interface ManagerCompanySettings {
  companyName: string;
  companyEmail: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  website: string;
  timezone: string;
}

export const managerCompanySettings: ManagerCompanySettings = {
  companyName: "Keystone Field Services",
  companyEmail: "admin@keystone.com",
  phone: "+91 9876543210",
  address: "45 Industrial Area, Peenya",
  city: "Bengaluru",
  state: "Karnataka",
  postalCode: "560058",
  website: "https://keystone.com",
  timezone: "Asia/Kolkata",
};