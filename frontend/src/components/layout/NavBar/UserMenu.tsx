import { UserCircle2 } from "lucide-react";

import ProfileDropdown from "./ProfileDropdown";
import Dropdown, {
  DropdownContent,
  DropdownTrigger,
} from "@/common/Dropdown";

import { useAuth } from "@/contexts/AuthContext";

export default function UserMenu() {
  const { user } = useAuth();

  const fullName = user
    ? `${user.firstName} ${user.lastName}`
    : "User";

  return (
    <Dropdown>

      <DropdownTrigger>
        <div
          className="
            flex
            items-center
            gap-2
            rounded-lg
            p-2
            transition-colors
            hover:bg-muted
          "
        >

          <UserCircle2 size={28} />

          <div className="text-left">

            <p className="text-sm font-medium">
              {fullName}
            </p>

            <p className="text-xs text-muted-foreground">
              {user?.role}
            </p>

          </div>

        </div>
      </DropdownTrigger>

      <DropdownContent>
        <ProfileDropdown />
      </DropdownContent>

    </Dropdown>
  );
}