import { useState } from "react";
import { ExternalLink, Github, Users, Calendar, Terminal } from "lucide-react";

const ProjectCard = ({ project, loading = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (loading) {
    return (
      <div className="relative group perspective-1000">
        {/* Corner brackets for loading */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/40" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/40" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-secondary/40" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-secondary/40" />

        <div className="relative card bg-base-200 border-2 border-primary/20 rounded-xl shadow-lg w-full h-full flex flex-col overflow-hidden">
          <figure className="relative h-40 sm:h-48 bg-base-300/50 animate-pulse flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="loading loading-spinner loading-md sm:loading-lg text-primary"></span>
            </div>
          </figure>
          <div className="card-body p-4 sm:p-6 flex flex-col flex-grow">
            <div className="h-5 sm:h-6 bg-base-300/50 rounded animate-pulse mb-2"></div>
            <div className="h-3 sm:h-4 bg-base-300/50 rounded animate-pulse mb-2 w-3/4"></div>
            <div className="h-3 sm:h-4 bg-base-300/50 rounded animate-pulse mb-4 w-1/2"></div>
            <div className="flex gap-2 mt-auto">
              <div className="h-11 bg-base-300/50 rounded animate-pulse flex-1"></div>
              <div className="h-11 bg-base-300/50 rounded animate-pulse flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    name = "Untitled Project",
    description = "No description available",
    imageURL = "",
    images = [],
    technologies = [],
    githubURL = "",
    liveURL = "",
    contributors = 0,
    createdAt = "",
  } = project || {};

  const displayImage = imageURL || (images && images[0]) || "";

  return (
    <div className="relative group perspective-1000">
      {/* Corner brackets - Cyber style */}
      <div className="corner-bracket absolute -top-2 -left-2 w-6 h-6 border-t-[3px] border-l-[3px] border-primary opacity-80 group-hover:opacity-100 transition-all duration-300" />
      <div className="corner-bracket absolute -top-2 -right-2 w-6 h-6 border-t-[3px] border-r-[3px] border-primary opacity-80 group-hover:opacity-100 transition-all duration-300" />
      <div className="corner-bracket absolute -bottom-2 -left-2 w-6 h-6 border-b-[3px] border-l-[3px] border-secondary opacity-80 group-hover:opacity-100 transition-all duration-300" />
      <div className="corner-bracket absolute -bottom-2 -right-2 w-6 h-6 border-b-[3px] border-r-[3px] border-secondary opacity-80 group-hover:opacity-100 transition-all duration-300" />

      {/* Animated border glow */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 opacity-50 group-hover:opacity-80 transition-all duration-300 blur-sm" />

      {/* Main border */}
      <div className="absolute inset-0 rounded-xl border-2 border-primary/50 group-hover:border-primary/80 transition-all duration-300" />

      <div className="relative card bg-gradient-to-br from-base-200 via-base-100 to-base-200 rounded-xl shadow-2xl group-hover:shadow-[0_0_30px_rgba(var(--p),0.3)] transition-all duration-300 border-2 border-base-content/20 w-full h-full flex flex-col overflow-hidden hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
        {/* Data lines */}
        <div className="data-line absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="data-line absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />

        <figure className="relative h-40 sm:h-48 bg-base-300 flex-shrink-0 overflow-hidden">
          {displayImage ? (
            <>
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-base-300">
                  <span className="loading loading-spinner loading-md sm:loading-lg text-primary"></span>
                </div>
              )}

              <img
                src={displayImage}
                alt={name}
                loading="lazy"
                decoding="async"
                width={600}
                height={360}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />

              {/* Image overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="text-center text-primary/70">
                    <div
                      aria-hidden="true"
                      className="text-3xl sm:text-4xl mb-2"
                    >
                      ⚠️
                    </div>
                    <p className="text-xs sm:text-sm font-mono font-bold">
                      IMAGE_NOT_FOUND
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/30 via-base-200 to-secondary/30">
              <div className="text-center text-primary">
                <div aria-hidden="true" className="text-4xl sm:text-5xl mb-2">
                  ⚡
                </div>
                <p className="text-xs sm:text-sm font-bold font-mono tracking-wider">
                  CYBERNEXUS
                </p>
              </div>
            </div>
          )}

          {images && images.length > 1 && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-primary text-white text-xs font-mono font-bold rounded border border-primary shadow-lg shadow-primary/50">
              +{images.length - 1}
            </div>
          )}

          {/* Terminal indicator */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-base-200 border-2 border-primary/50 rounded text-xs font-mono text-primary font-bold shadow-lg">
            <Terminal className="w-3 h-3" />
            <span>PROJECT</span>
          </div>
        </figure>

        <div className="card-body p-4 sm:p-6 flex flex-col flex-grow bg-base-100">
          {/* Title with ID */}
          <h2 className="card-title text-base sm:text-lg text-base-content flex-wrap gap-2 font-mono font-black">
            <span className="text-primary">&gt;</span>
            <span className="break-words">{name}</span>
          </h2>

          {/* Description */}
          <p className="text-base-content/80 text-xs sm:text-sm line-clamp-2 break-words font-mono leading-relaxed">
            <span className="text-secondary font-bold"></span> {description}
          </p>

          {/* Technologies */}
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 sm:mt-2">
              {technologies.slice(0, 2).map((tech, index) => {
                const techIcons = {
                  react: "⚛️",
                  python: "🐍",
                  tensorflow: "🧠",
                  java: "☕",
                  sqlite: "💾",
                  tailwindcss: "🌊",
                  vite: "⚡",
                  javascript: "🟨",
                  typescript: "🟦",
                  html: "📄",
                  css: "🎨",
                  iot: "📡",
                  raspberrypi: "🍓",
                };

                const normalized = tech.toLowerCase().replace(/\s+/g, "");
                const icon = techIcons[normalized] || "💡";

                return (
                  <span
                    key={index}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-bold rounded border-2 border-primary/30 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/20 transition-all duration-300 font-mono uppercase shadow-sm"
                  >
                    <span className="text-sm">{icon}</span>
                    <span>{tech}</span>
                  </span>
                );
              })}

              {technologies.length > 2 && (
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-bold rounded border-2 border-base-content/30 bg-base-200 text-base-content/70 font-mono shadow-sm">
                  +{technologies.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-3 sm:gap-4 mt-2 text-xs text-primary/70 font-mono">
            {contributors > 0 && (
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span className="font-bold">{contributors}</span>
              </div>
            )}
            {createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span className="truncate font-bold">{createdAt}</span>
              </div>
            )}
          </div>

          {/* Action buttons - Cyber style */}
          <div className="card-actions mt-auto sm:mt-4 flex flex-col sm:flex-row gap-2 w-full">
            {githubURL && (
              <a
                href={githubURL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source of ${name}`}
                className="relative group/btn w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary opacity-0 group-hover/btn:opacity-30 transition-opacity" />
                <div className="relative inline-flex items-center justify-center gap-2 w-full min-h-[44px] px-4 py-2 bg-base-200 border-2 border-primary/50 hover:border-primary rounded-lg transition-all duration-300 font-mono font-bold text-sm text-primary hover:shadow-lg hover:shadow-primary/20">
                  <Github className="w-4 h-4" />
                  <span>&lt;CODE&gt;</span>
                </div>
              </a>
            )}

            {liveURL && (
              <a
                href={liveURL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View demo of ${name}`}
                className="relative group/btn w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <div className="relative inline-flex items-center justify-center gap-2 w-full min-h-[44px] px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white border-2 border-primary rounded-lg transition-all duration-300 font-mono font-bold text-sm hover:shadow-xl hover:shadow-primary/40">
                  <ExternalLink className="w-4 h-4" />
                  <span>&lt;DEMO&gt;</span>
                </div>
              </a>
            )}

            {!githubURL && !liveURL && (
              <button
                className="relative group/btn w-full sm:w-auto overflow-hidden"
                aria-label={`View details of ${name}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <div className="relative inline-flex items-center justify-center gap-2 w-full min-h-[44px] px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white border-2 border-primary rounded-lg transition-all duration-300 font-mono font-bold text-sm hover:shadow-xl hover:shadow-primary/40">
                  <span>&lt;VIEW_DETAILS&gt;</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
