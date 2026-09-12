import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";

import EmptySites from "@/components/dashboard/customer/sites/EmptySites";
import MySitesHeader from "@/components/dashboard/customer/sites/MySitesHeader";
import NoSearchResults from "@/components/dashboard/customer/sites/NoSearchResults";
import SiteCardSkeleton from "@/components/dashboard/customer/sites/SiteCardSkeleton";
import SiteFormDialog from "@/components/dashboard/customer/sites/SiteFormDialog";
import SiteGrid from "@/components/dashboard/customer/sites/SiteGrid";
import SiteSearch from "@/components/dashboard/customer/sites/SiteSearch";
import SiteStats from "@/components/dashboard/customer/sites/SiteStats";

import { siteService } from "@/services/siteService";

import type { Site, SiteRequest } from "@/types/site";
import SiteDetailsDrawer from "@/components/dashboard/customer/sites/SiteDetailsDrawer";

export default function MySites() {
  const { user } = useAuth();

  console.log("MySites authenticated user:", user);
  console.log("MySites customer ID:", user?.customerId);

  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [isCreateDialogOpen, setIsCreateDialogOpen] =
    useState(false);

  const [sites, setSites] = useState<Site[]>([]);

  // ==========================================================
  // LOAD CUSTOMER SITES
  // ==========================================================
  
  useEffect(() => {
    if (!user?.customerId) {
      setSites([]);
      setIsLoading(false);
      return;
    }

    const loadSites = async () => {
  setIsLoading(true);

  console.log("Calling getSitesByCustomerId with:", user.customerId);

  try {
    const customerSites =
      await siteService.getSitesByCustomerId(
        user.customerId!
      );

    console.log("API response from getSitesByCustomerId:", customerSites);

    setSites(customerSites);
  } catch (error) {
    console.error("Failed to load customer sites:", error);
  } finally {
    setIsLoading(false);
  }
};

    loadSites();
  }, [user?.customerId]);

  // ==========================================================
  // SEARCH
  // ==========================================================

  const filteredSites = sites.filter((site) => {
    const query = searchQuery
      .toLowerCase()
      .trim();

    return (
      site.name
        .toLowerCase()
        .includes(query) ||
      site.address
        .toLowerCase()
        .includes(query)
    );
  });

  // ==========================================================
  // STATISTICS
  // ==========================================================

  const totalSites = sites.length;

  // Backend currently does not have
  // an "active" field.
  const activeSites = sites.length;

  const openWorkOrders = sites.reduce(
    (total, site) =>
      total + (site.activeWorkOrders ?? 0),
    0
  );

  // ==========================================================
  // EVENT HANDLERS
  // ==========================================================

  const handleAddSite = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateSite = async (
    request: SiteRequest
  ) => {
    if (!user?.customerId) {
      throw new Error(
        "Customer information is not available."
      );
    }

    try {
      setIsLoading(true);

      await siteService.createSite({
        ...request,
        customerId: user.customerId,
      });

      // Reload sites from backend
      const customerSites =
        await siteService.getSitesByCustomerId(
          user.customerId
        );

      setSites(customerSites);

      setIsCreateDialogOpen(false);

      console.log(
        "Site created successfully."
      );
    } catch (error) {
      console.error(
        "Failed to create site:",
        error
      );

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewSite = async (site: Site) => {
  try {
    const siteDetails =
      await siteService.getSiteById(site.id);

    setSelectedSite(siteDetails);
    setIsDetailsOpen(true);
  } catch (error) {
    console.error(
      "Failed to load site details:",
      error
    );
  }
};

  const [editingSite, setEditingSite] =
    useState<Site | null>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] =
    useState(false);

  const handleEditSite = (site: Site) => {
  setEditingSite(site);
  setIsDetailsOpen(false);
  setIsEditDialogOpen(true);
  };

  const handleUpdateSite = async (
  request: SiteRequest
) => {
  if (!user?.customerId) {
    throw new Error(
      "Customer information is not available."
    );
  }

  if (!editingSite) {
    throw new Error(
      "No site selected for editing."
    );
  }

  try {
    setIsLoading(true);

    await siteService.updateSite(
      editingSite.id,
      {
        ...request,
        customerId: user.customerId,
      }
    );

    const customerSites =
      await siteService.getSitesByCustomerId(
        user.customerId
      );

    setSites(customerSites);

    setEditingSite(null);
    setIsEditDialogOpen(false);

    console.log(
      "Site updated successfully."
    );
  } catch (error) {
    console.error(
      "Failed to update site:",
      error
    );

    throw error;
  } finally {
    setIsLoading(false);
  }
  };

  const handleDeleteSite = async (site: Site) => {
  try {
    await siteService.deleteSite(site.id);

    if (!user?.customerId) {
      return;
    }

    const customerSites =
      await siteService.getSitesByCustomerId(user.customerId);

    setSites(customerSites);
  } catch (error) {
    console.error("Failed to delete site:", error);
  }
  };

  const handleViewWorkOrders = (site: Site) => {
    console.log(
      "View work orders:",
      site
    );
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <MySitesHeader
        onAddSite={handleAddSite}
      />

      {/* Statistics */}
      <SiteStats
        totalSites={totalSites}
        activeSites={activeSites}
        openWorkOrders={openWorkOrders}
      />

      {/* Search */}
      <SiteSearch
        value={searchQuery}
        onChange={setSearchQuery}
      />

      {/* Site Content */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map(
            (_, index) => (
              <SiteCardSkeleton
                key={index}
              />
            )
          )}
        </div>
      ) : sites.length === 0 ? (
        <EmptySites
          onAddSite={handleAddSite}
        />
      ) : filteredSites.length === 0 ? (
        <NoSearchResults
          searchQuery={searchQuery}
          onClearSearch={() =>
            setSearchQuery("")
          }
        />
      ) : (
        <SiteGrid
          sites={filteredSites}
          onView={handleViewSite}
          onEdit={handleEditSite}
          onDelete={handleDeleteSite}
          onViewWorkOrders={
            handleViewWorkOrders
          }
        />
      )}

      {/* Create Site Dialog */}
      <SiteFormDialog
        open={isCreateDialogOpen}
        onOpenChange={
          setIsCreateDialogOpen
        }
        onSubmit={handleCreateSite}
      />
      <SiteFormDialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);

          if (!open) {
            setEditingSite(null);
          }
        }}
        site={editingSite}
        onSubmit={handleUpdateSite}
      />
      <SiteDetailsDrawer
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        site={selectedSite}
        onEdit={handleEditSite}
        onViewWorkOrders={handleViewWorkOrders}
      />
    </div>
  );
}