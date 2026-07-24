import { COPY } from "@/content/copy";

export function HowItWorks() {
  return (
    <section id="how" className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-24">
      <div className="mb-16 max-w-[640px]">
        <div className="text-[11px] text-[#999] uppercase tracking-wider mb-3">{COPY.howItWorks.label}</div>
        <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111]">
          {COPY.howItWorks.headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {COPY.howItWorks.steps.map((step, i) => (
          <div key={step.num} className="flex flex-col">
            {/* Mock UI card */}
            <div className="flex-1 bg-[#f5f5f5] rounded-[12px] p-6 mb-5 min-h-[280px] flex items-center justify-center">
              {i === 0 && <AnswerMock />}
              {i === 1 && <BookMock />}
              {i === 2 && <ReportMock />}
            </div>

            {/* Text below */}
            <div className="px-1">
              <div className="text-[11px] text-[#999] uppercase tracking-wider mb-2">Step {step.num}</div>
              <h3 className="text-[20px] font-medium text-[#111] mb-2 tracking-[-0.01em]">{step.title}</h3>
              <p className="text-[14px] text-[#666] leading-[1.6]">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnswerMock() {
  return (
    <div className="w-full max-w-[240px] space-y-3">
      {/* Incoming call indicator */}
      <div className="bg-white rounded-[8px] border border-[#e8e8e8] p-3 flex items-center justify-between" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[11px] text-[#111] font-medium">Incoming call</span>
        </div>
        <span className="text-[10px] text-[#999] font-mono">2:34 PM</span>
      </div>

      {/* Simple transcript */}
      <div className="bg-white rounded-[8px] border border-[#e8e8e8] p-3 space-y-2" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
        <div className="flex items-start gap-2">
          <div className="h-5 w-5 rounded-full bg-[#f0f0f0] flex items-center justify-center shrink-0">
            <span className="text-[8px] font-bold text-[#666]">S</span>
          </div>
          <div className="flex-1">
            <div className="text-[9px] text-[#999] mb-0.5">Sarah P.</div>
            <p className="text-[11px] text-[#111] leading-[1.4]">"Need a cleaning next Tuesday"</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="h-5 w-5 rounded-full bg-[#111] flex items-center justify-center shrink-0">
            <svg width="7" height="7" viewBox="0 0 32 32" fill="none">
              <path d="M5 6L11.5 24C11.9 25.1 13.4 25.1 13.8 24L18 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[9px] text-[#111] font-medium mb-0.5">Vox</div>
            <p className="text-[11px] text-[#111] leading-[1.4]">"Tuesday 2:30 or 4:00?"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookMock() {
  return (
    <div className="w-full max-w-[240px]">
      {/* Calendar grid */}
      <div className="bg-white rounded-[8px] border border-[#e8e8e8] p-3" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
        <div className="flex items-center gap-1.5 mb-3">
          <div className="h-3 w-3 rounded bg-gradient-to-br from-[#4285F4] to-[#34A853]"></div>
          <span className="text-[10px] font-medium text-[#111]">Google Calendar</span>
          <span className="text-[9px] text-[#999] ml-auto">Tue, Mar 18</span>
        </div>

        <div className="space-y-1">
          {["9:00 AM", "10:00 AM", "11:00 AM"].map((t) => (
            <div key={t} className="h-6 bg-[#fafafa] rounded border border-[#f0f0f0] flex items-center px-2">
              <span className="text-[8px] text-[#999]">{t}</span>
            </div>
          ))}
          <div className="h-8 bg-[#111] rounded flex items-center px-2">
            <span className="text-[9px] text-white font-medium">2:30 PM — Cleaning</span>
          </div>
          {["3:30 PM", "4:00 PM", "5:00 PM"].map((t) => (
            <div key={t} className="h-6 bg-[#fafafa] rounded border border-[#f0f0f0] flex items-center px-2">
              <span className="text-[8px] text-[#999]">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportMock() {
  return (
    <div className="w-full max-w-[240px] space-y-2">
      {/* Dashboard summary */}
      <div className="bg-white rounded-[8px] border border-[#e8e8e8] p-3" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-medium text-[#111]">Today's calls</span>
          <span className="text-[9px] text-emerald-600 font-medium">12 answered</span>
        </div>

        <div className="space-y-1.5">
          {[
            { name: "Maria S.", status: "Booked", time: "10:24 AM" },
            { name: "James T.", status: "Booked", time: "11:08 AM" },
            { name: "Linda P.", status: "Question", time: "1:45 PM" },
          ].map((call, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#f5f5f5] last:border-0">
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 rounded-full bg-[#f0f0f0] flex items-center justify-center">
                  <span className="text-[7px] font-bold text-[#666]">{call.name[0]}</span>
                </div>
                <div>
                  <div className="text-[9px] text-[#111] font-medium">{call.name}</div>
                  <div className="text-[8px] text-[#999]">{call.time}</div>
                </div>
              </div>
              <div className={`text-[8px] font-medium px-1.5 py-0.5 rounded ${call.status === "Booked" ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-600"}`}>
                {call.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
