"use client";

// Vox Front hero: voice & conversation pattern at top + bottom edges
// Mockup: Desktop dashboard + iPhone + live call card with full animation sequence

import { useEffect, useState } from "react";
import { LogoMark } from "./LogoMark";
import { Button } from "@/components/ui/button";
import { COPY } from "@/content/copy";

function AnimatedVoiceField() {
  // Soft, barely-there bars. Goal: support the dashboard, not compete with it.
  // Opacity max ~10%, soft blur, very slow ambient movement.
  const generateBars = (
    count: number,
    spacing: number,
    minH: number,
    maxH: number,
    seed: number,
    gapEvery: number,
    widthRange: [number, number]
  ): { x: number; w: number; h: number; delay: number; dur: number }[] => {
    const bars: { x: number; w: number; h: number; delay: number; dur: number }[] = [];
    for (let i = 0; i < count; i++) {
      if (i % gapEvery === 0 && i > 0 && i < count - 1) continue;
      const r1 = Math.abs(Math.sin(seed * 9301 + i * 49297));
      const r2 = Math.abs(Math.sin(seed * 313 + i * 7919 + 17));
      const r3 = Math.abs(Math.sin(seed * 1117 + i * 2143 + 9));
      const heightFactor = Math.pow(r1 * r2, 0.6);
      const h = minH + heightFactor * (maxH - minH);
      const w = widthRange[0] + r3 * (widthRange[1] - widthRange[0]);
      // Very slow ambient — 6-12 second cycles
      const delay = (i * 0.15) % 8;
      const dur = 6 + r3 * 6;
      bars.push({ x: i * spacing, w, h, delay, dur });
    }
    return bars;
  };

  // Fewer bars, more space between them, narrower widths
  const backBars = generateBars(75, 22, 60, 320, 11, 6, [8, 14]);
  const frontBars = generateBars(95, 18, 18, 90, 5, 5, [4, 7]);

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ filter: "blur(2px)" }}
    >
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#eef2fb" />
          <stop offset="50%" stopColor="#dde6f5" />
          <stop offset="100%" stopColor="#c8d4ec" />
        </linearGradient>
        {/* Front bars — soft but visible */}
        <linearGradient id="barFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#002FD2" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#002FD2" stopOpacity="0.10" />
        </linearGradient>
        {/* Back bars — barely there for depth */}
        <linearGradient id="barBack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#002FD2" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#002FD2" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#bg)" />

      <g>
        {/* TOP pattern */}
        <g transform="translate(0, 0)">
          {backBars.map((b, i) => (
            <rect key={`bt-${i}`} x={b.x} y={0} width={b.w} height={b.h} rx="2" fill="url(#barBack)"
              style={{ transformOrigin: `center top`, animation: `voiceAmbient ${b.dur}s ease-in-out ${b.delay}s infinite alternate` }} />
          ))}
        </g>
        <g transform="translate(0, 0)">
          {frontBars.map((b, i) => (
            <rect key={`ft-${i}`} x={b.x} y={0} width={b.w} height={b.h} rx="2" fill="url(#barFront)"
              style={{ transformOrigin: `center top`, animation: `voiceAmbient ${b.dur}s ease-in-out ${b.delay + 1}s infinite alternate` }} />
          ))}
        </g>

        {/* BOTTOM pattern */}
        <g transform="translate(0, 900)">
          {backBars.map((b, i) => (
            <rect key={`b-${i}`} x={b.x} y={-b.h} width={b.w} height={b.h} rx="2" fill="url(#barBack)"
              style={{ transformOrigin: `center ${b.h}px`, animation: `voiceAmbient ${b.dur}s ease-in-out ${b.delay}s infinite alternate` }} />
          ))}
        </g>
        <g transform="translate(0, 900)">
          {frontBars.map((b, i) => (
            <rect key={`f-${i}`} x={b.x} y={-b.h} width={b.w} height={b.h} rx="2" fill="url(#barFront)"
              style={{ transformOrigin: `center ${b.h}px`, animation: `voiceAmbient ${b.dur}s ease-in-out ${b.delay + 1}s infinite alternate` }} />
          ))}
        </g>
      </g>

      <style>{`
        @keyframes voiceAmbient {
          0% { transform: scaleY(0.92); opacity: 0.7; }
          100% { transform: scaleY(1.04); opacity: 1; }
        }
      `}</style>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="w-full">
      <div className="max-w-[1320px] mx-auto px-8 lg:px-16 pt-14 lg:pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
          <div>
            <h1 className="text-[44px] lg:text-[58px] leading-[1.04] tracking-[-0.025em] font-medium text-[#111] mb-6">
              {COPY.hero.headline}
            </h1>
            <p className="text-[15px] leading-[1.65] text-[#555] max-w-[540px]">
              {COPY.hero.subhead}
            </p>
          </div>
          <div className="flex flex-col gap-2.5 lg:items-end lg:pt-3">
            <Button size="lg" className="w-full lg:w-[200px]" render={<a href="#cta" />}>
              {COPY.hero.ctaPrimary}
            </Button>
            <Button variant="outline" size="lg" className="w-full lg:w-[200px]" render={<a href="#how" />}>
              {COPY.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-[16/8.5] overflow-hidden">
        <AnimatedVoiceField />
        <div className="absolute inset-0 flex items-center justify-center">
          <HeroStage />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// STAGE — drives the entire sequence with state
// ============================================================
type Phase = "ringing" | "accepted" | "caller1" | "vox1" | "caller2" | "vox2" | "updating" | "done";

const PHASE_DURATIONS: Record<Phase, number> = {
  ringing: 3200,     // Phone rings long enough to be noticed
  accepted: 0,        // immediate transition
  caller1: 3200,     // Caller message lingers
  vox1: 3200,         // Vox response lingers
  caller2: 2800,      // Caller reply
  vox2: 2600,         // Vox confirms booking
  updating: 2600,     // Dashboard updates visibly
  done: 4500,         // Hold the final state
};
const PHASE_ORDER: Phase[] = ["ringing", "accepted", "caller1", "vox1", "caller2", "vox2", "updating", "done"];

function HeroStage() {
  const [phase, setPhase] = useState<Phase>("ringing");
  const [callSeconds, setCallSeconds] = useState(0);
  const [newCallInDashboard, setNewCallInDashboard] = useState(false);
  const [bookingsCount, setBookingsCount] = useState(182);

  // Phase progression
  useEffect(() => {
    let timer: number | undefined;
    const advance = () => {
      const idx = PHASE_ORDER.indexOf(phase);
      const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
      // Reset transient states on cycle restart
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

  // Call timer (only ticks during live call phases)
  useEffect(() => {
    const liveCall = phase !== "ringing" && phase !== "done" && phase !== "accepted";
    if (!liveCall) return;
    const t = window.setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  // When entering "updating" — increment bookings after a moment
  useEffect(() => {
    if (phase === "updating") {
      const t = window.setTimeout(() => {
        setNewCallInDashboard(true);
        setBookingsCount(183);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Determine visibility states
  const showPhone = phase === "ringing" || phase === "accepted";
  const showCallCard = phase !== "ringing" && phase !== "done";
  const showBookedToast = phase === "updating" || phase === "done";

  return (
    <div className="relative w-full max-w-[1200px] px-12 h-full flex items-center justify-center">
      <div className="relative w-full h-[88%] flex items-center justify-center">
        <DesktopDashboard newCall={newCallInDashboard} bookingsCount={bookingsCount} />
        {showPhone && (
          <div
            className="absolute right-[-2%] top-[8%] z-10 w-[200px] lg:w-[220px] aspect-[9/19] transition-opacity duration-500"
            style={{ opacity: phase === "ringing" ? 1 : 0 }}
          >
            <PhoneMockup />
          </div>
        )}
        {showCallCard && (
          <div className="absolute right-[14%] top-[2%] z-20 w-[260px] transition-opacity duration-500">
            <CallAnimation
              phase={phase}
              seconds={callSeconds}
            />
          </div>
        )}
        {showBookedToast && (
          <div className="absolute right-[16%] bottom-[6%] z-20 transition-opacity duration-500" style={{ opacity: 1 }}>
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
    <div className="relative w-full h-full bg-white rounded-[12px] border border-[#eee] shadow-2xl overflow-hidden">
      <div className="h-full grid grid-cols-[180px_1fr]">
        <div className="border-r border-[#eee] p-3 bg-white">
          <div className="flex items-center gap-2 px-2 py-2 mb-3">
            <div className="h-6 w-6 rounded-md bg-[#002FD2] flex items-center justify-center">
              <LogoMark size={14} color="white" />
            </div>
            <span className="text-[12px] font-semibold text-[#111]">Vox Front</span>
          </div>
          {[
            { label: "Overview", active: true },
            { label: "Calls" },
            { label: "Appointments" },
            { label: "Profile" },
            { label: "Knowledge" },
            { label: "Analytics" },
          ].map((item, i) => (
            <div key={i} className={`px-3 py-1.5 rounded-md text-[11.5px] mb-0.5 ${item.active ? "bg-[#111] text-white font-medium" : "text-[#666]"}`}>
              {item.label}
            </div>
          ))}
          <div className="absolute bottom-4 left-3 right-[calc(100%-180px)] flex items-center gap-2 px-2 py-2 border-t border-[#eee] pt-3">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#FDFDFC] to-[#D8D3CC] shrink-0"></div>
            <div className="leading-tight min-w-0">
              <div className="text-[10.5px] font-medium text-[#111] truncate">Dr. Chen</div>
              <div className="text-[9px] text-[#999] truncate">Clearview Dental</div>
            </div>
          </div>
        </div>

        <div className="p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold text-[#111]">Overview</h3>
              <p className="text-[10.5px] text-[#999]">Last 30 days</p>
            </div>
            <div className="border border-[#eee] rounded-md px-2.5 py-1 text-[10.5px] text-[#666]">Last 30 days</div>
          </div>

          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {[
              { label: "Calls answered", value: "847", change: "+12%" },
              { label: "Bookings", value: String(bookingsCount), change: bookingsCount > 182 ? "Live" : "+24%" },
              { label: "Resolution", value: "94%", change: "+3%" },
              { label: "Avg. response", value: "0.8s", change: "" },
            ].map((s, i) => (
              <div key={i} className="border border-[#eee] rounded-[8px] p-2.5">
                <div className="text-[9.5px] text-[#999] mb-1">{s.label}</div>
                <div className="text-[18px] font-semibold text-[#111] tracking-tight leading-none">{s.value}</div>
                {s.change && (
                  <div className={`text-[9px] font-medium mt-1 ${s.change === "Live" ? "text-[#002FD2]" : "text-[#002FD2]"}`}>
                    {s.change === "Live" ? "● Live" : s.change}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border border-[#eee] rounded-[8px] p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] font-medium text-[#111]">Call volume</span>
              <div className="flex items-center gap-2 text-[9px] text-[#999]">
                <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#111]"></span>Answered</div>
              </div>
            </div>
            <div className="h-20">
              <ChartSVG />
            </div>
          </div>

          <div className="border border-[#eee] rounded-[8px] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] font-medium text-[#111]">Recent calls</span>
              <span className="text-[9.5px] text-[#999]">View all →</span>
            </div>
            <div>
              {/* New booking row — animates in when phase is updating/done */}
              {newCall && (
                <div className="flex items-center justify-between py-1.5 border-b border-[#f5f5f5] bg-[#EEF2FF] -mx-1 px-1 rounded transition-all duration-700" style={{ animation: "slideIn 0.6s ease-out" }}>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#FDFDFC] to-[#D8D3CC] flex items-center justify-center text-[9px] font-medium text-[#555]">S</div>
                    <div>
                      <div className="text-[10.5px] font-medium text-[#111]">Sarah Patel</div>
                      <div className="text-[9px] text-[#999]">Just now</div>
                    </div>
                  </div>
                  <div className="text-[9px] font-medium px-1.5 py-0.5 rounded text-[#002FD2] bg-[#EEF2FF]">
                    Booked
                  </div>
                </div>
              )}
              {[
                { name: "Maria Santos", time: "2:14 PM", status: "Booked", color: "#002FD2" },
                { name: "James Turner", time: "11:08 AM", status: "Booked", color: "#002FD2" },
                { name: "Linda Park", time: "9:42 AM", status: "Transferred", color: "#94a3b8" },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#f5f5f5] last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[9px] font-medium text-[#111]">
                      {c.name[0]}
                    </div>
                    <div>
                      <div className="text-[10.5px] font-medium text-[#111]">{c.name}</div>
                      <div className="text-[9px] text-[#999]">{c.time}</div>
                    </div>
                  </div>
                  <div className="text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ color: c.color, backgroundColor: `${c.color}15` }}>
                    {c.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(-8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function ChartSVG() {
  return (
    <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#111" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#111" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M 0 60 L 25 50 L 50 55 L 75 35 L 100 40 L 125 25 L 150 35 L 175 20 L 200 30 L 225 15 L 250 25 L 275 10 L 300 20 L 325 25 L 350 15 L 375 25 L 400 20 L 400 80 L 0 80 Z" fill="url(#chartGrad)" />
      <path d="M 0 60 L 25 50 L 50 55 L 75 35 L 100 40 L 125 25 L 150 35 L 175 20 L 200 30 L 225 15 L 250 25 L 275 10 L 300 20 L 325 25 L 350 15 L 375 25 L 400 20" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ============================================================
// iPHONE MOCKUP — incoming call
// ============================================================
function PhoneMockup() {
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full bg-[#0a0a0a] rounded-[36px] p-[6px] shadow-2xl">
        <div className="w-full h-full bg-white rounded-[30px] overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[18px] bg-[#0a0a0a] rounded-b-[14px] z-10"></div>

          <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[8px] font-semibold text-[#111] relative z-[1]">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[1px] items-end">
                <div className="w-[2px] h-[3px] bg-[#111]"></div>
                <div className="w-[2px] h-[4px] bg-[#111]"></div>
                <div className="w-[2px] h-[5px] bg-[#111]"></div>
                <div className="w-[2px] h-[6px] bg-[#111]"></div>
              </div>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="ml-1">
                <rect x="0" y="1" width="11" height="6" rx="1" stroke="#111" strokeWidth="0.8" />
                <rect x="12" y="3" width="1.5" height="2" rx="0.5" fill="#111" />
              </svg>
            </div>
          </div>

          <div className="px-4 pt-6 pb-4 h-[calc(100%-22px)] flex flex-col">
            <div className="text-center mb-4">
              <div className="text-[8px] text-[#999] uppercase tracking-wider mb-1">Vox Front</div>
              <div className="text-[10px] text-[#666]">Incoming call</div>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#FDFDFC] to-[#D8D3CC] mb-2 phone-ringing"></div>
              <div className="text-[12px] font-semibold text-[#111]">Sarah Patel</div>
              <div className="text-[9px] text-[#999]">+1 (415) 555-0142</div>
            </div>

            <div className="mt-auto flex items-center justify-around pb-2">
              <div className="flex flex-col items-center gap-1">
                <div className="h-10 w-10 rounded-full bg-[#fee2e2] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5">
                    <path d="M3 9c0-1 1-2 2-2h2l2 3-2 1c1 2 2 3 4 4l1-2 3 2v2c0 1-1 2-2 2-7 0-10-3-10-10z" transform="rotate(135 12 12)" />
                  </svg>
                </div>
                <span className="text-[7.5px] text-[#999]">Decline</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="h-10 w-10 rounded-full bg-[#002FD2] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <path d="M3 9c0-1 1-2 2-2h2l2 3-2 1c1 2 2 3 4 4l1-2 3 2v2c0 1-1 2-2 2-7 0-10-3-10-10z" />
                  </svg>
                </div>
                <span className="text-[7.5px] text-[#999]">Accept</span>
              </div>
            </div>

            <div className="flex justify-center pt-1">
              <div className="h-[3px] w-20 bg-[#111] rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes ring {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(180, 170, 160, 0.35); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 8px rgba(180, 170, 160, 0); }
        }
        .phone-ringing {
          animation: ring 1.2s ease-in-out infinite;
        }
      `}</style>
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
    <div className="bg-white rounded-[12px] shadow-2xl border border-[#eee] overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full bg-[#002FD2] ${showConfirmed ? "" : "animate-pulse"}`}></div>
          <span className="text-[11px] font-semibold text-[#111]">
            {showConfirmed ? "Call completed" : "Live call"}
          </span>
        </div>
        <div className="text-[10px] text-[#999] font-mono">{m}:{s}</div>
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
            <div className="flex items-center gap-1.5 p-2 bg-[#EEF2FF] border border-[#C7D2FE] rounded-md">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l3.5 3.5L13 5" stroke="#002FD2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] text-[#002FD2] font-medium">Booked in Google Calendar</span>
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

      <style>{`
        @keyframes waveformBar {
          0%, 100% { transform: scaleY(0.5); opacity: 0.6; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        .waveform-bar {
          transform-origin: center;
          animation: waveformBar 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function Message({ speaker, name, v, children }: { speaker: string; name?: string; v?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-0.5">
        {v ? (
          <div className="h-3.5 w-3.5 rounded-full bg-[#002FD2] flex items-center justify-center">
            <LogoMark size={9} color="white" />
          </div>
        ) : (
          <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#FDFDFC] to-[#D8D3CC] flex items-center justify-center text-[7px] font-bold text-[#555]">
            {name || "C"}
          </div>
        )}
        <span className={`text-[9px] font-medium ${v ? "text-[#111]" : "text-[#999]"}`}>{speaker}</span>
      </div>
      <p className="text-[11px] text-[#333] leading-[1.4] ml-5">{children}</p>
    </div>
  );
}

function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <div className="call-fade-in">
      {children}
      <style>{`
        @keyframes callFadeIn {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .call-fade-in {
          animation: callFadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// ============================================================
// BOOKED TOAST
// ============================================================
function BookedToast() {
  return (
    <div className="bg-white rounded-[10px] shadow-2xl border border-[#eee] px-3.5 py-3 flex items-center gap-3 booked-toast-slide">
      <div className="h-8 w-8 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8l3.5 3.5L13 5" stroke="#002FD2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11.5px] font-semibold text-[#111]">Appointment Booked</div>
        <div className="text-[10px] text-[#666]">Tue, Mar 18 at 2:30 PM</div>
      </div>
      <div className="text-[9.5px] text-[#999]">now</div>
      <style>{`
        @keyframes toastSlide {
          0% { opacity: 0; transform: translateY(12px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .booked-toast-slide {
          animation: toastSlide 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
