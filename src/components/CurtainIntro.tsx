"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SESSION_KEY = "ehsan_intro_played";

/** Fixed spark layout — avoids Math.random() hydration mismatch */
const CURTAIN_SPARKS = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2;
  const radius = 140 + ((i * 37) % 61);
  const x = Math.round(Math.cos(angle) * radius * 1000) / 1000;
  const y = Math.round(Math.sin(angle) * radius * 1000) / 1000;
  const colors = ["#c9a84c", "#17685B", "#F5F1E6"] as const;
  const bg = colors[i % 3];
  return { x, y, bg };
});

export default function CurtainIntro() {
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const logoArRef = useRef<HTMLDivElement>(null);
  const logoEnRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SESSION_KEY)) {
      setHidden(true);
      return;
    }

    setMounted(true);
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          delay: 0.2,
          onComplete: () => {
            sessionStorage.setItem(SESSION_KEY, "1");
            document.body.style.overflow = "";
            setHidden(true);
          },
        });
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(SESSION_KEY, "1");
          document.body.style.overflow = "";
          setHidden(true);
        },
      });

      // 1) Logo (Arabic) reveals with scale + glow
      tl.fromTo(
        logoArRef.current,
        {
          scale: 0.4,
          opacity: 0,
          filter: "blur(20px)",
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
        }
      )
        // Sparkle ring scales out
        .fromTo(
          ringRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1.6, opacity: 0.5, duration: 1.4, ease: "expo.out" },
          "-=0.9"
        )
        // English subtitle
        .fromTo(
          logoEnRef.current,
          { y: 24, opacity: 0, letterSpacing: "0.05em" },
          {
            y: 0,
            opacity: 1,
            letterSpacing: "0.4em",
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.7"
        )
        // Gold underline draws
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "center" },
          { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
          "-=0.5"
        )
        // Sparkle particles burst
        .fromTo(
          ".curtain-spark",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: { each: 0.04, from: "random" },
            ease: "back.out(2)",
          },
          "-=0.3"
        )
        // Hold the brand for a beat
        .to({}, { duration: 0.45 })
        // Fade brand out as curtains start
        .to(
          [logoArRef.current, logoEnRef.current, lineRef.current, ringRef.current, sparkleRef.current],
          {
            opacity: 0,
            scale: 1.05,
            duration: 0.5,
            ease: "power2.in",
          }
        )
        // Curtains slide apart
        .to(
          leftPanelRef.current,
          {
            xPercent: -101,
            duration: 1.3,
            ease: "expo.inOut",
          },
          "-=0.35"
        )
        .to(
          rightPanelRef.current,
          {
            xPercent: 101,
            duration: 1.3,
            ease: "expo.inOut",
          },
          "<"
        )
        // Final container fade
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
        });
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ visibility: mounted ? "visible" : "hidden" }}
      aria-hidden="true"
    >
      {/* Left panel */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#071210] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #071210 0%, #0d3d35 50%, #071210 100%)",
        }}
      >
        {/* Inner edge gold accent */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#c9a84c]/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.5) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Right panel */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#071210] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(225deg, #071210 0%, #0d3d35 50%, #071210 100%)",
        }}
      >
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#c9a84c]/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.5) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Center brand mark (sits above panels) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div ref={sparkleRef} className="relative">
          {/* Expanding ring */}
          <div
            ref={ringRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-[#17685B]/40 opacity-0"
            style={{
              boxShadow:
                "inset 0 0 80px rgba(23,104,91,0.3), 0 0 60px rgba(23,104,91,0.2)",
            }}
          />

          {/* Sparkle particles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none">
            {CURTAIN_SPARKS.map((spark, i) => (
              <span
                key={i}
                className="curtain-spark absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full opacity-0"
                style={{
                  transform: `translate(${spark.x}px, ${spark.y}px)`,
                  backgroundColor: spark.bg,
                  boxShadow: `0 0 12px ${spark.bg}`,
                }}
              />
            ))}
          </div>

          {/* Arabic logo */}
          <div
            ref={logoArRef}
            className="opacity-0 text-center relative"
            style={{
              fontSize: "clamp(5rem, 14vw, 12rem)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            <span
              className="text-gradient-brand"
              style={{
                filter: "drop-shadow(0 0 40px rgba(23,104,91,0.6))",
              }}
            >
              إحسان
            </span>
          </div>

          {/* Underline */}
          <div
            ref={lineRef}
            className="mx-auto mt-4 h-px w-48 md:w-72 opacity-90 origin-center scale-x-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #c9a84c 50%, transparent 100%)",
              boxShadow: "0 0 12px rgba(201,168,76,0.6)",
            }}
          />

          {/* English subtitle */}
          <div
            ref={logoEnRef}
            className="opacity-0 mt-6 text-center font-playfair text-[#F5F1E6]/70 text-sm md:text-xl uppercase"
            style={{ letterSpacing: "0.05em" }}
          >
            EHSAN · The Smart Donation Platform
          </div>
        </div>
      </div>
    </div>
  );
}
