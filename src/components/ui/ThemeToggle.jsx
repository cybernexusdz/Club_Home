import { useEffect } from "react";
import { Sun, Moon, Heart, Star, Terminal } from "lucide-react";

const themes = [
  {
    name: "boyLight",
    robot: "boy",
    label: "Boy • Light",
    icon: <Sun className="w-5 h-5" />,
    color: "text-blue-500",
  },
  {
    name: "boyDark",
    robot: "boy",
    label: "Boy • Dark",
    icon: <Moon className="w-5 h-5" />,
    color: "text-cyan-400",
  },
  {
    name: "girlLight",
    robot: "girl",
    label: "Girl • Light",
    icon: <Heart className="w-5 h-5" />,
    color: "text-pink-500",
  },
  {
    name: "girlDark",
    robot: "girl",
    label: "Girl • Dark",
    icon: <Star className="w-5 h-5" />,
    color: "text-fuchsia-400",
  },
];

export default function ThemeToggle({ theme, setTheme }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const current = themes.find((t) => t.name === theme) || themes[0];

  return (
    <div className="dropdown dropdown-end">
      {/* Cyber Button */}
      <div
        tabIndex={0}
        role="button"
        className="relative btn btn-square bg-transparent border-2 border-primary/30 hover:border-primary/60 
          transition-all duration-300 group overflow-hidden"
      >
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Scanline effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-scan" />
        </div>

        {/* Icon with color */}
        <div
          className={`relative z-10 ${current.color} transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_currentColor]`}
        >
          {current.icon}
        </div>
      </div>

      {/* Cyber Dropdown Menu */}
      <ul
        tabIndex={0}
        className="dropdown-content z-[9999] menu p-3 shadow-2xl bg-gradient-to-br from-base-200/98 to-base-100/98 
          backdrop-blur-xl rounded-xl w-56 border-2 border-primary/40 mt-2 relative overflow-hidden"
      >
        {/* Corner brackets for menu */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/60 pointer-events-none" />

        {/* Cyber grid background */}
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />

        {/* Terminal header */}
        <div className="flex items-center gap-2 px-2 py-2 mb-2 border-b border-primary/30">
          <Terminal size={14} className="text-primary animate-pulse-fast" />
          <span className="text-xs font-mono text-primary font-bold tracking-wider">
            THEME_SELECT
          </span>
        </div>

        {/* Theme options */}
        {themes.map((t, index) => (
          <li key={t.name} className="mb-1">
            <button
              onClick={() => {
                setTheme(t.name);
                localStorage.setItem("robot", t.robot);
              }}
              className={`relative flex items-center gap-3 rounded-lg font-mono transition-all duration-300
                border-2 overflow-hidden group/item
                ${
                  theme === t.name
                    ? "bg-gradient-to-r from-primary to-secondary text-white border-primary shadow-lg"
                    : "border-primary/20 hover:border-primary/50 hover:bg-base-300/50"
                }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Corner accents for active item */}
              {theme === t.name && (
                <>
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white animate-pulse-fast" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white animate-pulse-fast" />
                </>
              )}

              {/* Shimmer effect on hover */}
              {theme !== t.name && (
                <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
                </div>
              )}

              {/* Icon with glow */}
              <div
                className={`relative z-10 ${theme === t.name ? "text-white" : t.color} 
                transition-all duration-300 group-hover/item:scale-110 
                ${theme === t.name ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "group-hover/item:drop-shadow-[0_0_8px_currentColor]"}`}
              >
                {t.icon}
              </div>

              {/* Label */}
              <span className="relative z-10 flex-1 text-sm tracking-wide">
                {t.label}
              </span>

              {/* Active indicator */}
              {theme === t.name && (
                <span className="relative z-10 w-2 h-2 bg-white rounded-full animate-pulse-fast shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}
            </button>
          </li>
        ))}

        {/* Footer decoration */}
        <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-primary/20">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-fast" />
          <span className="text-[10px] font-mono text-base-content/50 tracking-widest">
            SYSTEM_MODE
          </span>
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-fast" />
        </div>
      </ul>
    </div>
  );
}
