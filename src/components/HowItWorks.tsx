"use client";

import { COPY } from "@/content/copy";
import { useEffect, useState } from "react";

type Phase = "idle" | "step1" | "step2" | "step3";
const PHASE_DURATION: Record<Phase, number> = { idle: 1200, step1: 4000, step2: 4000, step3: 4000 };
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
            {/* Card background — light gray like reference */}
            <div className="flex-1 rounded-[16px] p-8 mb-5 min-h-[300px] flex items-center justify-center" style={{
              backgroundColor: "#f5f5f7",
            }}>
              {i === 0 && <AnswerMinimal active={phase === "step1"} />}
              {i === 1 && <BookMinimal active={phase === "step2"} />}
              {i === 2 && <ReportMinimal active={phase === "step3"} />}
            </div>

            {/* Text below */}
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

function AnswerMinimal({ active }: { active: boolean }) {
  const [subPhase, setSubPhase] = useState<"ringing" | "stop" | "speaking" | "idle">("idle");

  useEffect(() => {
    if (!active) {
      setSubPhase("idle");
      return;
    }
    setSubPhase("ringing");
    const t1 = window.setTimeout(() => setSubPhase("stop"), 1500);
    const t2 = window.setTimeout(() => setSubPhase("speaking"), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  return (
    <div className="w-full max-w-[220px]">
      {/* Phone + signal card */}
      <div className="bg-white rounded-[10px] p-4" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
        {/* Phone ringing / picked up */}
        <div className="flex items-center gap-3 mb-4">
          {/* Phone icon */}
          <div
            className="h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-500"
            style={{
              backgroundColor: subPhase === "ringing" ? "#f0eef8" : subPhase === "speaking" ? "#6B7FFF" : "#f5f5f7",
              animation: subPhase === "ringing" ? "ringPulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={subPhase === "speaking" ? "white" : "#111"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>

          {/* Status text */}
          <div className="min-w-0">
            <div className="text-[11px] font-medium transition-all duration-500" style={{
              color: subPhase === "speaking" ? "#6B7FFF" : subPhase === "ringing" ? "#111" : "#999",
            }}>
              {subPhase === "ringing" && "Ring ring..."}
              {subPhase === "stop" && "Picking up..."}
              {subPhase === "speaking" && "On call"}
              {subPhase === "idle" && "Waiting for call"}
            </div>
            <div className="text-[9px] font-mono transition-all duration-500" style={{ color: "#999" }}>
              {subPhase === "speaking" ? "0:03" : subPhase === "ringing" || subPhase === "stop" ? "0:00" : "—"}
            </div>
          </div>
        </div>

        {/* Voice signal bars — only visible during speaking */}
        <div className="flex items-end justify-center gap-[3px] h-10 mb-2 transition-opacity duration-500" style={{
          opacity: subPhase === "speaking" ? 1 : 0.15,
        }}>
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="w-[2.5px] rounded-full transition-all duration-300"
              style={{
                backgroundColor: subPhase === "speaking" ? "#6B7FFF" : "#e0e0e0",
                height: subPhase === "speaking" ? `${10 + Math.sin(i * 0.9) * 8}px` : "4px",
                animation: subPhase === "speaking" ? `voiceBar 0.7s ease-in-out ${i * 0.04}s infinite alternate` : "none",
              }}
            />
          ))}
        </div>

        {/* Duration timer */}
        <div className="text-center transition-all duration-500" style={{
          opacity: subPhase === "speaking" ? 1 : 0.3,
        }}>
          <span className="text-[12px] font-mono font-medium" style={{
            color: subPhase === "speaking" ? "#6B7FFF" : "#999",
          }}>
            {subPhase === "speaking" ? "0:03" : "0:00"}
          </span>
        </div>
      </div>
    </div>
  );
}

function BookMinimal({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[200px]">
      {/* Calendar — minimal */}
      <div className="bg-white rounded-[10px] p-3" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-1.5 mb-3">
          <div className="h-3 w-3 rounded bg-[#111]"></div>
          <span className="text-[10px] font-medium text-[#111]">Calendar</span>
        </div>

        <div className="space-y-1">
          {["9:00", "10:00", "11:00"].map((t) => (
            <div key={t} className="h-5 bg-[#f5f5f7] rounded flex items-center px-2">
              <span className="text-[8px] text-[#999]">{t}</span>
            </div>
          ))}
          <div className="h-7 rounded flex items-center px-2 transition-all duration-700" style={{
            backgroundColor: active ? "#6B7FFF" : "#e0e0e0",
          }}>
            <span className="text-[9px] font-medium" style={{ color: active ? "white" : "#999" }}>2:30 PM</span>
          </div>
          {["3:30", "4:00"].map((t) => (
            <div key={t} className="h-5 bg-[#f5f5f7] rounded flex items-center px-2">
              <span className="text-[8px] text-[#999]">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportMinimal({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[220px]">
      {/* Dashboard list — minimal */}
      <div className="bg-white rounded-[10px] p-3" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-medium text-[#111]">Recent calls</span>
        </div>

        <div className="space-y-1.5">
          {[
            { name: "Maria S.", status: "Booked" },
            { name: "James T.", status: "Booked" },
            { name: "Linda P.", status: "Question" },
            { name: "Sarah P.", status: "Booked", isNew: true },
          ].map((call, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#f0f0f0] last:border-0 transition-all duration-500" style={{
              opacity: call.isNew ? (active ? 1 : 0.4) : 1,
            }}>
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                  <span className="text-[7px] font-bold" style={{ color: call.isNew && active ? "#6B7FFF" : "#666" }}>{call.name[0]}</span>
                </div>
                <div className="text-[9px] font-medium" style={{ color: call.isNew && active ? "#6B7FFF" : "#111" }}>{call.name}</div>
              </div>
              <div className="text-[8px] font-medium px-1.5 py-0.5 rounded" style={{
                backgroundColor: call.status === "Booked" ? "#6B7FFF" : "#f5f5f7",
                color: call.status === "Booked" ? "white" : "#999",
              }}>
                {call.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
