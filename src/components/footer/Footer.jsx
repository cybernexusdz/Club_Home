import { useState } from "react";
import {
  Mail,
  MapPin,
  Instagram,
  Facebook,
  ArrowUp,
  Code,
  Users,
  Rocket,
  Send,
  Terminal,
  Zap,
  Code2,
} from "lucide-react";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 6 });
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
    
  const socialLinks = [
    {
      name: "Telegram",
      href: "https://t.me/+88z7iR0d1XhiOWI0",
      icon: Send,
      color: "from-[#0088cc] to-[#0088cc]/70",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/cybernexusdz/",
      icon: Instagram,
      color: "from-pink-500 to-purple-500",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@cybernexusdz?lang=en",
      icon: null,
      color: "from-cyan-500 to-cyan-400",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/cybernexusdz/",
      icon: Facebook,
      color: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-base-100 via-base-200/30 to-base-100">
      {/* Simplified Grid Background - static, no animation */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(231, 118, 247) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(231, 118, 247) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, black 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Corner brackets - top */}
      <div className="absolute top-0 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/40" />
      <div className="absolute top-0 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/40" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-24">
        {/* Terminal Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-lg border border-primary/30 font-mono text-xs text-primary uppercase tracking-widest">
            <Terminal className="w-4 h-4" />
            <span>&lt;FOOTER_SECTION&gt;</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-8 relative">
            {/* Decorative data line */}
            <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

            <div className="space-y-5">
              <h3
                ref={glitchRef}
                className="text-base-content font-black text-5xl font-mono bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent"
              >
                CyberNexus
              </h3>
              <div className="flex items-center gap-2 text-primary/60 font-mono text-xs">
                <Code2 className="w-3 h-3" />
                <div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
              </div>
              <p className="text-base-content/70 leading-relaxed text-base font-mono">
                <span className="text-secondary font-bold">&gt;</span>{" "}
                Empowering creativity and innovation through technology. Join
                our community to explore, learn, and build amazing projects
                together.
              </p>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Code, label: "Innovation", color: "primary" },
                { icon: Users, label: "Community", color: "secondary" },
                { icon: Rocket, label: "Learning", color: "accent" },
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-${tag.color}/10 text-${tag.color} text-xs font-bold border border-${tag.color}/30 hover:bg-${tag.color}/20 transition-all cursor-default font-mono uppercase tracking-wider relative group`}
                >
                  <tag.icon className="w-4 h-4" />
                  {tag.label}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </span>
              ))}
            </div>

            {/* System Status - removed animate-pulse */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-success/10 border border-success/30 text-xs font-mono text-success">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>ONLINE</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/30 text-xs font-mono text-primary">
                <Zap className="w-3 h-3" />
                <span>ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1 space-y-6 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary/50 to-transparent" />

            <div className="relative">
              <h3 className="text-base-content font-black text-2xl mb-2 font-mono">
                <span className="text-secondary">&gt;</span> Get In Touch
              </h3>
              <div className="flex items-center gap-2 text-secondary/40 font-mono text-xs mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-secondary/60 to-transparent" />
                <span>COMMUNICATION</span>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:cyber.nexus.tiaret@gmail.com"
                className="group flex items-start gap-4 p-4 rounded-xl bg-base-200/40 border-2 border-primary/20 hover:border-primary/50 transition-all hover:bg-base-200/60 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-3 rounded-lg bg-primary/20 border border-primary/40 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 pt-1 relative">
                  <div className="text-xs text-primary font-mono font-bold mb-1 uppercase tracking-wider">
                    EMAIL_ADDRESS
                  </div>
                  <span className="text-sm text-base-content/80 break-all font-mono">
                    cyber.nexus.tiaret@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-base-200/40 border-2 border-secondary/20 relative overflow-hidden">
                <div className="relative p-3 rounded-lg bg-secondary/20 border border-secondary/40">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 pt-1 relative">
                  <div className="text-xs text-secondary font-mono font-bold mb-1 uppercase tracking-wider">
                    GPS_COORDINATES
                  </div>
                  <span className="text-sm text-base-content/80 font-mono">
                    Tiaret, Algeria
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="lg:col-span-1 space-y-6 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-info/50 to-transparent" />

            <div className="relative">
              <h3 className="text-base-content font-black text-2xl mb-2 font-mono">
                <span className="text-info">&gt;</span> Connect With Us
              </h3>
              <div className="flex items-center gap-2 text-info/40 font-mono text-xs mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-info/60 to-transparent" />
                <span>SOCIAL_NETWORK</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(idx)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className="group relative p-6 rounded-xl bg-base-200/40 border-2 border-base-content/10 hover:border-base-content/30 transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-3 overflow-hidden"
                  title={social.name}
                >
                  {/* Corner brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-primary/40 group-hover:border-primary/80 transition-colors" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-primary/40 group-hover:border-primary/80 transition-colors" />

                  {/* Scanning effect - only when hovered */}
                  {hoveredSocial === idx && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan pointer-events-none" />
                  )}

                  {/* Glow effect - removed blur */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />

                  {social.icon ? (
                    <social.icon className="w-8 h-8 text-base-content/70 group-hover:text-base-content transition-all relative z-10" />
                  ) : (
                    <svg
                      className="w-8 h-8 text-base-content/70 group-hover:text-base-content transition-all relative z-10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  )}
                  <span className="text-xs font-bold text-base-content/70 group-hover:text-base-content transition-colors font-mono uppercase tracking-wider relative z-10">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>

            {/* Additional Info Card - removed scanline */}
            <div className="relative mt-6 p-5 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 overflow-hidden group">
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
              <p className="text-sm text-base-content/70 leading-relaxed font-mono relative">
                <span className="text-primary font-bold">&gt;</span> Join our
                growing community of tech enthusiasts, developers, and
                innovators. Stay updated with our latest projects and events!
              </p>
            </div>
          </div>
        </div>

        {/* Simplified Cyber Divider - removed pulse animations */}
        <div className="relative h-px mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-secondary rounded-full" />
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-2 h-2 bg-info rounded-full" />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-base-content/60 text-sm font-mono">
            <span className="text-primary font-bold text-lg">{"</>"}</span>
            <span className="px-2 py-1 bg-primary/10 rounded border border-primary/30 text-primary font-bold">
              © {currentYear}
            </span>
            <span className="hidden sm:inline text-base-content/40">|</span>
            <span className="hidden sm:inline">CYBER_NEXUS</span>
            <span className="hidden sm:inline text-base-content/40">|</span>
            <span className="hidden sm:inline">Crafted with</span>
            <span className="hidden sm:inline text-primary">❤️</span>
            <span className="hidden sm:inline">in Algeria</span>
          </div>

          {/* Back to Top Button - simplified */}
          <button
            onClick={scrollToTop}
            className="group relative flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 border-2 border-primary/30 hover:border-primary/60 text-primary transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/30 overflow-hidden font-mono font-bold uppercase tracking-wider"
            aria-label="Back to top"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm relative z-10">SCROLL_TOP</span>
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform relative z-10" />
          </button>
        </div>

        {/* Terminal closing tag */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-base-200/40 rounded-lg border border-primary/20 font-mono text-xs text-primary/60 uppercase tracking-widest">
            <Code2 className="w-3 h-3" />
            <span>&lt;/FOOTER_SECTION&gt;</span>
          </div>
        </div>
      </div>

      {/* Corner brackets - bottom */}
      <div className="absolute bottom-0 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/40" />
      <div className="absolute bottom-0 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/40" />
    </footer>
  );
};

export default Footer;
