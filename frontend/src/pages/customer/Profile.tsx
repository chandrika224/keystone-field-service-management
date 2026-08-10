import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import ProfileCard from "@/components/dashboard/customer/Profile/ProfileCard";
import AccountSummaryCard from "@/components/dashboard/customer/Profile/AccountSummaryCard";
import { customerProfile } from "@/data/customer/profile";
import { useState } from "react";
import EditProfileDialog from "@/components/dashboard/customer/Profile/EditProfileDialog";

export default function Profile() {

  const [profile, setProfile] = useState(customerProfile);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <div className="space-y-6">

      <SectionHeader
        title="My Profile"
        subtitle="Manage your personal information."
      />

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-1">
          <ProfileCard
            profile={profile}
            onEdit={() => setEditDialogOpen(true)}
          />
        </div>

        <div className="lg:col-span-2">
          <AccountSummaryCard />
        </div>

      </div>

      <EditProfileDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        profile={profile}
        onSave={(updatedProfile) => {
          setProfile(updatedProfile);
        }}
      />

    </div>
  );
}