import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Sparkles,
  Code2,
  Zap,
  Users,
  GitBranch,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../project-card/ProjectCard";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";

gsap.registerPlugin(ScrollTrigger);

const sampleProjects = [
  {
    id: 1,
    name: "AI Chat Bot",
    description:
      "An intelligent chatbot powered by machine learning that can understand context and provide helpful responses.",
    imageURL:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=60",
    technologies: ["React", "Python", "TensorFlow"],
    githubURL: "https://github.com/cybernexusdz/chatbot",
    liveURL: "https://demo.cybernexus.com",
    contributors: 5,
    createdAt: "Oct 2024",
  },
  {
    id: 5,
    name: "Quantum Dashboard",
    description:
      "Real-time analytics dashboard with quantum-inspired visualizations and predictive modeling.",
    imageURL:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=60",
    technologies: ["React", "Python", "TensorFlow"],
    githubURL: "https://github.com/cybernexusdz/chatbot",
    liveURL: "https://demo.cybernexus.com",
    contributors: 5,
    createdAt: "Oct 2024",
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Personal portfolio built with React, Tailwind and Vite.",
    imageURL:
      "https://images.unsplash.com/photo-1503264116251-35a269479413?w=600&q=60",
    technologies: ["React", "TailwindCSS"],
    githubURL: "https://github.com/cybernexusdz/portfolio",
    liveURL: "https://cybernexus.com",
    contributors: 2,
    createdAt: "Jan 2025",
  },
  {
    id: 3,
    name: "Student Manager",
    description: "Manage student records using SQLite and JavaFX.",
    imageURL:
      "https://images.unsplash.com/photo-1590608897129-79da98d159ad?w=600&q=60",
    technologies: ["Java", "SQLite"],
    githubURL: "https://github.com/cybernexusdz/student-manager",
    contributors: 3,
    createdAt: "Aug 2024",
  },
  {
    id: 4,
    name: "Smart Home System",
    description: "IoT-based home automation using Raspberry Pi and MQTT.",
    imageURL:
      "https://images.unsplash.com/photo-1581093588401-22d5f4f9c2a7?w=600&q=60",
    technologies: ["Python", "IoT"],
    githubURL: "#",
    liveURL: "#",
    contributors: 2,
    createdAt: "Mar 2024",
  },
];

const ALL_TAG = "all";

