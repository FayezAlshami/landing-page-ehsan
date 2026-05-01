"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedText, { FadeUp, MaskReveal } from "@/components/AnimatedText";

const allScreens = [
  "photo_2026-05-01_02-06-41.jpg",
  "photo_2026-05-01_02-06-48.jpg",
  "photo_2026-05-01_02-06-52.jpg",
  "photo_2026-05-01_02-06-55.jpg",
  "photo_2026-05-01_02-06-58.jpg",
  "photo_2026-05-01_02-07-00.jpg",
  "photo_2026-05-01_02-07-03.jpg",
  "photo_2026-05-01_02-07-06.jpg",
  "photo_2026-05-01_02-07-08.jpg",
  "photo_2026-05-01_02-07-11.jpg",
  "photo_2026-05-01_02-07-13.jpg",
  "photo_2026-05-01_02-07-16.jpg",
  "photo_2026-05-01_02-07-18.jpg",
  "photo_2026-05-01_02-07-21.jpg",
  "photo_2026-05-01_02-07-23.jpg",
  "photo_2026-05-01_02-11-23.jpg",
  "photo_2026-05-01_02-11-26.jpg",
  "photo_2026-05-01_02-53-00.jpg",
  "photo_2026-05-01_02-53-09.jpg",
  "photo_2026-05-01_02-53-11.jpg",
  "photo_2026-05-01_02-53-15.jpg",
  "photo_2026-05-01_02-53-18.jpg",
  "photo_2026-05-01_02-53-20.jpg",
  "photo_2026-05-01_02-53-28.jpg",
  "photo_2026-05-01_02-53-30.jpg",
  "photo_2026-05-01_02-53-33.jpg",
  "photo_2026-05-01_02-53-36.jpg",
  "photo_2026-05-01_02-53-38.jpg",
  "photo_2026-05-01_02-53-41.jpg",
  "photo_2026-05-01_02-53-43.jpg",
];

const row1 = allScreens.slice(0, 10);
const row2 = allScreens.slice(10, 20);
const row3 = allScreens.slice(20, 30);

interface PhoneScreenProps {
  file: string;
  layoutId: string;
  index: number;
  onOpen: (file: string) => void;
}

