"use client";

import { AnimatedVoiceField } from "./AnimatedVoiceField";
import { HeroStage } from "./HeroStage";
import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

export function Hero() {
  return (
    <section className="w-full">
      <div className="max-w-[1320px] mx-auto px-8 lg:px-16 pt-14 lg:pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
          <div>
            <h1 className="text-[44px] lg:text-[58px] leading-[1.04] tracking-[-0.025em] font-medium text-[#111] mb-6">
              {COPY.hero.headline}
            </h1>
            <p className="text-[15px] leading-[1.65] text-[#555] max-w-[540px]">
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

      <div className="relative w-full aspect-[16/8.5] overflow-hidden">
        <AnimatedVoiceField />
        <div className="absolute inset-0 flex items-center justify-center">
          <HeroStage />
        </div>
      </div>
    </section>
  );
}