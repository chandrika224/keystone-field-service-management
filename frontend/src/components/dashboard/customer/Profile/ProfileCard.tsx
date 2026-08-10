
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, User } from "lucide-react";
import type { CustomerProfile } from "@/types/profile";

interface ProfileCardProps {
  profile: CustomerProfile;
  onEdit: () => void;
}

export default function ProfileCard({
  profile,
  onEdit,
}: ProfileCardProps) {
  return (
    <Card>

      <CardContent className="p-8">

        <div className="flex flex-col items-center gap-4">

          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-2xl">
              {profile.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">

            <h2 className="text-2xl font-bold">
              {profile.name}
            </h2>

            <p className="text-muted-foreground">
              Customer ID: {profile.id}
            </p>

          </div>

          <Button onClick={onEdit}>
            Edit Profile
          </Button>

        </div>

        <div className="mt-8 space-y-5">

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <span>{profile.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <span>{profile.phone}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <span>{profile.address}</span>
          </div>

          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <span>Member Since {profile.joined}</span>
          </div>

        </div>

      </CardContent>

    </Card>
  );
}