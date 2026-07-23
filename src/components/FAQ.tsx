"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq-0",
    q: "Does Vox Front work after business hours?",
    a: "Yes. It answers calls 24/7, including weekends and holidays.",
  },
  {
    id: "faq-1",
    q: "Can it book appointments on its own?",
    a: "Yes. It checks your live Google Calendar and books, reschedules, or cancels as needed.",
  },
  {
    id: "faq-2",
    q: "Can I review every conversation?",
    a: "Yes. Every call is recorded and transcribed in your dashboard.",
  },
  {
    id: "faq-3",
    q: "What happens with urgent calls?",
    a: "Vox Front can transfer urgent calls to a designated number or notify your team by SMS or email.",
  },
  {
    id: "faq-4",
    q: "How is customer data protected?",
    a: "Transcripts are scanned before storage. Credit card numbers, SSNs, and phone numbers are redacted automatically.",
  },
  {
    id: "faq-5",
    q: "How long does setup take?",
    a: "Most businesses are live in under 10 minutes.",
  },
  {
    id: "faq-6",
    q: "Which industries is this built for?",
    a: "Dental practices, auto repair, salons and spas, law firms, and home services like plumbing, electrical, and HVAC.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <div>
          <div className="text-[11px] text-[#999] uppercase tracking-wider mb-3">FAQ</div>
          <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111] mb-4">
            Questions,<br />answered.
          </h2>
        </div>

        <div className="border-t border-[#eee]">
          <Accordion defaultValue={["faq-0"]} className="w-full">
            {faqs.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b border-[#eee]">
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
