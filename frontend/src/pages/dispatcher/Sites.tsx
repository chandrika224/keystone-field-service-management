import { useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import { dispatcherSites } from "@/data/dispatcher/sites";
import DispatcherSitesToolbar
  from "@/components/dashboard/dispatcher/Sites/DispatcherSitesToolbar";
import DispatcherSitesTable
  from "@/components/dashboard/dispatcher/Sites/DispatcherSitesTable";
import type { DispatcherSite } from "@/data/dispatcher/sites";

import DispatcherSiteDetailsDrawer
  from "@/components/dashboard/dispatcher/Sites/DispatcherSiteDetailsDrawer";

export default function DispatcherSites() {
  const [search, setSearch] = useState("");
  const [selectedSite, setSelectedSite] =
  useState<DispatcherSite | null>(null);

  const [drawerOpen, setDrawerOpen] =
  useState(false);

  const filteredSites = dispatcherSites.filter((site) => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return true;
    }

    return (
      site.name.toLowerCase().includes(value) ||
      site.customer.toLowerCase().includes(value) ||
      site.city.toLowerCase().includes(value) ||
      site.state.toLowerCase().includes(value)
    );
  });

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Sites"
        subtitle="Manage customer service locations."
      />

      <DispatcherSitesToolbar
        search={search}
        onSearchChange={setSearch}
      />

      <DispatcherSitesTable
        sites={dispatcherSites}
        search={search}
        onView={(site) => {
          console.log("Site View clicked:", site);

          setSelectedSite(site);
          setDrawerOpen(true);
        }}
      />

      <DispatcherSiteDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        site={selectedSite}
      />
      </div>
  );
}