export default function ProjectsSection({
  projects = sampleProjects,
  loading = false,
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(ALL_TAG);
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 5 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const statsRef = useRef(null);
  const searchFilterRef = useRef(null);
  const headerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const animationsInitialized = useRef(false);

  const tags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) =>
      p.technologies?.forEach((t) => set.add(t.toLowerCase())),
    );
    return [ALL_TAG, ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let list = projects;
    if (activeTag !== ALL_TAG) {
      list = list.filter((p) =>
        p.technologies?.some(
          (t) => t.toLowerCase() === activeTag.toLowerCase(),
        ),
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [projects, activeTag, query]);

  // Memoize total contributors calculation
  const totalContributors = useMemo(() => {
    return projects.reduce((sum, p) => sum + (p.contributors || 0), 0);
  }, [projects]);

  useEffect(() => {
    if (filteredProjects.length > 0) {
      const middleIndex = Math.floor(filteredProjects.length / 2);
      setCurrentIndex(middleIndex);
    }
  }, [filteredProjects.length]);

  const scroll = useCallback(
    (dir) => {
      if (filteredProjects.length === 0) return;

      setCurrentIndex((prevIndex) => {
        const newIndex =
          dir === "left"
            ? Math.max(0, prevIndex - 1)
            : Math.min(filteredProjects.length - 1, prevIndex + 1);
        return newIndex;
      });
    },
    [filteredProjects.length],
  );

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        scroll("right");
      } else {
        scroll("left");
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [scroll]);

  useEffect(() => {
    // Only initialize animations once
    if (animationsInitialized.current) return;
    animationsInitialized.current = true;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
          },
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
        });
      }

      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.5,
          },
          opacity: 0,
          scale: 0.8,
          stagger: 0.15,
          duration: 1,
        });
      }

      if (cardsContainerRef.current) {
        gsap.from(cardsContainerRef.current, {
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 0.5,
          },
          opacity: 0,
          y: 40,
          duration: 1,
        });
      }

      if (searchFilterRef.current) {
        gsap.from(searchFilterRef.current.children, {
          scrollTrigger: {
            trigger: searchFilterRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 0.5,
          },
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.8,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCardStyle = useCallback(
    (index) => {
      const diff = index - currentIndex;
      const absDiff = Math.abs(diff);

      if (absDiff > 2) {
        return {
          display: "none",
        };
      }

      if (diff === 0) {
        return {
          opacity: 1,
          transform: "translateX(0) scale(1)",
          zIndex: 30,
          pointerEvents: "auto",
        };
      }

      if (diff > 0) {
        return {
          opacity: 0.95,
          transform: `translateX(${absDiff * 45}%) scale(${1 - absDiff * 0.12})`,
          zIndex: 30 - absDiff,
          pointerEvents: absDiff === 1 ? "auto" : "none",
        };
      }

      return {
        opacity: 0.95,
        transform: `translateX(-${absDiff * 45}%) scale(${1 - absDiff * 0.12})`,
        zIndex: 30 - absDiff,
        pointerEvents: absDiff === 1 ? "auto" : "none",
      };
    },
    [currentIndex],
  );

  const handleDotClick = useCallback(
    (idx) => {
      if (idx !== currentIndex) {
        setCurrentIndex(idx);
      }
    },
    [currentIndex],
  );

  const handleCardClick = useCallback((idx, absDiff) => {
    if (absDiff === 1) {
      setCurrentIndex(idx);
    }
  }, []);

  const noResults = filteredProjects.length === 0;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-10 bg-base-100 overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none cyber-grid" />

      <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10">
        <div ref={headerRef} className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-full text-primary text-xs sm:text-sm font-bold border-2 border-primary/40 shadow-xl font-mono uppercase tracking-wider">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>&lt;NEXIAN_PROJECTS&gt;</span>
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content font-mono px-4">
            <span className="text-primary/60">&gt;</span> What We're{" "}
            <span
              ref={glitchRef}
              className="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent animate-gradient"
            >
              Building
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed font-mono px-4">
            <span className="text-secondary"></span> Explore cutting-edge
            projects by our{" "}
            <span className="text-primary font-bold">Nexians</span> community
          </p>
        </div>

        <div
          ref={statsRef}
          className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10"
        >
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className="relative text-center bg-base-200/40 border-2 border-primary/20 rounded-lg px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1">
                <GitBranch className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary" />
                <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-mono">
                  {projects.length}+
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-primary/70 font-mono uppercase tracking-wider">
                Projects
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-secondary to-info rounded-lg opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className="relative text-center bg-base-200/40 border-2 border-secondary/20 rounded-lg px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-secondary" />
                <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-secondary to-info bg-clip-text text-transparent font-mono">
                  {totalContributors}+
                </div>
              </div>
              <div className="text-xs sm:text-sm font-bold text-secondary/70 font-mono uppercase tracking-wider">
                Contributors
              </div>
            </div>
          </div>
        </div>

        <div
          ref={searchFilterRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <div className="relative w-full sm:w-72 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className="relative">
              <input
                type="text"
                placeholder="search_projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input w-full pr-10 pl-10 bg-base-200/60 border-2 border-primary/20 focus:border-primary/50 transition-all font-mono text-sm placeholder:text-base-content/40"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-error transition-colors font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-primary rounded-lg opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className="relative">
              <select
                className="select bg-base-200/60 border-2 border-secondary/20 pl-9 pr-8 font-mono text-sm font-bold focus:border-secondary/50 focus:outline-none cursor-pointer hover:border-secondary/40 transition-all"
                value={activeTag}
                onChange={(e) => setActiveTag(e.target.value)}
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag === ALL_TAG ? "[ALL_TECH]" : `[${tag.toUpperCase()}]`}
                  </option>
                ))}
              </select>
              <Filter className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {!loading && filteredProjects.length > 0 && (
          <div className="flex justify-center gap-2 sm:gap-3">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className="relative group/dot"
                aria-label={`Go to project ${idx + 1}`}
              >
                <div
                  className={`relative h-2 rounded-full transition-all duration-300 border ${
                    idx === currentIndex
                      ? "w-6 sm:w-8 bg-primary border-primary/50 shadow-lg shadow-primary/50"
                      : "w-2 bg-base-content/20 border-base-content/20 hover:bg-base-content/40"
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        <div
          ref={cardsContainerRef}
          className="relative flex justify-center items-center py-4 touch-pan-y"
          style={{ minHeight: "450px" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => scroll("left")}
            disabled={noResults || currentIndex === 0}
            title="Previous project"
            aria-label="Previous project"
            className="hidden sm:flex absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-40 group/nav disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          >
            <div className="absolute inset-0 bg-primary rounded-full opacity-0 group-hover/nav:opacity-20 transition-opacity" />
            <div className="relative bg-base-200 p-3 md:p-4 rounded-full border-2 border-primary/40 hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg">
              <ChevronLeft className="w-5 h-5 text-primary" />
            </div>
          </button>

          {loading ? (
            <div className="w-full max-w-[280px] sm:max-w-[450px] md:max-w-[520px] lg:max-w-[580px]">
              <ProjectCard loading={true} />
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="relative w-full max-w-[280px] sm:max-w-[450px] md:max-w-[520px] lg:max-w-[560px] h-[460px]">
              {filteredProjects.map((project, idx) => {
                const style = getCardStyle(idx);
                const absDiff = Math.abs(idx - currentIndex);

                if (absDiff > 2) return null;

                return (
                  <div
                    key={`${project.id}-${idx}`}
                    className="absolute inset-0 w-full transition-all duration-200 ease-out cursor-pointer select-none"
                    style={{
                      opacity: style.opacity,
                      transform: style.transform,
                      zIndex: style.zIndex,
                      pointerEvents: style.pointerEvents,
                      willChange: "transform, opacity",
                    }}
                    onClick={() => handleCardClick(idx, absDiff)}
                  >
                    <ProjectCard project={project} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 font-mono">
              <Code2 className="w-16 h-16 mx-auto mb-3 text-primary/20" />
              <p className="text-lg font-bold text-primary/60 mb-2">
                <span className="text-secondary">&gt;</span> NO_PROJECTS_FOUND
              </p>
              <p className="text-sm text-base-content/40">
                <span className="text-secondary"></span> Try adjusting your
                search or filters
              </p>
            </div>
          )}

          <button
            onClick={() => scroll("right")}
            disabled={noResults || currentIndex === filteredProjects.length - 1}
            title="Next project"
            aria-label="Next project"
            className="hidden sm:flex absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-40 group/nav disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          >
            <div className="absolute inset-0 bg-primary rounded-full opacity-0 group-hover/nav:opacity-20 transition-opacity" />
            <div className="relative bg-base-200 p-3 md:p-4 rounded-full border-2 border-primary/40 hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg">
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
