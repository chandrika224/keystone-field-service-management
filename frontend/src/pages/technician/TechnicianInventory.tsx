import { useMemo, useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import TechnicianInventoryStats from "@/components/dashboard/technician/Inventory/TechnicianInventoryStats";

import TechnicianInventoryList from "@/components/dashboard/technician/Inventory/TechnicianInventoryList";

import TechnicianInventoryDetailsDrawer from "@/components/dashboard/technician/Inventory/TechnicianInventoryDetailsDrawer";

import TechnicianUseMaterialDrawer from "@/components/dashboard/technician/Inventory/TechnicianUseMaterialDrawer";

import {
  technicianInventory,
  type TechnicianInventoryItem,
  type TechnicianInventoryStatus,
} from "@/data/technician/inventory";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import { toast } from "sonner";

export default function TechnicianInventory() {
  /* --------------------------------------------------
     INVENTORY STATE
  -------------------------------------------------- */

  const [inventory, setInventory] =
    useState<TechnicianInventoryItem[]>(
      technicianInventory
    );

  /* --------------------------------------------------
     SEARCH & FILTER
  -------------------------------------------------- */

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<"All" | TechnicianInventoryStatus>(
      "All"
    );

  /* --------------------------------------------------
     DETAILS DRAWER
  -------------------------------------------------- */

  const [selectedItem, setSelectedItem] =
    useState<TechnicianInventoryItem | null>(
      null
    );

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  /* --------------------------------------------------
     USE MATERIAL DRAWER
  -------------------------------------------------- */

  const [useMaterialOpen, setUseMaterialOpen] =
    useState(false);

  /* --------------------------------------------------
     USE MATERIAL
  -------------------------------------------------- */

  const handleUseMaterial = (
    itemId: string,
    quantityUsed: number,
    workOrderId: string
  ) => {
    setInventory((currentInventory) =>
      currentInventory.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        const newQuantity =
          item.quantity - quantityUsed;

        const newStatus: TechnicianInventoryStatus =
          newQuantity <= 0
            ? "Out of Stock"
            : newQuantity <=
              item.minimumQuantity
            ? "Low Stock"
            : "Available";

        return {
          ...item,
          quantity: newQuantity,
          status: newStatus,
        };
      })
    );

    toast.success(
      "Material usage recorded",
      {
        description: `${quantityUsed} item(s) recorded for ${workOrderId}.`,
      }
    );
  };

  /* --------------------------------------------------
     FILTER INVENTORY
  -------------------------------------------------- */

  const filteredInventory = useMemo(() => {
    const searchValue =
      search.toLowerCase().trim();

    return inventory.filter((item) => {
      const matchesSearch =
        item.itemName
          .toLowerCase()
          .includes(searchValue) ||
        item.partNumber
          .toLowerCase()
          .includes(searchValue) ||
        item.category
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "All" ||
        item.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [inventory, search, status]);

  /* --------------------------------------------------
     VIEW ITEM
  -------------------------------------------------- */

  const handleViewItem = (
    item: TechnicianInventoryItem
  ) => {
    setSelectedItem(item);
    setDetailsOpen(true);
  };

  /* --------------------------------------------------
     CLEAR FILTERS
  -------------------------------------------------- */

  const handleClearFilters = () => {
    setSearch("");
    setStatus("All");
  };

  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */

  return (
    <div className="space-y-6">

      {/* ------------------------------------------------
          HEADER
      ------------------------------------------------ */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <SectionHeader
          title="Inventory"
          subtitle="View materials, parts and equipment available for your field work."
        />

        <Button
          type="button"
          onClick={() =>
            setUseMaterialOpen(true)
          }
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Use Material
        </Button>

      </div>

      {/* ------------------------------------------------
          INVENTORY STATS
      ------------------------------------------------ */}

      <TechnicianInventoryStats
        items={inventory}
      />

      {/* ------------------------------------------------
          SEARCH & FILTERS
      ------------------------------------------------ */}

      <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row">

        <input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search inventory..."
          className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value as
                | "All"
                | TechnicianInventoryStatus
            )
          }
          className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="All">
            All Status
          </option>

          <option value="Available">
            Available
          </option>

          <option value="Low Stock">
            Low Stock
          </option>

          <option value="Out of Stock">
            Out of Stock
          </option>
        </select>

        {(search || status !== "All") && (
          <Button
            type="button"
            variant="outline"
            onClick={handleClearFilters}
          >
            Clear
          </Button>
        )}

      </div>

      {/* ------------------------------------------------
          INVENTORY LIST
      ------------------------------------------------ */}

      <TechnicianInventoryList
        items={filteredInventory}
        onView={handleViewItem}
      />

      {/* ------------------------------------------------
          INVENTORY DETAILS
      ------------------------------------------------ */}

      <TechnicianInventoryDetailsDrawer
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        item={selectedItem}
      />

      {/* ------------------------------------------------
          USE MATERIAL DRAWER
      ------------------------------------------------ */}

      <TechnicianUseMaterialDrawer
        open={useMaterialOpen}
        onOpenChange={setUseMaterialOpen}
        items={inventory}
        onUseMaterial={handleUseMaterial}
      />

    </div>
  );
}