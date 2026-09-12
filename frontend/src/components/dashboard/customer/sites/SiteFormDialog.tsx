import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { Site, SiteRequest } from "@/types/site";

interface SiteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (site: SiteRequest) => Promise<void>;
  site?: Site | null;
}

export default function SiteFormDialog({
  open,
  onOpenChange,
  onSubmit,
  site,
}: SiteFormDialogProps) {
  const isEditMode = Boolean(site);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");

  // ==========================================================
  // LOAD FORM DATA
  // ==========================================================

  useEffect(() => {
    if (open && site) {
      setName(site.name);
      setAddress(site.address);
    } else if (open && !site) {
      setName("");
      setAddress("");
    }

    setError("");
    setNameError("");
    setAddressError("");
  }, [open, site]);

  // ==========================================================
  // RESET
  // ==========================================================

  const resetForm = () => {
    setName("");
    setAddress("");
    setError("");
    setNameError("");
    setAddressError("");
  };

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    resetForm();
    onOpenChange(false);
  };

  // ==========================================================
  // VALIDATION
  // ==========================================================

  const validateForm = () => {
    let isValid = true;

    setNameError("");
    setAddressError("");
    setError("");

    if (!name.trim()) {
      setNameError("Site name is required");
      isValid = false;
    } else if (name.trim().length < 2) {
      setNameError(
        "Site name must be at least 2 characters"
      );
      isValid = false;
    }

    if (!address.trim()) {
      setAddressError("Site address is required");
      isValid = false;
    } else if (address.trim().length < 5) {
      setAddressError(
        "Site address must be at least 5 characters"
      );
      isValid = false;
    }

    return isValid;
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const siteData: SiteRequest = {
        name: name.trim(),
        address: address.trim(),

        // Parent will replace this with
        // the authenticated customer's ID.
        customerId: site?.customerId ?? 0,
      };

      // IMPORTANT:
      // Call this only ONCE.
      await onSubmit(siteData);

      resetForm();
      onOpenChange(false);
    } catch (err) {
      console.error(
        isEditMode
          ? "Failed to update site:"
          : "Failed to create site:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : isEditMode
            ? "Failed to update site. Please try again."
            : "Failed to create site. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
        } else {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode
              ? "Edit Site"
              : "Add New Site"}
          </DialogTitle>

          <DialogDescription>
            {isEditMode
              ? "Update the service location details for this site."
              : "Add a service location to your Keystone account. You can use this site when creating work orders."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Site Name */}
          <div className="space-y-2">
            <Label htmlFor="site-name">
              Site Name
            </Label>

            <Input
              id="site-name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);

                if (nameError) {
                  setNameError("");
                }
              }}
              placeholder="e.g. Main Office"
              disabled={isSubmitting}
            />

            {nameError && (
              <p className="text-sm text-destructive">
                {nameError}
              </p>
            )}
          </div>

          {/* Site Address */}
          <div className="space-y-2">
            <Label htmlFor="site-address">
              Site Address
            </Label>

            <Textarea
              id="site-address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);

                if (addressError) {
                  setAddressError("");
                }
              }}
              placeholder="Enter the complete service location address"
              rows={4}
              disabled={isSubmitting}
            />

            {addressError && (
              <p className="text-sm text-destructive">
                {addressError}
              </p>
            )}
          </div>

          {/* API Error */}
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3">
              <p className="text-sm text-destructive">
                {error}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Site"
                  : "Create Site"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}