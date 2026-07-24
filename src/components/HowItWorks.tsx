"use client";

import { COPY } from "@/content/copy";
import { useEffect, useState } from "react";
import { Phone, PhoneCall, Calendar, Check, Users } from "lucide-react";

type Phase = "idle" | "step1" | "step2" | "step3";
type SubPhase = "ringing" | "answered";

const PHASE_DURATION: Record<Phase, number> = { idle: 1500, step1: 14000, step2: 5000, step3: 5000 };
const PHASE_ORDER: Phase[] = ["idle", "step1", "step2", "step3"];

export function HowItWorks() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    let timer: number | undefined;
    const advance = () => {
      const idx = PHASE_ORDER.indexOf(phase);
      const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
      setPhase(next);
    };
    timer = window.setTimeout(advance, PHASE_DURATION[phase]);
    return () => { if (timer) clearTimeout(timer); };
  }, [phase]);

  return (
    <section id="how" className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-24">
      <div className="mb-16 max-w-[640px]">
        <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111]">
          {COPY.howItWorks.headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {COPY.howItWorks.steps.map((step, i) => (
          <div key={step.num} className="flex flex-col">
            <div className={`flex-1 rounded-[8px] mb-0 min-h-[360px] relative overflow-hidden transition-all duration-700`} style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8E8E8",
              boxShadow: (i === 0 && phase === "step1") || (i === 1 && phase === "step2") || (i === 2 && phase === "step3")
                ? "0 1px 2px rgba(0,0,0,0.04), inset 0 0 0 1px #EDE7D8"
                : "0 1px 2px rgba(0,0,0,0.04)",
            }}>
              {/* Top blur gradient */}
              <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none" style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)",
                backdropFilter: "blur(3px)",
              }} />

              <div className="flex items-center justify-center h-full p-6">
                {i === 0 && <AnswerVisual active={phase === "step1"} />}
                {i === 1 && <BookVisual active={phase === "step2"} />}
                {i === 2 && <ReportVisual active={phase === "step3"} />}
              </div>
            </div>
            
            {/* Text container - moved up with negative margin */}
            <div className="relative -mt-4 mx-4 mb-2 bg-white rounded-[6px] px-4 py-3" style={{
              boxShadow: "0 -2px 8px rgba(255,255,255,0.8)",
            }}>
              <div className="absolute top-0 left-0 right-0 h-4 pointer-events-none" style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)",
                backdropFilter: "blur(2px)",
              }} />
              <div className="relative z-10">
                <h3 className="text-[20px] font-medium text-[#111] mb-2 tracking-[-0.01em]">{step.title}</h3>
                <p className="text-[14px] text-[#666] leading-[1.6]">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════
   ANSWER: Ringing → Answered transition
   ══════════════════════════════════════════════════════════════ */
