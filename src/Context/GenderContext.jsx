import { createContext, useContext, useState } from "react";

export const GenderContext=createContext();

export const useGenderContext =()=>{
    return useContext(GenderContext)
}

export const GenderContextProvider=({children})=>{
    const [Gender,setGender]=useState(JSON.parse(localStorage.getItem("Gender"))||"Boys")

    return <GenderContext.Provider value={{Gender,setGender}}>
        
        {children}
        
        </GenderContext.Provider>
}