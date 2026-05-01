"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LenisScrollContextValue = {
  scrollToSelector: (selector: string) => void;
};

const LenisScrollContext = createContext<LenisScrollContextValue | null>(null);

/** Smooth scroll to an in-page anchor; uses Lenis when active (matches wheel smooth scroll). */
export function useLenisScrollTo() {
  const ctx = useContext(LenisScrollContext);
  return (
    ctx?.scrollToSelector ??
    ((selector: string) => {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    })
  );
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  const scrollToSelector = useCallback((selector: string) => {
    const lenis = lenisRef.current;
    if (!selector.startsWith("#")) {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (lenis) {
      lenis.scrollTo(selector, { offset: -96 });
    } else {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <LenisScrollContext.Provider value={{ scrollToSelector }}>
      {children}
    </LenisScrollContext.Provider>
  );
}
