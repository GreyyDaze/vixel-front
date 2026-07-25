"use client";

import { useEffect, useState } from "react";
import { Phone, User, LayoutDashboard, Calendar, BookOpen, BarChart3 } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { StatusChip } from "./StatusChip";

// ============================================================
// STAGE — drives the entire sequence with state
// ============================================================
type Phase = "ringing" | "accepted" | "caller1" | "vox1" | "caller2" | "vox2" | "updating" | "done";

const PHASE_DURATIONS: Record<Phase, number> = {
  ringing: 3200,
  accepted: 0,
  caller1: 3200,
  vox1: 3200,
  caller2: 2800,
  vox2: 2600,
  updating: 2600,
  done: 4500,
};
const PHASE_ORDER: Phase[] = ["ringing", "accepted", "caller1", "vox1", "caller2", "vox2", "updating", "done"];

export function HeroStage() {
  const [phase, setPhase] = useState<Phase>("ringing");
  const [callSeconds, setCallSeconds] = useState(0);
  const [newCallInDashboard, setNewCallInDashboard] = useState(false);
  const [bookingsCount, setBookingsCount] = useState(182);

  useEffect(() => {
    let timer: number | undefined;
    const advance = () => {
      const idx = PHASE_ORDER.indexOf(phase);
      const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
      if (next === "ringing") {
        setNewCallInDashboard(false);
        setBookingsCount(182);
        setCallSeconds(0);
      }
      setPhase(next);
    };
    timer = window.setTimeout(advance, PHASE_DURATIONS[phase]);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [phase]);

  useEffect(() => {
    const liveCall = phase !== "ringing" && phase !== "done" && phase !== "accepted";
    if (!liveCall) return;
    const t = window.setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "updating") {
      const t = window.setTimeout(() => {
        setNewCallInDashboard(true);
        setBookingsCount(183);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const showPhone = phase === "ringing" || phase === "accepted";
  const showCallCard = phase !== "ringing" && phase !== "done" && phase !== "accepted";
  const showBookedToast = phase === "updating" || phase === "done";
  const showVox1 = phase === "vox1" || phase === "caller2" || phase === "vox2" || phase === "updating" || phase === "done";
  const showCaller2 = phase === "caller2" || phase === "vox2" || phase === "updating" || phase === "done";
  const showVox2 = phase === "vox2" || phase === "updating" || phase === "done";
  const showConfirmed = phase === "updating" || phase === "done";

  return (
    <div className="relative w-full max-w-[1200px] px-12 h-full flex items-center justify-center">
      <div className="relative w-full h-[88%] flex items-center justify-center bg-gradient-to-b from-brand-blue/10 to-transparent overflow-hidden">
        {/* Desktop: dashboard + overlays (lg and up) */}
        <div className="hidden lg:block w-full h-full">
          <DesktopDashboard newCall={newCallInDashboard} bookingsCount={bookingsCount} />
        </div>

        {/* Mobile/tablet (< lg): sequential flow */}

        {/* Step 1 — Phone mockup (full height) */}
        <div
          className="absolute inset-0 z-10 lg:hidden transition-opacity duration-500"
          style={{ opacity: showPhone ? 1 : 0, pointerEvents: showPhone ? "auto" : "none" }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <PhoneMockup />
          </div>
        </div>

        {/* Step 2 — Live call (shown when call is active, after phone picks up) */}
        <div
          className="absolute inset-x-2 bottom-0 z-20 lg:hidden transition-opacity duration-500"
          style={{ opacity: showCallCard ? 1 : 0, pointerEvents: showCallCard ? "auto" : "none", maxHeight: "60%", overflowY: "auto" }}
        >
          <div className="bg-white rounded-lg shadow-card border border-border-light overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b">
              <span className="text-[11px] font-semibold text-text-primary">{phase === "accepted" ? "Call connected" : "Live call"}</span>
              <span className="text-[9px] font-mono text-text-tertiary">{String(Math.floor(callSeconds / 60)).padStart(2, '0')}:{String(callSeconds % 60).padStart(2, '0')}</span>
            </div>
            <div className="p-3 space-y-2.5">
              {showVox1 && (
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-semibold text-brand-blue w-5 shrink-0 mt-0.5">V</span>
                  <p className="text-[11px] text-text-conversation leading-[1.45]">Tuesday at 2:30 or 4:00 — which works?</p>
                </div>
              )}
              {showCaller2 && (
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-semibold text-text-tertiary w-5 shrink-0 mt-0.5">S</span>
                  <p className="text-[11px] text-text-conversation leading-[1.45]">2:30 works.</p>
                </div>
              )}
              {showVox2 && !showConfirmed && (
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-semibold text-brand-blue w-5 shrink-0 mt-0.5">V</span>
                  <p className="text-[11px] text-text-conversation leading-[1.45]">Booking it now. I'll send a reminder the day before.</p>
                </div>
              )}
              {showConfirmed && (
                <div className="flex items-center gap-1.5 p-2 bg-brand-light rounded-md">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="var(--color-brand-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[10px] text-brand-blue font-medium">Booked in Google Calendar</span>
                </div>
              )}
              {!showConfirmed && (
                <div className="flex items-center justify-center gap-[2px] h-5">
                  {[6, 10, 14, 8, 12, 16, 10, 6, 12, 14, 8, 10, 16, 12, 8, 14, 10, 6, 12, 10].map((h, j) => (
                    <div key={j} className="w-[2px] bg-brand-blue rounded-full" style={{ height: `${h * 0.4}px`, animationDelay: `${j * 0.05}s`, opacity: 0.6 }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 3 — Booking confirmed / appointments table */}
        <div
          className="absolute inset-4 z-30 lg:hidden transition-opacity duration-500 bg-white rounded-lg overflow-hidden shadow-card"
          style={{ opacity: showBookedToast ? 1 : 0, pointerEvents: showBookedToast ? "auto" : "none" }}
        >
          <MobileAppointmentTable />
        </div>

        {/* Desktop overlays: phone (md and up) */}
        {showPhone && (
          <div className="absolute right-[-2%] top-[8%] z-10 w-[200px] lg:w-[220px] aspect-[9/19] transition-opacity duration-500 hidden lg:block" style={{ opacity: phase === "ringing" ? 1 : 0 }}>
            <PhoneMockup />
          </div>
        )}
        {/* Desktop overlays: call animation (md and up) */}
        {showCallCard && (
          <div className="absolute right-[14%] top-[2%] z-20 w-[260px] transition-opacity duration-500 hidden lg:block">
            <CallAnimation phase={phase} seconds={callSeconds} />
          </div>
        )}
        {/* Desktop overlays: booked toast (md and up) */}
        {showBookedToast && (
          <div className="absolute right-[16%] bottom-[6%] z-20 transition-opacity duration-500 hidden lg:block" style={{ opacity: 1 }}>
            <BookedToast />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// DESKTOP DASHBOARD
// ============================================================
function DesktopDashboard({ newCall, bookingsCount }: { newCall: boolean; bookingsCount: number }) {
  return (
    <div className="relative w-full h-full bg-white rounded-md border overflow-hidden">
      <div className="h-full grid grid-cols-[180px_1fr]">
        <div className="border-r p-3 bg-sidebar-bg">
          <div className="flex items-center gap-2 px-3 py-2 mb-3">
            <div className="h-6 w-6 rounded-[5px] bg-brand-blue flex items-center justify-center">
              <LogoMark size={14} color="white" />
            </div>
            <span className="text-xs font-semibold text-text-primary">Vox Front</span>
          </div>
          {[
            { label: "Overview", icon: LayoutDashboard, active: true },
            { label: "Calls", icon: Phone },
            { label: "Appointments", icon: Calendar },
            { label: "Profile", icon: User },
            { label: "Knowledge", icon: BookOpen },
            { label: "Analytics", icon: BarChart3 },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-[11.5px] mb-0.5 ${item.active ? "bg-element-bg text-white font-medium" : "text-text-secondary"}`}>
                <Icon size={14} strokeWidth={1.8} />
                {item.label}
              </div>
            );
          })}
          <div className="absolute bottom-4 left-3 right-[calc(100%-180px)] flex items-center gap-2 px-2 py-2 border-t pt-3">
            <div className="h-6 w-6 rounded-full bg-avatar-bg flex items-center justify-center shrink-0"><User size={12} strokeWidth={2} color="var(--color-text-tertiary)" /></div>
            <div className="leading-tight min-w-0">
              <div className="text-[10.5px] font-medium text-text-primary truncate">Dr. Chen</div>
              <div className="text-[9px] text-text-tertiary truncate">Clearview Dental</div>
            </div>
          </div>
        </div>

        <div className="p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold text-text-primary">Overview</h3>
              <p className="text-[10.5px] text-text-tertiary">Last 30 days</p>
            </div>
            <div className="border rounded-md px-2.5 py-1 text-[10.5px] text-text-secondary">Last 30 days</div>
          </div>

          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {[
              { label: "Calls answered", value: "847", change: "+12%" },
              { label: "Bookings", value: String(bookingsCount), change: bookingsCount > 182 ? "Live" : "+24%" },
              { label: "Resolution", value: "94%", change: "+3%" },
              { label: "Avg. response", value: "0.8s", change: "" },
            ].map((s, i) => (
              <div key={i} className="border rounded-md p-2.5 shadow-card">
                <div className="text-[9.5px] text-text-secondary mb-1">{s.label}</div>
                <div className="text-lg font-semibold text-text-primary tracking-tight leading-none">{s.value}</div>
                {s.change && (
                  <div className={`text-[9px] font-medium mt-1 ${s.change === "Live" ? "text-brand-blue" : "text-brand-blue"}`}>
                    {s.change === "Live" ? "● Live" : s.change}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border rounded-md p-3 mb-3 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] font-medium text-text-primary">Call volume</span>
              <div className="flex items-center gap-2 text-[9px] text-text-tertiary">
                <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-[2px] bg-white rounded-full"></span>Answered
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-[2px] bg-text-conversation rounded-full"></span>Booked
                  </div>
                </div>
              </div>
            </div>
            <div className="h-20">
              <ChartSVG />
            </div>
          </div>

          <div className="border rounded-md p-3 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] font-medium text-text-primary">Recent calls</span>
              <span className="text-[9.5px] text-text-tertiary">View all →</span>
            </div>
            <div>
              {newCall && (
                <div className="flex items-center justify-between py-1.5 border-b bg-brand-light -mx-1 px-1 rounded transition-all duration-700" style={{ animation: "slideIn 0.6s ease-out" }}>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-element-bg flex items-center justify-center text-[11px] font-medium text-white">S</div>
                    <div>
                      <div className="text-[10.5px] font-medium text-text-primary">Sarah Patel</div>
                      <div className="text-[9px] text-text-tertiary">Just now</div>
                    </div>
                  </div>
                  <StatusChip size="sm">Booked</StatusChip>
                </div>
              )}
              {[
                { name: "Maria Santos", time: "2:14 PM", status: "Booked" },
                { name: "James Turner", time: "11:08 AM", status: "Booked" },
                { name: "Linda Park", time: "9:42 AM", status: "Transferred" },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-avatar-bg flex items-center justify-center text-[11px] font-medium text-text-tertiary">
                      {c.name[0]}
                    </div>
                    <div>
                      <div className="text-[10.5px] font-medium text-text-primary">{c.name}</div>
                      <div className="text-[9px] text-text-tertiary">{c.time}</div>
                    </div>
                  </div>
                  <StatusChip size="sm" variant={c.status === "Booked" ? "active" : "inactive"}>{c.status}</StatusChip>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

function ChartSVG() {
  return (
    <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-text-primary)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--color-text-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M 0 60 L 25 50 L 50 55 L 75 35 L 100 40 L 125 25 L 150 35 L 175 20 L 200 30 L 225 15 L 250 25 L 275 10 L 300 20 L 325 25 L 350 15 L 375 25 L 400 20 L 400 80 L 0 80 Z" fill="url(#chartGrad)" />
      <path d="M 0 60 L 25 50 L 50 55 L 75 35 L 100 40 L 125 25 L 150 35 L 175 20 L 200 30 L 225 15 L 250 25 L 275 10 L 300 20 L 325 25 L 350 15 L 375 25 L 400 20" stroke="var(--color-text-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ============================================================
// iPHONE MOCKUP — incoming call
// ============================================================
function PhoneMockup() {
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full bg-[#1C1C1C] rounded-[20px] p-[6px]">
        <div className="w-full h-full bg-white rounded-[16px] overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[18px] bg-[#1C1C1C] rounded-b-[14px] z-10"></div>

          <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[8px] font-semibold text-text-primary relative z-[1]">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[1px] items-end">
                <div className="w-[2px] h-[3px] bg-element-bg"></div>
                <div className="w-[2px] h-[4px] bg-element-bg"></div>
                <div className="w-[2px] h-[5px] bg-element-bg"></div>
                <div className="w-[2px] h-[6px] bg-element-bg"></div>
              </div>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="ml-1">
                <rect x="0" y="1" width="11" height="6" rx="1" stroke="#111" strokeWidth="0.8" />
                <rect x="12" y="3" width="1.5" height="2" rx="0.5" fill="#111" />
              </svg>
            </div>
          </div>

          <div className="px-4 pt-6 pb-4 h-[calc(100%-22px)] flex flex-col">
            <div className="text-center mb-4">
              <div className="text-[8px] text-text-secondary uppercase tracking-wider mb-1">Vox Front</div>
              <div className="text-[10px] text-text-secondary">Incoming call</div>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="h-14 w-14 rounded-full bg-avatar-bg flex items-center justify-center mb-2 phone-ringing"><Phone size={24} strokeWidth={1.8} color="var(--color-text-tertiary)" /></div>
              <div className="text-xs font-semibold text-text-primary">Sarah Patel</div>
              <div className="text-[9px] text-text-secondary">+1 (415) 555-0142</div>
            </div>

            <div className="mt-auto flex items-center justify-around pb-2">
              <div className="flex flex-col items-center gap-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5">
                  <path d="M3 9c0-1 1-2 2-2h2l2 3-2 1c1 2 2 3 4 4l1-2 3 2v2c0 1-1 2-2 2-7 0-10-3-10-10z" transform="rotate(135 12 12)" />
                </svg>
                <span className="text-[11px] text-text-tertiary">Decline</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-blue)" strokeWidth="1.5">
                  <path d="M3 9c0-1 1-2 2-2h2l2 3-2 1c1 2 2 3 4 4l1-2 3 2v2c0 1-1 2-2 2-7 0-10-3-10-10z" />
                </svg>
                <span className="text-[11px] text-text-tertiary">Accept</span>
              </div>
            </div>

            <div className="flex justify-center pt-1">
              <div className="h-[3px] w-20 bg-element-bg rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

// ============================================================
// CALL ANIMATION CARD
// ============================================================
function CallAnimation({ phase, seconds }: { phase: string; seconds: number }) {
  const showCaller1 = phase !== "ringing" && phase !== "accepted";
  const showVox1 = phase === "vox1" || phase === "caller2" || phase === "vox2" || phase === "updating" || phase === "done";
  const showCaller2 = phase === "caller2" || phase === "vox2" || phase === "updating" || phase === "done";
  const showVox2 = phase === "vox2" || phase === "updating" || phase === "done";
  const showConfirmed = phase === "updating" || phase === "done";

  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="bg-white rounded-md shadow-2xl border overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-text-primary">
            {showConfirmed ? "Call completed" : "Live call"}
          </span>
        </div>
        <div className="text-[10px] text-text-tertiary font-mono">{m}:{s}</div>
      </div>

      <div className="p-3.5 space-y-2.5 min-h-[140px]">
        {showCaller1 && (
          <FadeIn>
            <Message speaker="Caller" name="S">
              "Hi, I'd like to book a dental cleaning for next Tuesday afternoon."
            </Message>
          </FadeIn>
        )}

        {showVox1 && (
          <FadeIn>
            <Message speaker="Vox" v>
              "Tuesday at 2:30 or 4:00 — which works?"
            </Message>
          </FadeIn>
        )}

        {showCaller2 && (
          <FadeIn>
            <Message speaker="Caller" name="S">
              "2:30 works."
            </Message>
          </FadeIn>
        )}

        {showVox2 && !showConfirmed && (
          <FadeIn>
            <Message speaker="Vox" v>
              "Booking it now. I'll send a reminder the day before."
            </Message>
          </FadeIn>
        )}

        {showConfirmed && (
          <FadeIn>
            <div className="flex items-center gap-1.5 p-2 bg-brand-light border rounded-md">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l3.5 3.5L13 5" stroke="var(--color-brand-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] text-brand-blue font-medium">Booked in Google Calendar</span>
            </div>
          </FadeIn>
        )}
      </div>

      {!showConfirmed && (
        <div className="px-3.5 pb-3 flex items-center justify-center gap-[2px] h-6">
          {[6, 10, 14, 8, 12, 16, 10, 6, 12, 14, 8, 10, 16, 12, 8, 14, 10, 6, 12, 10].map((h, i) => (
            <div key={i} className="w-[1.5px] bg-[#7B92FF] rounded-full waveform-bar" style={{ height: `${h}px`, animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
      )}

      </div>
  );
}

function Message({ speaker, name, v, children }: { speaker: string; name?: string; v?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        {v ? (
          <div className="h-5 w-5 rounded-full bg-brand-blue flex items-center justify-center">
            <LogoMark size={11} color="white" />
          </div>
        ) : (
          <div className="h-5 w-5 rounded-full bg-avatar-bg flex items-center justify-center text-[8px] font-bold text-text-tertiary">
            {name || "C"}
          </div>
        )}
        <span className={`text-[10px] font-medium ${v ? "text-text-primary" : "text-text-tertiary"}`}>{speaker}</span>
      </div>
      <p className="text-xs text-text-conversation leading-[1.4] ml-7">{children}</p>
    </div>
  );
}

function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <div className="call-fade-in">
      {children}
      
    </div>
  );
}

// ============================================================
// BOOKED TOAST
// ============================================================
function BookedToast() {
  return (
    <div className="bg-white rounded-[5px] shadow-2xl border px-3.5 py-3 flex items-center gap-3 booked-toast-slide w-[280px]">
      <div className="h-8 w-8 rounded-full bg-brand-tint flex items-center justify-center shrink-0">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8l3.5 3.5L13 5" stroke="var(--color-brand-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11.5px] font-semibold text-text-primary">Appointment Booked</div>
        <div className="text-[10px] text-text-secondary">Tue, Mar 18 at 2:30 PM</div>
      </div>
      <div className="text-[9.5px] text-text-tertiary">now</div>
      </div>
  );
}

// ============================================================
// MOBILE APPOINTMENT TABLE — shows recent calls/bookings on mobile
// ============================================================
function MobileAppointmentTable() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <span className="text-[11px] font-semibold text-text-primary">Recent</span>
        <StatusChip size="sm">Live</StatusChip>
      </div>

      {/* New booking item */}
      <div className="flex items-center gap-2.5 px-3 py-2.5 border-b bg-brand-light animate-fade-in">
        <div className="h-6 w-6 bg-element-bg text-white flex items-center justify-center text-[8px] font-bold shrink-0 rounded-full">S</div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-medium text-text-primary truncate">Sarah Patel</div>
          <div className="text-[9px] text-text-tertiary">Cleaning · Booked</div>
        </div>
        <span className="text-[9px] text-green font-medium shrink-0">Now</span>
      </div>

      {/* Existing items */}
      <div className="flex-1 overflow-auto">
        {[
          { name: "Maria Santos", time: "2:14 PM", detail: "Booking", color: "text-brand-blue" },
          { name: "James Turner", time: "11:08 AM", detail: "Question", color: "text-text-tertiary" },
          { name: "Linda Park", time: "9:42 AM", detail: "Transferred", color: "text-[#F59E0B]" },
        ].map((c, i) => (
          <div key={i} className="flex items-center gap-2.5 px-3 py-2 border-b last:border-0">
            <div className="h-6 w-6 bg-avatar-bg text-text-tertiary flex items-center justify-center text-[8px] font-bold shrink-0 rounded-full">{c.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-text-primary truncate">{c.name}</div>
              <div className="text-[9px] text-text-tertiary">{c.detail} · {c.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}