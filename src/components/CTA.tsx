import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

export function CTA() {
  return (
    <section id="cta" className="w-full px-8 lg:px-16 py-24">
      <div className="max-w-[1320px] mx-auto">
        {/* Constrained container - not full width */}
        <div className="relative rounded-[12px] overflow-hidden" style={{ backgroundColor: "#F5F0EB" }}>
          {/* Night atmosphere image - contained, not full width */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[60%] lg:w-[70%]"
            style={{
              backgroundImage: "url('/cta-atmosphere.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Content on left */}
          <div className="relative z-10 px-12 lg:px-16 py-20 lg:py-24 max-w-[560px]">
            <h2 className="text-[36px] lg:text-[44px] leading-[1.15] tracking-[-0.02em] font-medium text-[#111] mb-3">
              {COPY.cta.headline}
            </h2>
            <p className="text-[15px] text-[#666] leading-[1.6] mb-8 max-w-[420px]">
              {COPY.cta.subhead}
            </p>
            <Button size="lg" render={<a href="#" />}>
              {COPY.cta.ctaPrimary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
