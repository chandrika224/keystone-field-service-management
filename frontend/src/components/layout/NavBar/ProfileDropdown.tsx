import {
  User,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

export default function ProfileDropdown() {
  const { user, logout } = useAuth();

  const fullName = user
    ? `${user.firstName} ${user.lastName}`
    : "User";

  const initials = user
    ? `${user.firstName?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`
    : "U";

  return (
    <div
      className="
        w-64
        overflow-hidden
        rounded-xl
        border
        bg-card
        shadow-xl
      "
    >
      <div className="border-b p-4">

        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
          {initials}
        </div>

        <h3 className="font-semibold text-slate-800">
          {fullName}
        </h3>

        <p className="text-sm text-muted-foreground">
          {user?.email}
        </p>

        <span
          className="
            mt-3
            inline-flex
            rounded-full
            bg-blue-100
            px-3
            py-1
            text-xs
            font-medium
            text-blue-700
          "
        >
          {user?.role}
        </span>

      </div>

      <button
        className="
          flex
          w-full
          items-center
          gap-3
          px-4
          py-3
          text-left
          transition-colors
          hover:bg-background
        "
      >
        <User size={18} />
        My Profile
      </button>

      <button
        className="
          flex
          w-full
          items-center
          gap-3
          px-4
          py-3
          text-left
          transition-colors
          hover:bg-background
        "
      >
        <Settings size={18} />
        Settings
      </button>

      <button
        className="
          flex
          w-full
          items-center
          gap-3
          px-4
          py-3
          text-left
          transition-colors
          hover:bg-background
        "
      >
        <HelpCircle size={18} />
        Help
      </button>

      <div className="border-t" />

      <button
        onClick={logout}
        className="
          flex
          w-full
          items-center
          gap-3
          px-4
          py-3
          text-left
          text-red-600
          transition-colors
          hover:bg-red-50
        "
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
}