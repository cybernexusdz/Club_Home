import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Base hook that just provides a section ref
 * Use the specific hooks below for actual animations
 */
export function useCyberAnimations() {
  const sectionRef = useRef(null);
  return { sectionRef };
}

/**
 * Animate header with intense glitch effect
 */
export function useCyberHeader(options = {}) {
  const {
    triggerStart = "top 85%",
    triggerEnd = "top 30%",
    scrub = 0.5,
  } = options;
  const headerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const children = Array.from(headerRef.current.children);

      children.forEach((child, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: triggerStart,
            end: triggerEnd,
            scrub: scrub,
          },
        });

        tl
          // Initial glitch entrance with RGB split
          .fromTo(
            child,
            {
              opacity: 0,
              x: i % 2 === 0 ? -50 : 50,
              filter: "blur(10px) brightness(2)",
              textShadow: "8px 0 #ff0000, -8px 0 #00ffff",
            },
            {
              opacity: 0.5,
              x: i % 2 === 0 ? -30 : 30,
              textShadow: "-8px 0 #ff00ff, 8px 0 #00ff00",
              duration: 0.1,
              ease: "power4.inOut",
            },
          )
          // Rapid glitch shake
          .to(child, {
            x: () => gsap.utils.random(-40, 40),
            skewX: () => gsap.utils.random(-25, 25),
            textShadow: "10px 0 #ff0000, -10px 0 #00ffff, 0 5px #ff00ff",
            duration: 0.05,
            ease: "none",
          })
          .to(child, {
            x: () => gsap.utils.random(-35, 35),
            skewX: () => gsap.utils.random(-20, 20),
            textShadow: "8px 0 #00ff00, -8px 0 #ff00ff",
            duration: 0.05,
            ease: "none",
          })
          .to(child, {
            x: () => gsap.utils.random(-30, 30),
            skewX: () => gsap.utils.random(-15, 15),
            textShadow: "12px 0 #ffff00, -12px 0 #ff0000",
            duration: 0.05,
            ease: "none",
          })
          // Opacity flicker
          .to(child, {
            opacity: 0.3,
            filter: "blur(5px) brightness(1.5)",
            textShadow: "15px 0 #ff0000, -15px 0 #00ffff",
            duration: 0.06,
          })
          .to(child, {
            opacity: 0.8,
            duration: 0.03,
          })
          .to(child, {
            opacity: 0.6,
            duration: 0.03,
          })
          // Final settle with elastic bounce
          .to(child, {
            opacity: 1,
            x: 0,
            skewX: 0,
            filter: "blur(0px) brightness(1)",
            textShadow: "none",
            duration: 0.3,
            ease: "elastic.out(1, 0.5)",
          });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [triggerStart, triggerEnd, scrub]);

  return { headerRef, sectionRef };
}

/**
 * Animate cards with intense cyber glitch effect
 */
