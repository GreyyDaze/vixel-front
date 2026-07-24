import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

export function CTA() {
  return (
    <section id="cta" className="w-full relative" style={{ background: "#c8d4e0" }}>
      {/* Atmospheric background image — same as Hero (bookend) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/hero-atmosphere.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.85,
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-8 lg:px-16 py-24">
        <div className="text-center">
          <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111] mb-3">
            {COPY.cta.headline}
          </h2>
          <p className="text-[14px] text-[#666] leading-[1.65] mb-8 max-w-[420px] mx-auto">
            Every unanswered call is a customer choosing another business.
          </p>
          <Button size="lg" render={<a href="#" />}>
            {COPY.cta.ctaPrimary}
          </Button>
        </div>
      </div>
    </section>
  );
}
