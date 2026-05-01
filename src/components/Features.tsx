"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, MapPin, Repeat, Search } from "lucide-react";
import AnimatedText, { FadeUp, MaskReveal } from "@/components/AnimatedText";

const categories = [
  "المشاريع",
  "تيسرت",
  "فرجت",
  "الكفارات",
  "الإغاثة",
  "الوقف",
  "الزكاة",
  "الأضاحي",
  "الحملات",
  "الهدية",
  "التبرع الدوري",
];

const pillars = [
  {
    icon: Eye,
    ar: "تبرع واضح من أول نظرة",
    en: "Clarity at first glance",
    desc: "كل فرصة تعرض المعلومات الأساسية قبل اتخاذ القرار: اسمها، مجالها، المبلغ الذي تم جمعه، المبلغ المتبقي، وحالتها. تعرف أين يذهب تبرعك، وكم بقي لاكتمال الفرصة، وما المجال الذي تساهم فيه.",
    descEn:
      "Every opportunity surfaces what matters most: amount raised, remaining, and status — so you know exactly where your donation goes.",
    accent: "from-[#17685B]/15 to-transparent",
  },
  {
    icon: MapPin,
    ar: "تجربة مناسبة لسوريا",
    en: "Made for the Syrian context",
    desc: "التطبيق يدعم التبرع بالليرة السورية، ويوفّر تجربة دفع مناسبة للمستخدم المحلي عبر محفظة Sham Cash مع QR ورقم محفظة وخيارات إدخال المبلغ. تبرع رقمي ممكن وسهل ضمن الواقع السوري.",
    descEn:
      "Sham Cash payments, QR, wallet number copy, and SYP support — donating digitally that fits real life in Syria.",
    accent: "from-[#17685B]/15 to-transparent",
  },
  {
    icon: Repeat,
    ar: "أكثر من تبرع... أثر مستمر",
    en: "More than a one-time gift",
    desc: "إحسان لا يركّز فقط على التبرع اللحظي. يحتوي على الوقف، التبرع الدوري، الحملات، الإهداء، وسلة التبرعات، ليمنحك أكثر من طريقة للمساهمة حسب رغبتك وقدرتك.",
    descEn:
      "Endowments, recurring donations, campaigns, gift donations, and a basket — multiple ways to contribute on your terms.",
    accent: "from-[#17685B]/15 to-transparent",
    hasBadges: true,
  },
  {
    icon: Search,
    ar: "نوصلك للفرصة المناسبة",
    en: "We connect you to the right cause",
    desc: "بدل البحث بين مصادر كثيرة، يجمع التطبيق الفرص في واجهة واحدة قابلة للتصفح والبحث والتصفية حسب المجال أو الحالة أو الفئة. ترى الفرصة، تقرأ تفاصيلها، تقارن، ثم تختار أين تضع أثرك.",
    descEn:
      "Browse, search, and filter every opportunity in one place — compare causes and choose exactly where your impact lands.",
    accent: "from-[#17685B]/15 to-transparent",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      className="relative bg-[#071210] py-32 md:py-40 overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{
          background: "radial-gradient(circle, #17685B, transparent)",
        }}
      />
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,104,91,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(23,104,91,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <FadeUp>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-6 border border-[#17685B]/30">
              <span className="w-2 h-2 rounded-full bg-[#17685B] animate-pulse" />
              <span className="text-[#F5F1E6]/60 text-sm tracking-widest">
                لماذا إحسان · Why Ehsan
              </span>
            </div>
          </FadeUp>

          <h2
            className="text-[#F5F1E6] font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <MaskReveal>
              <span>تبرع بطريقة</span>
            </MaskReveal>
            <MaskReveal delay={0.2}>
              <span className="text-gradient-brand">واضحة، سريعة، ومنظمة</span>
            </MaskReveal>
          </h2>

          <FadeUp delay={0.5}>
            <p className="text-[#F5F1E6]/40 font-playfair text-lg mt-4">
              Donate in a way that is clear, fast, and organized.
            </p>
          </FadeUp>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.ar}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                whileHover={{ y: -6 }}
                className="group relative p-8 md:p-10 rounded-3xl glass border border-white/5 hover:border-[#17685B]/40 transition-all duration-400 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#17685B]/10 group-hover:bg-[#17685B]/25 flex items-center justify-center transition-colors duration-300">
                      <Icon size={26} className="text-[#17685B]" />
                    </div>
                    <span className="text-[#17685B]/30 font-black text-5xl leading-none font-playfair">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-[#F5F1E6] font-bold text-2xl mb-2">
                    {p.ar}
                  </h3>
                  <p className="text-[#17685B] text-xs font-playfair tracking-widest mb-5">
                    {p.en}
                  </p>
                  <p className="text-[#F5F1E6]/55 text-base leading-relaxed mb-4">
                    {p.desc}
                  </p>
                  <p className="text-[#F5F1E6]/25 text-xs font-playfair leading-relaxed">
                    {p.descEn}
                  </p>

                  {p.hasBadges && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {categories.map((c, idx) => (
                        <motion.span
                          key={c}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.4,
                            delay: 0.8 + idx * 0.04,
                          }}
                          className="px-3 py-1.5 text-xs rounded-full bg-[#17685B]/15 text-[#F5F1E6]/80 border border-[#17685B]/20 hover:border-[#17685B]/60 hover:bg-[#17685B]/25 transition-colors duration-200"
                        >
                          {c}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-[#17685B]/30 group-hover:bg-[#17685B] transition-colors duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Closing tagline */}
        <FadeUp delay={0.3}>
          <div className="mt-20 text-center">
            <AnimatedText
              as="p"
              text="ترى الفرصة، تقرأ تفاصيلها، تقارن بين المجالات، ثم تختار أين تضع أثرك."
              className="text-[#F5F1E6]/50 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto"
              stagger={0.04}
              highlight={["أثرك."]}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
