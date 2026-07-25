"use client";

import { COPY } from "@/content/copy";
import { useEffect, useState } from "react";
import { Phone, PhoneCall, Calendar, Check, Users } from "lucide-react";

type Phase = "idle" | "step1" | "step2" | "step3";
type SubPhase = "ringing" | "answered";

const PHASE_DURATION: Record<Phase, number> = {
  idle: 2000,
  step1: 14000,
  step2: 4500,
  step3: 7000,
};
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
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [phase]);

  return (
    <section
      id="how"
      className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-24"
    >
      <div className="mb-16 max-w-[640px]">
        <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111]">
          {COPY.howItWorks.headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {COPY.howItWorks.steps.map((step, i) => (
          <div key={step.num} className="flex flex-col">
            <div
              className={`flex-1 rounded-[8px] mb-0 min-h-[280px] relative`}
              style={{
                backgroundColor: ((i === 0 && phase === "step1") || (i === 1 && phase === "step2") || (i === 2 && phase === "step3")) ? "#faf8f4" : "#FFFFFF",
                border: "1px solid #edececff",
              }}
            >
              {/* Inset border — fades in on active */}
              <div
                className="absolute rounded-[5px] pointer-events-none transition-all duration-500"
                style={{
                  inset: "3px",
                  border: "1px solid #E2E1DD",
                  opacity: ((i === 0 && phase === "step1") || (i === 1 && phase === "step2") || (i === 2 && phase === "step3")) ? 1 : 0,
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, #fdfdfc)",
                }}
              />

              <div className="flex items-center justify-center h-full px-3 py-6">
                {i === 0 && (
                  <AnswerVisual
                    active={phase === "step1"}
                    onComplete={() => {
                      if (phase === "step1") setPhase("step2");
                    }}
                  />
                )}
                {i === 1 && (
                  <BookVisual active={phase === "step2"} />
                )}
                {i === 2 && (
                  <ReportVisual active={phase === "step3"} />
                )}
              </div>
            </div>

            {/* Text container — no side padding/margin, bg matches section */}
            <div className="relative translate-y-[-24px]">
              <div
                className="absolute top-0 left-0 right-0 h-8 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(253, 253, 252, 1) 0%, rgba(253,253,252,1) 100%)",
                  backdropFilter: "blur(100px)",
                }}
              />
              <div className="relative z-10 px-1 pt-8">
                <h3 className="text-[20px] font-medium text-[#111] mb-2 tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#666] leading-[1.6]">
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═════════════════════════════════════════════════════════════
   ANSWER: Overlapping cards — answered pops from nowhere
   ══════════════════════════════════════════════════════════════ */
function AnswerVisual({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete?: () => void;
}) {
  const [sub, setSub] = useState<SubPhase>("ringing");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!active) return;

    setSub("ringing");
    setSeconds(0);
    const t1 = window.setTimeout(() => {
      setSub("answered");
      if (onComplete) {
        window.setTimeout(onComplete, 2000);
      }
    }, 5000);
    const t2 = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      clearTimeout(t1);
      clearInterval(t2);
    };
  }, [active]);

  const isAnswered = sub === "answered";
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="w-full max-w-[280px] flex items-center justify-center">
      <div className="relative w-full">
        {/* Ringing card — sits behind */}
        <div
          className="w-[88%] bg-white rounded-[8px] p-4 transition-all duration-500"
          style={{
            border: "1px solid #D0D0D0",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            zIndex: isAnswered ? 1 : 3,
            transform: isAnswered ? "scale(0.96)" : "scale(1)",
            opacity: isAnswered ? 0.35 : 1,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className={!isAnswered ? "phone-buzz" : ""}>
                <Phone size={22} strokeWidth={1.8} color="#4B6FE8" />
              </div>
              {!isAnswered && (
                <svg
                  className="absolute -right-3.5 top-1/2 -translate-y-1/2"
                  width="10"
                  height="14"
                  viewBox="0 0 10 14"
                >
                  <path
                    d="M1 12A5 5 0 0 1 1 2"
                    stroke="#4B6FE8"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    style={{ opacity: 0.6 }}
                  />
                  <path
                    d="M4 13A2.5 2.5 0 0 1 4 1"
                    stroke="#4B6FE8"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    style={{ opacity: 0.3 }}
                  />
                </svg>
              )}
            </div>
            <div className="min-w-0 pl-2.5">
              <div className="text-[13px] font-semibold text-[#111]">
                Incoming call
              </div>
              <div className="text-[11px] text-[#888] truncate">
                Sarah Patel · Ringing
              </div>
            </div>
          </div>
        </div>

        {/* Answered card — overlaps from below-right */}
        <div
          className="w-[88%] ml-auto -mt-14 bg-white rounded-[8px] p-4 transition-all duration-500"
          style={{
            border: "1px solid #D0D0D0",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            zIndex: isAnswered ? 3 : 2,
            transform: isAnswered ? "scale(1)" : "scale(0.92)",
            opacity: isAnswered ? 1 : 0,
            pointerEvents: isAnswered ? "auto" : "none",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PhoneCall size={22} strokeWidth={1.8} color="#50a45aff" />
              <div>
                <div className="text-[13px] font-semibold text-[#111]">
                  Answered
                </div>
                <div className="text-[11px] text-[#888]">
                  Vox Front · {m}:{s}
                </div>
              </div>
            </div>
            <div className="flex items-end justify-center gap-[2px] h-6">
              {active ? (
                [...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[2px] bg-[#002FD2] rounded-full"
                    style={{
                      height: `${6 + Math.sin(i * 0.9) * 4}px`,
                      animation: `voiceBar 0.7s ease-in-out ${i * 0.04}s infinite alternate`,
                    }}
                  />
                ))
              ) : (
                <span className="text-[10px] font-mono text-[#999]">
                  {m}:{s}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BOOK: Single calendar card — timeline booking confirmed
   ══════════════════════════════════════════════════════════════ */
function BookVisual({ active }: { active: boolean }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!active) return;
    setRevealed(false);
    const t = window.setTimeout(() => setRevealed(true), 600);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="w-full max-w-[280px]">
      <div
        className="bg-white rounded-[8px] p-5 relative transition-all duration-700"
        style={{
          border: "1px solid #D0D0D0",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <Calendar
            size={14}
            strokeWidth={2}
            color={active ? "#002FD2" : "#111"}
          />
          <span className="text-[13px] font-semibold text-[#111]">
            Google Calendar
          </span>
          <span className="text-[10px] text-[#B0B0B0] ml-auto">
            Tue, Mar 18
          </span>
        </div>

        <div className="relative pl-6">
          <div className="absolute left-[9px] top-1 bottom-1 w-px bg-[#D0D0D0]" />

          <div
            className="relative pb-4 transition-all duration-500"
            style={{
              opacity: active ? 0.3 : 1,
            }}
          >
            <div className="absolute left-[-17px] top-1 h-2 w-2 rounded-full border-2 border-[#D0D0D0] bg-white" />
            <div className="text-[10px] text-[#C0C0C0] font-mono">1:00 PM</div>
          </div>

          {/* 2:30 — same circle/height as others, details overlay when revealed */}
          <div className="relative pb-4">
            <div
              className="absolute left-[-17px] top-1 h-2 w-2 rounded-full transition-all duration-500 bg-white"
              style={{
                border: revealed ? "2px solid #002FD2" : "2px solid #D0D0D0",
                boxShadow: revealed ? "0 0 0 4px #D0DDFF" : "none",
              }}
            />
            <div
              className="text-[10px] font-mono transition-all duration-500"
              style={{
                color: revealed ? "#002FD2" : "#C0C0C0",
                fontWeight: revealed ? 500 : 400,
              }}
            >
              2:30 PM
            </div>
            {/* Details overlay on reveal — indented */}
            <div
              className="absolute left-0 top-full transition-all duration-500"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(-4px)",
                pointerEvents: revealed ? "auto" : "none",
              }}
            >
              <div className="text-[12px] font-medium text-[#111] whitespace-nowrap">
                Cleaning — Sarah Patel
              </div>
              <div className="text-[10px] text-[#888]">60 min</div>
            </div>
          </div>

          <div
            className="relative pb-4 transition-all duration-500"
            style={{
              opacity: revealed ? 0 : active ? 0.3 : 1,
              pointerEvents: revealed ? "none" : "auto",
            }}
          >
            <div className="absolute left-[-17px] top-1 h-2 w-2 rounded-full border-2 border-[#D0D0D0] bg-white" />
            <div className="text-[10px] text-[#C0C0C0] font-mono">3:00 PM</div>
          </div>
        </div>

        {/* Confirmation — top right */}
        <div
          className="absolute top-15 -right-4 bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md border border-[#D0D0D0] transition-all duration-500"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "scale(1)" : "scale(0.9)",
          }}
        >
          <Check size={11} strokeWidth={2} color="#50a45aff" />
          <span className="text-[10.5px] font-medium text-[#111] whitespace-nowrap">
            Booked automatically
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   REPORT: Single dashboard row updating in place
   ══════════════════════════════════════════════════════════════ */
function ReportVisual({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[280px]">
      <div
        className="bg-white rounded-[8px] p-4 transition-all duration-700"
        style={{
          border: "1px solid #D0D0D0",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center gap-2.5 mb-3">
          <Users
            size={13}
            strokeWidth={2}
            color={active ? "#002FD2" : "#111"}
          />
          <span className="text-[12px] font-semibold text-[#111]">
            Recent calls
          </span>
          <span className="text-[9px] text-[#B0B0B0] ml-auto">Today</span>
        </div>

        {/* Previous entry — fades back when new comes in */}
        <div
          className="flex items-center gap-2.5 py-2 px-2.5 rounded-[6px] transition-all duration-500"
          style={{
            background: active ? "transparent" : "#F9F9F9",
            opacity: active ? 0.3 : 1,
          }}
        >
          <div className="h-6 w-6 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[9px] font-medium text-[#888] shrink-0">
            J
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] text-[#888]">James Turner</span>
              <span className="text-[9px] text-[#B0B0B0] font-mono">
                11:08 AM
              </span>
            </div>
            <div className="text-[10px] text-[#888]">Checkup · Booked</div>
          </div>
        </div>

        {/* New entry — slides in on top */}
        <div className="relative">
          <div
            className="flex items-center gap-2.5 py-2 px-2.5 rounded-[6px] transition-all duration-500"
            style={{
              background: active ? "#F4F7FF" : "transparent",
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(-100%)",
              position: active ? "relative" : "absolute",
              width: "100%",
              top: 0,
              pointerEvents: active ? "auto" : "none",
            }}
          >
            <div className="h-6 w-6 rounded-full bg-[#111] flex items-center justify-center text-[9px] font-bold text-white shrink-0">
              S
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] font-medium text-[#111]">
                  Sarah Patel
                </span>
                <span className="text-[9px] text-[#002FD2] font-mono">
                  Just now
                </span>
              </div>
              <div className="text-[10px] text-[#002FD2]">
                Cleaning · Booked
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary — inline below card */}
      <div className="mt-2 flex items-center justify-between px-1">
        <span className="text-[9px] transition-colors duration-500" style={{ color: active ? "#888" : "#C0C0C0" }}>12 calls · 0 missed</span>
        <span className="text-[9px] font-medium transition-colors duration-500" style={{ color: active ? "#002FD2" : "#B0B0B0" }}>
          All answered
        </span>
      </div>
    </div>
  );
}
