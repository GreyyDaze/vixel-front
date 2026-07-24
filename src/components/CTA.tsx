import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

export function CTA() {
  return (
    <section id="cta" className="w-full px-8 lg:px-16 py-24">
      <div className="max-w-[1320px] mx-auto">
        {/* Constrained container with two-column layout */}
        <div className="rounded-[12px] overflow-hidden grid grid-cols-1 lg:grid-cols-[35%_1fr]" style={{ minHeight: "420px" }}>
          {/* Left side: content on cream background */}
          <div className="bg-[#F5F0EB] px-12 lg:px-16 py-20 lg:py-24 flex flex-col justify-center">
            <h2 className="text-[36px] lg:text-[44px] leading-[1.15] tracking-[-0.02em] font-medium text-[#111] mb-3">
              {COPY.cta.headline}
            </h2>
            <p className="text-[15px] text-[#666] leading-[1.6] mb-8">
              {COPY.cta.subhead}
            </p>
            <Button size="lg" render={<a href="#" />}>
              {COPY.cta.ctaPrimary}
            </Button>
          </div>

          {/* Right side: night atmosphere image */}
          <div
            className="relative min-h-[300px] lg:min-h-full"
            style={{
              backgroundImage: "url('/cta-atmosphere.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </div>
    </section>
  );
}
