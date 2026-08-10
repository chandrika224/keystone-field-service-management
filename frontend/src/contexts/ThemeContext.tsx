import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (
      (localStorage.getItem("theme") as Theme) ??
      "system"
    );
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function applyTheme(selectedTheme: Theme) {
    const html = document.documentElement;

    html.classList.remove("dark");

    if (selectedTheme === "dark") {
      html.classList.add("dark");
    }

    if (selectedTheme === "system") {
      const dark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (dark) {
        html.classList.add("dark");
      }
    }

    localStorage.setItem("theme", selectedTheme);
  }

  function changeTheme(theme: Theme) {
    setTheme(theme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}