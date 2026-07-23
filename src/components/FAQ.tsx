"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Does Vox Front work after business hours?",
    a: "Yes. It answers calls 24/7, including weekends and holidays.",
  },
  {
    q: "Can it book appointments on its own?",
    a: "Yes. It checks your live Google Calendar and books, reschedules, or cancels as needed.",
  },
  {
    q: "Can I review every conversation?",
    a: "Yes. Every call is recorded and transcribed in your dashboard.",
  },
  {
    q: "What happens with urgent calls?",
    a: "Vox Front can transfer urgent calls to a designated number or notify your team by SMS or email.",
  },
  {
    q: "How is customer data protected?",
    a: "Transcripts are scanned before storage. Credit card numbers, SSNs, and phone numbers are redacted automatically.",
  },
  {
    q: "How long does setup take?",
    a: "Most businesses are live in under 10 minutes.",
  },
  {
    q: "Which industries is this built for?",
    a: "Dental practices, auto repair, salons and spas, law firms, and home services like plumbing, electrical, and HVAC.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <div>
          <div className="text-[11px] text-[#999] uppercase tracking-wider mb-3">FAQ</div>
          <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111] mb-4">
            Questions,<br />answered.
          </h2>
        </div>

        <div>
          {faqs.map((item, i) => (
            <div key={i} className="border-t border-[#eee]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-[14.5px] font-medium text-[#111]">{item.q}</span>
                <span className="h-5 w-5 rounded-full border border-[#ddd] flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={`text-[#666] transition-transform ${open === i ? "rotate-45" : ""}`}>
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="pb-5 text-[13.5px] text-[#666] leading-[1.65] pr-12">
                  {item.a}
                </div>
              )}
            </div>
          ))}
          <div className="border-t border-[#eee]" />
        </div>
      </div>
    </section>
  );
}
