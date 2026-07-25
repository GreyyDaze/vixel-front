"use client";

import { HeroStage } from "./HeroStage";
import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

export function Hero() {
  return (
    <section className="w-full">
      {/* White section: headline, subhead, CTAs — matches Agentwork's clean top */}
      <div className="max-w-[1320px] mx-auto px-5 lg:px-16 pt-4 sm:pt-6 lg:pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 items-start">
          <div className="pt-8 sm:pt-12 lg:pt-20 pb-4">
            <h1 className="text-[30px] sm:text-[38px] lg:text-[52px] leading-[1.15] sm:leading-[1.1] lg:leading-[1.04] tracking-[-0.025em] font-medium text-text-primary mb-5">
              Every call answered.<br />Every appointment booked.
            </h1>
            <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.65] text-text-secondary max-w-[560px]">
              {COPY.hero.subhead}
            </p>
          </div>
          <div className="flex flex-col gap-2.5 lg:items-end lg:pt-3 self-end">
            <Button size="lg" className="w-full lg:w-[200px]" render={<a href="#cta" />}>
              {COPY.hero.ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" className="w-full lg:w-[200px]" render={<a href="#how" />}>
              {COPY.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

       {/* Atmosphere section: product demo on image */}
        <div
          className="w-full py-10 sm:py-12 lg:py-16"
         style={{
           backgroundColor: "#c8d4e0",
           backgroundImage: "url('/hero-atmosphere.jpg')",
           backgroundSize: "cover",
           backgroundPosition: "center top",
           backgroundBlendMode: "multiply",
           opacity: 0.75,
         }}
       >
         <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-16">
            <div className="relative w-full aspect-[3/4] sm:aspect-[16/11] lg:aspect-[16/8.5] overflow-hidden rounded-lg">
             <HeroStage />
           </div>
         </div>
       </div>
    </section>
  );
}
