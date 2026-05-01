"use client";

const items = [
  { ar: "المشاريع", en: "Projects" },
  { ar: "تيسرت", en: "Taysart" },
  { ar: "فرجت", en: "Farajat" },
  { ar: "الكفارات", en: "Kafaarat" },
  { ar: "الإغاثة", en: "Relief" },
  { ar: "الوقف", en: "Endowment" },
  { ar: "الزكاة", en: "Zakat" },
  { ar: "الأضاحي", en: "Adahi" },
  { ar: "الحملات", en: "Campaigns" },
  { ar: "الهدية", en: "Gift Donation" },
  { ar: "التبرع الدوري", en: "Recurring" },
];

const doubled = [...items, ...items];

export default function Marquee() {
  return (
    <div className="bg-[#17685B] py-5 overflow-hidden relative border-y border-[#0d3d35]/20">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#17685B] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#17685B] to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-0 whitespace-nowrap marquee-track"
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-4 px-8">
            <span className="text-[#F5F1E6] font-bold text-lg">{item.ar}</span>
            <span className="text-[#F5F1E6]/40 text-xs font-playfair tracking-widest">
              {item.en}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5F1E6]/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
