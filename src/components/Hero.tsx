"use client";

import { HeroStage } from "./HeroStage";
import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

export function Hero() {
  return (
    <section className="w-full">
      {/* White section: headline, subhead, CTAs — matches Agentwork's clean top */}
      <div className="max-w-[1320px] mx-auto px-8 lg:px-16 pt-8 lg:pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 items-start">
          <div>
            <h1 className="text-[44px] lg:text-[56px] leading-[1.04] tracking-[-0.025em] font-medium text-[#111] mb-5">
              {COPY.hero.headline}
            </h1>
            <p className="text-[15px] leading-[1.65] text-[#555] max-w-[520px]">
              {COPY.hero.subhead}
            </p>
          </div>
          <div className="flex flex-col gap-2.5 lg:items-end lg:pt-3">
            <Button size="lg" className="w-full lg:w-[200px]" render={<a href="#cta" />}>
              {COPY.hero.ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" className="w-full lg:w-[200px]" render={<a href="#how" />}>
              {COPY.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      {/* Atmosphere section: product demo floating on image */}
      <div
        className="w-full py-12 lg:py-16"
        style={{
          backgroundColor: "#c8d4e0",
          backgroundImage: "url('/hero-atmosphere.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div
            className="relative w-full rounded-[12px] overflow-hidden"
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px -4px rgba(0,0,0,0.06), 0 12px 28px -8px rgba(0,0,0,0.04), 0 24px 48px -12px rgba(0,0,0,0.08)",
            }}
          >
            <div className="relative w-full aspect-[16/8.5] overflow-hidden">
              <HeroStage />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
