import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joined: string;
}

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CustomerProfile;
  onSave: (profile: CustomerProfile) => void;
}

export default function EditProfileDialog({
  open,
  onOpenChange,
  profile,
  onSave,
}: EditProfileDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setName(profile.name);
    setPhone(profile.phone);
    setAddress(profile.address);
  }, [profile]);

  const handleSave = () => {

  if (!name.trim()) {
    toast.error("Full name is required.");
    return;
  }

  if (!phone.trim()) {
    toast.error("Phone number is required.");
    return;
  }

  if (!address.trim()) {
    toast.error("Address is required.");
    return;
  }

  onSave({
    ...profile,
    name,
    phone,
    address,
  });
  toast.success("Profile updated successfully!");
  onOpenChange(false);
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">

        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>

          <DialogDescription>
            Update your personal information.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">

          <div className="space-y-2">
            <Label>Full Name</Label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              value={profile.email}
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>

            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Address</Label>

            <Textarea
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button onClick={handleSave}>
            Save Changes
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}