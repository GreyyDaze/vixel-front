import { COPY } from "@/content/copy";

const cardBackdrops = [
  "radial-gradient(ellipse at 50% 40%, rgba(245, 240, 232, 0.7) 0%, rgba(250, 248, 244, 0.3) 60%, transparent 100%)",
  "radial-gradient(ellipse at 50% 40%, rgba(225, 232, 240, 0.7) 0%, rgba(240, 245, 250, 0.3) 60%, transparent 100%)",
  "radial-gradient(ellipse at 50% 40%, rgba(228, 238, 232, 0.7) 0%, rgba(240, 248, 242, 0.3) 60%, transparent 100%)",
  "radial-gradient(ellipse at 50% 40%, rgba(245, 238, 225, 0.7) 0%, rgba(250, 245, 235, 0.3) 60%, transparent 100%)",
  "radial-gradient(ellipse at 50% 40%, rgba(242, 228, 228, 0.7) 0%, rgba(248, 240, 240, 0.3) 60%, transparent 100%)",
  "radial-gradient(ellipse at 50% 40%, rgba(232, 234, 238, 0.7) 0%, rgba(242, 244, 248, 0.3) 60%, transparent 100%)",
  "radial-gradient(ellipse at 50% 40%, rgba(225, 232, 240, 0.7) 0%, rgba(238, 244, 250, 0.3) 60%, transparent 100%)",
];

const situations = [
  { title: "Answer calls when your team is busy", visual: <BusyCall /> },
  { title: "Handle calls after business hours", visual: <AfterHours /> },
  { title: "Book, reschedule, and confirm appointments", visual: <Booking /> },
  { title: "Send a reminder 24 hours before", visual: <Reminder /> },
  { title: "Transfer urgent calls to the right person", visual: <Urgent /> },
  { title: "Answer common questions automatically", visual: <Questions /> },
  { title: "Handle multiple calls at the same time", visual: <Multiple /> },
];