function PhoneScreen({ file, layoutId, index, onOpen }: PhoneScreenProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(file)}
      layoutId={layoutId}
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 250, damping: 18 },
      }}
      whileTap={{ scale: 0.97 }}
      className="relative shrink-0 w-[200px] md:w-[240px] aspect-[9/19.5] rounded-[2.2rem] overflow-hidden mx-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#17685B]"
      style={{
        boxShadow:
          "0 30px 60px -20px rgba(7,18,16,0.55), 0 0 0 8px #0d3d35, 0 0 0 9px rgba(23,104,91,0.35)",
      }}
      aria-label={`Open Ehsan app screen ${index + 1}`}
    >
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-[#0d3d35] z-20" />

      {/* Skeleton loader */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4a40] via-[#2a6055] to-[#1a4a40] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 30%, rgba(245,241,230,0.12) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.6s linear infinite",
            }}
          />
          <div className="absolute inset-x-6 top-12 h-3 rounded-full bg-[#F5F1E6]/10" />
          <div className="absolute inset-x-6 top-20 h-3 rounded-full bg-[#F5F1E6]/10 w-2/3" />
          <div className="absolute inset-x-6 top-32 h-32 rounded-2xl bg-[#F5F1E6]/10" />
          <div className="absolute inset-x-6 bottom-20 h-3 rounded-full bg-[#F5F1E6]/10" />
          <div className="absolute inset-x-6 bottom-12 h-3 rounded-full bg-[#F5F1E6]/10 w-1/2" />
        </div>
      )}

      <Image
        src={`/app-screens/${file}`}
        alt={`Ehsan app screen ${index + 1}`}
        fill
        sizes="240px"
        className={`object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        loading={index < 6 ? "eager" : "lazy"}
      />

      {/* Hover gleam overlay */}
      <div className="absolute inset-0 rounded-[2.2rem] pointer-events-none ring-1 ring-inset ring-white/5" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,241,230,0.0) 0%, rgba(245,241,230,0.18) 45%, rgba(245,241,230,0) 60%)",
        }}
      />

      {/* "Tap to view" hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[#F5F1E6] text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        اضغط للاستعراض
      </div>
    </motion.button>
  );
}

interface MarqueeRowProps {
  screens: string[];
  reverse?: boolean;
  speed?: number;
  startIdx: number;
  onOpen: (src: string) => void;
}

function MarqueeRow({
  screens,
  reverse = false,
  speed = 60,
  startIdx,
  onOpen,
}: MarqueeRowProps) {
  const doubled = [...screens, ...screens];
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        animate={{
          x: paused ? undefined : reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex"
        style={{ width: "max-content" }}
      >
        {doubled.map((file, i) => (
          <PhoneScreen
            key={`${file}-${i}`}
            file={file}
            layoutId={`phone-marquee-${startIdx}-${i}`}
            index={startIdx + i}
            onOpen={onOpen}
          />
        ))}
      </motion.div>
    </div>
  );
}

interface LightboxProps {
  src: string | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ src, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNext(); // RTL: left = next
      if (e.key === "ArrowRight") onPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#071210]/90 backdrop-blur-2xl"
          />

          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(23,104,91,0.25) 0%, transparent 70%)",
            }}
          />

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-[#F5F1E6]/10 hover:bg-[#F5F1E6]/20 backdrop-blur-md border border-[#F5F1E6]/20 flex items-center justify-center text-[#F5F1E6] transition-colors"
            aria-label="إغلاق"
          >
            <X size={22} />
          </motion.button>

          {/* Prev button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#F5F1E6]/10 hover:bg-[#17685B]/40 backdrop-blur-md border border-[#F5F1E6]/20 flex items-center justify-center text-[#F5F1E6] transition-colors"
            aria-label="السابق"
          >
            <ChevronRight size={22} />
          </motion.button>

          {/* Next button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#F5F1E6]/10 hover:bg-[#17685B]/40 backdrop-blur-md border border-[#F5F1E6]/20 flex items-center justify-center text-[#F5F1E6] transition-colors"
            aria-label="التالي"
          >
            <ChevronLeft size={22} />
          </motion.button>

          {/* Phone with shared layout id */}
          <motion.div
            layoutId={`phone-modal`}
            key={src}
            initial={{ scale: 0.6, opacity: 0, rotateY: -25, y: 60 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0, y: 0 }}
            exit={{ scale: 0.6, opacity: 0, rotateY: 25, y: 60 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[5]"
            style={{ perspective: 1200 }}
          >
            <div
              className="relative rounded-[3rem] overflow-hidden"
              style={{
                width: "min(360px, 80vw)",
                aspectRatio: "9 / 19.5",
                maxHeight: "85vh",
                boxShadow:
                  "0 50px 120px -20px rgba(0,0,0,0.7), 0 0 0 12px #0d3d35, 0 0 0 13px rgba(23,104,91,0.5), 0 0 80px rgba(23,104,91,0.3)",
              }}
            >
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 rounded-full bg-[#0d3d35] z-20" />

              <Image
                src={`/app-screens/${src}`}
                alt="Ehsan app full preview"
                fill
                sizes="360px"
                className="object-cover"
                priority
              />

              {/* Subtle inner ring */}
              <div className="absolute inset-0 rounded-[3rem] pointer-events-none ring-1 ring-inset ring-white/10" />
            </div>

            {/* Caption hint */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[#F5F1E6]/50 text-xs font-playfair tracking-[0.25em] whitespace-nowrap"
            >
              ESC · Click outside to close
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AppShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  const open = (src: string) => setActiveSrc(src);
  const close = () => setActiveSrc(null);
  const next = () => {
    if (!activeSrc) return;
    const i = allScreens.indexOf(activeSrc);
    setActiveSrc(allScreens[(i + 1) % allScreens.length]);
  };
  const prev = () => {
    if (!activeSrc) return;
    const i = allScreens.indexOf(activeSrc);
    setActiveSrc(
      allScreens[(i - 1 + allScreens.length) % allScreens.length]
    );
  };

  return (
    <LayoutGroup>
      <section
        id="showcase"
        className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-b from-[#071210] via-[#0d3d35] to-[#071210]"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full opacity-20 pointer-events-none blur-3xl"
          style={{
            background: "radial-gradient(ellipse, #17685B, transparent)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16 md:mb-20">
          <div className="text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-6 border border-[#17685B]/30">
                <span className="w-2 h-2 rounded-full bg-[#17685B] animate-pulse" />
                <span className="text-[#F5F1E6]/60 text-sm tracking-widest">
                  داخل التطبيق · Inside the app
                </span>
              </div>
            </FadeUp>

            <h2
              className="text-[#F5F1E6] font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              <MaskReveal>
                <span>تجربة مرتبة،</span>
              </MaskReveal>
              <MaskReveal delay={0.2}>
                <span className="text-gradient-brand">من الفكرة إلى التبرع</span>
              </MaskReveal>
            </h2>

            <FadeUp delay={0.5}>
              <p className="text-[#F5F1E6]/40 font-playfair text-lg mt-4">
                An organized journey, from the idea to the donation.
              </p>
            </FadeUp>

            <FadeUp delay={0.65}>
              <AnimatedText
                as="p"
                text="ألقِ نظرة على شاشات إحسان الفعلية، حيث تلتقي الوضوح، السرعة، والتنظيم في تجربة واحدة."
                className="text-[#F5F1E6]/55 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed"
                stagger={0.025}
              />
            </FadeUp>
          </div>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#071210] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#071210] to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <MarqueeRow screens={row1} speed={70} startIdx={0} onOpen={open} />
            <MarqueeRow
              screens={row2}
              reverse
              speed={80}
              startIdx={10}
              onOpen={open}
            />
            <MarqueeRow screens={row3} speed={75} startIdx={20} onOpen={open} />
          </motion.div>
        </div>
      </section>

      <Lightbox src={activeSrc} onClose={close} onPrev={prev} onNext={next} />
    </LayoutGroup>
  );
}
