"use client";

import { COPY } from "@/content/copy";
import { useEffect, useState } from "react";
import { Phone, PhoneCall, Calendar, Clock, User, Check } from "lucide-react";

type Phase = "idle" | "step1" | "step2" | "step3";

const PHASE_DURATION: Record<Phase, number> = { idle: 1500, step1: 14000, step2: 5000, step3: 5000 };
const PHASE_ORDER: Phase[] = ["idle", "step1", "step2", "step3"];

const BLUE_GRADIENT = "radial-gradient(circle at 50% 20%, #4070FF 0%, #002FD2 50%, #001651 100%)";

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
            <div className="flex-1 rounded-[16px] p-8 mb-5 min-h-[420px] flex items-center justify-center relative" style={{ backgroundColor: "#f2f2f2" }}>
              {i === 0 && <AnswerFlow active={phase === "step1"} />}
              {i === 1 && <BookFlow active={phase === "step2"} />}
              {i === 2 && <ReportFlow active={phase === "step3"} />}
            </div>
            <div className="px-1">
              <h3 className="text-[20px] font-medium text-[#111] mb-2 tracking-[-0.01em]">{step.title}</h3>
              <p className="text-[14px] text-[#666] leading-[1.6]">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CARD 1: ANSWER FLOW ─── */