export function useCyberCards(options = {}) {
  const {
    triggerStart = "top 95%",
    triggerEnd = "top 70%",
    scrub = 0.3,
    cardSelector = ".cyber-card",
  } = options;

  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current.querySelectorAll(cardSelector);

      cards.forEach((card, cardIndex) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: triggerStart,
            end: triggerEnd,
            scrub: scrub,
          },
        });

        // Main card entrance with massive glitch
        tl.fromTo(
          card,
          {
            opacity: 0,
            x: cardIndex % 2 === 0 ? -80 : 80,
            y: 50,
            filter:
              "drop-shadow(10px 0 #ff0000) drop-shadow(-10px 0 #00ffff) blur(10px)",
          },
          {
            opacity: 0.5,
            x: cardIndex % 2 === 0 ? -50 : 50,
            filter:
              "drop-shadow(-10px 0 #ff00ff) drop-shadow(10px 0 #00ff00) blur(5px)",
            duration: 0.1,
            ease: "power4.inOut",
          },
        )
          // Rapid fire glitches
          .to(card, {
            x: () => gsap.utils.random(-60, 60),
            y: () => gsap.utils.random(-30, 30),
            skewX: () => gsap.utils.random(-30, 30),
            filter: "drop-shadow(15px 0 #ff0000) drop-shadow(-15px 0 #00ffff)",
            duration: 0.05,
          })
          .to(card, {
            x: () => gsap.utils.random(-50, 50),
            y: () => gsap.utils.random(-20, 20),
            skewX: () => gsap.utils.random(-25, 25),
            filter: "drop-shadow(12px 0 #00ff00) drop-shadow(-12px 0 #ff00ff)",
            duration: 0.05,
          })
          .to(card, {
            x: () => gsap.utils.random(-40, 40),
            y: () => gsap.utils.random(-15, 15),
            skewX: () => gsap.utils.random(-20, 20),
            filter: "drop-shadow(18px 0 #ffff00) drop-shadow(-18px 0 #ff0000)",
            duration: 0.05,
          })
          // Opacity flicker with RGB blast
          .to(card, {
            opacity: 0.3,
            filter:
              "drop-shadow(20px 0 #ff0000) drop-shadow(-20px 0 #00ffff) brightness(1.5) blur(3px)",
            duration: 0.08,
          })
          .to(card, {
            opacity: 0.7,
            duration: 0.04,
          })
          .to(card, {
            opacity: 0.4,
            duration: 0.04,
          })
          // Final stabilization with elastic bounce
          .to(card, {
            opacity: 1,
            x: 0,
            y: 0,
            skewX: 0,
            filter: "drop-shadow(0 0 transparent) blur(0px) brightness(1)",
            duration: 0.4,
            ease: "elastic.out(1, 0.5)",
          });

        // Animate corner brackets with glitchy entrance
        const brackets = card.querySelectorAll(".corner-bracket");
        if (brackets.length > 0) {
          brackets.forEach((bracket) => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: card,
                  start: triggerStart,
                  end: triggerEnd,
                  scrub: scrub,
                },
              })
              .from(bracket, {
                scale: 0,
                opacity: 0,
                rotation: 180,
                filter:
                  "drop-shadow(5px 0 #ff0000) drop-shadow(-5px 0 #00ffff)",
                duration: 0.1,
                ease: "power4.out",
              })
              .to(bracket, {
                x: () => gsap.utils.random(-10, 10),
                rotation: () => gsap.utils.random(-15, 15),
                duration: 0.03,
                repeat: 2,
                yoyo: true,
              })
              .to(bracket, {
                x: 0,
                rotation: 0,
                filter: "drop-shadow(0 0 transparent)",
                duration: 0.1,
                ease: "elastic.out(1, 0.3)",
              });
          });
        }

        // Animate data lines with glitchy RGB scan
        const dataLines = card.querySelectorAll(".data-line");
        if (dataLines.length > 0) {
          dataLines.forEach((line) => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: card,
                  start: triggerStart,
                  end: triggerEnd,
                  scrub: scrub,
                },
              })
              .from(line, {
                scaleX: 0,
                opacity: 0,
                filter:
                  "drop-shadow(8px 0 #ff0000) drop-shadow(-8px 0 #00ffff)",
                duration: 0.15,
                ease: "power2.out",
              })
              .to(line, {
                scaleX: 1.1,
                filter:
                  "drop-shadow(5px 0 #00ff00) drop-shadow(-5px 0 #ff00ff)",
                duration: 0.03,
              })
              .to(line, {
                scaleX: 0.95,
                filter:
                  "drop-shadow(3px 0 #ffff00) drop-shadow(-3px 0 #ff0000)",
                duration: 0.03,
              })
              .to(line, {
                scaleX: 1,
                filter: "drop-shadow(0 0 transparent)",
                duration: 0.05,
                ease: "power2.out",
              });
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [triggerStart, triggerEnd, scrub, cardSelector]);

  return { containerRef };
}

/**
 * Glitchy fade-in animation for any element
 */
export function useCyberFadeIn(options = {}) {
  const {
    triggerStart = "top 90%",
    triggerEnd = "top 50%",
    scrub = 0.5,
  } = options;
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: elementRef.current,
          start: triggerStart,
          end: triggerEnd,
          scrub: scrub,
        },
      });

      tl
        // Initial glitch entrance
        .fromTo(
          elementRef.current,
          {
            opacity: 0,
            y: 60,
            filter: "blur(8px)",
            textShadow: "10px 0 #ff0000, -10px 0 #00ffff",
          },
          {
            opacity: 0.6,
            y: 40,
            textShadow: "-10px 0 #ff00ff, 10px 0 #00ff00",
            duration: 0.1,
            ease: "power4.inOut",
          },
        )
        // Quick RGB shake
        .to(elementRef.current, {
          x: () => gsap.utils.random(-25, 25),
          skewX: () => gsap.utils.random(-20, 20),
          textShadow: "8px 0 #ff0000, -8px 0 #00ffff",
          duration: 0.05,
        })
        .to(elementRef.current, {
          x: () => gsap.utils.random(-20, 20),
          skewX: () => gsap.utils.random(-15, 15),
          textShadow: "6px 0 #00ff00, -6px 0 #ff00ff",
          duration: 0.05,
        })
        // Flicker
        .to(elementRef.current, {
          opacity: 0.4,
          filter: "blur(4px) brightness(1.3)",
          duration: 0.06,
        })
        .to(elementRef.current, {
          opacity: 0.9,
          duration: 0.03,
        })
        // Final settle
        .to(elementRef.current, {
          opacity: 1,
          y: 0,
          x: 0,
          skewX: 0,
          filter: "blur(0px) brightness(1)",
          textShadow: "none",
          duration: 0.2,
          ease: "elastic.out(1, 0.5)",
        });
    }, elementRef);

    return () => ctx.revert();
  }, [triggerStart, triggerEnd, scrub]);

  return { elementRef };
}
