import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

export function CTA() {
  return (
    <section id="cta" className="w-full px-5 lg:px-16 pt-12 sm:pt-16 lg:pt-24 mb-11">
      <div className="max-w-[1100px] mx-auto">
        {/* One contained container — no split, night atmosphere as full background */}
          <div
          className="relative rounded-[12px] overflow-hidden min-h-[300px] sm:min-h-[380px]"
          style={{
            backgroundImage: "url('/cta-atmosphere.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        >
          {/* Text sits on the atmosphere, left-aligned */}
          <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-24 max-w-[560px]">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[44px] leading-[1.15] tracking-[-0.02em] font-medium text-white mb-4">
              {COPY.cta.headline}
            </h2>
            <p className="text-[15px] text-white/70 leading-[1.6] mb-8">
              {COPY.cta.subhead}
            </p>
            <Button size="lg" className="bg-white text-text-primary hover:bg-white/95 px-4" render={<a href="#" />}>
              {COPY.cta.ctaPrimary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