function AnswerFlow({ active }: { active: boolean }) {
  const [sub, setSub] = useState<"idle" | "ringing" | "stop" | "speaking" | "time" | "counting" | "freeze">("idle");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!active) {
      setSub("idle");
      setSeconds(0);
      return;
    }

    const timers: number[] = [];
    const schedule = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)); };

    setSub("ringing");
    schedule(() => setSub("stop"), 3000);
    schedule(() => setSub("speaking"), 4500);
    schedule(() => setSub("time"), 7500);
    schedule(() => { setSub("counting"); setSeconds(0); }, 10000);

    const counterStart = 10000;
    for (let s = 1; s <= 4; s++) {
      schedule(() => setSeconds(s), counterStart + s * 1000);
    }

    schedule(() => setSub("freeze"), 14000);

    return () => { timers.forEach(clearTimeout); };
  }, [active]);

  const isSpeaking = sub === "speaking" || sub === "time" || sub === "counting" || sub === "freeze";
  const isCounting = sub === "counting" || sub === "freeze";

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Phone ringing element - top */}
      <div
        className="h-11 w-11 rounded-[10px] flex items-center justify-center transition-all duration-700"
        style={{
          background: sub === "ringing" ? BLUE_GRADIENT : "#E8E8E8",
          boxShadow: sub === "ringing" ? "0 4px 12px rgba(0, 47, 210, 0.35)" : "none",
          animation: sub === "ringing" ? "ringPulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
        }}
      >
        <Phone size={20} strokeWidth={2} color={sub === "ringing" ? "white" : "#999"} />
      </div>

      {/* Dotted line down */}
      <svg width="2" height="20" className="transition-opacity duration-500" style={{ opacity: sub === "idle" ? 0.2 : 0.4 }}>
        <line x1="1" y1="0" x2="1" y2="20" stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      {/* Phone picked up element */}
      <div
        className="h-11 w-11 rounded-[10px] flex items-center justify-center transition-all duration-700"
        style={{
          background: isSpeaking ? BLUE_GRADIENT : "#E8E8E8",
          boxShadow: isSpeaking ? "0 4px 12px rgba(0, 47, 210, 0.35)" : "none",
        }}
      >
        <PhoneCall size={20} strokeWidth={2} color={isSpeaking ? "white" : "#999"} />
      </div>

      {/* Dotted line down */}
      <svg width="2" height="20" className="transition-opacity duration-500" style={{ opacity: sub === "idle" ? 0.2 : 0.4 }}>
        <line x1="1" y1="0" x2="1" y2="20" stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      {/* Voice waveform element */}
      <div className="bg-white rounded-[10px] px-4 py-3 transition-all duration-700" style={{
        boxShadow: isSpeaking ? "0 2px 8px rgba(0, 47, 210, 0.15)" : "0 1px 2px rgba(0,0,0,0.04)",
        opacity: isSpeaking ? 1 : 0.3,
      }}>
        <div className="flex items-end justify-center gap-[3px] h-8">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="w-[2px] rounded-full transition-all duration-500"
              style={{
                backgroundColor: isSpeaking ? "#002FD2" : "#E0E0E0",
                height: isSpeaking ? `${8 + Math.sin(i * 0.9) * 6}px` : "3px",
                animation: isSpeaking ? `voiceBar 0.8s ease-in-out ${i * 0.04}s infinite alternate` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Dotted line down */}
      <svg width="2" height="20" className="transition-opacity duration-500" style={{ opacity: sub === "idle" ? 0.2 : 0.4 }}>
        <line x1="1" y1="0" x2="1" y2="20" stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      {/* Time mentioned element */}
      <div className="bg-white rounded-[10px] px-4 py-2.5 flex items-center gap-2 transition-all duration-700" style={{
        boxShadow: sub === "time" || isCounting ? "0 2px 8px rgba(0, 47, 210, 0.15)" : "0 1px 2px rgba(0,0,0,0.04)",
        opacity: sub === "time" || isCounting ? 1 : 0.3,
        transform: sub === "time" || isCounting ? "scale(1)" : "scale(0.95)",
      }}>
        <Calendar size={14} strokeWidth={2} color={sub === "time" || isCounting ? "#002FD2" : "#999"} />
        <span className="text-[11px] font-medium" style={{ color: sub === "time" || isCounting ? "#111" : "#999" }}>
          Tuesday 2:30 PM
        </span>
      </div>

      {/* Dotted line down */}
      <svg width="2" height="20" className="transition-opacity duration-500" style={{ opacity: sub === "idle" ? 0.2 : 0.4 }}>
        <line x1="1" y1="0" x2="1" y2="20" stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      {/* Counter element */}
      <div className="bg-white rounded-[10px] px-5 py-2.5 transition-all duration-700" style={{
        boxShadow: isCounting ? "0 2px 8px rgba(0, 47, 210, 0.15)" : "0 1px 2px rgba(0,0,0,0.04)",
        opacity: isCounting ? 1 : 0.3,
      }}>
        <div className="flex items-center gap-2">
          <Clock size={14} strokeWidth={2} color={isCounting ? "#002FD2" : "#999"} />
          <span className="text-[12px] font-mono font-medium" style={{ color: isCounting ? "#002FD2" : "#999" }}>
            {isCounting ? `0:${String(seconds).padStart(2, "0")}` : "0:00"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── CARD 2: BOOK FLOW ─── */
function BookFlow({ active }: { active: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Calendar icon element */}
      <div
        className="h-11 w-11 rounded-[10px] flex items-center justify-center transition-all duration-700"
        style={{
          background: active ? BLUE_GRADIENT : "#E8E8E8",
          boxShadow: active ? "0 4px 12px rgba(0, 47, 210, 0.35)" : "none",
        }}
      >
        <Calendar size={20} strokeWidth={2} color={active ? "white" : "#999"} />
      </div>

      {/* Dotted line down */}
      <svg width="2" height="20" className="transition-opacity duration-500" style={{ opacity: active ? 0.4 : 0.2 }}>
        <line x1="1" y1="0" x2="1" y2="20" stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      {/* Booking confirmation element */}
      <div className="bg-white rounded-[10px] px-4 py-2.5 transition-all duration-700" style={{
        boxShadow: active ? "0 2px 8px rgba(0, 47, 210, 0.15)" : "0 1px 2px rgba(0,0,0,0.04)",
        opacity: active ? 1 : 0.3,
        transform: active ? "scale(1)" : "scale(0.95)",
      }}>
        <div className="flex items-center gap-2">
          <Check size={14} strokeWidth={2} color={active ? "#002FD2" : "#999"} />
          <span className="text-[11px] font-medium" style={{ color: active ? "#111" : "#999" }}>
            2:30 PM booked
          </span>
        </div>
      </div>

      {/* Dotted line down */}
      <svg width="2" height="20" className="transition-opacity duration-500" style={{ opacity: active ? 0.4 : 0.2 }}>
        <line x1="1" y1="0" x2="1" y2="20" stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      {/* User element */}
      <div className="bg-white rounded-[10px] px-4 py-2.5 flex items-center gap-2 transition-all duration-700" style={{
        boxShadow: active ? "0 2px 8px rgba(0, 47, 210, 0.15)" : "0 1px 2px rgba(0,0,0,0.04)",
        opacity: active ? 1 : 0.3,
      }}>
        <User size={14} strokeWidth={2} color={active ? "#002FD2" : "#999"} />
        <div>
          <div className="text-[11px] font-medium" style={{ color: active ? "#111" : "#999" }}>Sarah Patel</div>
          <div className="text-[9px]" style={{ color: active ? "#002FD2" : "#999" }}>Confirmation sent</div>
        </div>
      </div>
    </div>
  );
}

/* ─── CARD 3: REPORT FLOW ─── */
function ReportFlow({ active }: { active: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Dashboard icon element */}
      <div
        className="h-11 w-11 rounded-[10px] flex items-center justify-center transition-all duration-700"
        style={{
          background: active ? BLUE_GRADIENT : "#E8E8E8",
          boxShadow: active ? "0 4px 12px rgba(0, 47, 210, 0.35)" : "none",
        }}
      >
        <User size={20} strokeWidth={2} color={active ? "white" : "#999"} />
      </div>

      {/* Dotted line down */}
      <svg width="2" height="20" className="transition-opacity duration-500" style={{ opacity: active ? 0.4 : 0.2 }}>
        <line x1="1" y1="0" x2="1" y2="20" stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      {/* Call log element */}
      <div className="bg-white rounded-[10px] px-4 py-2.5 w-full max-w-[180px] transition-all duration-700" style={{
        boxShadow: active ? "0 2px 8px rgba(0, 47, 210, 0.15)" : "0 1px 2px rgba(0,0,0,0.04)",
      }}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium" style={{ color: active ? "#111" : "#999" }}>Today's calls</span>
          <span className="text-[9px] font-medium" style={{ color: active ? "#002FD2" : "#999" }}>12 answered</span>
        </div>
      </div>

      {/* Dotted line down */}
      <svg width="2" height="20" className="transition-opacity duration-500" style={{ opacity: active ? 0.4 : 0.2 }}>
        <line x1="1" y1="0" x2="1" y2="20" stroke="#999" strokeWidth="1" strokeDasharray="2 2" />
      </svg>

      {/* Recent call element */}
      <div className="bg-white rounded-[10px] px-4 py-2.5 flex items-center gap-2 w-full max-w-[180px] transition-all duration-700" style={{
        boxShadow: active ? "0 2px 8px rgba(0, 47, 210, 0.15)" : "0 1px 2px rgba(0,0,0,0.04)",
        opacity: active ? 1 : 0.3,
        transform: active ? "translateY(0)" : "translateY(-4px)",
      }}>
        <div className="h-6 w-6 rounded-[6px] bg-[#F0F0F0] flex items-center justify-center">
          <span className="text-[7px] font-bold" style={{ color: active ? "#002FD2" : "#666" }}>S</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-medium truncate" style={{ color: active ? "#002FD2" : "#111" }}>Sarah P.</div>
          <div className="text-[8px]" style={{ color: active ? "#002FD2" : "#999" }}>{active ? "Just now" : "2:34 PM"}</div>
        </div>
        <div className="text-[8px] font-medium px-1.5 py-0.5 rounded-[4px]" style={{
          backgroundColor: active ? "#002FD2" : "#F0F0F0",
          color: active ? "white" : "#999",
        }}>
          Booked
        </div>
      </div>
    </div>
  );
}
