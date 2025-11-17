import { useState, useRef, useEffect, useCallback, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Terminal,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";
import { useScrollReveal } from "../../hooks/useGsapAnimation";
import { CornerBrackets, DataLine, TerminalBadge } from "../ui/CyberBackground";
import image1 from "./images/cc62374db4003c3af0243e519cfa96f159ecb65a (1).jpg";
import image2 from "./images/6354f8b78b2e2e6e1d0f1d3fa5b5074050fb3647.png";
import openDayImage from "./images/photo_5791963918254148386_y (1).jpg";
import shipbotImage from "./images/shipbot.png";

gsap.registerPlugin(ScrollTrigger);

const images = { image1, image2, openDayImage, shipbotImage };

// Optimized Club News Card - Reduced effects and simplified animations
const ClubNewsCard = memo(
  ({ hoveredCard, onHover, clubNewsRef, openDayImage }) => {
    const isHovered = hoveredCard === "clubNews";

    return (
      <div ref={clubNewsRef} className="mb-12 sm:mb-14 md:mb-16">
        <div
          className="relative group"
          onMouseEnter={() => onHover("clubNews")}
          onMouseLeave={() => onHover(null)}
        >
          <div className="hidden sm:block">
            <CornerBrackets size="lg" />
          </div>

          {/* Simplified glow - only on hover, removed multiple layers */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

          {/* Single border instead of neon-border class */}
          <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300" />

          {/* Removed scanning animation - performance heavy */}

          {/* Reduced backdrop-blur and opacity layers */}
          <div className="relative bg-base-200/95 rounded-2xl overflow-hidden border-2 border-base-content/10 shadow-2xl">
            <DataLine position="top" intensity="medium" />
            <DataLine position="bottom" intensity="medium" />

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-0 overflow-hidden relative">
                <img
                  src={openDayImage}
                  alt="CYBERNEXUS Open Day"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between relative">
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-primary font-mono text-xs sm:text-sm font-bold tracking-wider">
                      SYSTEM_NEWS
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-base-content mb-3 sm:mb-4 font-mono group-hover:text-primary transition-colors duration-300">
                    <span className="text-secondary/60">&gt;</span> CYBERNEXUS
                    Open Day
                  </h3>

                  <p className="text-primary/80 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm font-mono flex items-center gap-2">
                    <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
                    Event Date: Coming Soon
                  </p>

                  <p className="text-base-content/70 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base font-mono">
                    Join us for an exciting open day event showcasing the latest
                    in tech innovation and student development. Connect with
                    fellow tech enthusiasts and explore opportunities.
                  </p>
                </div>

                <button className="w-full sm:w-auto self-start sm:self-end relative group/btn overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-r from-primary to-secondary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold font-mono hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-primary/50 text-sm sm:text-base">
                    <span className="text-white/80">&gt;</span>
                    Learn More
                    <ArrowRight
                      size={16}
                      className="sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ClubNewsCard.displayName = "ClubNewsCard";

// Highly optimized Article Card - removed heavy effects
const ArticleCard = memo(
  ({ article, isHovered, onMouseEnter, onMouseLeave, onClick }) => {
    const buttonText = useMemo(() => {
      if (article.link === "/shipgame") return "Play";
      if (article.id === 1) return "Join Now";
      return "Read More";
    }, [article.link, article.id]);

    return (
      <div
        className="blog-article-card relative group h-full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="hidden sm:block">
          <CornerBrackets size="md" />
        </div>

        {/* Simplified glow - only on hover */}
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Single border */}
        <div className="absolute inset-0 rounded-xl border-2 border-primary/20 group-hover:border-primary/50 transition-all duration-300" />

        {/* Removed scanning animation for performance */}

        {/* Reduced backdrop-blur layers */}
        <div className="relative bg-base-200/95 rounded-xl overflow-hidden border-2 border-base-content/10 shadow-2xl transition-all duration-300 h-full flex flex-col">
          <DataLine position="top" intensity="low" />
          <DataLine position="bottom" intensity="low" />

          <div className="p-4 sm:p-5 md:p-6 relative flex flex-col flex-1">
            <div className="relative w-fit mb-3 sm:mb-4 group/tag">
              {/* Removed blur effect for performance */}
              <div
                className={`relative bg-gradient-to-r ${article.tagColor} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-white/20`}
              >
                <span className="text-white text-xs sm:text-sm font-bold font-mono tracking-wider flex items-center gap-1.5 sm:gap-2">
                  <Zap className="w-3 h-3" />
                  {article.category.toUpperCase()}
                </span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-base-content mb-3 sm:mb-4 font-mono leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
              <span className="text-primary/60">&gt;</span> {article.title}
            </h3>

            <p className="text-primary/70 text-xs sm:text-sm mb-2 sm:mb-3 font-mono flex items-center gap-2">
              <Terminal className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">
                {article.author}, {article.date}
              </span>
            </p>

            <div className="w-full h-40 sm:h-48 flex-shrink-0 mb-4 relative group/img">
              {/* Removed blur effect */}
              <img
                src={images[article.imageKey]}
                alt={article.title}
                className="relative w-full h-full object-cover rounded-lg border-2 border-primary/30 group-hover/img:border-primary/50 transition-all duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>

            <p className="text-base-content/70 text-xs sm:text-sm mb-4 font-mono leading-relaxed line-clamp-3 flex-1">
              {article.excerpt}
            </p>

            <button
              onClick={onClick}
              className="w-full relative group/btn overflow-hidden mt-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-r from-primary to-secondary text-white py-2.5 sm:py-3 rounded-lg font-bold font-mono hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-primary/40 text-sm sm:text-base">
                <span className="text-white/80">&gt;</span>
                {buttonText}
                <ArrowRight
                  size={16}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  },
  (prev, next) =>
    prev.isHovered === next.isHovered && prev.article.id === next.article.id,
);

ArticleCard.displayName = "ArticleCard";

const BlogSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Single ref for animations - simplified
  const hasAnimatedRef = useRef(false);

  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 5 });
  const clubNewsRef = useScrollReveal({ y: 60, duration: 1 });
  const headerRef = useScrollReveal({ y: 40, duration: 0.8 });
  const carouselRef = useScrollReveal({
    y: 50,
    duration: 0.9,
    start: "top 85%",
  });

  // Simplified GSAP animation - single setup
  useEffect(() => {
    if (hasAnimatedRef.current || !headerRef.current) return;
    hasAnimatedRef.current = true;

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  // Memoized articles array
  const articles = useMemo(
    () => [
      {
        id: 4,
        title: "ShipBot Game Challenge",
        category: "Game",
        tagColor: "from-orange-500 to-red-500",
        author: "Kamel Abada",
        date: "8 November 2025",
        excerpt:
          "Test your skills in our interactive ShipBot game. Can you master the challenge?",
        imageKey: "shipbotImage",
        link: "/shipgame",
      },
      {
        id: 1,
        title: "Getting Started with CYBERNEXUS",
        category: "Guide",
        tagColor: "from-blue-500 to-cyan-500",
        author: "Alex Smith",
        date: "18 January 2025",
        excerpt:
          "Learn how to get started with our community and make the most of it.",
        imageKey: "image1",
        link: "/join",
      },
      {
        id: 2,
        title: "Advanced Web Development Tips",
        category: "Tutorial",
        tagColor: "from-green-500 to-emerald-500",
        author: "Sarah Johnson",
        date: "15 January 2025",
        excerpt:
          "Discover advanced techniques to improve your web development skills.",
        imageKey: "image2",
      },
      {
        id: 3,
        title: "The Future of AI in Tech",
        category: "News",
        tagColor: "from-purple-500 to-pink-500",
        author: "Mike Chen",
        date: "12 January 2025",
        excerpt:
          "Exploring how artificial intelligence is shaping the future of technology.",
        imageKey: "image1",
      },
      {
        id: 5,
        title: "Cybersecurity Best Practices",
        category: "Security",
        tagColor: "from-red-500 to-rose-500",
        author: "John Wilson",
        date: "8 January 2025",
        excerpt: "Essential security practices every developer should know.",
        imageKey: "image1",
      },
    ],
    [],
  );

  // Stable callback for hover
  const handleHover = useCallback((cardId) => {
    setHoveredCard(cardId);
  }, []);

  // Stable callbacks for article clicks
  const handleArticleClick = useCallback(
    (article) => {
      if (article.link) {
        navigate(article.link);
      }
    },
    [navigate],
  );

  // Create stable click handlers
  const articleClickHandlers = useMemo(() => {
    return articles.reduce((acc, article) => {
      acc[article.id] = () => handleArticleClick(article);
      return acc;
    }, {});
  }, [articles, handleArticleClick]);

  // Create stable hover handlers
  const articleHoverHandlers = useMemo(() => {
    return articles.reduce((acc, article, index) => {
      acc[article.id] = {
        onEnter: () => handleHover(index),
        onLeave: () => handleHover(null),
      };
      return acc;
    }, {});
  }, [articles, handleHover]);

  useEffect(() => {
    const updateItemsPerView = () => {
      const newItemsPerView =
        window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
      setItemsPerView(newItemsPerView);
      setCurrentIndex(0);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const needsCarousel = articles.length > itemsPerView;
  const totalSlides = needsCarousel ? articles.length - itemsPerView + 1 : 1;

  const nextSlide = useCallback(() => {
    if (needsCarousel) {
      setCurrentIndex((prev) =>
        Math.min(prev + 1, articles.length - itemsPerView),
      );
    }
  }, [needsCarousel, articles.length, itemsPerView]);

  const prevSlide = useCallback(() => {
    if (needsCarousel) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [needsCarousel]);

  const goToSlide = useCallback(
    (index) => {
      if (needsCarousel) {
        setCurrentIndex(index);
      }
    },
    [needsCarousel],
  );

  useEffect(() => {
    if (isAutoPlaying && needsCarousel && totalSlides > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          return next >= articles.length - itemsPerView ? 0 : next;
        });
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [
    isAutoPlaying,
    needsCarousel,
    totalSlides,
    articles.length,
    itemsPerView,
  ]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate visible articles
  const visibleArticles = useMemo(() => {
    if (needsCarousel) {
      return articles;
    }
    return articles.slice(0, itemsPerView);
  }, [articles, needsCarousel, itemsPerView]);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-base-100"
    >
      {/* Simplified decorative element - removed excessive opacity layers */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 relative text-primary">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path
              d="M200 50 L250 100 L150 100 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M350 150 L300 200 L400 200 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M50 200 L100 250 L100 150 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <rect
              x="150"
              y="150"
              width="100"
              height="100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div
          ref={headerRef}
          className="text-center space-y-3 sm:space-y-4 mb-12"
        >
          <div className="mb-4">
            <TerminalBadge icon={Terminal}>&lt;BLOG_SYSTEM&gt;</TerminalBadge>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content font-mono px-4">
            <span className="text-primary/60">&gt;</span> Blog &{" "}
            <span
              ref={glitchRef}
              className="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent"
            >
              News
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed font-mono px-4">
            <span className="text-secondary"></span> Stay updated with the
            latest news and articles from CYBERNEXUS
          </p>
        </div>

        <ClubNewsCard
          hoveredCard={hoveredCard}
          onHover={handleHover}
          clubNewsRef={clubNewsRef}
          openDayImage={openDayImage}
        />

        <div
          ref={carouselRef}
          className="relative w-full"
        >
          <div className="relative overflow-hidden w-full">
            {needsCarousel ? (
              <>
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                  }}
                >
                  {visibleArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className="flex-shrink-0"
                      style={{
                        width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 1.5}rem / ${itemsPerView})`,
                      }}
                    >
                      <ArticleCard
                        article={article}
                        isHovered={hoveredCard === index}
                        onMouseEnter={articleHoverHandlers[article.id].onEnter}
                        onMouseLeave={articleHoverHandlers[article.id].onLeave}
                        onClick={articleClickHandlers[article.id]}
                      />
                    </div>
                  ))}
                </div>

                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      disabled={currentIndex === 0}
                      className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-base-200/90 border-2 border-primary/30 text-primary hover:border-primary hover:bg-primary hover:text-white active:scale-95 transition-all shadow-lg disabled:opacity-30 disabled:cursor-not-allowed group touch-manipulation"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>

                    <button
                      onClick={nextSlide}
                      disabled={currentIndex >= articles.length - itemsPerView}
                      className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-base-200/90 border-2 border-primary/30 text-primary hover:border-primary hover:bg-primary hover:text-white active:scale-95 transition-all shadow-lg disabled:opacity-30 disabled:cursor-not-allowed group touch-manipulation"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}

                {totalSlides > 1 && (
                  <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="relative group/dot"
                      >
                        {/* Removed blur effect */}
                        <div
                          className={`relative h-2 rounded-full transition-all duration-300 border ${
                            index === currentIndex
                              ? "w-6 sm:w-8 bg-primary border-primary/50"
                              : "w-2 bg-base-content/20 border-base-content/20 hover:bg-base-content/40"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div
                className={`grid gap-4 sm:gap-6 ${
                  itemsPerView === 1
                    ? "grid-cols-1"
                    : itemsPerView === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {visibleArticles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    isHovered={hoveredCard === index}
                    onMouseEnter={articleHoverHandlers[article.id].onEnter}
                    onMouseLeave={articleHoverHandlers[article.id].onLeave}
                    onClick={articleClickHandlers[article.id]}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
