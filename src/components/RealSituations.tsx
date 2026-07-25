import { COPY } from "@/content/copy";
import { Phone, Calendar, Clock, MessageSquare, Users, ArrowRight, Search } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { StatusChip } from "./StatusChip";

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
    <section id="situations" className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 pt-24 pb-16 mb-11">
      <div className="mb-16 max-w-[640px]">
        <SectionHeading className="mb-4">{COPY.realSituations.headline}</SectionHeading>
        <p className="text-sm text-text-secondary leading-[1.65]">
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
              className="overflow-hidden flex flex-col rounded-lg border border-border-light"
              style={{
                gridColumn,
                backgroundColor: 'var(--color-card-warm)',
              }}
            >
              <div className="flex-1 min-h-[240px] flex items-center justify-center p-6 lg:p-8">
                {s.visual}
              </div>
              <div className="px-5 pb-6 pt-0">
                <h3 className="text-sm font-medium text-text-primary leading-[1.4]">{s.title}</h3>
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

const OUTER_RADIUS = "rounded-lg";
const INNER_RADIUS = "rounded-md";

/* ══════════════════════════════════════════════════════════════
   1. BUSY CALL — Dashboard showing AI handling while team busy
   ══════════════════════════════════════════════════════════════ */
function BusyCallPanel() {
  return (
    <div className="w-full max-w-[380px]">
      <div className={`bg-white ${OUTER_RADIUS} p-4 shadow-card`}>
        {/* App chrome */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 bg-element-bg flex items-center justify-center" style={{ borderRadius: 6 }}>
              <Phone size={13} strokeWidth={2} color="white" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-text-primary">Clearview Dental</div>
              <div className="text-[11px] text-text-tertiary">2 calls in queue</div>
            </div>
          </div>
          <span className="text-[10px] text-text-tertiary">2:34 PM</span>
        </div>

        {/* Active call - no label, just the data */}
        <div className={`bg-brand-light ${INNER_RADIUS} p-3.5 mb-3`}>
          <div className="flex items-start gap-2.5 mb-3">
            <div className="h-7 w-7 bg-element-bg text-white flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>S</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-text-primary mb-0.5">Sarah Patel</div>
              <div className="text-[10px] text-text-tertiary">Dental cleaning · 0:42</div>
            </div>
            <StatusChip>Handling</StatusChip>
          </div>
          <div className="border-t pt-3">
            <div className="flex items-start gap-1.5">
              <span className="text-[10px] font-semibold text-text-tertiary w-6 shrink-0 mt-0.5">S</span>
              <p className="text-[11px] text-text-conversation leading-[1.45]">"Need a cleaning next Tuesday afternoon"</p>
            </div>
            <div className="flex items-start gap-1.5 mt-2">
              <span className="text-[10px] font-semibold text-brand-blue w-6 shrink-0 mt-0.5">V</span>
              <p className="text-[11px] text-text-conversation leading-[1.45]">"Tuesday 2:30 or 4:00 PM?"</p>
            </div>
          </div>
        </div>

        {/* Next in queue - supporting info, lighter */}
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 bg-avatar-bg text-text-tertiary flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>R</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-text-tertiary">Robert Chen</div>
            <div className="text-[10px] text-text-dim">Reschedule · Waiting</div>
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
      <div className={`bg-white ${OUTER_RADIUS} p-4 shadow-card`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Clock size={14} strokeWidth={2} color="var(--color-text-primary)" />
            <span className="text-[13px] font-semibold text-text-primary">Today's calls</span>
          </div>
          <span className="text-[10px] text-text-dim">9 calls</span>
        </div>

        {/* Calls - hierarchy via weight and color, not boxes */}
        <div className="space-y-3">
          {/* Primary: after-hours call */}
          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 bg-element-bg text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ borderRadius: 100 }}>J</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-medium text-text-primary">James Turner</span>
                <span className="text-[10px] text-text-dim font-mono">9:42 PM</span>
              </div>
              <div className="text-[11px] text-brand-blue mt-0.5">After hours · Booked 10:00 AM Sat</div>
            </div>
          </div>

          <div className="border-t" />

          {/* Secondary: regular calls, lighter */}
          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 bg-avatar-bg text-text-tertiary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ borderRadius: 100 }}>M</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs text-text-tertiary">Maria Santos</span>
                <span className="text-[10px] text-text-dim font-mono">2:14 PM</span>
              </div>
              <div className="text-[11px] text-text-tertiary mt-0.5">Cleaning · Confirmed</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 bg-avatar-bg text-text-tertiary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ borderRadius: 100 }}>L</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs text-text-tertiary">Linda Park</span>
                <span className="text-[10px] text-text-dim font-mono">11:08 AM</span>
              </div>
              <div className="text-[11px] text-text-tertiary mt-0.5">Question · Resolved</div>
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
      <div className={`bg-white ${OUTER_RADIUS} p-4 shadow-card`}>
        {/* Calendar chrome */}
        <div className="flex items-center gap-2.5 mb-4">
          <Calendar size={14} strokeWidth={2} color="var(--color-text-primary)" />
          <span className="text-[13px] font-semibold text-text-primary">Google Calendar</span>
          <span className="text-[10px] text-text-dim ml-auto">Tue, Mar 18</span>
        </div>

        {/* Day view */}
        <div className="space-y-0">
          {["9:00", "10:00", "11:00", "12:00", "1:00"].map((t) => (
            <div key={t} className="flex items-center h-7">
              <span className="text-[10px] text-text-faint w-10 font-mono">{t}</span>
            </div>
          ))}
          {/* Booking */}
          <div className="flex items-start h-10">
            <span className="text-[10px] text-text-faint w-10 font-mono mt-0.5">2:00</span>
            <div className="flex-1 bg-brand-blue px-2.5 py-1.5" style={{ borderRadius: 6 }}>
              <div className="text-[11px] font-medium text-white leading-tight">Cleaning — Sarah Patel</div>
              <div className="text-[10px] text-white/70 mt-0.5">2:30 PM · 60 min</div>
            </div>
          </div>
          <div className="flex items-start h-10">
            <span className="text-[10px] text-text-faint w-10 font-mono mt-0.5">3:00</span>
          </div>
          {["3:30", "4:00", "5:00"].map((t) => (
            <div key={t} className="flex items-center h-7">
              <span className="text-[10px] text-text-faint w-10 font-mono">{t}</span>
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
      <div className={`bg-white ${OUTER_RADIUS} p-4 shadow-card`}>
        {/* Agent header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 bg-element-bg flex items-center justify-center" style={{ borderRadius: 6 }}>
              <Phone size={13} strokeWidth={2} color="white" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-text-primary">Vox Front</div>
              <div className="text-[11px] text-text-tertiary">Agent active</div>
            </div>
          </div>
          <span className="text-[10px] font-medium text-[#EF4444]">0:05</span>
        </div>

        {/* Caller */}
        <div className="flex items-start gap-2.5 mb-4">
          <div className="h-7 w-7 bg-element-bg text-white flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>L</div>
          <div>
            <div className="text-xs font-medium text-text-primary">Linda Park</div>
            <div className="text-[10px] text-text-tertiary">+1 (408) 555-0167</div>
          </div>
        </div>

        {/* Urgent chip */}
        <div className="text-[10px] font-semibold text-[#EF4444] uppercase tracking-wider mb-3">Emergency</div>

        {/* What Vox heard */}
        <p className="text-xs text-text-conversation leading-[1.5] mb-4">"My tooth is cracked — I need to see someone immediately."</p>

        {/* Transfer action */}
        <div className="flex items-center gap-3">
          <ArrowRight size={14} strokeWidth={2} color="var(--color-brand-blue)" />
          <div className="flex-1">
            <div className="text-xs font-medium text-text-primary">Connecting to Dr. Chen</div>
            <div className="text-[10px] text-text-tertiary mt-0.5">Emergency line · Ringing</div>
          </div>
          <div className="h-5 w-5 border-2 border-brand-blue border-t-transparent animate-spin" style={{ borderRadius: 100 }} />
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
      <div className={`bg-white ${OUTER_RADIUS} p-4 shadow-card`}>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <MessageSquare size={14} strokeWidth={2} color="var(--color-text-primary)" />
          <span className="text-[13px] font-semibold text-text-primary">Knowledge base</span>
        </div>

        {/* Q&A - no labels, just natural flow */}
        <div className="space-y-3.5">
          <div>
            <p className="text-xs text-text-conversation leading-[1.5] mb-2">"What are your hours and do you take insurance?"</p>
          </div>
          <div className="border-t pt-3.5">
            <p className="text-xs text-text-primary leading-[1.5] mb-1.5">Mon–Fri 8 AM–6 PM, Saturday 9–2.</p>
            <p className="text-xs text-text-primary leading-[1.5]">We accept Delta, MetLife, Cigna, and Aetna.</p>
          </div>
        </div>

        {/* Source metadata - subtle, at bottom */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t">
          <Search size={10} strokeWidth={2} color="var(--color-text-faint)" />
          <span className="text-[10px] text-text-faint">3 sources · Updated 2 days ago</span>
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
      <div className={`bg-white ${OUTER_RADIUS} p-4 shadow-card`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Users size={14} strokeWidth={2} color="var(--color-text-primary)" />
            <span className="text-[13px] font-semibold text-text-primary">Active calls</span>
          </div>
          <span className="text-[11px] font-medium text-brand-blue">3 concurrent</span>
        </div>

        {/* Calls */}
        <div className="space-y-3">
          {/* Primary call */}
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 bg-element-bg text-white flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>M</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-medium text-text-primary">Maria Santos</span>
                <span className="text-[10px] text-text-tertiary">Booking</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-text-dim">1:24</span>
            <StatusChip>Answering</StatusChip>
          </div>

          <div className="border-t" />

          {/* Secondary calls */}
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 bg-avatar-bg text-text-tertiary flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>J</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-text-tertiary">James Turner</span>
                <span className="text-[10px] text-text-dim">Question</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-text-dim">0:42</span>
            <StatusChip>Answering</StatusChip>
          </div>

          <div className="border-t" />

          <div className="flex items-center gap-3">
            <div className="h-7 w-7 bg-avatar-bg text-text-tertiary flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>L</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-text-tertiary">Linda Park</span>
                <span className="text-[10px] text-text-dim">Transfer</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-text-dim">0:15</span>
            <span className="text-[10px] font-medium text-[#F59E0B] bg-[#FFFBEB] px-2 py-0.5" style={{ borderRadius: 4 }}>Routing</span>
          </div>
        </div>

        {/* Footer - subtle summary */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t">
          <span className="text-[10px] text-text-dim">12 calls answered today</span>
          <span className="text-[10px] font-medium text-brand-blue">0 missed</span>
        </div>
      </div>
    </div>
  );
}
