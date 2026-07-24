import { COPY } from "@/content/copy";
import { Phone, Calendar, Clock, MessageSquare, Users, ArrowRight } from "lucide-react";

const situations = [
  { title: "Answer calls when your team is busy", visual: <BusyCallPanel /> },
  { title: "Handle calls after business hours", visual: <AfterHoursPanel /> },
  { title: "Book, reschedule, and confirm appointments", visual: <BookingPanel /> },
  { title: "Transfer urgent calls to the right person", visual: <UrgentPanel /> },
  { title: "Answer common questions automatically", visual: <QuestionsPanel /> },
  { title: "Handle multiple calls at the same time", visual: <MultiplePanel /> },
];

export function RealSituations() {
  return (
    <section id="situations" className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-24">
      <div className="mb-14 max-w-[640px]">
        <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111] mb-4">
          {COPY.realSituations.headline}
        </h2>
        <p className="text-[14px] text-[#666] leading-[1.65]">
          {COPY.realSituations.subhead}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {situations.map((s, i) => {
          let gridColumn = 'span 1';
          if (i === 0) gridColumn = 'span 2';
          else if (i === 5) gridColumn = 'span 3';

          return (
            <div
              key={i}
              className="overflow-hidden flex flex-col"
              style={{
                gridColumn,
                backgroundColor: '#F2F2F2',
              }}
            >
              <div className="flex-1 min-h-[220px] flex items-center justify-center p-6 lg:p-8">
                {s.visual}
              </div>
              <div className="px-5 pb-5 pt-0">
                <h3 className="text-[14px] font-medium text-[#111] leading-[1.4]">{s.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── BUSY CALL PANEL: dashboard showing call handled while team busy ─── */
function BusyCallPanel() {
  return (
    <div className="w-full max-w-[380px]">
      {/* White mock card, constrained, floating on gray */}
      <div className="bg-white rounded-[6px] border border-[#E0E0E0] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* App header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E8E8]">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-[3px] bg-[#111] flex items-center justify-center">
              <Phone size={11} strokeWidth={2} color="white" />
            </div>
            <span className="text-[12px] font-medium text-[#111]">Clearview Dental</span>
          </div>
          <span className="text-[10px] text-[#999]">Live</span>
        </div>

        {/* Status bar */}
        <div className="px-4 py-2.5 bg-[#FAFAFA] border-b border-[#E8E8E8] flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#10B981]"></div>
          <span className="text-[10px] text-[#111] font-medium">Receptionist busy — Vox Front answering</span>
        </div>

        {/* Two-column content */}
        <div className="p-4 flex gap-4">
          {/* Left: transcript snippet */}
          <div className="flex-1 min-w-0">
            <div className="text-[9px] text-[#999] uppercase tracking-wider mb-2">Current call</div>
            <div className="space-y-2">
              <div className="flex items-start gap-1.5">
                <span className="text-[9px] text-[#999] font-medium w-8 shrink-0 mt-0.5">Caller</span>
                <p className="text-[11px] text-[#111] leading-[1.4]">"Need a cleaning next Tuesday afternoon"</p>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-[9px] text-[#002FD2] font-medium w-8 shrink-0 mt-0.5">Vox</span>
                <p className="text-[11px] text-[#111] leading-[1.4]">"Tuesday 2:30 or 4:00 PM?"</p>
              </div>
            </div>
          </div>

          {/* Right: action panel */}
          <div className="w-[120px] shrink-0">
            <div className="text-[9px] text-[#999] uppercase tracking-wider mb-2">Action</div>
            <div className="bg-[#F8F8F8] rounded-[4px] border border-[#E8E8E8] p-2.5">
              <div className="text-[10px] text-[#111] font-medium mb-1">Booking in progress</div>
              <div className="text-[9px] text-[#999]">Checking availability...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AFTER HOURS PANEL: call log with late timestamp ─── */
function AfterHoursPanel() {
  return (
    <div className="w-full max-w-[280px]">
      <div className="bg-white rounded-[6px] border border-[#E0E0E0] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* App header */}
        <div className="px-4 py-3 border-b border-[#E8E8E8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={13} strokeWidth={1.5} color="#999" />
            <span className="text-[12px] font-medium text-[#111]">Call log</span>
          </div>
          <span className="text-[9px] text-[#999]">Today</span>
        </div>

        {/* Call entries */}
        <div className="p-3 space-y-0">
          {/* After hours call - highlighted */}
          <div className="flex items-center gap-3 py-2.5 px-2 rounded-[4px] bg-[#FAFAFA]">
            <div className="h-7 w-7 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0">
              <span className="text-[9px] font-bold text-[#666]">J</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-[#111]">James T.</div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-[#002FD2] font-medium">After hours</span>
                <span className="text-[9px] text-[#999]">· Booked</span>
              </div>
            </div>
            <span className="text-[9px] text-[#999] font-mono">9:42 PM</span>
          </div>

          {/* Regular calls - muted */}
          {[
            { name: "Maria S.", time: "2:14 PM", status: "Booked" },
            { name: "Linda P.", time: "11:08 AM", status: "Question" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 px-2 opacity-50">
              <div className="h-7 w-7 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0">
                <span className="text-[9px] font-bold text-[#666]">{c.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-[#111]">{c.name}</div>
                <div className="text-[9px] text-[#999]">{c.status}</div>
              </div>
              <span className="text-[9px] text-[#999] font-mono">{c.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── BOOKING PANEL: calendar with new booking appearing ─── */
function BookingPanel() {
  return (
    <div className="w-full max-w-[280px]">
      <div className="bg-white rounded-[6px] border border-[#E0E0E0] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* Calendar header */}
        <div className="px-4 py-3 border-b border-[#E8E8E8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={13} strokeWidth={1.5} color="#111" />
            <span className="text-[12px] font-medium text-[#111]">Google Calendar</span>
          </div>
          <span className="text-[9px] text-[#999]">Tue, Mar 18</span>
        </div>

        {/* Time slots */}
        <div className="p-3 space-y-1">
          {["9:00", "10:00", "11:00", "12:00", "1:00"].map((t) => (
            <div key={t} className="h-6 bg-[#FAFAFA] rounded-[3px] border border-[#E8E8E8] flex items-center px-2.5">
              <span className="text-[9px] text-[#999]">{t}</span>
            </div>
          ))}
          {/* New booking - highlighted */}
          <div className="h-8 bg-[#002FD2] rounded-[3px] flex items-center px-2.5">
            <span className="text-[10px] font-medium text-white">2:30 — Cleaning</span>
            <span className="text-[9px] text-white/70 ml-auto">Sarah P.</span>
          </div>
          {["3:30", "4:00", "5:00"].map((t) => (
            <div key={t} className="h-6 bg-[#FAFAFA] rounded-[3px] border border-[#E8E8E8] flex items-center px-2.5">
              <span className="text-[9px] text-[#999]">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── URGENT PANEL: transfer workflow ─── */
function UrgentPanel() {
  return (
    <div className="w-full max-w-[380px]">
      <div className="bg-white rounded-[6px] border border-[#E0E0E0] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* App header */}
        <div className="px-4 py-3 border-b border-[#E8E8E8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-[3px] bg-[#111] flex items-center justify-center">
              <Phone size={11} strokeWidth={2} color="white" />
            </div>
            <span className="text-[12px] font-medium text-[#111]">Live call</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#EF4444] animate-pulse"></div>
            <span className="text-[10px] text-[#EF4444] font-medium">Urgent</span>
          </div>
        </div>

        {/* Transfer flow */}
        <div className="p-4">
          {/* Caller message */}
          <div className="flex items-start gap-2 mb-4">
            <div className="h-6 w-6 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[9px] font-bold text-[#666]">L</span>
            </div>
            <p className="text-[11px] text-[#111] leading-[1.5] pt-0.5">"My tooth is cracked — I need help now."</p>
          </div>

          {/* Transfer action */}
          <div className="bg-[#FAFAFA] rounded-[4px] border border-[#E8E8E8] p-3 flex items-center gap-3">
            <ArrowRight size={14} strokeWidth={1.5} color="#002FD2" />
            <div className="flex-1">
              <div className="text-[11px] text-[#111] font-medium">Transferring to Dr. Chen</div>
              <div className="text-[9px] text-[#999]">Emergency line · Ringing...</div>
            </div>
            <div className="h-5 w-5 rounded-full border-2 border-[#002FD2] border-t-transparent animate-spin"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── QUESTIONS PANEL: knowledge base response ── */
function QuestionsPanel() {
  return (
    <div className="w-full max-w-[280px]">
      <div className="bg-white rounded-[6px] border border-[#E0E0E0] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#E8E8E8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={13} strokeWidth={1.5} color="#111" />
            <span className="text-[12px] font-medium text-[#111]">Knowledge base</span>
          </div>
          <span className="text-[9px] text-[#10B981] font-medium">Auto-answered</span>
        </div>

        {/* Q&A */}
        <div className="p-4 space-y-3">
          <div>
            <div className="text-[9px] text-[#999] uppercase tracking-wider mb-1">Asked</div>
            <p className="text-[11px] text-[#111] leading-[1.5]">"What are your hours and do you take insurance?"</p>
          </div>
          <div className="border-t border-[#E8E8E8] pt-3">
            <div className="text-[9px] text-[#002FD2] uppercase tracking-wider mb-1">Answered</div>
            <p className="text-[11px] text-[#666] leading-[1.5]">Mon–Fri 8–6, Sat 9–2. We take Delta, MetLife, Cigna, Aetna.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MULTIPLE PANEL: concurrent calls dashboard ─── */
function MultiplePanel() {
  return (
    <div className="w-full max-w-[520px]">
      <div className="bg-white rounded-[6px] border border-[#E0E0E0] overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#E8E8E8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={13} strokeWidth={1.5} color="#111" />
            <span className="text-[12px] font-medium text-[#111]">Active calls</span>
          </div>
          <span className="text-[10px] text-[#002FD2] font-medium">3 concurrent</span>
        </div>

        {/* Calls list */}
        <div className="p-4 space-y-2">
          {[
            { name: "Maria S.", type: "Booking", time: "1:24", color: "#10B981", status: "Answering" },
            { name: "James T.", type: "Question", time: "0:42", color: "#002FD2", status: "Answering" },
            { name: "Linda P.", type: "Transfer", time: "0:15", color: "#F59E0B", status: "Routing" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 py-2 px-3 bg-[#FAFAFA] rounded-[4px] border border-[#E8E8E8]">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }}></div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-medium text-[#111]">{c.name}</span>
                <span className="text-[10px] text-[#999] ml-2">{c.type}</span>
              </div>
              <span className="text-[10px] text-[#999] font-mono">{c.time}</span>
              <span className="text-[9px] font-medium px-2 py-0.5 rounded-[3px]" style={{
                backgroundColor: `${c.color}15`,
                color: c.color,
              }}>{c.status}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[#E8E8E8] bg-[#FAFAFA] flex items-center justify-between">
          <span className="text-[10px] text-[#999]">Total today: 12</span>
          <span className="text-[10px] font-medium text-[#10B981]">All answered</span>
        </div>
      </div>
    </div>
  );
}
