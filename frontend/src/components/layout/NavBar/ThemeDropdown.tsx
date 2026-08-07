
import { useTheme } from "@/contexts/ThemeContext";
import {
  Moon,
  Sun,
  Monitor,
} from "lucide-react";


export default function ThemeDropdown() {
  const {
    theme,
    changeTheme,
  } = useTheme();

  const options = [
    {
      label: "Light",
      value: "light",
      icon: Sun,
    },
    {
      label: "Dark",
      value: "dark",
      icon: Moon,
    },
    {
      label: "System",
      value: "system",
      icon: Monitor,
    },
  ] as const;

  return (
    <div className="w-52 rounded-xl border bg-card shadow-xl dark:bg-slate-900">

      <div className="border-b px-4 py-3">
        <h3 className="font-semibold">
          Theme
        </h3>
      </div>

      {options.map((option) => {

        const Icon = option.icon;

        return (
          <button
            key={option.value}
            onClick={() => changeTheme(option.value)}
            className={`
              flex
              w-full
              items-center
              gap-3
              px-4
              py-3
              text-left
              transition-colors

              ${
                theme === option.value
                  ? "bg-blue-50 text-blue-600 dark:bg-slate-800"
                  : "hover:bg-background dark:hover:bg-slate-800"
              }
            `}
          >
            <Icon size={18} />

            {option.label}
          </button>
        );

      })}
    </div>
  );
}