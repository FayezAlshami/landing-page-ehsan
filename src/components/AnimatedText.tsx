"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Mode = "words" | "chars" | "lines";

interface AnimatedTextProps {
  text: string;
  mode?: Mode;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  highlight?: string[];
  highlightClassName?: string;
}

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -45,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function AnimatedText({
  text,
  mode = "words",
  className,
  wordClassName,
  delay = 0,
  stagger = 0.05,
  as = "span",
  highlight = [],
  highlightClassName = "text-gradient-brand",
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Tag = motion[as];

  const tokens = mode === "chars" ? Array.from(text) : text.split(" ");

  return (
    <Tag
      ref={ref as never}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("inline-block", className)}
      aria-label={text}
    >
      {tokens.map((token, i) => {
        const isHighlighted = highlight.some((h) => h.trim() === token.trim());
        return (
          <span
            key={`${token}-${i}`}
            className="inline-block overflow-hidden"
            style={{ perspective: 800 }}
          >
            <motion.span
              variants={mode === "chars" ? charVariants : wordVariants}
              className={cn(
                "inline-block",
                isHighlighted && highlightClassName,
                wordClassName
              )}
            >
              {token}
              {mode !== "chars" && i < tokens.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

interface MaskRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function MaskReveal({
  children,
  className,
  delay = 0,
  duration = 1,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : {}}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

export function FadeUp({
  children,
  className,
  delay = 0,
  y = 30,
  duration = 0.8,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
