import { COPY } from "@/content/copy";
import { Phone, Calendar, Clock, AlertTriangle, MessageCircle, Users } from "lucide-react";

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
          // Bento layout matching reference
          let gridColumn = 'span 1';
          if (i === 0) gridColumn = 'span 2';
          else if (i === 5) gridColumn = 'span 3';

          return (
            <div
              key={i}
              className="overflow-hidden flex flex-col"
              style={{
                gridColumn,
                backgroundColor: '#f5f5f7',
              }}
            >
              <div className="flex-1 min-h-[200px] flex items-center justify-center p-6">
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

/* ─── BUSY CALL PANEL ─── */
function BusyCallPanel() {
  return (
    <div className="w-full bg-white rounded-[8px] border border-[#E8E8E8] p-5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-[4px] bg-[#F0F0F0] flex items-center justify-center">
            <Phone size={16} strokeWidth={1.5} color="#111" />
          </div>
          <div>
            <div className="text-[13px] font-medium text-[#111]">Sarah Patel</div>
            <div className="text-[11px] text-[#999]">+1 (415) 555-0142</div>
          </div>
        </div>
        <div className="text-[11px] text-[#999] font-mono">2:34 PM</div>
      </div>

      {/* Call status */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#F0F0F0]">
        <div className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></div>
        <span className="text-[12px] font-medium text-[#111]">Active call</span>
        <span className="text-[11px] text-[#999] font-mono ml-auto">0:42</span>
      </div>

      {/* Transcript */}
      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="h-6 w-6 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[9px] font-bold text-[#666]">S</span>
          </div>
          <div className="flex-1">
            <div className="text-[10px] text-[#999] mb-0.5">Sarah</div>
            <p className="text-[12px] text-[#111] leading-[1.5]">Hi, I need to book a dental cleaning for next week. Are you available Tuesday afternoon?</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="h-6 w-6 rounded-full bg-[#002FD2] flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[9px] font-bold text-white">V</span>
          </div>
          <div className="flex-1">
            <div className="text-[10px] text-[#002FD2] font-medium mb-0.5">Vox Front</div>
            <p className="text-[12px] text-[#111] leading-[1.5]">Yes! I have Tuesday at 2:30 PM or 4:00 PM available. Which works better for you?</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#F0F0F0]">
        <button className="px-3 py-1.5 bg-[#002FD2] text-white text-[11px] font-medium rounded-[4px]">Book appointment</button>
        <button className="px-3 py-1.5 bg-[#F0F0F0] text-[#111] text-[11px] font-medium rounded-[4px]">Transfer</button>
      </div>
    </div>
  );
}

/* ─── AFTER HOURS PANEL ─── */
function AfterHoursPanel() {
  return (
    <div className="w-full bg-white rounded-[8px] border border-[#E8E8E8] p-5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      {/* Header with after hours badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={16} strokeWidth={1.5} color="#999" />
          <span className="text-[11px] font-medium text-[#002FD2] bg-[#EEF0FF] px-2 py-0.5 rounded-[3px]">After hours</span>
        </div>
        <div className="text-[11px] text-[#999] font-mono">9:42 PM</div>
      </div>

      {/* Caller info */}
      <div className="mb-4 pb-4 border-b border-[#F0F0F0]">
        <div className="text-[13px] font-medium text-[#111] mb-0.5">James Turner</div>
        <div className="text-[11px] text-[#999]">+1 (650) 555-0198</div>
      </div>

      {/* Conversation */}
      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="h-6 w-6 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[9px] font-bold text-[#666]">J</span>
          </div>
          <div className="flex-1">
            <div className="text-[10px] text-[#999] mb-0.5">James</div>
            <p className="text-[12px] text-[#111] leading-[1.5]">Do you have any Saturday appointments available next week?</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="h-6 w-6 rounded-full bg-[#002FD2] flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[9px] font-bold text-white">V</span>
          </div>
          <div className="flex-1">
            <div className="text-[10px] text-[#002FD2] font-medium mb-0.5">Vox Front</div>
            <p className="text-[12px] text-[#111] leading-[1.5]">Yes, I have Saturday at 10:00 AM or 11:30 AM. Would either of those work?</p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 pt-4 border-t border-[#F0F0F0] flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[#10B981]"></div>
        <span className="text-[11px] text-[#10B981] font-medium">Appointment booked</span>
      </div>
    </div>
  );
}

/* ─── BOOKING PANEL ─── */
function BookingPanel() {
  return (
    <div className="w-full bg-white rounded-[8px] border border-[#E8E8E8] p-5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={16} strokeWidth={1.5} color="#002FD2" />
        <span className="text-[13px] font-medium text-[#111]">Google Calendar</span>
        <span className="text-[11px] text-[#999] ml-auto">Tue, Mar 18</span>
      </div>

      {/* Available slots */}
      <div className="mb-4">
        <div className="text-[10px] text-[#999] uppercase tracking-wider mb-2">Available times</div>
        <div className="space-y-1.5">
          {["9:00 AM", "10:00 AM", "11:00 AM"].map((time) => (
            <div key={time} className="h-7 bg-[#F5F5F7] rounded-[4px] flex items-center px-3 border border-[#E8E8E8]">
              <span className="text-[11px] text-[#666]">{time}</span>
              <span className="text-[9px] text-[#10B981] ml-auto">Available</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected slot */}
      <div className="mb-4">
        <div className="text-[10px] text-[#999] uppercase tracking-wider mb-2">Selected</div>
        <div className="h-9 bg-[#002FD2] rounded-[4px] flex items-center px-3">
          <span className="text-[12px] font-medium text-white">2:30 PM — Dental cleaning</span>
          <span className="text-[10px] text-white/80 ml-auto">60 min</span>
        </div>
      </div>

      {/* Confirmation */}
      <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-[6px] p-3 flex items-center gap-2">
        <div className="h-5 w-5 rounded-full bg-[#10B981] flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="text-[11px] font-medium text-[#111]">Booking confirmed</div>
          <div className="text-[10px] text-[#666]">Sarah Patel • Tuesday 2:30 PM</div>
        </div>
      </div>
    </div>
  );
}

/* ─── URGENT PANEL ─── */
function UrgentPanel() {
  return (
    <div className="w-full bg-white rounded-[8px] border border-[#E8E8E8] p-5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      {/* Header with urgent badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} strokeWidth={1.5} color="#EF4444" />
          <span className="text-[11px] font-medium text-[#EF4444] bg-[#FEE2E2] px-2 py-0.5 rounded-[3px]">Urgent</span>
        </div>
        <div className="text-[11px] text-[#999] font-mono">0:05</div>
      </div>

      {/* Caller info */}
      <div className="mb-4 pb-4 border-b border-[#F0F0F0]">
        <div className="text-[13px] font-medium text-[#111] mb-0.5">Linda Park</div>
        <div className="text-[11px] text-[#999]">+1 (408) 555-0167</div>
      </div>

      {/* Conversation */}
      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2.5">
          <div className="h-6 w-6 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[9px] font-bold text-[#666]">L</span>
          </div>
          <div className="flex-1">
            <div className="text-[10px] text-[#999] mb-0.5">Linda</div>
            <p className="text-[12px] text-[#111] leading-[1.5]">My tooth is cracked and I'm in severe pain. I need to see someone immediately.</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="h-6 w-6 rounded-full bg-[#002FD2] flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[9px] font-bold text-white">V</span>
          </div>
          <div className="flex-1">
            <div className="text-[10px] text-[#002FD2] font-medium mb-0.5">Vox Front</div>
            <p className="text-[12px] text-[#111] leading-[1.5]">I understand. Let me connect you with Dr. Chen right away. Please hold.</p>
          </div>
        </div>
      </div>

      {/* Transfer status */}
      <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-[6px] p-3 flex items-center gap-2">
        <div className="h-5 w-5 rounded-full bg-[#F59E0B] flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" />
          </svg>
        </div>
        <div>
          <div className="text-[11px] font-medium text-[#111]">Transferring to Dr. Chen</div>
          <div className="text-[10px] text-[#666]">Emergency line • Ringing...</div>
        </div>
      </div>
    </div>
  );
}

/* ─── QUESTIONS PANEL ─── */
function QuestionsPanel() {
  return (
    <div className="w-full bg-white rounded-[8px] border border-[#E8E8E8] p-5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle size={16} strokeWidth={1.5} color="#002FD2" />
        <span className="text-[13px] font-medium text-[#111]">Common questions</span>
        <span className="text-[11px] text-[#999] ml-auto">Auto-answered</span>
      </div>

      {/* Q&A pairs */}
      <div className="space-y-3">
        <div className="pb-3 border-b border-[#F0F0F0]">
          <div className="text-[10px] text-[#999] uppercase tracking-wider mb-1">Question</div>
          <p className="text-[12px] text-[#111] leading-[1.5] mb-2">What are your hours and do you accept insurance?</p>
          <div className="text-[10px] text-[#999] uppercase tracking-wider mb-1">Answer</div>
          <p className="text-[12px] text-[#666] leading-[1.5]">Monday–Friday 8 AM–6 PM, Saturday 9 AM–2 PM. We accept Delta, MetLife, Cigna, and Aetna.</p>
        </div>

        <div className="pb-3 border-b border-[#F0F0F0]">
          <div className="text-[10px] text-[#999] uppercase tracking-wider mb-1">Question</div>
          <p className="text-[12px] text-[#111] leading-[1.5] mb-2">How much does a cleaning cost?</p>
          <div className="text-[10px] text-[#999] uppercase tracking-wider mb-1">Answer</div>
          <p className="text-[12px] text-[#666] leading-[1.5]">Routine cleaning is $150 without insurance. With insurance, typically $30–50 copay.</p>
        </div>

        <div>
          <div className="text-[10px] text-[#999] uppercase tracking-wider mb-1">Question</div>
          <p className="text-[12px] text-[#111] leading-[1.5] mb-2">Do you offer emergency appointments?</p>
          <div className="text-[10px] text-[#999] uppercase tracking-wider mb-1">Answer</div>
          <p className="text-[12px] text-[#666] leading-[1.5]">Yes, we reserve daily slots for emergencies. Call us and we'll fit you in same-day when possible.</p>
        </div>
      </div>
    </div>
  );
}

/* ─── MULTIPLE CALLS PANEL ─── */
function MultiplePanel() {
  return (
    <div className="w-full bg-white rounded-[8px] border border-[#E8E8E8] p-5" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Users size={16} strokeWidth={1.5} color="#002FD2" />
        <span className="text-[13px] font-medium text-[#111]">Active calls</span>
        <span className="text-[11px] font-medium text-[#002FD2] bg-[#EEF0FF] px-2 py-0.5 rounded-[3px] ml-auto">3 concurrent</span>
      </div>

      {/* Call list */}
      <div className="space-y-2.5">
        {/* Call 1 */}
        <div className="flex items-center gap-3 p-3 bg-[#F5F5F7] rounded-[6px] border border-[#E8E8E8]">
          <div className="h-8 w-8 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-[#666]">M</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-[#111] truncate">Maria Santos</div>
            <div className="text-[10px] text-[#999] truncate">Booking • 1:24</div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></div>
            <span className="text-[10px] font-medium text-[#10B981]">Active</span>
          </div>
        </div>

        {/* Call 2 */}
        <div className="flex items-center gap-3 p-3 bg-[#F5F5F7] rounded-[6px] border border-[#E8E8E8]">
          <div className="h-8 w-8 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-[#666]">J</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-[#111] truncate">James Turner</div>
            <div className="text-[10px] text-[#999] truncate">Question • 0:42</div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></div>
            <span className="text-[10px] font-medium text-[#10B981]">Active</span>
          </div>
        </div>

        {/* Call 3 */}
        <div className="flex items-center gap-3 p-3 bg-[#F5F5F7] rounded-[6px] border border-[#E8E8E8]">
          <div className="h-8 w-8 rounded-full bg-[#F0F0F0] flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-[#666]">L</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-[#111] truncate">Linda Park</div>
            <div className="text-[10px] text-[#999] truncate">Transfer • 0:15</div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#F59E0B]"></div>
            <span className="text-[10px] font-medium text-[#F59E0B]">Routing</span>
          </div>
        </div>
      </div>

      {/* Footer stats */}
      <div className="mt-4 pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
        <div className="text-[11px] text-[#999]">Total calls today: 12</div>
        <div className="text-[11px] font-medium text-[#10B981]">All answered</div>
      </div>
    </div>
  );
}
