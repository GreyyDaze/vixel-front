import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { COPY } from "@/content/copy";
import { SectionHeading } from "./SectionHeading";

export function FAQ() {
  return (
    <section id="faq" className="w-full max-w-[1320px] mx-auto px-5 lg:px-16 pt-12 sm:pt-16 lg:pt-24 mb-11">
      <div className="mb-14">
        <SectionHeading className="max-w-[420px]">{COPY.faq.headline}</SectionHeading>
      </div>

      <div className="max-w-[720px] border-t">
        <Accordion defaultValue={["faq-0"]} className="w-full">
          {COPY.faq.items.map((item, i) => (
            <AccordionItem key={`faq-${i}`} value={`faq-${i}`} className="border-b">
              <AccordionTrigger className="py-5 text-[14.5px] font-medium text-text-primary no-underline hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[13.5px] text-text-secondary leading-[1.65]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
