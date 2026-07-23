import "./index.css";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { RealSituations } from "@/components/RealSituations";
import { Dashboard } from "@/components/Dashboard";
import { Security } from "@/components/Security";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FDFDFC" }}>
      <Header />
      <Hero />
      <HowItWorks />
      <RealSituations />
      <Dashboard />
      <Security />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
