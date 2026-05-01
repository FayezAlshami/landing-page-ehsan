"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "الرئيسية", labelEn: "Home", href: "#hero" },
  { label: "عن المنصة", labelEn: "About", href: "#about" },
  { label: "الميزات", labelEn: "Features", href: "#features" },
  // { label: "الأثر", labelEn: "Impact", href: "#stats" },
  { label: "تواصل معنا", labelEn: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-3 bg-[#071210]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/30"
            : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-12 h-12 shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-[#17685B]/40 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-12 h-12 rounded-2xl bg-[#F5F1E6] p-1 ring-1 ring-[#17685B]/20 group-hover:ring-[#c9a84c]/60 group-hover:scale-105 transition-all duration-300 shadow-md shadow-black/30 overflow-hidden flex items-center justify-center">
                <Image
                  src="/ehsan-logo.png"
                  alt="Ehsan logo"
                  width={48}
                  height={48}
                  priority
                  className="w-full h-full object-contain"
                  style={{ objectPosition: "center 30%", transform: "scale(1.5)" }}
                />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[#F5F1E6] font-bold text-xl tracking-wide">إحسان</span>
              <span className="text-[#17685B] text-xs font-light tracking-[0.2em] font-playfair">EHSAN</span>
            </div>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                className="relative text-[#F5F1E6]/70 hover:text-[#F5F1E6] text-sm font-medium transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-1 right-0 w-0 h-px bg-[#17685B] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 rounded-full bg-[#17685B] text-[#F5F1E6] text-sm font-semibold hover:bg-[#1e8a77] transition-colors duration-200 shadow-lg shadow-[#17685B]/30"
            >
              ابدأ الآن
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#F5F1E6]/80 hover:text-[#F5F1E6] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed inset-0 z-40 bg-[#071210]/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="text-[#F5F1E6] text-3xl font-bold hover:text-[#17685B] transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 px-10 py-3 rounded-full bg-[#17685B] text-[#F5F1E6] text-lg font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              ابدأ الآن
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
