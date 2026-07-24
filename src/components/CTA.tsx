import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

const ATMOSPHERE = [
  "radial-gradient(ellipse 85% 65% at 50% 15%, rgba(175, 195, 215, 0.28) 0%, transparent 65%)",
  "radial-gradient(ellipse 65% 55% at 25% 45%, rgba(185, 205, 220, 0.18) 0%, transparent 60%)",
  "radial-gradient(ellipse 55% 45% at 78% 35%, rgba(190, 208, 222, 0.15) 0%, transparent 55%)",
  "linear-gradient(180deg, #dce4ec 0%, #e7edf3 20%, #eff3f7 45%, #f5f8fa 70%, #fafbfc 100%)",
].join(", ");

export function CTA() {
  return (
    <section id="cta" className="w-full px-8 lg:px-16 py-24">
      <div
        className="max-w-[1320px] mx-auto rounded-[14px] overflow-hidden"
        style={{ background: ATMOSPHERE }}
      >
        <div className="px-12 lg:px-16 py-20 lg:py-24 text-center">
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