function AnswerVisual({ active }: { active: boolean }) {
  const [sub, setSub] = useState<SubPhase>("ringing");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!active) {
      setSub("ringing");
      setSeconds(0);
      return;
    }

    setSub("ringing");
    const t1 = window.setTimeout(() => setSub("answered"), 4000);
    const t2 = window.setInterval(() => setSeconds(s => s + 1), 1000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, [active]);

  return (
    <div className="w-full max-w-[300px]">
      {/* Main card — white bg, grey border, warm inset when active */}
      <div className="bg-white rounded-[8px] p-5 transition-all duration-700" style={{
        border: "1px solid #D0D0D0",
        boxShadow: sub === "answered"
          ? "0 1px 2px rgba(0,0,0,0.04), inset 0 0 0 1px #EDE7D8"
          : "0 1px 2px rgba(0,0,0,0.04)",
      }}>
        {/* Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-[6px] flex items-center justify-center transition-all duration-700" style={{
            background: sub === "ringing"
              ? "radial-gradient(circle at 50% 20%, #7B9BFF 0%, #4B6FE8 50%, #2A4FC7 100%)"
              : "radial-gradient(circle at 50% 20%, #10B981 0%, #059669 50%, #047857 100%)",
            animation: sub === "ringing" ? "ringPulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
          }}>
            {sub === "ringing" ? (
              <Phone size={18} strokeWidth={2} color="white" />
            ) : (
              <PhoneCall size={18} strokeWidth={2} color="white" />
            )}
          </div>
          <div>
            <div className="text-[13px] font-semibold text-[#111]">
              {sub === "ringing" ? "Incoming call" : "Answered"}
            </div>
            <div className="text-[11px] text-[#888]">
              {sub === "ringing" ? "Sarah Patel · Ringing" : "Vox Front · 0:" + String(seconds).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Voice waveform - only when answered */}
        <div className="flex items-end justify-center gap-[2px] h-8 transition-opacity duration-500" style={{ opacity: sub === "answered" ? 1 : 0 }}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-[2px] bg-[#002FD2] rounded-full"
              style={{
                height: `${6 + Math.sin(i * 0.9) * 4}px`,
                animation: sub === "answered" ? `voiceBar 0.7s ease-in-out ${i * 0.04}s infinite alternate` : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BOOK: Calendar with booking
   ══════════════════════════════════════════════════════════════ */
function BookVisual({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[280px]">
      <div className="bg-white rounded-[8px] p-5 transition-all duration-700" style={{
        border: "1px solid #D0D0D0",
        boxShadow: active
          ? "0 1px 2px rgba(0,0,0,0.04), inset 0 0 0 1px #EDE7D8"
          : "0 1px 2px rgba(0,0,0,0.04)",
      }}>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <Calendar size={14} strokeWidth={2} color={active ? "#002FD2" : "#111"} />
          <span className="text-[13px] font-semibold text-[#111]">Google Calendar</span>
          <span className="text-[10px] text-[#B0B0B0] ml-auto">Tue, Mar 18</span>
        </div>

        {/* Time slots */}
        <div className="space-y-1.5">
          {["9:00", "10:00", "11:00", "12:00", "1:00"].map((t) => (
            <div key={t} className="h-6 flex items-center px-2.5 border border-[#F0EDE5] rounded-[4px]">
              <span className="text-[10px] text-[#C0C0C0] w-10 font-mono">{t}</span>
            </div>
          ))}

          {/* Highlighted booking */}
          <div className="flex items-start h-10">
            <span className="text-[10px] text-[#C0C0C0] w-10 font-mono mt-0.5">2:00</span>
            <div className="flex-1 bg-[#002FD2] px-2.5 py-1.5" style={{ borderRadius: 6 }}>
              <div className="text-[11px] font-medium text-white leading-tight">Cleaning — Sarah Patel</div>
              <div className="text-[10px] text-white/70 mt-0.5">2:30 PM · 60 min</div>
            </div>
          </div>

          {["3:00", "3:30", "4:00", "5:00"].map((t) => (
            <div key={t} className="h-6 flex items-center px-2.5 border border-[#F0EDE5] rounded-[4px]">
              <span className="text-[10px] text-[#C0C0C0] w-10 font-mono">{t}</span>
            </div>
          ))}
        </div>

        {/* Confirmation */}
        <div className="mt-4 pt-3 border-t border-[#F0EDE5] flex items-center gap-2 transition-opacity duration-700" style={{ opacity: active ? 1 : 0 }}>
          <Check size={12} strokeWidth={2} color="#10B981" />
          <span className="text-[11px] font-medium text-[#111]">Booked automatically</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   REPORT: Dashboard list
   ══════════════════════════════════════════════════════════════ */
function ReportVisual({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[320px]">
      <div className="bg-white rounded-[8px] p-5 transition-all duration-700" style={{
        border: "1px solid #D0D0D0",
        boxShadow: active
          ? "0 1px 2px rgba(0,0,0,0.04), inset 0 0 0 1px #EDE7D8"
          : "0 1px 2px rgba(0,0,0,0.04)",
      }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Users size={14} strokeWidth={2} color={active ? "#002FD2" : "#111"} />
            <span className="text-[13px] font-semibold text-[#111]">Recent calls</span>
          </div>
          <span className="text-[10px] text-[#B0B0B0]">Today</span>
        </div>

        {/* Existing calls */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 bg-[#F5F5F5] text-[#888] flex items-center justify-center text-[10px] font-bold shrink-0 border border-[#F0EDE5]" style={{ borderRadius: 100 }}>M</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] text-[#888]">Maria Santos</span>
                <span className="text-[10px] text-[#B0B0B0] font-mono">10:24 AM</span>
              </div>
              <div className="text-[11px] text-[#888] mt-0.5">Cleaning · Booked</div>
            </div>
          </div>

          <div className="border-t border-[#F0EDE5]" />

          <div className="flex items-center gap-3">
            <div className="h-7 w-7 bg-[#F5F5F5] text-[#888] flex items-center justify-center text-[10px] font-bold shrink-0 border border-[#F0EDE5]" style={{ borderRadius: 100 }}>J</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] text-[#888]">James Turner</span>
                <span className="text-[10px] text-[#B0B0B0] font-mono">11:08 AM</span>
              </div>
              <div className="text-[11px] text-[#888] mt-0.5">Checkup · Booked</div>
            </div>
          </div>

          <div className="border-t border-[#F0EDE5]" />

          {/* New entry */}
          <div className="flex items-center gap-3 transition-all duration-700" style={{
            opacity: active ? 1 : 0.4,
            transform: active ? "translateY(0)" : "translateY(-4px)",
          }}>
            <div className="h-7 w-7 bg-[#111] text-white flex items-center justify-center text-[10px] font-bold shrink-0" style={{ borderRadius: 100 }}>S</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] font-medium text-[#111]">Sarah Patel</span>
                <span className="text-[10px] text-[#002FD2] font-mono">Just now</span>
              </div>
              <div className="text-[11px] text-[#002FD2] mt-0.5">Cleaning · Booked</div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 pt-3 border-t border-[#F0EDE5] flex items-center justify-between">
          <span className="text-[10px] text-[#B0B0B0]">12 calls today</span>
          <span className="text-[10px] font-medium text-[#002FD2]">All answered</span>
        </div>
      </div>
    </div>
  );
}
