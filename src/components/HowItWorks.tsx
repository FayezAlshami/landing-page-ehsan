"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, Search, Heart, BarChart3 } from "lucide-react";
import { FadeUp, MaskReveal } from "@/components/AnimatedText";

const steps = [
  {
    num: "01",
    icon: UserPlus,
    ar: "سجّل حسابك",
    en: "Create your account",
    desc: "إنشاء حساب مجاني في ثوانٍ، بمعلوماتك الأساسية فقط.",
  },
  {
    num: "02",
    icon: Search,
    ar: "اختر مشروعك",
    en: "Choose your cause",
    desc: "تصفح مئات المشاريع الخيرية المصنفة والمعتمدة.",
  },
  {
    num: "03",
    icon: Heart,
    ar: "تبرّع بأمان",
    en: "Donate securely",
    desc: "ادفع عبر بوابات دفع آمنة ومشفرة بأعلى المعايير.",
  },
  {
    num: "04",
    icon: BarChart3,
    ar: "تابع أثرك",
    en: "Track your impact",
    desc: "شاهد كيف تحوّلت تبرعاتك إلى أثر حقيقي وملموس.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#0d3d35] py-32 md:py-40 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(245,241,230,0.4) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#F5F1E6]/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#F5F1E6]/40 animate-pulse" />
              <span className="text-[#F5F1E6]/60 text-sm tracking-widest">
                كيف يعمل · How It Works
              </span>
            </div>
          </FadeUp>

          <h2
            className="text-[#F5F1E6] font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <MaskReveal>
              <span>أربع خطوات إلى</span>
            </MaskReveal>
            <MaskReveal delay={0.2}>
              <span className="text-gradient-gold"> أثر حقيقي</span>
            </MaskReveal>
          </h2>
          <FadeUp delay={0.5}>
            <p className="text-[#F5F1E6]/40 font-playfair text-lg">
              Four steps to real, meaningful impact.
            </p>
          </FadeUp>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#17685B]/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                  className="group relative text-center"
                >
                  {/* Step number & icon */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-[#17685B]/10 group-hover:bg-[#17685B]/20 transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-2xl border border-[#17685B]/20 group-hover:border-[#17685B]/50 transition-colors duration-300" />
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Icon size={32} className="text-[#17685B]" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#071210] border border-[#17685B]/30 flex items-center justify-center">
                      <span className="text-[#17685B] text-xs font-black">{step.num}</span>
                    </div>
                  </div>

                  <h3 className="text-[#F5F1E6] font-bold text-lg mb-2">{step.ar}</h3>
                  <p className="text-[#17685B] text-xs font-playfair tracking-widest mb-4">{step.en}</p>
                  <p className="text-[#F5F1E6]/50 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
