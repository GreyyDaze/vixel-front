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
  return (
    <div className="w-full max-w-[220px] space-y-3">
      {/* Phone ringing indicator — minimal */}
      <div className="bg-white rounded-[10px] p-3 flex items-center justify-between" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full ${active ? "bg-[#6B7FFF]" : "bg-[#e0e0e0]"}`} style={active ? { animation: "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } : {}}></div>
          <span className="text-[11px] font-medium" style={{ color: active ? "#111" : "#999" }}>
            {active ? "Incoming call" : "Waiting..."}
          </span>
        </div>
      </div>

      {/* Voice signal — simple bars */}
      <div className="bg-white rounded-[10px] p-3" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center justify-center gap-[3px] h-8 mb-2">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`w-[2px] rounded-full transition-all duration-300 ${active ? "bg-[#6B7FFF]" : "bg-[#e0e0e0]"}`}
              style={{
                height: active ? `${8 + Math.sin(i * 0.8) * 6}px` : "4px",
                animation: active ? `voiceBar 0.8s ease-in-out ${i * 0.05}s infinite alternate` : "none",
              }}
            />
          ))}
        </div>
        <div className="text-[10px] text-[#999] font-mono text-center">
          {active ? "0:03" : "0:00"}
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
