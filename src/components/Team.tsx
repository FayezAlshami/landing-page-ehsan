"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText, { FadeUp, MaskReveal } from "@/components/AnimatedText";

export const teamMembers = [
  { name: "حلا الشافعي", initial: "ح" },
  { name: "فايز الشامي", initial: "ف" },
  { name: "تقى عامر", initial: "ا" },
  { name: "لانا نوفل", initial: "ل" },
  { name: "ابتسام تلاوي", initial: "ا" },
  // { name: "لين", initial: "ل" },
];

interface MemberCardProps {
  name: string;
  initial: string;
  index: number;
  isInView: boolean;
}

function MemberCard({ name, initial, index, isInView }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 280, damping: 18 },
      }}
      className="group relative"
    >
      <div className="relative p-8 rounded-3xl glass-cream border border-[#17685B]/20 hover:border-[#17685B]/60 transition-all duration-400 overflow-hidden text-center">
        {/* Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(23,104,91,0.18), transparent 70%)",
          }}
        />

        {/* Avatar */}
        <div className="relative mx-auto mb-5 w-24 h-24">
          <div
            className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-60 blur-xl transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle, #17685B 0%, transparent 70%)",
            }}
          />
          <div
            className="relative w-full h-full rounded-full flex items-center justify-center text-[#F5F1E6] text-4xl font-black border border-[#17685B]/40 group-hover:scale-105 transition-transform duration-300"
            style={{
              background:
                "linear-gradient(135deg, #17685B 0%, #0d3d35 50%, #17685B 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(245,241,230,0.15), 0 8px 24px rgba(7,18,16,0.3)",
            }}
          >
            {initial}
          </div>
          {/* Orbit ring */}
          <div className="absolute -inset-3 rounded-full border border-dashed border-[#17685B]/20 group-hover:border-[#17685B]/50 transition-colors duration-500 pointer-events-none" />
        </div>

        {/* Name: animate per-word only — per-char breaks Arabic shaping */}
        <div className="relative">
          <AnimatedArabicName
            name={name}
            isInView={isInView}
            delay={index * 0.12 + 0.3}
          />
          <p className="text-[#17685B]/70 text-xs font-playfair tracking-[0.3em] mt-2">
            TEAM
          </p>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-2/3 bg-gradient-to-r from-transparent via-[#17685B] to-transparent transition-all duration-500" />
      </div>
    </motion.div>
  );
}

/** Per-letter spans break Arabic cursive joining; animate whole words instead. */
function AnimatedArabicName({
  name,
  isInView,
  delay,
}: {
  name: string;
  isInView: boolean;
  delay: number;
}) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  return (
    <h3
      dir="rtl"
      lang="ar"
      className="text-[#F5F1E6] font-bold text-lg md:text-xl text-center"
      aria-label={name}
      style={{ fontFeatureSettings: '"liga" 1, "calt" 1' }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block whitespace-nowrap">
          {i > 0 ? <span className="inline-block w-2" aria-hidden /> : null}
          <motion.span
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : {}
            }
            transition={{
              duration: 0.5,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h3>
  );
}

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-[#0d3d35] py-32 md:py-40 overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(245,241,230,0.4) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#17685B]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-16 md:mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-[#17685B]/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#17685B] animate-pulse" />
              <span className="text-[#F5F1E6]/60 text-sm tracking-widest">
                فريق العمل · The Team
              </span>
            </div>
          </FadeUp>

          <h2
            className="text-[#F5F1E6] font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <MaskReveal>
              <span>صنّاع</span>
            </MaskReveal>
            <MaskReveal delay={0.2}>
              <span className="text-gradient-gold"> إحسان</span>
            </MaskReveal>
          </h2>

          <FadeUp delay={0.5}>
            <AnimatedText
              as="p"
              text="فريق آمن بالفكرة، عمل عليها بإتقان، وحوّلها إلى تجربة رقمية حقيقية."
              className="text-[#F5F1E6]/55 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed"
              stagger={0.03}
            />
          </FadeUp>
          <FadeUp delay={0.7}>
            <p className="text-[#F5F1E6]/30 font-playfair text-base mt-2 italic">
              The minds and hands behind Ehsan.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {teamMembers.map((m, i) => (
            <MemberCard
              key={m.name}
              name={m.name}
              initial={m.initial}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
