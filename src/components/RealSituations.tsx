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

/* ─── BUSY CALL PANEL ── */
function BusyCallPanel() {
  return (
    <div className="w-full max-w-[380px]">
      <div className="bg-white rounded-[6px] p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-[3px] bg-[#111] flex items-center justify-center">
              <Phone size={11} strokeWidth={2} color="white" />
            </div>
            <span className="text-[12px] font-medium text-[#111]">Clearview Dental</span>
          </div>
          <span className="text-[10px] text-[#999]">Live</span>
        </div>

        {/* Status */}
        <div className="mb-4">
          <span className="text-[10px] text-[#111]">Receptionist busy — Vox Front answering</span>
        </div>

        {/* Content - two column */}
        <div className="flex gap-4">
          {/* Transcript */}
          <div className="flex-1">
            <div className="text-[9px] text-[#999] uppercase tracking-wider mb-2">Current call</div>
            <div className="space-y-2">
              <div className="flex items-start gap-1.5">
                <span className="text-[9px] text-[#999] font-medium w-8 shrink-0 mt-0.5">Caller</span>
                <p className="text-[11px] text-[#111] leading-[1.4]">"Need a cleaning next Tuesday"</p>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-[9px] text-[#002FD2] font-medium w-8 shrink-0 mt-0.5">Vox</span>
                <p className="text-[11px] text-[#111] leading-[1.4]">"2:30 or 4:00 PM?"</p>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="w-[120px] shrink-0">
            <div className="text-[9px] text-[#999] uppercase tracking-wider mb-2">Action</div>
            <div className="text-[10px] text-[#111]">Booking in progress</div>
            <div className="text-[9px] text-[#999] mt-0.5">Checking availability...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AFTER HOURS PANEL ─── */
function AfterHoursPanel() {
  return (
    <div className="w-full max-w-[280px]">
      <div className="bg-white rounded-[6px] p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Clock size={13} strokeWidth={1.5} color="#111" />
          <span className="text-[12px] font-medium text-[#111]">Call log</span>
          <span className="text-[9px] text-[#999] ml-auto">Today</span>
        </div>

        {/* Calls */}
        <div className="space-y-3">
          {/* After hours call */}
          <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-[#111] flex items-center justify-center">
                <span className="text-[9px] font-bold text-white">J</span>
              </div>
            <div className="flex-1">
              <div className="text-[11px] font-medium text-[#111]">James T.</div>
              <div className="text-[9px] text-[#002FD2]">After hours · Booked</div>
            </div>
            <span className="text-[9px] text-[#999] font-mono">9:42 PM</span>
          </div>

          {/* Other calls */}
          {[
            { name: "Maria S.", time: "2:14 PM" },
            { name: "Linda P.", time: "11:08 AM" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-[#111] flex items-center justify-center">
                <span className="text-[9px] font-bold text-white">{c.name[0]}</span>
              </div>
              <div className="flex-1">
                <div className="text-[11px] text-[#111]">{c.name}</div>
              </div>
              <span className="text-[9px] text-[#999] font-mono">{c.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── BOOKING PANEL ─── */
function BookingPanel() {
  return (
    <div className="w-full max-w-[280px]">
      <div className="bg-white rounded-[6px] p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={13} strokeWidth={1.5} color="#111" />
          <span className="text-[12px] font-medium text-[#111]">Google Calendar</span>
          <span className="text-[9px] text-[#999] ml-auto">Tue, Mar 18</span>
        </div>

        {/* Time slots */}
        <div className="space-y-1.5">
          {["9:00", "10:00", "11:00", "12:00", "1:00"].map((t) => (
            <div key={t} className="h-6 flex items-center px-2.5">
              <span className="text-[9px] text-[#999]">{t}</span>
            </div>
          ))}
          {/* New booking */}
          <div className="h-8 bg-[#002FD2] rounded-[3px] flex items-center px-2.5">
            <span className="text-[10px] font-medium text-white">2:30 — Cleaning</span>
            <span className="text-[9px] text-white/70 ml-auto">Sarah P.</span>
          </div>
          {["3:30", "4:00", "5:00"].map((t) => (
            <div key={t} className="h-6 flex items-center px-2.5">
              <span className="text-[9px] text-[#999]">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── URGENT PANEL ─── */
function UrgentPanel() {
  return (
    <div className="w-full max-w-[380px]">
      <div className="bg-white rounded-[6px] p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-[3px] bg-[#111] flex items-center justify-center">
              <Phone size={11} strokeWidth={2} color="white" />
            </div>
            <span className="text-[12px] font-medium text-[#111]">Live call</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#EF4444]">Urgent</span>
          </div>
        </div>

        {/* Caller message */}
        <div className="flex items-start gap-2 mb-4">
          <div className="h-6 w-6 rounded-full bg-[#111] flex items-center justify-center shrink-0">
            <span className="text-[9px] font-bold text-white">L</span>
          </div>
          <p className="text-[11px] text-[#111] leading-[1.5] pt-0.5">"My tooth is cracked — I need help now."</p>
        </div>

        {/* Transfer */}
        <div className="flex items-center gap-3">
          <ArrowRight size={14} strokeWidth={1.5} color="#002FD2" />
          <div className="flex-1">
            <div className="text-[11px] text-[#111]">Transferring to Dr. Chen</div>
            <div className="text-[9px] text-[#999]">Emergency line · Ringing...</div>
          </div>
          <div className="h-5 w-5 rounded-full border-2 border-[#002FD2] border-t-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

/* ─── QUESTIONS PANEL ─── */
function QuestionsPanel() {
  return (
    <div className="w-full max-w-[280px]">
      <div className="bg-white rounded-[6px] p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={13} strokeWidth={1.5} color="#111" />
          <span className="text-[12px] font-medium text-[#111]">Knowledge base</span>
          <span className="text-[9px] text-[#10B981] ml-auto">Auto-answered</span>
        </div>

        {/* Q&A */}
        <div className="space-y-3">
          <div>
            <div className="text-[9px] text-[#999] uppercase tracking-wider mb-1">Asked</div>
            <p className="text-[11px] text-[#111] leading-[1.5]">"Hours and insurance?"</p>
          </div>
          <div>
            <div className="text-[9px] text-[#002FD2] uppercase tracking-wider mb-1">Answered</div>
            <p className="text-[11px] text-[#666] leading-[1.5]">Mon–Fri 8–6, Sat 9–2. Delta, MetLife, Cigna, Aetna.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MULTIPLE PANEL ─── */
function MultiplePanel() {
  return (
    <div className="w-full max-w-[520px]">
      <div className="bg-white rounded-[6px] p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users size={13} strokeWidth={1.5} color="#111" />
            <span className="text-[12px] font-medium text-[#111]">Active calls</span>
          </div>
          <span className="text-[10px] text-[#002FD2]">3 concurrent</span>
        </div>

        {/* Calls */}
        <div className="space-y-2">
          {[
            { name: "Maria S.", type: "Booking", time: "1:24", status: "Answering" },
            { name: "James T.", type: "Question", time: "0:42", status: "Answering" },
            { name: "Linda P.", type: "Transfer", time: "0:15", status: "Routing" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1">
                <span className="text-[11px] font-medium text-[#111]">{c.name}</span>
                <span className="text-[10px] text-[#999] ml-2">{c.type}</span>
              </div>
              <span className="text-[10px] text-[#999] font-mono">{c.time}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-[3px] ${c.status === 'Routing' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-[#10B981]/10 text-[#10B981]'}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-[#F0F0F0] flex items-center justify-between">
          <span className="text-[10px] text-[#999]">Total today: 12</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#10B981]">All answered</span>
          </div>
        </div>
      </div>
    </div>
  );
}