export function RealSituations() {
  return (
    <section id="situations" className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-24">
      <div className="mb-14 max-w-[640px]">
        <div className="text-[11px] text-[#999] uppercase tracking-wider mb-3">{COPY.realSituations.label}</div>
        <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111] mb-4">
          {COPY.realSituations.headline}
        </h2>
        <p className="text-[14px] text-[#666] leading-[1.65]">
          {COPY.realSituations.subhead}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {situations.map((s, i) => (
          <div
            key={i}
            className={`rounded-[12px] overflow-hidden border border-[#f0f0f0] flex flex-col ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px -4px rgba(0,0,0,0.06), 0 12px 28px -8px rgba(0,0,0,0.04)",
              background: cardBackdrops[i],
            }}
          >
            <div className="flex-1 min-h-[200px] flex items-center justify-center p-6">
              {s.visual}
            </div>
            <div className="px-5 pb-5 pt-0">
              <h3 className="text-[14px] font-medium text-[#111] leading-[1.4]">{s.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Transcript({ items }: { items: { speaker: string; time?: string; text: string; isAI?: boolean }[] }) {
  return (
    <div className="w-full max-w-[280px] space-y-2.5">
      {items.map((item, i) => (
        <div key={i} className="text-[12px] leading-[1.5]">
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className={`text-[10px] uppercase tracking-wider font-medium ${item.isAI ? "text-[#111]" : "text-[#999]"}`}>
              {item.speaker}
            </span>
            {item.time && <span className="text-[9px] text-[#999] font-mono">{item.time}</span>}
          </div>
          <p className={item.isAI ? "text-[#111]" : "text-[#666]"}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function BusyCall() {
  return (
    <div className="bg-white rounded-[10px] border border-[#f0f0f0] p-4 w-full max-w-[320px]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px -4px rgba(0,0,0,0.06)" }}>
      <Transcript items={[
        { speaker: "Caller", time: "0:12", text: "Hi, I'd like to book a dental cleaning." },
        { speaker: "Vox", time: "0:14", text: "Of course. Mornings or afternoons?", isAI: true },
        { speaker: "Caller", time: "0:22", text: "Afternoons work." },
      ]} />
    </div>
  );
}

function AfterHours() {
  return (
    <div className="bg-white rounded-[10px] border border-[#f0f0f0] p-4 w-full max-w-[320px]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px -4px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
        <span className="text-[10px] text-[#666]">After hours</span>
        <span className="text-[10px] text-[#999] font-mono ml-auto">9:42 PM</span>
      </div>
      <Transcript items={[
        { speaker: "Caller", time: "21:42", text: "Do you have any Saturday appointments next week?" },
        { speaker: "Vox", time: "21:42", text: "Yes — Saturday the 22nd at 10 AM or 11:30 AM.", isAI: true },
      ]} />
    </div>
  );
}

function Booking() {
  return (
    <div className="w-full max-w-[240px] bg-white border border-[#f0f0f0] rounded-[10px] p-3" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px -4px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-1.5 mb-2">
        <div className="h-3.5 w-3.5 rounded bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC04]"></div>
        <span className="text-[10px] font-medium text-[#111]">Calendar</span>
      </div>
      <div className="space-y-1">
        {["9:00", "10:00", "11:00"].map((t) => (
          <div key={t} className="h-5 bg-[#fafafa] rounded text-[8px] text-[#999] flex items-center px-1.5 border border-[#f5f5f5]">{t}</div>
        ))}
        <div className="h-9 bg-[#111] rounded text-white flex flex-col justify-center px-2">
          <div className="text-[8px] font-medium">2:30 PM</div>
          <div className="text-[7px] opacity-70">Confirmed</div>
        </div>
        {["3:30", "4:00"].map((t) => (
          <div key={t} className="h-5 bg-[#fafafa] rounded text-[8px] text-[#999] flex items-center px-1.5 border border-[#f5f5f5]">{t}</div>
        ))}
      </div>
    </div>
  );
}

function Reminder() {
  return (
    <div className="w-full max-w-[260px] space-y-2">
      <div className="text-[10px] text-[#999] uppercase tracking-wider">SMS • 24h before</div>
      <div className="bg-white border border-[#f0f0f0] rounded-[10px] p-3" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px -4px rgba(0,0,0,0.06)" }}>
        <div className="text-[9px] text-[#999] mb-1">Vox Front</div>
        <p className="text-[11px] text-[#111] leading-[1.4]">
          Hi Sarah — reminder: dental cleaning tomorrow at 2:30 PM with Dr. Chen. Reply C to confirm.
        </p>
      </div>
      <div className="bg-[#111] text-white rounded-[10px] p-3 ml-8">
        <div className="text-[9px] opacity-70 mb-1">You</div>
        <p className="text-[11px]">C</p>
      </div>
    </div>
  );
}

function Urgent() {
  return (
    <div className="bg-white rounded-[10px] border border-[#f0f0f0] p-4 w-full max-w-[320px]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px -4px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
        <span className="text-[10px] text-red-600 font-medium">Urgent</span>
      </div>
      <Transcript items={[
        { speaker: "Caller", time: "0:05", text: "My tooth is cracked — I need help now." },
        { speaker: "Vox", time: "0:06", text: "Let me connect you with Dr. Chen right away.", isAI: true },
      ]} />
    </div>
  );
}

function Questions() {
  return (
    <div className="bg-white rounded-[10px] border border-[#f0f0f0] p-4 w-full max-w-[320px]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px -4px rgba(0,0,0,0.06)" }}>
      <Transcript items={[
        { speaker: "Caller", time: "0:03", text: "What are your hours and do you take insurance?" },
        { speaker: "Vox", time: "0:04", text: "Mon–Fri 8–6, Sat 9–2. We take Delta, MetLife, Cigna, Aetna.", isAI: true },
      ]} />
    </div>
  );
}

function Multiple() {
  return (
    <div className="w-full max-w-[240px] space-y-1.5">
      <div className="text-[10px] text-[#999] uppercase tracking-wider mb-2">3 active calls</div>
      {[
        { name: "Maria S.", status: "Booking" },
        { name: "James T.", status: "Question" },
        { name: "Linda P.", status: "Transfer" },
      ].map((c, i) => (
        <div key={i} className="bg-white border border-[#f0f0f0] rounded-[8px] p-2.5 flex items-center justify-between" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px -4px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-medium text-[#111]">{c.name}</span>
          </div>
          <span className="text-[9px] text-[#999]">{c.status}</span>
        </div>
      ))}
    </div>
  );
}
