"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText, { FadeUp, MaskReveal } from "@/components/AnimatedText";

const pillars = [
  {
    ar: "فرص واضحة",
    en: "Clear opportunities",
    desc: "اسم الفرصة، المجال، المبلغ المتبقي، وحالتها أمامك مباشرة.",
  },
  {
    ar: "بيئة سورية",
    en: "Local-first experience",
    desc: "دفع بالليرة السورية عبر Sham Cash مع QR ورقم محفظة.",
  },
  {
    ar: "أثر مستمر",
    en: "Continuous impact",
    desc: "وقف، تبرع دوري، حملات، إهداء، وسلة تبرعات في تطبيق واحد.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-[#F5F1E6] py-32 md:py-40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#17685B]/5 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#17685B]/5 translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div>
            <FadeUp delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-[#17685B]/20" />
                <span className="text-[#17685B] text-sm font-semibold tracking-widest uppercase">
                  About · عن المنصة
                </span>
              </div>
            </FadeUp>

            <h2
              className="text-[#0d3d35] font-bold leading-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              <MaskReveal delay={0.1}>
                <span>تبرع رقمي</span>
              </MaskReveal>
              <MaskReveal delay={0.25}>
                <span>
                  مصمم{" "}
                  <span className="text-gradient-brand">لسوريا</span>
                </span>
              </MaskReveal>
            </h2>

            <FadeUp delay={0.45}>
              <p className="text-[#0d3d35]/60 text-sm font-playfair italic mb-6">
                A donation experience built for the Syrian context.
              </p>
            </FadeUp>

            <FadeUp delay={0.55}>
              <p className="text-[#0d3d35]/80 text-lg leading-loose mb-6 font-light">
                إحسان تطبيق تبرع رقمي موجّه لسوريا، يجمع فرص الخير في مكان واحد،
                ويحوّل عملية التبرع من خطوة عشوائية إلى تجربة واضحة. يرى
                المستخدم الفرصة، ويعرف المبلغ المطلوب والمتبقي، ويختار قيمة
                تبرعه، ثم يتبرع مباشرة أو يضيفها إلى السلة.
              </p>
            </FadeUp>

            <FadeUp delay={0.7}>
              <p className="text-[#0d3d35]/70 text-base leading-loose mb-6">
                التطبيق لا يعرض فرص التبرع فقط، بل ينظمها ضمن أقسام مفهومة:
                المشاريع، تيسرت، فرجت، الكفارات، الإغاثة، الوقف، الزكاة،
                الأضاحي، الحملات، الهدية، والتبرع الدوري. ويقدّم بحثاً وتصفية
                حسب المجال أو الحالة لتصل بسرعة إلى الفرصة التي تريد دعمها.
              </p>
            </FadeUp>

            <FadeUp delay={0.85}>
              <p className="text-[#0d3d35]/55 text-sm leading-relaxed font-playfair">
                Ehsan brings every charitable opportunity into one organized
                place, with clear amounts, real progress, and Syria-ready
                payments through Sham Cash.
              </p>
            </FadeUp>
          </div>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-5"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.ar}
                initial={{ opacity: 0, x: 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                whileHover={{ x: -6 }}
                className="group relative p-7 rounded-2xl border border-[#17685B]/10 bg-white/60 hover:border-[#17685B]/30 hover:bg-white/90 transition-all duration-300 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#17685B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#17685B]/10 group-hover:bg-[#17685B]/20 flex items-center justify-center transition-colors duration-300">
                      <span className="text-[#17685B] text-2xl font-black">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[#0d3d35] font-bold text-xl">{pillar.ar}</h3>
                      <p className="text-[#17685B] text-xs font-playfair tracking-widest">
                        {pillar.en}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#0d3d35]/60 text-sm text-right max-w-[180px] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="p-7 rounded-2xl bg-[#17685B] text-[#F5F1E6]"
            >
              <div className="text-5xl leading-none text-[#F5F1E6]/30 font-playfair mb-2">
                &ldquo;
              </div>
              <AnimatedText
                as="p"
                text="كل فرصة لها قصة  ونحن نوصل تبرعك إليها بوضوح."
                className="text-[#F5F1E6]/95 text-lg leading-relaxed font-light block"
                stagger={0.04}
                delay={1.0}
              />
              <p className="text-[#F5F1E6]/50 text-sm font-playfair italic mt-3">
                Every opportunity has a story  we connect your gift to it clearly.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
