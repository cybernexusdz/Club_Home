import { createContext, useContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    JSON.parse(localStorage.getItem("language")) || "en",
  );

  // ✅ Sync with localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
