"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" className="relative bg-[#071210] py-32 md:py-40 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pulse-animation"
          style={{
            background: "radial-gradient(circle, rgba(23,104,91,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#17685B]/10 pulse-animation"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#17685B]/5 pulse-animation"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-[#17685B]/30 mb-8"
        >
          <Sparkles size={14} className="text-[#17685B]" />
          <span className="text-[#F5F1E6]/70 text-sm">انضم إلى مجتمع الخير · Join the Community</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-[#F5F1E6] font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          ابدأ رحلة العطاء{" "}
          <br />
          <span className="text-gradient-brand">اليوم</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#F5F1E6]/60 text-lg md:text-xl leading-relaxed mb-4 font-light"
        >
          كل تبرع صغير يمكن أن يغيّر حياة إنسان. انضم إلى آلاف المتبرعين الذين
          يصنعون الفرق مع إحسان.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#F5F1E6]/30 text-base font-playfair italic mb-14"
        >
          Every small act of giving can transform a life. Join thousands making a
          difference with Ehsan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(23,104,91,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-3 px-12 py-5 rounded-full bg-[#17685B] text-[#F5F1E6] font-bold text-lg shadow-2xl shadow-[#17685B]/30 transition-all duration-300"
          >
            <span>ابدأ مجاناً الآن</span>
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-12 py-5 rounded-full glass-cream text-[#F5F1E6]/80 font-semibold text-lg border border-white/10 hover:border-[#17685B]/40 hover:text-[#F5F1E6] transition-all duration-300"
          >
            تعرف على المزيد
          </motion.button>
        </motion.div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-[#F5F1E6]/25 text-sm font-playfair"
        >
          مجاني تماماً · لا بطاقة مطلوبة · آمن ومشفر
          <br />
          <span className="text-[#F5F1E6]/15">
            Completely free · No card required · Secure & Encrypted
          </span>
        </motion.p>
      </div>
    </section>
  );
}
