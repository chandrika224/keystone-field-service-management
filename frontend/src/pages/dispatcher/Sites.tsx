import { useEffect, useState } from "react";
import { toast } from "sonner";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import DispatcherSitesToolbar
  from "@/components/dashboard/dispatcher/Sites/DispatcherSitesToolbar";

import DispatcherSitesTable
  from "@/components/dashboard/dispatcher/Sites/DispatcherSitesTable";

import DispatcherSiteDetailsDrawer
  from "@/components/dashboard/dispatcher/Sites/DispatcherSiteDetailsDrawer";

import { siteService } from "@/services/siteService";
import type { Site } from "@/types/site";


export default function DispatcherSites() {
  const [search, setSearch] = useState("");

  const [sites, setSites] = useState<Site[]>([]);

  const [selectedSite, setSelectedSite] =
    useState<Site | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await siteService.getAllSites();

        setSites(data);
      } catch (error) {
        console.error("Failed to load sites:", error);

        setError("Failed to load sites.");
        toast.error("Failed to load sites.");
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  const handleViewSite = async (site: Site) => {
    try {
      const data = await siteService.getSiteById(site.id);

      setSelectedSite(data);
      setDrawerOpen(true);
    } catch (error) {
      console.error("Failed to load site details:", error);

      toast.error("Failed to load site details.");
    }
  };

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

      {loading ? (
        <div className="py-10 text-center text-muted-foreground">
          Loading sites...
        </div>
      ) : error ? (
        <div className="py-10 text-center text-destructive">
          {error}
        </div>
      ) : (
        <DispatcherSitesTable
          sites={sites}
          search={search}
          onView={handleViewSite}
        />
      )}

      <DispatcherSiteDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        site={selectedSite}
      />

    </div>
  );
}