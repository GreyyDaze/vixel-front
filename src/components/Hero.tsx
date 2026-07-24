"use client";

import { AnimatedVoiceField } from "./AnimatedVoiceField";
import { HeroStage } from "./HeroStage";
import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

export function Hero() {
  return (
    <section className="w-full relative" style={{ background: "#c8d4e0" }}>
      {/* Atmospheric background image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/hero-atmosphere.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.85,
        }}
      />

      {/* Content — centered, single CTA */}
      <div className="relative max-w-[1320px] mx-auto px-8 lg:px-16 pt-20 lg:pt-28 pb-12">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-[44px] lg:text-[58px] leading-[1.04] tracking-[-0.025em] font-medium text-[#111] mb-6">
            {COPY.hero.headline}
          </h1>
          <p className="text-[15px] leading-[1.65] text-[#555] mb-8">
            {COPY.hero.subhead}
          </p>
          <div className="flex flex-col items-center gap-3">
            <Button size="lg" className="w-full sm:w-[200px]" render={<a href="#cta" />}>
              {COPY.hero.ctaPrimary}
            </Button>
            <a href="#how" className="text-[13px] text-[#666] hover:text-[#111] transition-colors">
              See how it works →
            </a>
          </div>
        </div>
      </div>

      {/* Product demo — floating on atmosphere, no border, open feel */}
      <div className="relative max-w-[1200px] mx-auto px-8 lg:px-16 pb-20 lg:pb-24">
        <div
          className="relative w-full rounded-[12px] overflow-hidden"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px -4px rgba(0,0,0,0.06), 0 12px 28px -8px rgba(0,0,0,0.04), 0 24px 48px -12px rgba(0,0,0,0.08)",
          }}
        >
          <div className="relative w-full aspect-[16/8.5] overflow-hidden">
            <AnimatedVoiceField />
            <div className="absolute inset-0 flex items-center justify-center">
              <HeroStage />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
