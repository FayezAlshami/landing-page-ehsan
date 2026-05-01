import type { Metadata } from "next";
import { Cairo, Playfair_Display, Amiri } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo-var",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-var",
  display: "swap",
  weight: ["400", "600", "700", "900"],
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  variable: "--font-amiri-var",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "إحسان | Ehsan — منصة التبرع الذكي",
  description:
    "إحسان — منصة تبرع ذكية وآمنة تجمع بين الشفافية والتقنية لتحويل التبرع إلى تجربة مؤسسية احترافية. Ehsan is a smart, secure donation platform.",
  keywords: ["تبرع", "إحسان", "خيرية", "زكاة", "كفالة", "donation", "Ehsan"],
  openGraph: {
    title: "إحسان | Ehsan",
    description: "منصة التبرع الذكي — Smart Donation Platform",
    locale: "ar_SA",
    type: "website",
  },
  icons: {
    icon: [{ url: "/ehsan-logo.png", type: "image/png" }],
    apple: "/ehsan-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${playfair.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F5F1E6] font-cairo overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
