import { useMemo, useState, useCallback } from "react";
import { Handshake, Zap, Terminal, Code2 } from "lucide-react";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";
import { useCyberHeader, useCyberCards } from "../../hooks/useCyberAnimation";
import {
  CornerBrackets,
  TerminalBadge,
  DataLine,
  StatusIndicator,
} from "../ui/CyberBackground";

const defaultSponsors = [
  {
    id: 1,
    name: "Futuro Skills Academy",
    logo: "/Futuro.jpg",
    lien: "https://futuroskillsacademy.com/",
    description:
      "Empowering the next generation of tech innovators with cutting-edge education",
    tier: "PLATINUM",
  },
];

export default function SponsorsSection({
  sponsors = defaultSponsors,
  loading = false,
}) {
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 3 });
  const { headerRef, sectionRef } = useCyberHeader();
  const { containerRef } = useCyberCards({ cardSelector: ".sponsor-card" });
  const [hoveredCard, setHoveredCard] = useState(null);

  const list = useMemo(
    () =>
      Array.isArray(sponsors) && sponsors.length ? sponsors : defaultSponsors,
    [sponsors],
  );

  const openInNewTab = useCallback((url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const handleCardKeyDown = useCallback(
    (e, url) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openInNewTab(url);
      }
    },
    [openInNewTab],
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-base-100 via-base-200/20 to-base-100 relative overflow-hidden flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center space-y-4">
          <div className="mb-4">
            <TerminalBadge icon={Terminal}>
              &lt;PARTNERS_INITIATED&gt;
            </TerminalBadge>
          </div>

          <h2 className="text-5xl sm:text-6xl font-black text-base-content tracking-tight font-mono">
            <span className="text-primary/60">&gt;</span> Supporting The{" "}
            <span
              ref={glitchRef}
              className="relative inline-block bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent animate-gradient"
            >
              Nexian
            </span>{" "}
            Mission
          </h2>

          <p className="text-base sm:text-lg text-base-content/70 max-w-3xl mx-auto leading-relaxed font-mono">
            <span className="text-primary font-bold">&gt;</span> Partnering with
            organizations that fuel innovation and community growth
          </p>

          {/* Terminal-style divider */}
          <div className="flex items-center justify-center gap-2 text-primary/40 font-mono text-xs pt-4">
            <Code2 className="w-4 h-4" />
            <div className="flex gap-1">
              <span className="animate-pulse">
                ────────────────────────────────────────
              </span>
            </div>
            <Code2 className="w-4 h-4" />
          </div>
        </div>

        {/* Sponsor Cards */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-5xl">
            {loading ? (
              <div className="py-12 text-center">
                <div className="h-64 w-full rounded-2xl bg-base-200/40 animate-pulse border-2 border-primary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
                </div>
              </div>
            ) : (
              <div ref={containerRef} className="grid gap-8 grid-cols-1">
                {list.map((s, idx) => (
                  <div
                    key={s.id}
                    className="sponsor-card cyber-card relative group perspective-1000"
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Corner brackets */}
                    <CornerBrackets size="md" />

                    {/* Pulsing outer glow */}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse-slow" />

                    {/* Main border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary/40 group-hover:border-primary/80 transition-all duration-300 neon-border-subtle" />

                    {/* Hover scanning effect */}
                    {hoveredCard === idx && (
                      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-scan" />
                      </div>
                    )}

                    {/* Card Content */}
                    <div className="relative flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-base-200/80 via-base-200/60 to-base-200/80 backdrop-blur-md border-2 border-base-content/10 transition-all duration-500 group-hover:bg-base-200/90 group-hover:scale-[1.01]">
                      {/* Logo Section */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => openInNewTab(s.lien)}
                        onKeyDown={(e) => handleCardKeyDown(e, s.lien)}
                        aria-label={`Open ${s.name} website`}
                        className="flex-shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl"
                      >
                        <div className="w-72 h-48 lg:w-80 lg:h-56 flex items-center justify-center bg-base-100/60 rounded-xl border-2 border-primary/30 p-6 group-hover:border-primary/60 transition-all duration-500 relative overflow-hidden shadow-2xl">
                          {/* Scanline effect */}
                          <div className="absolute inset-0 scanline-slow opacity-40" />

                          {/* Data lines */}
                          <DataLine position="top" intensity="medium" />
                          <DataLine position="bottom" intensity="medium" />

                          <img
                            src={s.logo}
                            alt={s.name}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain relative z-10 group-hover:scale-105 transition-all duration-500 filter group-hover:drop-shadow-[0_0_20px_rgba(var(--p),0.6)]"
                          />

                          {/* Tier badge */}
                          {s.tier && (
                            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-xs font-black text-white border border-white/30 shadow-lg z-20 font-mono">
                              {s.tier}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Info Section */}
                      <div className="flex-grow text-center lg:text-left space-y-4">
                        <div className="space-y-2">
                          <div className="inline-block px-3 py-1 bg-primary/10 rounded-md border border-primary/30 text-xs font-mono text-primary uppercase tracking-widest">
                            <Handshake className="inline w-3 h-3 mr-1" />
                            Primary Sponsor
                          </div>

                          <h3 className="text-3xl lg:text-4xl font-black text-base-content tracking-tight group-hover:text-primary transition-colors duration-300 font-mono">
                            {s.name}
                          </h3>
                        </div>

                        {s.description && (
                          <p className="text-base lg:text-lg text-base-content/70 leading-relaxed font-mono max-w-2xl group-hover:text-base-content/90 transition-colors duration-300">
                            <span className="text-secondary">&gt;</span>{" "}
                            {s.description}
                          </p>
                        )}

                        {/* Status indicators */}
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
                          <StatusIndicator
                            label="STATUS"
                            value="ACTIVE"
                            type="success"
                          />
                          <StatusIndicator
                            label="LEVEL"
                            value="MAX"
                            type="primary"
                          />
                          <StatusIndicator
                            label="SYNC"
                            value="100%"
                            type="success"
                          />
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                          <a
                            href={s.githubURL || s.lien}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg border-2 border-primary/50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group/btn relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 font-mono tracking-wider flex items-center gap-2">
                              <Terminal className="w-4 h-4" />
                              ACCESS_SITE
                              <span className="text-xs opacity-70">.exe</span>
                            </span>
                            <Zap className="relative z-10 w-5 h-5 group-hover/btn:animate-pulse" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
