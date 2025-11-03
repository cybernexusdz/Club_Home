import React, { useState } from "react";
import { Mars, Menu, Moon, Sun, Venus, X } from "lucide-react"; // icons
import { useThemeContext } from "../Context/ThemeContext";
import { useGenderContext } from "../Context/GenderContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {Theme,setTheme}=useThemeContext();
  const{Gender,setGender}=useGenderContext();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleTheme=()=>{
   const th = JSON.parse(localStorage.getItem("Theme"))
    if(th==="light"){
    localStorage.setItem("Theme",JSON.stringify("dark"))
    setTheme("dark") 
    }

    if(th==="dark"){
    localStorage.setItem("Theme",JSON.stringify("light"))
    setTheme('light') 
    }}
  const handleGender=()=>{
   const gender = JSON.parse(localStorage.getItem("Gender"))
    if(gender==="Boys"){
    localStorage.setItem("Gender",JSON.stringify("Girls"))
    setGender("Girls") 
    alert(gender)
    }

    if(gender==="Girls"){
    localStorage.setItem("Gender",JSON.stringify("Boys"))
    setGender('Boys') 
    }
    }
  return (
    <header className="bg-gradient-to-r from-purpleCustom to-blueCustom shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-white cursor-pointer">
          Cyber Nexus
        </div>
        <div>
           <button
            onClick={handleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full transition 
                 bg-gradient-to-r from-purpleCustom to-blueCustom text-white shadow-md hover:scale-105"
            title="Toggle theme"
        >
      {Theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
     <button
            onClick={handleGender}
            className="flex items-center justify-center w-10 h-10 rounded-full transition 
                 bg-gradient-to-r from-purpleCustom to-blueCustom text-white shadow-md hover:scale-105"
            title="Toggle theme"
        >
      {Gender === "Boys" ? <Mars  size={20} /> : <Venus  size={20} />}
    </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <button className="text-white hover:text-blue-600 transition">Home</button>
          <button className="text-white hover:text-blue-600 transition">Team</button>
          <button className="text-white hover:text-blue-600 transition">Events</button>
          <button className="text-white hover:text-blue-600 transition">Blogs</button>
          <button className="text-white hover:text-blue-600 transition">Projects</button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-600 transition"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
          <nav className="flex flex-col items-center space-y-3 py-4">
            <button className="text-gray-700 hover:text-blue-600 transition">Home</button>
            <button className="text-gray-700 hover:text-blue-600 transition">Team</button>
            <button className="text-gray-700 hover:text-blue-600 transition">Events</button>
            <button className="text-gray-700 hover:text-blue-600 transition">Blogs</button>
            <button className="text-gray-700 hover:text-blue-600 transition">Projects</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
