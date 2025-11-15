import { useMemo, useState, useRef, useEffect } from "react";
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
import {
  CornerBrackets,
  DataLine,
  CyberBackground,
  TerminalBadge,
} from "../ui/CyberBackground";
import { useCyberHeader, useCyberCards } from "../../hooks/useCyberAnimation";
import image1 from "./images/cc62374db4003c3af0243e519cfa96f159ecb65a (1).jpg";
import image2 from "./images/6354f8b78b2e2e6e1d0f1d3fa5b5074050fb3647.png";
import en from "../locales/en.json";

gsap.registerPlugin(ScrollTrigger);

// Mock articles data
const mockArticles = [
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
    id: 4,
    title: "Community Success Stories",
    category: "Highlight",
    tagColor: "from-orange-500 to-red-500",
    author: "Emma Davis",
    date: "10 January 2025",
    excerpt: "Read inspiring stories from members of our CYBERNEXUS community.",
    imageKey: "image2",
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
];

const BlogSection = ({ languageCode = "en" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 5 });

  const t = useMemo(() => {
    const dict = { en };
    return dict[languageCode] || dict.en;
  }, [languageCode]);

  const articles = mockArticles;

  const sectionRef = useRef(null);
  const clubNewsRef = useRef(null);

  const { headerRef } = useCyberHeader();
  const { containerRef: cardsContainerRef } = useCyberCards({
    cardSelector: ".blog-article-card",
  });

  const images = { image1, image2 };

  // Carousel logic
  const itemsPerPage = 1;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate club news card
      if (clubNewsRef.current) {
        gsap.from(clubNewsRef.current, {
          scrollTrigger: {
            trigger: clubNewsRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 0.5,
          },
          opacity: 0,
          y: 50,
          duration: 1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-base-100"
      dir={languageCode === "ar" ? "rtl" : "ltr"}
    >
      {/* Cyber Background Effects - Optimized */}
      <CyberBackground
        showGrid={true}
        showScanlines={false}
        showOrbs={false}
        showCircuits={false}
        showParticles={true}
        particleCount={8}
      />

      {/* Geometric Pattern Background */}
      <div className="absolute top-0 right-0 opacity-10 sm:opacity-20 pointer-events-none">
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative text-primary">
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
        {/* Header */}
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
              className="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent animate-gradient"
            >
              News
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed font-mono px-4">
            <span className="text-secondary"></span> Stay updated with the
            latest news and articles from CYBERNEXUS
          </p>
        </div>

        {/* Main Club News Card - Cyber Themed & Mobile Friendly */}
        <div ref={clubNewsRef} className="mb-12 sm:mb-14 md:mb-16">
          <div className="relative group perspective-1000">
            {/* Corner Brackets - Hidden on mobile */}
            <div className="hidden sm:block">
              <CornerBrackets size="lg" />
            </div>

            {/* Animated border glow - Optimized */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-40 group-hover:opacity-70 transition-all duration-300" />

            {/* Main border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300 neon-border" />

            <div className="relative bg-gradient-to-br from-base-200/80 via-base-200/60 to-base-200/80 rounded-2xl overflow-hidden border-2 border-base-content/10">
              {/* Data lines */}
              <DataLine position="top" intensity="medium" />
              <DataLine position="bottom" intensity="medium" />

              <div className="flex flex-col md:flex-row">
                {/* Left Side - Logo */}
                <div className="md:w-1/3 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden md:border-r border-primary/20">
                  <div className="mb-4 sm:mb-6 relative z-10">
                    <img
                      src={image1}
                      alt="CYBERNEXUS Logo"
                      className="w-32 h-auto sm:w-40 md:w-48 object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>

                {/* Right Side - News Content */}
                <div className="md:w-2/3 p-6 sm:p-8 flex flex-col justify-between relative">
                  <div>
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-primary font-mono text-xs sm:text-sm font-bold tracking-wider">
                        SYSTEM_NEWS
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-base-content mb-3 sm:mb-4 font-mono">
                      <span className="text-secondary/60">&gt;</span>{" "}
                      {t.blog.clubNews}
                    </h3>

                    <p className="text-primary/80 mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm font-mono flex items-center gap-2">
                      <Terminal className="w-3 h-3 sm:w-4 sm:h-4" />
                      {languageCode === "ar"
                        ? `Alex، 18 جانفي`
                        : `Alex, 18 January`}
                    </p>

                    <p className="text-base-content/70 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base font-mono">
                      {languageCode === "ar"
                        ? "هذا نص تجريبي لعرض الأخبار الخاصة بالنادي كنموذج مبدئي."
                        : "This is a placeholder text to showcase the club news content as an initial sample."}
                    </p>
                  </div>

                  <button className="w-full sm:w-auto self-start sm:self-end relative group/btn overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-gradient-to-r from-primary to-secondary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold font-mono hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-primary/50 text-sm sm:text-base">
                      <span className="text-white/80">&gt;</span>
                      {t.blog.readMore}
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

        {/* Blog Articles Carousel - Cyber Themed & Mobile Optimized */}
        <div className="relative w-full -mx-4 sm:mx-0">
          <div
            ref={cardsContainerRef}
            className="relative overflow-hidden w-full"
          >
            {/* Articles Wrapper */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="min-w-full flex-shrink-0 px-4 sm:px-6 md:px-8"
                >
                  <div className="blog-article-card relative group perspective-1000">
                    {/* Corner Brackets - Hidden on mobile */}
                    <div className="hidden sm:block">
                      <CornerBrackets size="md" />
                    </div>

                    {/* Animated border glow - Optimized */}
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-30 group-hover:opacity-60 transition-all duration-300" />

                    {/* Main border */}
                    <div className="absolute inset-0 rounded-xl border-2 border-primary/20 group-hover:border-primary/50 transition-all duration-300 neon-border-subtle" />

                    <div className="relative bg-gradient-to-br from-base-200/70 via-base-200/50 to-base-200/70 rounded-xl overflow-hidden border-2 border-base-content/10">
                      {/* Data lines */}
                      <DataLine position="top" intensity="low" />
                      <DataLine position="bottom" intensity="low" />

                      <div className="p-4 sm:p-5 md:p-6 relative">
                        {/* Tag - Cyber Style */}
                        <div className="relative w-fit mb-3 sm:mb-4 group/tag">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${article.tagColor} opacity-30 group-hover/tag:opacity-50 transition-opacity rounded-full`}
                          />
                          <div
                            className={`relative bg-gradient-to-r ${article.tagColor} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-white/20`}
                          >
                            <span className="text-white text-xs sm:text-sm font-bold font-mono tracking-wider flex items-center gap-1.5 sm:gap-2">
                              <Zap className="w-3 h-3" />
                              {article.category.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-base-content mb-3 sm:mb-4 font-mono leading-tight">
                          <span className="text-primary/60">&gt;</span>{" "}
                          {article.title}
                        </h3>

                        {/* Author/Date and Image Row */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-primary/70 text-xs sm:text-sm mb-2 sm:mb-3 font-mono flex items-center gap-2">
                              <Terminal className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">
                                {languageCode === "ar"
                                  ? `${article.author}، ${article.date}`
                                  : `${article.author}, ${article.date}`}
                              </span>
                            </p>

                            <p className="text-base-content/70 text-xs sm:text-sm mb-3 font-mono leading-relaxed">
                              <span className="text-secondary"></span>{" "}
                              {article.excerpt}
                            </p>
                          </div>

                          <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 relative group/img">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-20 group-hover/img:opacity-40 transition-opacity" />
                            <img
                              src={images[article.imageKey]}
                              alt={article.title}
                              className="relative w-full h-full object-cover rounded-lg border-2 border-primary/30"
                            />
                          </div>
                        </div>

                        {/* Read More Button - Cyber Style */}
                        <button className="w-full relative group/btn overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                          <div className="relative bg-gradient-to-r from-primary to-secondary text-white py-2.5 sm:py-3 rounded-lg font-bold font-mono hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-primary/40 text-sm sm:text-base">
                            <span className="text-white/80">&gt;</span>
                            {t.blog.readMore}
                            <ArrowRight
                              size={16}
                              className="group-hover/btn:translate-x-1 transition-transform"
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Cyber Style & Mobile Friendly */}
          <div className="flex items-center justify-between mt-6 sm:mt-8 px-4 sm:px-0">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="relative group/nav overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous article"
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover/nav:opacity-30 transition-opacity" />
              <div className="relative bg-base-200/80 p-2 sm:p-3 md:p-4 rounded-full border-2 border-primary/40 hover:border-primary/80 transition-all duration-300">
                <ChevronLeft className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </button>

            {/* Dot Indicators - Cyber Style */}
            <div className="flex gap-2 sm:gap-3">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative group/dot"
                  aria-label={`Go to article ${index + 1}`}
                >
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-primary opacity-50" />
                  )}
                  <div
                    className={`relative h-2 rounded-full transition-all duration-300 border ${
                      index === currentIndex
                        ? "w-6 sm:w-8 bg-primary border-primary/50 shadow-lg shadow-primary/50"
                        : "w-2 bg-base-content/20 border-base-content/20 hover:bg-base-content/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentIndex === totalPages - 1}
              className="relative group/nav overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next article"
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover/nav:opacity-30 transition-opacity" />
              <div className="relative bg-base-200/80 p-2 sm:p-3 md:p-4 rounded-full border-2 border-primary/40 hover:border-primary/80 transition-all duration-300">
                <ChevronRight className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
