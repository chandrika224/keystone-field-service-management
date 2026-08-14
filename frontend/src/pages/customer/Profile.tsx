import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import ProfileCard from "@/components/dashboard/customer/Profile/ProfileCard";
import { authService } from "@/services/authService";
import AccountSummaryCard from "@/components/dashboard/customer/Profile/AccountSummaryCard";
import { customerProfile } from "@/data/customer/profile";
import { useEffect, useState } from "react";
import EditProfileDialog from "@/components/dashboard/customer/Profile/EditProfileDialog";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {

  const { user } = useAuth();

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    joined: customerProfile.joined,
  });

  useEffect(() => {
    if (user) {
      setProfile({
        id: `CUST-${user.id}`,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        address: user.address,
        joined: customerProfile.joined,
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="p-6">
        Loading profile...
      </div>
    );
  }

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
  onSave={async (updatedProfile) => {

    try {
      const nameParts = updatedProfile.name.trim().split(" ");

      const firstName = nameParts[0];

      const lastName = nameParts.slice(1).join(" ");

      const updatedUser =
        await authService.updateProfile({
          firstName,
          lastName,
          phone: updatedProfile.phone,
          address: updatedProfile.address,
        });

      setProfile({
        ...updatedProfile,
        id: `CUST-${updatedUser.id}`,
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
      });

      setEditDialogOpen(false);

    } catch (error) {
      console.error(
        "Profile update failed:",
        error
      );
    }
  }}
/>

    </div>
  );
}