import { useMemo, useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import ManagerInventoryStats
  from "@/components/dashboard/manager/Inventory/ManagerInventoryStats";

import ManagerInventoryToolbar
  from "@/components/dashboard/manager/Inventory/ManagerInventoryToolbar";

import ManagerInventoryList
  from "@/components/dashboard/manager/Inventory/ManagerInventoryList";

import ManagerInventoryDetailsDrawer
  from "@/components/dashboard/manager/Inventory/ManagerInventoryDetailsDrawer";

import {
  managerInventory,
  getInventoryStatus,
  type ManagerInventoryItem,
} from "@/data/manager/inventory";

export default function ManagerInventory() {
  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [status, setStatus] = useState("All");

  const [selectedItem, setSelectedItem] =
    useState<ManagerInventoryItem | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  // --------------------------------------------------
  // Categories
  // --------------------------------------------------

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        managerInventory.map(
          (item) => item.category
        )
      )
    );
  }, []);

  // --------------------------------------------------
  // Statuses
  // --------------------------------------------------

  const statuses = [
    "In Stock",
    "Low Stock",
    "Out of Stock",
  ];

  // --------------------------------------------------
  // Filter inventory
  // --------------------------------------------------

  const filteredInventory = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return managerInventory.filter((item) => {
      const matchesSearch =
        searchValue === "" ||
        item.name
          .toLowerCase()
          .includes(searchValue) ||
        item.sku
          .toLowerCase()
          .includes(searchValue) ||
        item.category
          .toLowerCase()
          .includes(searchValue) ||
        item.location
          .toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        category === "All" ||
        item.category === category;

      const itemStatus =
        getInventoryStatus(item);

      const matchesStatus =
        status === "All" ||
        itemStatus === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [search, category, status]);

  // --------------------------------------------------
  // View inventory item
  // --------------------------------------------------

  const handleViewItem = (
    item: ManagerInventoryItem
  ) => {
    console.log(
      "Manager viewed inventory item:",
      item
    );

    setSelectedItem(item);
    setDrawerOpen(true);
  };

  // --------------------------------------------------
  // Clear filters
  // --------------------------------------------------

  const handleClearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="space-y-6">

      {/* Page Header */}

      <SectionHeader
        title="Inventory"
        subtitle="Monitor parts, stock levels and inventory availability."
      />

      {/* Statistics */}

      <ManagerInventoryStats
        inventory={managerInventory}
      />

      {/* Toolbar */}

      <ManagerInventoryToolbar
        search={search}
        category={category}
        status={status}
        categories={categories}
        statuses={statuses}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
        onClearFilters={handleClearFilters}
      />

      {/* Inventory List */}

      <ManagerInventoryList
        inventory={filteredInventory}
        onView={handleViewItem}
      />

      {/* Details Drawer */}

      <ManagerInventoryDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        item={selectedItem}
      />

    </div>
  );
}