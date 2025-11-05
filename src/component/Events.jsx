import React, { useState, useEffect, useCallback } from "react";
import ProjectCard from "./project-card/ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EventsSection = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      // Reset to first slide when screen size changes
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load events (simulate API)
  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents([
        {
          id: 1,
          name: "Network Event",
          description:
            "Join us for an engaging session on networking technologies, real-world cybersecurity cases, and hands-on discussions.",
          imageURL:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
          technologies: ["Networking", "Cybersecurity"],
          liveURL: "#register-network",
          githubURL: "#",
          contributors: 3,
          createdAt: "January 15 • Lecture Room",
        },
        {
          id: 2,
          name: "Artificial Intelligence",
          description:
            "Explore the latest advancements in AI and learn how to build intelligent systems from scratch.",
          imageURL:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
          technologies: ["AI", "Machine Learning"],
          liveURL: "#register-ai",
          githubURL: "#",
          contributors: 5,
          createdAt: "May 7 • Lecture Room",
        },
        {
          id: 3,
          name: "Cybersecurity Bootcamp",
          description:
            "A deep dive into penetration testing, ethical hacking, and defensive security strategies.",
          imageURL:
            "https://images.unsplash.com/photo-1581093588401-22c38f3f7071?auto=format&fit=crop&w=800&q=80",
          technologies: ["Cybersecurity", "Ethical Hacking"],
          liveURL: "#register-cyber",
          githubURL: "#",
          contributors: 4,
          createdAt: "October 12 • Lab Room",
        },
        {
          id: 4,
          name: "Web Development Workshop",
          description:
            "Learn modern web development with React, Node.js, and best practices for building scalable applications.",
          imageURL:
            "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80",
          technologies: ["React", "Node.js", "JavaScript"],
          liveURL: "#register-webdev",
          githubURL: "#",
          contributors: 6,
          createdAt: "November 20 • Computer Lab",
        },
        {
          id: 5,
          name: "Data Science Seminar",
          description:
            "Discover how data science is transforming industries with practical examples and case studies.",
          imageURL:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
          technologies: ["Python", "Data Analysis", "ML"],
          liveURL: "#register-datascience",
          githubURL: "#",
          contributors: 4,
          createdAt: "December 5 • Conference Hall",
        },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  }, [events.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  }, [events.length]);

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Auto-advance carousel
  useEffect(() => {
    if (isMobile || events.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, events.length, handleNext]);

  // Reset current index when events change
  useEffect(() => {
    setCurrentIndex(0);
  }, [events.length]);

  return (
    <section className="w-full py-16 flex flex-col items-center transition-colors duration-300 bg-base-100">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-start mb-12 text-left w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
            Events
          </h2>
          <p className="text-lg text-base-content/70 mb-6">
            Workshops, hackathons, talks, and more
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary">
            Upcoming Events
          </h3>
        </div>

        {/* Layout */}
        {isMobile ? (
          // 📱 STACKED layout on mobile
          <div className="flex flex-col gap-8 w-full">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <ProjectCard key={i} loading={true} />
                ))
              : events.map((event) => (
                  <div key={event.id} className="w-full">
                    <ProjectCard project={event} />
                  </div>
                ))}
          </div>
        ) : (
          // 💻 CAROUSEL layout on desktop
          <div className="relative flex items-center justify-center w-full">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="absolute -left-4 lg:-left-8 z-10 p-3 rounded-full bg-base-300 hover:bg-base-200 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Previous events"
              disabled={events.length <= 1}
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Cards Carousel Container */}
            <div className="overflow-hidden w-full max-w-4xl mx-auto">
              {loading ? (
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <ProjectCard loading={true} />
                  </div>
                </div>
              ) : (
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {events.map((event, index) => (
                    <div
                      key={event.id}
                      className="w-full flex-shrink-0 px-4 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="max-w-md mx-auto">
                        <ProjectCard project={event} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute -right-4 lg:-right-8 z-10 p-3 rounded-full bg-base-300 hover:bg-base-200 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Next events"
              disabled={events.length <= 1}
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
