"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLenisScrollTo } from "@/components/SmoothScroll";

export default function FloatingContact() {
  const scrollToSelector = useLenisScrollTo();

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSelector("#contact");
  };

  return (
    <motion.a
      href="#contact"
      onClick={scrollToContact}
      aria-label="انتقل إلى قسم تواصل معنا"
      title="تواصل معنا"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.2 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed z-[60] bottom-6 end-6 md:bottom-8 md:end-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#17685B] text-[#F5F1E6] shadow-xl shadow-[#071210]/40 ring-2 ring-[#c9a84c]/40 hover:bg-[#1e8a77] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a84c]"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} aria-hidden />
    </motion.a>
  );
}
