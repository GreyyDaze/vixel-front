import { COPY } from "@/content/copy";
import { Clock } from "lucide-react";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 5" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Security() {
  return (
    <section className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111] mb-4">
            {COPY.security.headline}
          </h2>
          <p className="text-[14px] text-[#666] leading-[1.65] mb-7 max-w-[440px]">
            {COPY.security.subhead}
          </p>
          <div className="flex flex-wrap gap-2">
            {COPY.security.items.map((b, i) => (
              <div key={i} className="inline-flex items-center gap-1.5 border border-[#F0F0F0] rounded-full px-3 py-1.5 bg-white">
                <CheckIcon />
                <span className="text-[12.5px] text-[#111]">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <RedactionDemo />
      </div>
    </section>
  );
}

function RedactionDemo() {
  return (
    <div
      className="rounded-[12px] overflow-hidden"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px -4px rgba(0,0,0,0.04)",
        background: "radial-gradient(ellipse at 50% 30%, #F5F5F7 0%, #FAFAFA 60%, #F5F5F7 100%)",
      }}
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#F0F0F0] bg-white/60">
        <div className="flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#111" strokeWidth="1.5">
            <rect x="3" y="7" width="10" height="7" rx="1" />
            <path d="M5 7V5a3 3 0 0 1 6 0v2" />
          </svg>
          <span className="text-[12px] font-medium text-[#111]">Auto-redaction</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#111] font-medium">
          <Clock size={12} strokeWidth={1.5} color="#111" />
          Live
        </div>
      </div>

      <div className="p-5 space-y-4 bg-white/40">
        <div>
          <p className="text-[10px] text-[#999] uppercase tracking-wider mb-2">Original transcript</p>
          <p className="text-[12px] text-[#111] leading-[1.6] font-mono bg-white rounded-md p-3 border border-[#F0F0F0]">
            "My card number is <span className="bg-amber-50 text-amber-800 px-1 rounded">4532-1234-5678-9012</span> and my SSN is <span className="bg-amber-50 text-amber-800 px-1 rounded">123-45-6789</span>. Call me at <span className="bg-amber-50 text-amber-800 px-1 rounded">(415) 555-0142</span>."
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[#999] uppercase tracking-wider mb-2">After redaction</p>
          <p className="text-[12px] text-[#111] leading-[1.6] font-mono bg-white rounded-md p-3 border border-[#F0F0F0]">
            "My card number is <span className="bg-[#111] text-white px-1 rounded font-semibold">████-████-████-9012</span> and my SSN is <span className="bg-[#111] text-white px-1 rounded font-semibold">███-██-████</span>. Call me at <span className="bg-[#111] text-white px-1 rounded font-semibold">(███) ███-████</span>."
          </p>
        </div>
      </div>
    </div>
  );
}
