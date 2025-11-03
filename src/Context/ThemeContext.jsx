import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [Theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("Theme")) || "dark"
  );

  // ✅ Sync with localStorage whenever Theme changes
  useEffect(() => {
    localStorage.setItem("Theme", JSON.stringify(Theme));
  }, [Theme]);

  return (
    <ThemeContext.Provider value={{ Theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
