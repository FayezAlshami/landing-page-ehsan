"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { FadeUp, MaskReveal } from "@/components/AnimatedText";

const PHONE_DISPLAY = "+963 968 362 040";
const WHATSAPP_HREF = "https://wa.me/963968362040";
const TEL_HREF = "tel:+963968362040";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-[#F5F1E6]"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(23,104,91,0.12), transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <FadeUp delay={0}>
            <p className="text-[#17685B] text-sm font-semibold tracking-[0.2em] uppercase mb-3 font-playfair">
              Contact · تواصل
            </p>
          </FadeUp>
          <MaskReveal delay={0.08}>
            <h2 className="text-[#071210] font-bold text-3xl md:text-5xl mb-4">
              تواصل معنا
            </h2>
          </MaskReveal>
          <FadeUp delay={0.12}>
            <p className="text-[#071210]/65 text-lg max-w-xl mx-auto leading-relaxed">
              للاستفسارات، الشراكات، أو أي ملاحظات حول منصة إحسان. نرحب بتواصلكم عبر
              واتساب أو الاتصال المباشر.
            </p>
          </FadeUp>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          <motion.a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white/80 border border-[#17685B]/15 shadow-lg shadow-[#071210]/5 hover:border-[#25D366]/50 hover:shadow-[#25D366]/10 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#25D366]/15 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-7 h-7 text-[#128C7E]" strokeWidth={2} />
            </div>
            <h3 className="text-[#071210] font-bold text-xl mb-2">واتساب</h3>
            <p className="text-[#071210]/55 text-sm mb-4">WhatsApp</p>
            <span className="text-[#17685B] font-semibold text-lg tracking-wide dir-ltr">
              {PHONE_DISPLAY}
            </span>
            <span className="mt-5 text-sm text-[#25D366] font-medium group-hover:underline">
              افتح المحادثة
            </span>
          </motion.a>

          <motion.a
            href={TEL_HREF}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] as const }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white/80 border border-[#17685B]/15 shadow-lg shadow-[#071210]/5 hover:border-[#17685B]/45 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#17685B]/12 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Phone className="w-7 h-7 text-[#17685B]" strokeWidth={2} />
            </div>
            <h3 className="text-[#071210] font-bold text-xl mb-2">اتصال هاتفي</h3>
            <p className="text-[#071210]/55 text-sm mb-4">Phone call</p>
            <span className="text-[#17685B] font-semibold text-lg tracking-wide dir-ltr">
              {PHONE_DISPLAY}
            </span>
            <span className="mt-5 text-sm text-[#17685B] font-medium group-hover:underline">
              اضغط للاتصال
            </span>
          </motion.a>
        </div>

        <FadeUp delay={0.28}>
          <p className="text-center text-[#071210]/40 text-sm mt-10 font-playfair">
            {/* نفس الرقم للواتساب والاتصال · Same number for WhatsApp and calls */}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
