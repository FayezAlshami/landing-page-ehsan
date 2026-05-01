"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { teamMembers } from "@/components/Team";

export default function Footer() {
  return (
    <footer className="bg-[#071210] border-t border-white/5 py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F5F1E6] p-1 ring-1 ring-[#17685B]/20 overflow-hidden flex items-center justify-center">
              <Image
                src="/ehsan-logo.png"
                alt="Ehsan logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                style={{ objectPosition: "center 30%", transform: "scale(1.5)" }}
              />
            </div>
            <div>
              <p className="text-[#F5F1E6] font-bold text-lg">إحسان</p>
              <p className="text-[#F5F1E6]/40 text-xs font-playfair tracking-widest">
                Ehsan
              </p>
            </div>
          </motion.div>

          <p className="text-[#F5F1E6]/40 text-sm text-center md:text-right leading-relaxed">
            © {new Date().getFullYear()} إحسان  تطبيق التبرع الرقمي.
            <br />
            <span className="font-playfair text-[#F5F1E6]/25">
              Ehsan  A digital donation app for Syria.
            </span>
          </p>
        </div>

        {/* Team credits line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 pt-8 border-t border-white/5 text-center"
        >
          <p className="text-[#F5F1E6]/30 text-xs font-playfair tracking-[0.3em] mb-3">
            BUILT WITH CARE BY
          </p>
          <p className="text-[#F5F1E6]/70 text-sm md:text-base font-medium">
            {teamMembers.map((m, i) => (
              <span key={m.name}>
                <span className="hover:text-[#17685B] transition-colors duration-200 cursor-default">
                  {m.name}
                </span>
                {i < teamMembers.length - 1 && (
                  <span className="text-[#17685B] mx-3">·</span>
                )}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
