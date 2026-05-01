"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  HandHeart,
  Globe,
  Building2,
  Sparkles,
  MessageSquarePlus,
} from "lucide-react";
import AnimatedText, { FadeUp } from "@/components/AnimatedText";

const audiences = [
  {
    icon: Users,
    ar: "المتبرعون الأفراد",
    en: "Individual Donors",
    desc: "كل من يريد التبرع بمبلغ محدد لفرصة واضحة: دعم أسرة، كفالة يتيم، إغاثة، زكاة، أضحية، وقف، أو حالة تحتاج سداد.",
  },
  {
    icon: HandHeart,
    ar: "أهل الخير المتكررون",
    en: "Recurring Givers",
    desc: "من يريدون متابعة أثر عطائهم، التبرع السريع، التبرع الدوري، أو إضافة أكثر من فرصة إلى السلة.",
  },
  {
    icon: Globe,
    ar: "المغتربون السوريون",
    en: "Syrians Abroad",
    desc: "كل سوري خارج البلاد يريد أن يصل دعمه إلى الداخل عبر تطبيق منظم يعرض الفرص والمبالغ والجمعيات الشريكة.",
  },
  {
    icon: Building2,
    ar: "الجمعيات الشريكة",
    en: "Charitable Partners",
    desc: "الجهات التي تحتاج قناة رقمية لعرض فرصها ومشاريعها أمام المتبرعين بطريقة مرتبة وواضحة.",
  },
  {
    icon: Sparkles,
    ar: "المحسن الصغير",
    en: "Children & Youth",
    desc: "واجهة مخصصة للأطفال واليافعين تفتح باب التربية على العطاء بأسلوب آمن وبسيط ومشجع.",
  },
  {
    icon: MessageSquarePlus,
    ar: "المشاركون في التطوير",
    en: "Community Contributors",
    desc: "قسم المقترحات يتيح لأي مستخدم إرسال فكرة أو ملاحظة أو مقترح مع مرفق ليتم مراجعته.",
  },
];

export default function TargetAudience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#F5F1E6] py-32 md:py-40 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #17685B 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-[#17685B]/8 translate-x-1/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        <div className="text-center mb-16 md:mb-20">
          <FadeUp>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#17685B]/20 bg-[#17685B]/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#17685B] animate-pulse" />
              <span className="text-[#17685B] text-sm font-semibold tracking-widest">
                لمن إحسان · Who is Ehsan for
              </span>
            </div>
          </FadeUp>

          <h2
            className="text-[#0d3d35] font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <AnimatedText
              text="الفئة المستهدفة"
              highlight={["المستهدفة"]}
              stagger={0.07}
            />
          </h2>

          <FadeUp delay={0.4}>
            <p className="text-[#0d3d35]/55 font-playfair text-lg italic">
              Built for everyone who wants to give in a clear, organized way.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((aud, i) => {
            const Icon = aud.icon;
            return (
              <motion.div
                key={aud.ar}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="group relative p-7 rounded-3xl bg-white/80 border border-[#17685B]/10 hover:border-[#17685B]/40 hover:bg-white transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#17685B]/5 group-hover:bg-[#17685B]/12 transition-colors duration-500" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#17685B]/10 group-hover:bg-[#17685B] flex items-center justify-center mb-5 transition-all duration-300">
                    <Icon
                      size={26}
                      className="text-[#17685B] group-hover:text-[#F5F1E6] transition-colors duration-300"
                    />
                  </div>

                  <h3 className="text-[#0d3d35] font-bold text-xl mb-1">
                    {aud.ar}
                  </h3>
                  <p className="text-[#17685B]/80 text-xs font-playfair tracking-widest mb-4">
                    {aud.en}
                  </p>
                  <p className="text-[#0d3d35]/65 text-sm leading-relaxed">
                    {aud.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#17685B] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
