"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Heart, Shield, Zap, Sparkles } from "lucide-react";

// Three badges in a horizontal row beneath the eyebrow pill, above the title.
const floatingBadges = [
  { icon: Heart,  label: "تبرع آمن",      en: "Secure Donations",  delay: 0   },
  { icon: Shield, label: "شفافية كاملة", en: "Full Transparency", delay: 0.15 },
  { icon: Zap,    label: "لحظي وسريع",   en: "Instant & Fast",   delay: 0.3  },
];

/** Deterministic particle styles — same on server & client (no Math.random). */
const HERO_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  width: 2 + ((i * 7) % 60) / 10,
  height: 2 + ((i * 11) % 50) / 10,
  left: 5 + ((i * 23) % 85),
  top: 7 + ((i * 31) % 83),
  delay: ((i * 41) % 60) / 10,
  duration: 4 + ((i * 13) % 40) / 10,
}));

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        orbRef.current,
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      )
        .fromTo(
          titleRef.current,
          { y: 80, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.2 },
          "-=1.5"
        )
        .fromTo(
          ".hero-line",
          { scaleX: 0, transformOrigin: "center" },
          { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
          "-=0.6"
        )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.5"
        )
        .fromTo(
          ".hero-verse",
          { y: 30, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 },
          "-=0.6"
        )
        .fromTo(
          ".hero-desc",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.5"
        )
        .fromTo(
          ".hero-badge",
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.7"
        );

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 30;
        const y = (clientY / innerHeight - 0.5) * 20;

        gsap.to(orbRef.current, {
          x,
          y,
          duration: 2,
          ease: "power1.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center hero-pattern overflow-hidden"
    >
      {/* Background orb / glow */}
      <div
        ref={orbRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full opacity-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(23,104,91,0.35) 0%, rgba(23,104,91,0.15) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full border border-[#17685B]/10 pulse-animation" />
        <div
          className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border border-[#17685B]/5 pulse-animation"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Floating particles */}
      {HERO_PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#17685B]/30 pointer-events-none float-animation"
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pt-24 pb-16">

        {/* Eyebrow — luxurious gold-edged pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative inline-block mb-8"
        >
          <div
            className="absolute -inset-1 rounded-full opacity-60 blur-md pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(201,168,76,0.3), rgba(23,104,91,0.4), rgba(201,168,76,0.3))",
            }}
          />
          <div
            className="relative rounded-full p-[1.5px]"
            style={{
              background:
                "linear-gradient(120deg, rgba(201,168,76,0.7) 0%, rgba(23,104,91,0.4) 35%, rgba(245,241,230,0.15) 50%, rgba(23,104,91,0.4) 65%, rgba(201,168,76,0.7) 100%)",
            }}
          >
            <div
              className="rounded-full px-6 py-2.5 flex items-center gap-3 backdrop-blur-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(13,61,53,0.85) 0%, rgba(7,18,16,0.9) 100%)",
              }}
            >
              <Sparkles
                size={13}
                className="text-[#c9a84c]"
                style={{ filter: "drop-shadow(0 0 6px rgba(201,168,76,0.6))" }}
              />
              <span className="text-[#F5F1E6] text-xs md:text-sm font-medium tracking-[0.18em]">
                تطبيق التبرع الرقمي لسوريا
              </span>
              <span className="w-1 h-1 rounded-full bg-[#c9a84c]/60" />
              <span className="text-[#F5F1E6]/55 text-[10px] md:text-xs font-playfair tracking-[0.2em] uppercase">
                Digital Giving for Syria
              </span>
              <Sparkles
                size={13}
                className="text-[#c9a84c]"
                style={{ filter: "drop-shadow(0 0 6px rgba(201,168,76,0.6))" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Mini badges row — between eyebrow and title */}
        <div className="hidden sm:flex items-center justify-center gap-3 mb-8">
          {floatingBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + badge.delay,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="hero-badge flex items-center gap-2 px-4 py-2 rounded-full glass-cream border border-[#17685B]/25 shadow-sm backdrop-blur-xl"
              >
                <div className="w-6 h-6 rounded-lg bg-[#17685B]/20 flex items-center justify-center shrink-0">
                  <Icon size={13} className="text-[#17685B]" />
                </div>
                <span className="text-[#F5F1E6]/85 text-xs font-medium whitespace-nowrap">
                  {badge.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Main Title — Amiri for perfect Arabic hamza rendering */}
        <h1
          ref={titleRef}
          className="opacity-0 leading-none mb-3"
          style={{
            fontSize: "clamp(5rem, 15vw, 13rem)",
            fontFamily: "var(--font-amiri-var), 'Amiri', serif",
            fontWeight: 700,
          }}
        >
          <span
            className="text-gradient-brand"
            style={{
              filter: "drop-shadow(0 0 40px rgba(23,104,91,0.35))",
            }}
          >
            إحسان
          </span>
        </h1>

        {/* Divider line */}
        <div className="hero-line w-40 h-px bg-gradient-to-r from-transparent via-[#17685B] to-transparent mx-auto mb-5 scale-x-0" />

        {/* English Title */}
        <p
          ref={subtitleRef}
          className="opacity-0 font-playfair text-[#F5F1E6]/60 text-xl md:text-3xl tracking-[0.35em] uppercase mb-10"
        >
          Ehsan
        </p>

        {/* Quran verse */}
        <div className="hero-verse opacity-0 mb-10 flex items-center justify-center">
          <div className="relative max-w-2xl mx-auto">
            <div
              className="absolute -inset-6 rounded-3xl opacity-40 blur-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, transparent 70%)",
              }}
            />

            <div className="relative flex items-center gap-4 px-2 mb-3">
              <span
                className="hidden sm:block flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
                }}
              />
              <span
                className="text-[#c9a84c] text-xl leading-none select-none"
                aria-hidden="true"
                style={{
                  fontFamily: "serif",
                  filter: "drop-shadow(0 0 6px rgba(201,168,76,0.4))",
                }}
              >
                ﷽
              </span>
              <span
                className="hidden sm:block flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
                }}
              />
            </div>

            <p
              dir="rtl"
              lang="ar"
              className="relative px-4 md:px-8 text-[#F5F1E6] text-xl md:text-2xl lg:text-3xl leading-loose font-medium text-center"
              style={{
                fontFamily: "var(--font-amiri-var), 'Amiri', serif",
                textShadow:
                  "0 0 22px rgba(245,241,230,0.15), 0 0 48px rgba(201,168,76,0.12)",
              }}
            >
              <span
                className="text-[#c9a84c] text-2xl md:text-4xl mx-1 align-middle inline-block"
                aria-hidden="true"
                style={{ filter: "drop-shadow(0 0 8px rgba(201,168,76,0.5))" }}
              >
                ﴿
              </span>
              <span className="mx-1">
                وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ
              </span>
              <span
                className="text-[#c9a84c] text-2xl md:text-4xl mx-1 align-middle inline-block"
                aria-hidden="true"
                style={{ filter: "drop-shadow(0 0 8px rgba(201,168,76,0.5))" }}
              >
                ﴾
              </span>
            </p>

            <p
              dir="rtl"
              className="mt-2 text-center text-[#c9a84c]/65 text-xs md:text-sm font-playfair tracking-[0.2em]"
            >
              سُورَةُ الْبَقَرَة · الآية ١٩٥
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="hero-desc opacity-0 text-[#F5F1E6]/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 font-light">
          فرص التبرع كلها في مكان واحد. ترى الفرصة، تعرف المبلغ المتبقي، وتتبرع
          مباشرة أو تضيفها إلى السلة.
          <br />
          <span className="text-[#F5F1E6]/45 text-sm font-light font-playfair">
            Every charitable opportunity in one clear, organized place.
          </span>
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="opacity-0 flex flex-wrap items-center justify-center gap-4">
          <button className="group relative px-10 py-4 rounded-full bg-[#17685B] text-[#F5F1E6] font-semibold text-lg overflow-hidden hover:bg-[#1e8a77] transition-colors duration-300 shadow-2xl shadow-[#17685B]/40 hover:shadow-[#17685B]/60">
            <span className="relative z-10">ابدأ التبرع الآن</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#17685B] to-[#2a9d8f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button className="px-10 py-4 rounded-full glass-cream text-[#F5F1E6]/80 font-semibold text-lg hover:text-[#F5F1E6] hover:border-[#17685B]/50 transition-all duration-300 border border-white/10">
            اكتشف المنصة
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F5F1E6] to-transparent pointer-events-none" />
    </section>
  );
}
