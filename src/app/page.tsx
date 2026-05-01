import CurtainIntro from "@/components/CurtainIntro";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import TargetAudience from "@/components/TargetAudience";
import Features from "@/components/Features";
import AppShowcase from "@/components/AppShowcase";
import HowItWorks from "@/components/HowItWorks";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function Home() {
  return (
    <>
      <CurtainIntro />
      <SmoothScroll>
        <Navbar />
        <FloatingContact />
        <main>
          <Hero />
          <Marquee />
          <About />
          <TargetAudience />
          <Features />
          <AppShowcase />
          <HowItWorks />
          <Team />
          <Contact />
          <CTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
