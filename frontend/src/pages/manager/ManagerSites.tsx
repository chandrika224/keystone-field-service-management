import { useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import ManagerSitesToolbar
  from "@/components/dashboard/manager/Sites/ManagerSitesToolbar";

import ManagerSitesList
  from "@/components/dashboard/manager/Sites/ManagerSitesList";

import ManagerSitesMap
  from "@/components/dashboard/manager/Sites/ManagerSitesMap";

import ManagerSiteDetailsDrawer
  from "@/components/dashboard/manager/Sites/ManagerSiteDetailsDrawer";

import {
  managerSites,
  type ManagerSite,
} from "@/data/manager/sites";

export default function ManagerSites() {
  const [search, setSearch] = useState("");

  const [selectedSite, setSelectedSite] =
    useState<ManagerSite | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const handleSelectSite = (site: ManagerSite) => {
    console.log("Manager selected site:", site);

    setSelectedSite(site);
    setDrawerOpen(true);
  };

  const searchValue = search.toLowerCase().trim();

  const filteredSites = managerSites.filter((site) => {
    return (
      site.name.toLowerCase().includes(searchValue) ||
      site.customer.toLowerCase().includes(searchValue) ||
      site.city.toLowerCase().includes(searchValue) ||
      site.state.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="space-y-6">

      {/* Page Header */}

      <SectionHeader
        title="Sites"
        subtitle="Monitor customer locations and field-service activity."
      />

      {/* Search Toolbar */}

      <ManagerSitesToolbar
        search={search}
        onSearchChange={setSearch}
      />

      {/* Sites List */}

      <div className="rounded-xl border bg-card shadow-sm">

        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">
            Customer Sites
          </h2>

          <p className="text-sm text-muted-foreground">
            {filteredSites.length}{" "}
            {filteredSites.length === 1
              ? "location"
              : "locations"}
          </p>
        </div>

        <ManagerSitesList
          sites={filteredSites}
          onView={handleSelectSite}
        />

      </div>

      {/* Map */}

      <div className="rounded-xl border bg-card shadow-sm">

        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">
            Site Locations
          </h2>

          <p className="text-sm text-muted-foreground">
            Geographic overview of customer locations
          </p>
        </div>

        <div className="p-4">

          <ManagerSitesMap
            sites={filteredSites}
            selectedSite={selectedSite}
            onView={handleSelectSite}
          />

        </div>

      </div>

      {/* Site Details Drawer */}

      <ManagerSiteDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        site={selectedSite}
      />

    </div>
  );
}