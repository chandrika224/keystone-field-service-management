import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import Dropdown, { DropdownContent, DropdownTrigger } from "@/common/Dropdown";

export default function NotificationBell() {
  return (
    <Dropdown>

      <DropdownTrigger>

        <div className="relative rounded-lg p-2 transition-colors hover:bg-slate-100">

          <Bell size={22} />

          {/* Notification Badge */}

          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />

        </div>

      </DropdownTrigger>

      <DropdownContent>

        <NotificationDropdown  />

      </DropdownContent>

    </Dropdown>
  );
}