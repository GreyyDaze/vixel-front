import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { COPY } from "@/content/copy";

export function FAQ() {
  return (
    <section id="faq" className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <div>
          <div className="text-[11px] text-[#999] uppercase tracking-wider mb-3">{COPY.faq.label}</div>
          <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111] mb-4">
            {COPY.faq.headline}
          </h2>
        </div>

        <div className="border-t border-[#eee]">
          <Accordion defaultValue={["faq-0"]} className="w-full">
            {COPY.faq.items.map((item, i) => (
              <AccordionItem key={`faq-${i}`} value={`faq-${i}`} className="border-b border-[#eee]">
                <AccordionTrigger className="py-5 text-[14.5px] font-medium text-[#111] no-underline hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[13.5px] text-[#666] leading-[1.65]">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
