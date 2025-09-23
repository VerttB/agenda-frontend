import { createContext, useContext, useEffect, useState } from "react";

type Theme = "blue" | "green";
type ThemeContextType = { theme: Theme; toggle: () => void; set: (t: Theme) => void };

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const s = localStorage.getItem("theme");
      return s === "blue" ? "blue" : "green";
    } catch {
      return "green";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    try {
      root.setAttribute("data-theme", theme);
    } catch {}
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme(t => (t === "blue" ? "green" : "blue"));
  return <ThemeContext.Provider value={{ theme, toggle, set: setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}