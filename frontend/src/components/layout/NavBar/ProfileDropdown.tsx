import {
  User,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";

export default function ProfileDropdown() {
  return (
    <div
      className="
        w-64
        overflow-hidden
        rounded-xl
        border
        bg-white
        shadow-xl
      "
    >
      {/* User Info */}
      <div className="border-b p-4">

        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
          JD
        </div>

        <h3 className="font-semibold text-slate-800">
          John Doe
        </h3>

        <p className="text-sm text-slate-500">
          john.doe@keystone.com
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
          Manager
        </span>

      </div>

      {/* Menu */}

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
          hover:bg-slate-50
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
          hover:bg-slate-50
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
          hover:bg-slate-50
        "
      >
        <HelpCircle size={18} />
        Help
      </button>

      <div className="border-t" />

      <button
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