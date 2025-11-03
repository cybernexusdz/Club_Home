import { createContext, useContext, useState } from "react";

export const ThemeContext=createContext();

export const useThemeContext =()=>{
    return useContext(ThemeContext)
}

export const ThemeContextProvider=({children})=>{
    const [Theme,setTheme]=useState(JSON.parse(localStorage.getItem("Theme"))||"dark")

    return <ThemeContext.Provider value={{Theme,setTheme}}>
        
        {children}
        
        </ThemeContext.Provider>
}