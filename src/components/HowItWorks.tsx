function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 4 4 5-5" />
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-20">
      <div className="mb-14">
        <div className="text-[11px] text-[#999] uppercase tracking-wider mb-3">How it works</div>
        <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111] max-w-[680px]">
          Three steps from call to booking.
        </h2>
      </div>

      <div className="space-y-0">
        <Step
          num="01"
          icon={<PhoneIcon />}
          title="Answer"
          desc="Every call is answered in under a second, day or night. Vox Front speaks naturally, asks the right questions, and never puts a caller on hold."
          visual={<AnswerVisual />}
        />
        <Step
          num="02"
          icon={<CalendarIcon />}
          title="Book"
          desc="Vox Front checks your live availability and books, reschedules, or cancels appointments directly in Google Calendar."
          visual={<BookVisual />}
          reverse
        />
        <Step
          num="03"
          icon={<ChartIcon />}
          title="Report"
          desc="Every call is logged with a transcript, summary, and outcome. Nothing slips through, and you always know what to follow up on."
          visual={<DashboardVisual />}
        />
      </div>
    </section>
  );
}

function Step({ num, icon, title, desc, visual, reverse = false }: { num: string; icon: React.ReactNode; title: string; desc: string; visual: React.ReactNode; reverse?: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-14 border-t border-[#eee]">
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-[8px] border border-[#eee] flex items-center justify-center text-[#111]">
            {icon}
          </div>
          <span className="text-[11px] text-[#999] uppercase tracking-wider">Step {num}</span>
        </div>
        <h3 className="text-[26px] tracking-[-0.02em] font-medium text-[#111] mb-3">{title}</h3>
        <p className="text-[14px] text-[#666] leading-[1.65] max-w-[420px]">{desc}</p>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        {visual}
      </div>
    </div>
  );
}

function AnswerVisual() {
  return (
    <div className="bg-white border border-[#eee] rounded-[10px] p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
          <span className="text-[11px] text-[#666]">Incoming call</span>
        </div>
        <span className="text-[11px] text-[#999] font-mono">9:42 PM</span>
      </div>
      <div className="space-y-3 text-[12.5px] leading-[1.5]">
        <p className="text-[#111]">
          <span className="text-[10px] text-[#999] uppercase tracking-wider mr-2">Caller</span>
          "Do you have any Saturday appointments next week?"
        </p>
        <p className="text-[#111]">
          <span className="text-[10px] text-[#111] uppercase tracking-wider mr-2 font-medium">Vox</span>
          "Yes — Saturday the 22nd at 10 AM or 11:30 AM. Which works?"
        </p>
      </div>
    </div>
  );
}

function BookVisual() {
  return (
    <div className="bg-white border border-[#eee] rounded-[10px] p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC04]"></div>
          <span className="text-[12px] font-medium text-[#111]">Google Calendar</span>
        </div>
        <span className="text-[11px] text-[#999]">Tue, Mar 18</span>
      </div>
      <div className="space-y-1.5">
        {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"].map((t, i) => (
          <div key={i} className="h-7 bg-[#fafafa] rounded text-[10px] text-[#999] flex items-center px-2.5">{t}</div>
        ))}
        <div className="h-12 bg-[#111] rounded text-white flex flex-col justify-center px-3 relative">
          <div className="text-[10px] font-medium">2:30 PM — Cleaning</div>
          <div className="text-[9px] opacity-70">Sarah Johnson • 60 min</div>
        </div>
        {["3:30 PM", "4:00 PM", "5:00 PM"].map((t, i) => (
          <div key={i} className="h-7 bg-[#fafafa] rounded text-[10px] text-[#999] flex items-center px-2.5">{t}</div>
        ))}
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="bg-white border border-[#eee] rounded-[10px] p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[12px] font-medium text-[#111]">Today's calls</span>
        <span className="text-[10px] text-emerald-600 font-medium">12 answered</span>
      </div>
      <div className="space-y-2">
        {[
          { time: "10:24 AM", name: "Booked • Cleaning", dur: "2:14" },
          { time: "11:08 AM", name: "Booked • Checkup", dur: "1:48" },
          { time: "1:45 PM", name: "Rescheduled", dur: "1:22" },
          { time: "3:12 PM", name: "New booking", dur: "2:56" },
        ].map((c, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-[#f5f5f5] last:border-0">
            <div>
              <div className="text-[12px] text-[#111]">{c.name}</div>
              <div className="text-[10px] text-[#999]">{c.time}</div>
            </div>
            <div className="text-[10px] text-[#999] font-mono">{c.dur}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
