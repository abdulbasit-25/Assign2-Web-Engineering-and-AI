import { useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage.js";
import { ThemeContext } from "./themeContext.js";

const THEME_KEY = "inventory-dashboard-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = readStorage(THEME_KEY, "light");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStorage(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light");
  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
