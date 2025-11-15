import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Zap, Calendar } from "lucide-react";
import CountdownToNov18 from "./CountdownToNov18";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";
import { useCyberHeader, useCyberFadeIn } from "../../hooks/useCyberAnimation";
import { TerminalBadge, CornerBrackets, DataLine } from "../ui/CyberBackground";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ theme }) => {
  const [robot, setRobot] = useState(localStorage.getItem("robot") || "boy");
  const [previousRobot, setPreviousRobot] = useState(robot);
  const robotRefMobileLeft = useRef(null);
  const robotRefMobileRight = useRef(null);
  const robotRefDesktop = useRef(null);
  const sectionRef = useRef(null);
  const countdownCardRef = useRef(null);

  // Use cyber animation hooks
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 3 });
  const { headerRef } = useCyberHeader();
  const { elementRef: descriptionRef } = useCyberFadeIn({
    triggerStart: "top 85%",
    triggerEnd: "top 60%",
  });
  const { elementRef: countdownRef } = useCyberFadeIn({
    triggerStart: "top 90%",
    triggerEnd: "top 65%",
  });

  useEffect(() => {
    const newRobot = localStorage.getItem("robot") || "boy";

    // Only animate if robot actually changed
    if (newRobot !== previousRobot) {
      const glitchExit = gsap.timeline();

      // Animate all robots
      const robotElements = [
        robotRefMobileLeft.current,
        robotRefMobileRight.current,
        robotRefDesktop.current,
      ].filter(Boolean);

      glitchExit
        // Initial glitch burst with RGB split
        .to(robotElements, {
          x: -30,
          filter: "drop-shadow(8px 0 #ff0000) drop-shadow(-8px 0 #00ffff)",
          duration: 0.05,
          ease: "power4.inOut",
        })
        .to(robotElements, {
          x: 25,
          filter: "drop-shadow(-8px 0 #ff00ff) drop-shadow(8px 0 #00ff00)",
          duration: 0.05,
          ease: "power4.inOut",
        })
        // Rapid fire glitches
        .to(robotElements, {
          x: () => gsap.utils.random(-40, 40),
          y: () => gsap.utils.random(-20, 20),
          skewX: () => gsap.utils.random(-25, 25),
          filter: "drop-shadow(10px 0 #ff0000) drop-shadow(-10px 0 #00ffff)",
          duration: 0.04,
        })
        .to(robotElements, {
          x: () => gsap.utils.random(-35, 35),
          y: () => gsap.utils.random(-15, 15),
          skewX: () => gsap.utils.random(-20, 20),
          filter: "drop-shadow(8px 0 #00ff00) drop-shadow(-8px 0 #ff00ff)",
          duration: 0.04,
        })
        .to(robotElements, {
          x: () => gsap.utils.random(-30, 30),
          y: () => gsap.utils.random(-10, 10),
          skewX: () => gsap.utils.random(-15, 15),
          filter: "drop-shadow(12px 0 #ffff00) drop-shadow(-12px 0 #ff0000)",
          duration: 0.04,
        })
        // Opacity flicker
        .to(robotElements, {
          opacity: 0.3,
          filter:
            "drop-shadow(15px 0 #ff0000) drop-shadow(-15px 0 #00ffff) brightness(1.5)",
          duration: 0.06,
        })
        .to(robotElements, {
          opacity: 0.8,
          duration: 0.03,
        })
        .to(robotElements, {
          opacity: 0.2,
          duration: 0.03,
        })
        // Final massive glitch and exit
        .to(robotElements, {
          x: -80,
          y: 20,
          skewX: 45,
          opacity: 0,
          filter:
            "drop-shadow(20px 0 #ff0000) drop-shadow(-20px 0 #00ffff) blur(3px)",
          duration: 0.15,
          ease: "power2.in",
        })
        // Change robot after exit
        .call(() => {
          setRobot(newRobot);
          setPreviousRobot(newRobot);
          // Reset position for entrance
          gsap.set(robotElements, { x: 0, y: 0, skewX: 0, filter: "none" });
        })
        // Glitchy entrance
        .to(robotElements, {
          x: 30,
          opacity: 0.5,
          filter: "drop-shadow(10px 0 #00ff00) drop-shadow(-10px 0 #ff00ff)",
          duration: 0.06,
          ease: "power4.out",
        })
        .to(robotElements, {
          x: () => gsap.utils.random(-20, 20),
          skewX: () => gsap.utils.random(-15, 15),
          opacity: 0.7,
          duration: 0.04,
        })
        .to(robotElements, {
          x: () => gsap.utils.random(-10, 10),
          skewX: () => gsap.utils.random(-10, 10),
          opacity: 1,
          duration: 0.04,
        })
        // Settle into position - different for each robot
        .to(
          robotRefMobileLeft.current,
          {
            x: 0,
            y: 0,
            skewX: 0,
            opacity: 1,
            filter: "none",
            rotate: -15,
            duration: 0.3,
            ease: "elastic.out(1, 0.5)",
          },
          "<",
        )
        .to(
          robotRefMobileRight.current,
          {
            x: 0,
            y: 0,
            skewX: 0,
            opacity: 1,
            filter: "none",
            rotate: 15,
            duration: 0.3,
            ease: "elastic.out(1, 0.5)",
          },
          "<",
        )
        .to(
          robotRefDesktop.current,
          {
            x: 0,
            y: 0,
            skewX: 0,
            opacity: 1,
            filter: "none",
            rotate: 45,
            duration: 0.3,
            ease: "elastic.out(1, 0.5)",
          },
          "<",
        );
    }
  }, [theme, previousRobot]);

  useEffect(() => {
    // 🎢 Scroll animation for desktop robot only
    if (robotRefDesktop.current) {
      gsap.fromTo(
        robotRefDesktop.current,
        {
          opacity: 0,
          x: -150,
          rotate: 0,
        },
        {
          opacity: 1,
          x: 0,
          rotate: 45,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            scrub: true,
          },
        },
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen mt-4 flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b from-base-100 via-base-200/20 to-base-100 text-base-content transition-all duration-500 overflow-hidden"
    >
      {/* Cyber Background Effects */}
      {/* Title with GSAP Glitch Effect */}
      <div ref={headerRef} className="mb-6 mt-8 relative z-10">
        <div className="mb-4">
          <TerminalBadge icon={Terminal}>&lt;SYSTEM_ONLINE&gt;</TerminalBadge>
        </div>

        <h1
          ref={glitchRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-3 tracking-tight relative"
        >
          <span className="bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent animate-gradient drop-shadow-lg">
            CyberNexus
          </span>
        </h1>

        <h2
          ref={glitchRef}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-secondary font-mono"
        >
          <span className="text-primary/60">&gt;</span> For Students. By
          Students.
        </h2>
      </div>

      {/* Description */}
      <div
        ref={descriptionRef}
        className="max-w-3xl mb-8 space-y-4 relative z-10"
      >
        <p className="text-base sm:text-lg md:text-xl text-base-content/80 leading-relaxed font-mono">
          <span className="text-primary font-bold"></span> Your student-run tech
          hub at Ibn Khaldoun University. We're all about building skills,
          sharing knowledge, and creating awesome projects together through
          workshops, courses, and hands-on experience.
        </p>

        <p className="text-sm sm:text-base text-base-content/60 italic font-mono">
          <span className="text-secondary">&gt;_</span> Whether you're just
          starting out or already a tech wizard, there's a place for you here!
        </p>
      </div>

      {/* Welcome Day Focus - Cyber Themed */}
      <div
        ref={countdownRef}
        className="w-full max-w-4xl mt-8 mb-12 relative z-10"
      >
        {/* 🦾 Mobile Robots - One on each side of the countdown, facing each other */}
        <div
          ref={robotRefMobileLeft}
          className="md:hidden absolute -top-16 -left-4 w-[100px] -rotate-15 pointer-events-none z-20"
        >
          <img
            src={robot === "boy" ? "/boy.png" : "/girl.png"}
            className="w-full drop-shadow-2xl scale-x-[-1]"
            alt="CyberNexus Robot"
          />
        </div>

        <div
          ref={robotRefMobileRight}
          className="md:hidden absolute -top-16 -right-4 w-[100px] rotate-15 pointer-events-none z-20"
        >
          <img
            src={robot === "boy" ? "/boy.png" : "/girl.png"}
            className="w-full drop-shadow-2xl"
            alt="CyberNexus Robot"
          />
        </div>

        <div ref={countdownCardRef} className="relative group perspective-1000">
          {/* Corner Brackets */}
          <CornerBrackets size="md" />

          {/* Animated border glow */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse-slow" />

          {/* Main border */}
          <div className="absolute inset-0 rounded-3xl border-2 border-primary/40 group-hover:border-primary/70 transition-all duration-300 neon-border-subtle" />

          {/* Card Content */}
          <div className="relative bg-gradient-to-br from-base-200/80 via-base-200/60 to-base-200/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border-2 border-base-content/10 shadow-2xl">
            {/* Data Lines */}
            <DataLine position="top" intensity="medium" />
            <DataLine position="bottom" intensity="medium" />

            {/* Scanline effect */}
            <div className="absolute inset-0 scanline-slow opacity-20 rounded-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-bold uppercase tracking-wider mb-4 shadow-lg border-2 border-primary/50 relative overflow-hidden group/badge">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300" />
                  <Calendar className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 font-mono">
                    WELCOME_DAY_2025
                  </span>
                  <Zap className="w-4 h-4 relative z-10 animate-pulse" />
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary mb-3 font-mono tracking-tight">
                  <span className="text-secondary/60"></span> Join Us on
                  November 18th!
                </h3>

                <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto font-mono leading-relaxed">
                  <span className="text-primary font-bold">&gt;</span> Meet the
                  team, explore what we do, and kick off your journey with
                  CyberNexus. It's going to be epic! 🚀
                </p>
              </div>

              {/* Countdown Component */}
              <CountdownToNov18 />
            </div>
          </div>
        </div>
      </div>

      {/* 🦾 Robot image with GSAP animation - Desktop only: top left corner */}
      <div
        ref={robotRefDesktop}
        className="hidden md:block absolute top-[80px] -left-[120px] rotate-45 w-[380px] opacity-100 pointer-events-none z-10"
      >
        <img
          src={robot === "boy" ? "/boy.png" : "/girl.png"}
          className="w-full drop-shadow-2xl filter group-hover:drop-shadow-[0_0_20px_rgba(var(--p),0.6)] transition-all duration-300"
          alt="CyberNexus Robot"
        />
      </div>
    </section>
  );
};

export default HeroSection;
