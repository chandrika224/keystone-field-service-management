import { dispatcherSites, type DispatcherSite } from "../dispatcher/sites";

export interface ManagerSite extends DispatcherSite {
  latitude: number;
  longitude: number;
}

export const managerSites: ManagerSite[] =
  dispatcherSites.map((site) => {
    switch (site.id) {
      case "SITE-001":
        return {
          ...site,
          latitude: 13.0285,
          longitude: 77.5199,
        };

      case "SITE-002":
        return {
          ...site,
          latitude: 13.0288,
          longitude: 77.5401,
        };

      case "SITE-003":
        return {
          ...site,
          latitude: 12.8456,
          longitude: 77.6603,
        };

      case "SITE-004":
        return {
          ...site,
          latitude: 12.2958,
          longitude: 76.6394,
        };

      case "SITE-005":
        return {
          ...site,
          latitude: 12.9756,
          longitude: 77.6066,
        };

      default:
        return {
          ...site,
          latitude: 12.9716,
          longitude: 77.5946,
        };
    }
  });

