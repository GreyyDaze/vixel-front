import { COPY } from "@/content/copy";
import { Phone, Calendar, Clock, MessageSquare, Users, ArrowRight, Search } from "lucide-react";

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
              <div className="flex-1 min-h-[240px] flex items-center justify-center p-6 lg:p-8">
                {s.visual}
              </div>
              <div className="px-5 pb-6 pt-0">
                <h3 className="text-[14px] font-medium text-[#111] leading-[1.4]">{s.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHARED DESIGN SYSTEM
   ══════════════════════════════════════════════════════════════
   Typography:
     - 13px/600 → section titles
     - 12px/400 → body text
     - 11px/500 → labels
     - 10px/400 → metadata (timestamps, sources)

   Spacing: consistent 3/4/6/8 scale
   Radius: 8px outer, 6px inner, 100% avatars
   Shadow: 0 1px 2px rgba(0,0,0,0.04)
*/

const SHADOW = "0 1px 2px rgba(0,0,0,0.04)";
const OUTER_RADIUS = "rounded-[8px]";
const INNER_RADIUS = "rounded-[6px]";

/* ══════════════════════════════════════════════════════════════
   1. BUSY CALL — Dashboard showing AI handling while team busy
   ══════════════════════════════════════════════════════════════ */
function BusyCallPanel() {
  return (
    <div className="w-full max-w-[380px]">
      <div className={`bg-white ${OUTER_RADIUS} p-4`} style={{ boxShadow: SHADOW }}>
        {/* App chrome */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 bg-[#111] flex items-center justify-center" style={{ borderRadius: 6 }}>
              <Phone size={13} strokeWidth={2} color="white" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-[#111]">Clearview Dental</div>
              <div className="text-[11px] text-[#888]">2 calls in queue</div>
            </div>
          </div>
          <span className="text-[10px] text-[#888]">2:34 PM</span>
        </div>

        {/* Active call - no label, just the data */}
        <div className={`bg-[#FAFAFA] ${INNER_RADIUS} p-3.5 mb-3`}>
          <div className="flex items-start gap-2.5 mb-3">
            <div className="h-7 w-7 bg-[#111] text-white flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>S</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-[#111] mb-0.5">Sarah Patel</div>
              <div className="text-[10px] text-[#888]">Dental cleaning · 0:42</div>
            </div>
            <span className="text-[10px] font-medium text-[#002FD2] bg-[#EEF0FF] px-2 py-0.5 shrink-0" style={{ borderRadius: 4 }}>Handling</span>
          </div>
          <div className="border-t border-[#F0F0F0] pt-3">
            <div className="flex items-start gap-1.5">
              <span className="text-[10px] font-semibold text-[#888] w-6 shrink-0 mt-0.5">S</span>
              <p className="text-[11px] text-[#333] leading-[1.45]">"Need a cleaning next Tuesday afternoon"</p>
            </div>
            <div className="flex items-start gap-1.5 mt-2">
              <span className="text-[10px] font-semibold text-[#002FD2] w-6 shrink-0 mt-0.5">V</span>
              <p className="text-[11px] text-[#333] leading-[1.45]">"Tuesday 2:30 or 4:00 PM?"</p>
            </div>
          </div>
        </div>

        {/* Next in queue - supporting info, lighter */}
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 bg-[#F5F5F5] text-[#888] flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>R</div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] text-[#888]">Robert Chen</div>
            <div className="text-[10px] text-[#B0B0B0]">Reschedule · Waiting</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. AFTER HOURS — Call log with late timestamp
   ══════════════════════════════════════════════════════════════ */
function AfterHoursPanel() {
  return (
    <div className="w-full max-w-[280px]">
      <div className={`bg-white ${OUTER_RADIUS} p-4`} style={{ boxShadow: SHADOW }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Clock size={14} strokeWidth={2} color="#111" />
            <span className="text-[13px] font-semibold text-[#111]">Today's calls</span>
          </div>
          <span className="text-[10px] text-[#B0B0B0]">9 calls</span>
        </div>

        {/* Calls - hierarchy via weight and color, not boxes */}
        <div className="space-y-3">
          {/* Primary: after-hours call */}
          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 bg-[#111] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ borderRadius: 100 }}>J</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] font-medium text-[#111]">James Turner</span>
                <span className="text-[10px] text-[#B0B0B0] font-mono">9:42 PM</span>
              </div>
              <div className="text-[11px] text-[#002FD2] mt-0.5">After hours · Booked 10:00 AM Sat</div>
            </div>
          </div>

          <div className="border-t border-[#F0F0F0]" />

          {/* Secondary: regular calls, lighter */}
          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 bg-[#F5F5F5] text-[#888] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ borderRadius: 100 }}>M</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] text-[#888]">Maria Santos</span>
                <span className="text-[10px] text-[#B0B0B0] font-mono">2:14 PM</span>
              </div>
              <div className="text-[11px] text-[#888] mt-0.5">Cleaning · Confirmed</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 bg-[#F5F5F5] text-[#888] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ borderRadius: 100 }}>L</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] text-[#888]">Linda Park</span>
                <span className="text-[10px] text-[#B0B0B0] font-mono">11:08 AM</span>
              </div>
              <div className="text-[11px] text-[#888] mt-0.5">Question · Resolved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   3. BOOKING — Google Calendar with new booking
   ══════════════════════════════════════════════════════════════ */
function BookingPanel() {
  return (
    <div className="w-full max-w-[280px]">
      <div className={`bg-white ${OUTER_RADIUS} p-4`} style={{ boxShadow: SHADOW }}>
        {/* Calendar chrome */}
        <div className="flex items-center gap-2.5 mb-4">
          <Calendar size={14} strokeWidth={2} color="#111" />
          <span className="text-[13px] font-semibold text-[#111]">Google Calendar</span>
          <span className="text-[10px] text-[#B0B0B0] ml-auto">Tue, Mar 18</span>
        </div>

        {/* Day view */}
        <div className="space-y-0">
          {["9:00", "10:00", "11:00", "12:00", "1:00"].map((t) => (
            <div key={t} className="flex items-center h-7">
              <span className="text-[10px] text-[#C0C0C0] w-10 font-mono">{t}</span>
            </div>
          ))}
          {/* Booking */}
          <div className="flex items-start h-10">
            <span className="text-[10px] text-[#C0C0C0] w-10 font-mono mt-0.5">2:00</span>
            <div className="flex-1 bg-[#002FD2] px-2.5 py-1.5" style={{ borderRadius: 6 }}>
              <div className="text-[11px] font-medium text-white leading-tight">Cleaning — Sarah Patel</div>
              <div className="text-[10px] text-white/70 mt-0.5">2:30 PM · 60 min</div>
            </div>
          </div>
          <div className="flex items-start h-10">
            <span className="text-[10px] text-[#C0C0C0] w-10 font-mono mt-0.5">3:00</span>
          </div>
          {["3:30", "4:00", "5:00"].map((t) => (
            <div key={t} className="flex items-center h-7">
              <span className="text-[10px] text-[#C0C0C0] w-10 font-mono">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. URGENT — Agent handling a live call (agent view, not dashboard)
   ═════════════════════════════════════════════════════════════ */
function UrgentPanel() {
  return (
    <div className="w-full max-w-[380px]">
      <div className={`bg-white ${OUTER_RADIUS} p-4`} style={{ boxShadow: SHADOW }}>
        {/* Agent header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 bg-[#111] flex items-center justify-center" style={{ borderRadius: 6 }}>
              <Phone size={13} strokeWidth={2} color="white" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-[#111]">Vox Front</div>
              <div className="text-[11px] text-[#888]">Agent active</div>
            </div>
          </div>
          <span className="text-[10px] font-medium text-[#EF4444]">0:05</span>
        </div>

        {/* Caller */}
        <div className="flex items-start gap-2.5 mb-4">
          <div className="h-7 w-7 bg-[#111] text-white flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>L</div>
          <div>
            <div className="text-[12px] font-medium text-[#111]">Linda Park</div>
            <div className="text-[10px] text-[#888]">+1 (408) 555-0167</div>
          </div>
        </div>

        {/* Urgent chip */}
        <div className="text-[10px] font-semibold text-[#EF4444] uppercase tracking-wider mb-3">Emergency</div>

        {/* What Vox heard */}
        <p className="text-[12px] text-[#333] leading-[1.5] mb-4">"My tooth is cracked — I need to see someone immediately."</p>

        {/* Transfer action */}
        <div className="flex items-center gap-3">
          <ArrowRight size={14} strokeWidth={2} color="#002FD2" />
          <div className="flex-1">
            <div className="text-[12px] font-medium text-[#111]">Connecting to Dr. Chen</div>
            <div className="text-[10px] text-[#888] mt-0.5">Emergency line · Ringing</div>
          </div>
          <div className="h-5 w-5 border-2 border-[#002FD2] border-t-transparent animate-spin" style={{ borderRadius: 100 }} />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. QUESTIONS — AI knowledge base answering (agent view)
   ══════════════════════════════════════════════════════════════ */
function QuestionsPanel() {
  return (
    <div className="w-full max-w-[280px]">
      <div className={`bg-white ${OUTER_RADIUS} p-4`} style={{ boxShadow: SHADOW }}>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <MessageSquare size={14} strokeWidth={2} color="#111" />
          <span className="text-[13px] font-semibold text-[#111]">Knowledge base</span>
        </div>

        {/* Q&A - no labels, just natural flow */}
        <div className="space-y-3.5">
          <div>
            <p className="text-[12px] text-[#333] leading-[1.5] mb-2">"What are your hours and do you take insurance?"</p>
          </div>
          <div className="border-t border-[#F0F0F0] pt-3.5">
            <p className="text-[12px] text-[#111] leading-[1.5] mb-1.5">Mon–Fri 8 AM–6 PM, Saturday 9–2.</p>
            <p className="text-[12px] text-[#111] leading-[1.5]">We accept Delta, MetLife, Cigna, and Aetna.</p>
          </div>
        </div>

        {/* Source metadata - subtle, at bottom */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#F0F0F0]">
          <Search size={10} strokeWidth={2} color="#C0C0C0" />
          <span className="text-[10px] text-[#C0C0C0]">3 sources · Updated 2 days ago</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   6. MULTIPLE — Dashboard showing concurrent calls
   ══════════════════════════════════════════════════════════════ */
function MultiplePanel() {
  return (
    <div className="w-full max-w-[520px]">
      <div className={`bg-white ${OUTER_RADIUS} p-4`} style={{ boxShadow: SHADOW }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Users size={14} strokeWidth={2} color="#111" />
            <span className="text-[13px] font-semibold text-[#111]">Active calls</span>
          </div>
          <span className="text-[11px] font-medium text-[#002FD2]">3 concurrent</span>
        </div>

        {/* Calls */}
        <div className="space-y-3">
          {/* Primary call */}
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 bg-[#111] text-white flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>M</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[12px] font-medium text-[#111]">Maria Santos</span>
                <span className="text-[10px] text-[#888]">Booking</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#B0B0B0]">1:24</span>
            <span className="text-[10px] font-medium text-[#002FD2] bg-[#EEF0FF] px-2 py-0.5" style={{ borderRadius: 4 }}>Answering</span>
          </div>

          <div className="border-t border-[#F0F0F0]" />

          {/* Secondary calls */}
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 bg-[#F5F5F5] text-[#888] flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>J</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[12px] text-[#888]">James Turner</span>
                <span className="text-[10px] text-[#B0B0B0]">Question</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#B0B0B0]">0:42</span>
            <span className="text-[10px] font-medium text-[#002FD2] bg-[#EEF0FF] px-2 py-0.5" style={{ borderRadius: 4 }}>Answering</span>
          </div>

          <div className="border-t border-[#F0F0F0]" />

          <div className="flex items-center gap-3">
            <div className="h-7 w-7 bg-[#F5F5F5] text-[#888] flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>L</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[12px] text-[#888]">Linda Park</span>
                <span className="text-[10px] text-[#B0B0B0]">Transfer</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#B0B0B0]">0:15</span>
            <span className="text-[10px] font-medium text-[#F59E0B] bg-[#FFFBEB] px-2 py-0.5" style={{ borderRadius: 4 }}>Routing</span>
          </div>
        </div>

        {/* Footer - subtle summary */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F0F0F0]">
          <span className="text-[10px] text-[#B0B0B0]">12 calls answered today</span>
          <span className="text-[10px] font-medium text-[#002FD2]">0 missed</span>
        </div>
      </div>
    </div>
  );
}
