import { useState, useEffect } from "react";

/**
 * Reusable cyber-themed background with all effects
 * @param {boolean} showGrid - Show animated grid (default: true)
 * @param {boolean} showScanlines - Show scanlines effect (default: true)
 * @param {boolean} showOrbs - Show neon orbs (default: true)
 * @param {boolean} showCircuits - Show circuit lines (default: true)
 * @param {boolean} showParticles - Show floating particles (default: true)
 * @param {number} particleCount - Number of particles (default: 15)
 */
export function CyberBackground({
  showGrid = true,
  showScanlines = true,
  showOrbs = true,
  showCircuits = true,
  showParticles = true,
  particleCount = 15,
}) {
  const [scanlinePosition, setScanlinePosition] = useState(0);

  useEffect(() => {
    if (!showScanlines) return;
    const interval = setInterval(() => {
      setScanlinePosition((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 20);
    return () => clearInterval(interval);
  }, [showScanlines]);

  return (
    <>
      {/* Animated cyber grids */}
      {showGrid && (
        <>
          <div className="absolute inset-0 opacity-30 cyber-grid" />
          <div className="absolute inset-0 opacity-20 cyber-grid-diagonal" />
        </>
      )}

      {/* Scanlines effect */}
      {showScanlines && (
        <>
          <div className="absolute inset-0 pointer-events-none scanlines" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent ${scanlinePosition}%, rgba(var(--p), 0.1) ${scanlinePosition + 0.5}%, transparent ${scanlinePosition + 1}%)`,
            }}
          />
        </>
      )}

      {/* Animated circuit lines */}
      {showCircuits && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="circuit-line circuit-line-1" />
          <div className="circuit-line circuit-line-2" />
          <div className="circuit-line circuit-line-3" />
        </div>
      )}

      {/* Neon orbs */}
      {showOrbs && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse neon-glow" />
          <div
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl animate-pulse neon-glow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-info/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
      )}

      {/* Data particles floating */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(particleCount)].map((_, i) => (
            <div
              key={i}
              className="data-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

/**
 * Corner brackets component - reusable for any card
 */
export function CornerBrackets({ size = "md" }) {
  if (size === "sm") {
    return (
      <>
        <div className="corner-bracket absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary opacity-80 group-hover:opacity-100 transition-all duration-300" />
        <div className="corner-bracket absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary opacity-80 group-hover:opacity-100 transition-all duration-300" />
        <div className="corner-bracket absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-secondary opacity-80 group-hover:opacity-100 transition-all duration-300" />
        <div className="corner-bracket absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-secondary opacity-80 group-hover:opacity-100 transition-all duration-300" />
      </>
    );
  }

  if (size === "lg") {
    return (
      <>
        <div className="corner-bracket absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-primary opacity-80 group-hover:opacity-100 transition-all duration-300" />
        <div className="corner-bracket absolute -top-3 -right-3 w-12 h-12 border-t-4 border-r-4 border-primary opacity-80 group-hover:opacity-100 transition-all duration-300" />
        <div className="corner-bracket absolute -bottom-3 -left-3 w-12 h-12 border-b-4 border-l-4 border-secondary opacity-80 group-hover:opacity-100 transition-all duration-300" />
        <div className="corner-bracket absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-secondary opacity-80 group-hover:opacity-100 transition-all duration-300" />
      </>
    );
  }

  // Default: md
  return (
    <>
      <div className="corner-bracket absolute -top-2 -left-2 w-8 h-8 border-t-[3px] border-l-[3px] border-primary opacity-80 group-hover:opacity-100 transition-all duration-300" />
      <div className="corner-bracket absolute -top-2 -right-2 w-8 h-8 border-t-[3px] border-r-[3px] border-primary opacity-80 group-hover:opacity-100 transition-all duration-300" />
      <div className="corner-bracket absolute -bottom-2 -left-2 w-8 h-8 border-b-[3px] border-l-[3px] border-secondary opacity-80 group-hover:opacity-100 transition-all duration-300" />
      <div className="corner-bracket absolute -bottom-2 -right-2 w-8 h-8 border-b-[3px] border-r-[3px] border-secondary opacity-80 group-hover:opacity-100 transition-all duration-300" />
    </>
  );
}

/**
 * Terminal-style badge component
 */
export function TerminalBadge({ icon: Icon, children, className = "" }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-full text-primary text-sm font-bold border-2 border-primary/40 shadow-xl neon-border animate-pulse-slow backdrop-blur-sm ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span className="tracking-widest font-mono">{children}</span>
    </div>
  );
}

/**
 * Data line component - horizontal glowing line
 */
export function DataLine({
  position = "top",
  intensity = "medium",
  className = "",
}) {
  const positions = {
    top: "top-2",
    "top-mid": "top-8",
    "bottom-mid": "bottom-8",
    bottom: "bottom-2",
  };

  const intensities = {
    low: "h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent",
    medium:
      "h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent",
    high: "h-[3px] bg-gradient-to-r from-transparent via-primary/80 to-transparent",
  };

  return (
    <div
      className={`data-line absolute ${positions[position]} left-0 right-0 ${intensities[intensity]} ${className}`}
    />
  );
}

/**
 * Status indicator component
 */
export function StatusIndicator({ label, value, type = "primary" }) {
  const colors = {
    primary: "bg-primary/5 border-primary/20 text-primary/80",
    secondary: "bg-secondary/5 border-secondary/20 text-secondary/80",
    info: "bg-info/5 border-info/20 text-info/80",
    success: "bg-green-500/5 border-green-500/20 text-green-500/80",
  };

  const valueColors = {
    primary: "text-primary",
    secondary: "text-secondary",
    info: "text-info",
    success: "text-green-400",
  };

  return (
    <div
      className={`data-line px-3 py-1 border rounded text-xs font-mono ${colors[type]}`}
    >
      {label}: <span className={`${valueColors[type]} font-bold`}>{value}</span>
    </div>
  );
}
