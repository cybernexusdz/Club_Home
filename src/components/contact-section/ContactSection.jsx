import { useState, useCallback, useMemo, memo, useRef, useEffect } from "react";
import { Mail, MapPin, Send, Terminal, Code2, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGlitchAnimation from "../../hooks/useGlitchAnimation";
import { useScrollReveal } from "../../hooks/useGsapAnimation";
import {
  CornerBrackets,
  TerminalBadge,
  DataLine,
  StatusIndicator,
} from "../ui/CyberBackground";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

// Memoized FormCard - NOW WITH MOBILE FIX
const FormCard = memo(
  ({
    handleMouseEnter,
    handleMouseLeave,
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    isFormValid,
    submitStatus,
    systemStatus,
    systemStatusType,
  }) => (
    <div
      className="contact-card relative group h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CornerBrackets size="md" />

      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-2xl border-2 border-primary/40 group-hover:border-primary/70 transition-all duration-300" />

      {/* MOBILE FIX: Added max-w-full and reduced padding on mobile */}
      <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl bg-base-200/95 border-2 border-base-content/10 shadow-2xl transition-all duration-300 h-full flex flex-col max-w-full">
        <DataLine position="top" intensity="medium" />

        <div className="space-y-2 mb-4 sm:mb-6">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-md border border-primary/30 text-xs font-mono text-primary uppercase tracking-widest">
            <Terminal className="inline w-3 h-3 mr-1" />
            Message Protocol
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight font-mono group-hover:text-primary transition-colors duration-300">
            Send us a message
          </h3>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-base-content font-bold mb-2 font-mono text-xs sm:text-sm uppercase tracking-wider"
            >
              <span className="text-secondary">&gt;</span> Your Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-primary/70 w-4 h-4 sm:w-5 sm:h-5 z-10" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-base-100/90 border-2 border-primary/20 rounded-xl focus:border-primary focus:outline-none transition-all text-base-content font-mono hover:border-primary/40 shadow-inner text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-base-content font-bold mb-2 font-mono text-xs sm:text-sm uppercase tracking-wider"
            >
              <span className="text-secondary">&gt;</span> Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              placeholder="Tell us what you're interested in..."
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-base-100/90 border-2 border-primary/20 rounded-xl focus:border-primary focus:outline-none transition-all resize-none text-base-content font-mono hover:border-primary/40 shadow-inner text-sm sm:text-base"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !isFormValid}
            className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg border-2 border-primary/50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group/btn text-sm sm:text-base"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm relative z-10"></span>
                <span className="relative z-10 font-mono tracking-wider">
                  TRANSMITTING...
                </span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                <span className="relative z-10 font-mono tracking-wider flex items-center gap-1 sm:gap-2">
                  SEND_MESSAGE
                  <span className="text-xs opacity-70 hidden sm:inline">
                    .exe
                  </span>
                </span>
                <Zap className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:animate-pulse" />
              </>
            )}
          </button>

          {submitStatus === "success" && (
            <div className="bg-success/10 border-2 border-success/50 text-success px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-center font-bold font-mono relative overflow-hidden text-xs sm:text-sm">
              <span className="relative z-10">✓ MESSAGE_TRANSMITTED</span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-error/10 border-2 border-error/50 text-error px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-center font-bold font-mono relative overflow-hidden text-xs sm:text-sm">
              <span className="relative z-10">✗ TRANSMISSION_FAILED</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <StatusIndicator
              label="SYSTEM"
              value={systemStatus}
              type={systemStatusType}
            />
            <StatusIndicator label="PROTOCOL" value="SMTP" type="primary" />
          </div>
        </div>

        <DataLine position="bottom" intensity="medium" />
      </div>
    </div>
  ),
);

FormCard.displayName = "FormCard";

// MapCard - NOW WITH MOBILE FIX AND CYBER MAP OPTIONS
const MapCard = memo(({ handleMouseEnter, handleMouseLeave }) => (
  <div
    className="contact-card relative group"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <CornerBrackets size="md" />

    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
    <div className="absolute inset-0 rounded-2xl border-2 border-primary/40 group-hover:border-primary/70 transition-all duration-300" />

    {/* MOBILE FIX: Added max-w-full and reduced padding on mobile */}
    <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl bg-base-200/95 border-2 border-base-content/10 shadow-2xl transition-all duration-300 max-w-full">
      <DataLine position="top" intensity="medium" />

      <div className="space-y-2 mb-4 sm:mb-6">
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-md border border-primary/30 text-xs font-mono text-primary uppercase tracking-widest">
          <MapPin className="inline w-3 h-3 mr-1" />
          Coordinates
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight font-mono group-hover:text-primary transition-colors duration-300">
          Our Location
        </h3>
      </div>

      <div className="mb-4 sm:mb-6 flex items-start gap-2 sm:gap-3 text-base-content/80 bg-base-100/40 p-3 sm:p-4 rounded-lg border border-primary/20">
        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-primary flex-shrink-0" />
        <div className="font-mono text-xs sm:text-sm">
          <p className="font-bold text-base-content">
            <span className="text-secondary">&gt;</span> Ibn Khaldoun University
          </p>
          <p className="text-base-content/70">
            Faculty of Mathematics and Computer Science
          </p>
          <p className="text-base-content/70">Tiaret, Algeria</p>
        </div>
      </div>

      {/* Google Maps - Clean version */}
      <div className="w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden border-2 border-primary/30 relative shadow-2xl group-hover:border-primary/50 transition-all duration-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2736.4522640683!2d1.3209439433091803!3d35.350471531917535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1286d1b08df59eab%3A0xd7ba2589aab1d516!2z2YPZhNmK2Kkg2KfZhNix2YrYp9i22YrYp9iqINmIINin2YTYp9i52YTYp9mFINin2YTYotmE2Yo!5e0!3m2!1sen!2sdz!4v1762766791505!5m2!1sen!2sdz"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ibn Khaldoun University Tiaret Location"
          className="relative z-0"
        />
      </div>

      <div className="flex flex-wrap gap-2 pt-3 sm:pt-4">
        <StatusIndicator label="GPS" value="LOCKED" type="success" />
        <StatusIndicator label="SIGNAL" value="STRONG" type="success" />
        <StatusIndicator label="PRECISION" value="HIGH" type="primary" />
      </div>

      <DataLine position="bottom" intensity="medium" />
    </div>
  </div>
));

MapCard.displayName = "MapCard";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const hasAnimatedRef = useRef(false);
  const { ref: glitchRef } = useGlitchAnimation({ repeatDelay: 3 });

  const headerRef = useScrollReveal({ y: 40, duration: 0.8 });
  const cardsRef = useScrollReveal({ y: 50, duration: 0.9, start: "top 80%" });

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

  const emailConfig = useMemo(
    () => ({
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    }),
    [],
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const templateParams = {
          from_email: formData.email,
          message: formData.message,
        };

        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          templateParams,
          emailConfig.publicKey,
        );

        setSubmitStatus("success");
        setFormData({ email: "", message: "" });

        setTimeout(() => setSubmitStatus(null), 5000);
      } catch (error) {
        console.error("EmailJS Error:", error);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData.email, formData.message, emailConfig],
  );

  const handleMouseEnterForm = useCallback(() => setHoveredCard(0), []);
  const handleMouseEnterMap = useCallback(() => setHoveredCard(1), []);
  const handleMouseLeave = useCallback(() => setHoveredCard(null), []);

  const isFormValid = useMemo(
    () => formData.email && formData.message,
    [formData.email, formData.message],
  );

  const systemStatus = useMemo(
    () => (isSubmitting ? "BUSY" : "READY"),
    [isSubmitting],
  );

  const systemStatusType = useMemo(
    () => (isSubmitting ? "warning" : "success"),
    [isSubmitting],
  );

  return (
    <section className="min-h-screen py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-10 bg-gradient-to-b from-base-100 via-base-200/20 to-base-100 relative overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full space-y-8 sm:space-y-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center space-y-3 sm:space-y-4">
          <div className="mb-3 sm:mb-4">
            <TerminalBadge icon={Terminal}>
              &lt;COMMUNICATION_CHANNEL&gt;
            </TerminalBadge>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-base-content tracking-tight font-mono px-2">
            <span className="text-primary/60">&gt;</span> Get In{" "}
            <span
              ref={glitchRef}
              className="relative inline-block bg-gradient-to-r from-primary via-secondary to-info bg-clip-text text-transparent"
            >
              Touch
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-base-content/70 max-w-3xl mx-auto leading-relaxed font-mono px-4">
            <span className="text-primary font-bold">&gt;</span> Interested in
            partnering with CYBERNEXUS? We welcome collaborations with companies
            and organizations looking to support tech innovation and student
            development.
          </p>

          <div className="flex items-center justify-center gap-2 text-primary/40 font-mono text-xs pt-2 sm:pt-4">
            <Code2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <div className="flex gap-1">
              <span className="animate-pulse hidden sm:inline">
                ────────────────────────────────────────
              </span>
              <span className="animate-pulse sm:hidden">──────────────</span>
            </div>
            <Code2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>

        {/* Contact Cards Grid - MOBILE FIX: Better gap spacing */}
        <div
          ref={cardsRef}
          className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
        >
          <FormCard
            hoveredCard={hoveredCard}
            handleMouseEnter={handleMouseEnterForm}
            handleMouseLeave={handleMouseLeave}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isFormValid={isFormValid}
            submitStatus={submitStatus}
            systemStatus={systemStatus}
            systemStatusType={systemStatusType}
          />

          {/* Change mapStyle prop: "cyber" or "google-cyber" */}
          <MapCard
            hoveredCard={hoveredCard}
            handleMouseEnter={handleMouseEnterMap}
            handleMouseLeave={handleMouseLeave}
            mapStyle="cyber"
          />
        </div>
      </div>
    </section>
  );
}
