import { useEffect, useState } from "react";

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
  siteService,
  type Site,
} from "@/services/siteService";

export default function ManagerSites() {
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

  /*
   * =========================
   * LOAD ALL SITES
   * =========================
   */
  useEffect(() => {
    const loadSites = async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await siteService.getAllSites();

        console.log(
          "Manager sites loaded:",
          data
        );

        setSites(data);

      } catch (error) {
        console.error(
          "Failed to load sites:",
          error
        );

        setError(
          "Failed to load sites. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSites();
  }, []);

  /*
   * =========================
   * SELECT SITE
   * =========================
   */
  const handleSelectSite = (site: Site) => {
    console.log(
      "Manager selected site:",
      site
    );

    setSelectedSite(site);
    setDrawerOpen(true);
  };

  /*
   * =========================
   * SEARCH
   * =========================
   */
  const searchValue =
    search.toLowerCase().trim();

  const filteredSites = sites.filter((site) => {

    const siteName =
      site.name?.toLowerCase() ?? "";

    const customerName =
      site.customerName?.toLowerCase() ?? "";

    const address =
      site.address?.toLowerCase() ?? "";

    return (
      siteName.includes(searchValue) ||
      customerName.includes(searchValue) ||
      address.includes(searchValue)
    );
  });

  console.log(
    "Filtered sites:",
    filteredSites
  );

  return (
    <div className="space-y-6">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <SectionHeader
        title="Sites"
        subtitle="Monitor customer locations and field-service activity."
      />

      {/* =========================
          SEARCH
      ========================== */}

      <ManagerSitesToolbar
        search={search}
        onSearchChange={setSearch}
      />

      {/* =========================
          CUSTOMER SITES
      ========================== */}

      <div className="rounded-xl border bg-card shadow-sm">

        <div className="border-b p-5">

          <h2 className="text-lg font-semibold">
            Customer Sites
          </h2>

          <p className="text-sm text-muted-foreground">
            {loading
              ? "Loading sites..."
              : `${filteredSites.length} ${
                  filteredSites.length === 1
                    ? "location"
                    : "locations"
                }`}
          </p>

        </div>

        {/* Loading */}

        {loading && (
          <div className="p-8 text-center text-muted-foreground">
            Loading customer sites...
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="p-8 text-center text-destructive">
            {error}
          </div>
        )}

        {/* Empty */}

        {!loading &&
          !error &&
          filteredSites.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No sites found.
            </div>
          )}

        {/* Sites */}

        {!loading &&
          !error &&
          filteredSites.length > 0 && (
            <ManagerSitesList
              sites={filteredSites}
              onView={handleSelectSite}
            />
          )}

      </div>

      {/* =========================
          MAP
      ========================== */}

      {!loading && !error && (
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
      )}

      {/* =========================
          SITE DETAILS
      ========================== */}

      <ManagerSiteDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        site={selectedSite}
      />

    </div>
  );
}