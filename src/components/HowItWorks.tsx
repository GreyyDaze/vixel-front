"use client";

import { COPY } from "@/content/copy";
import { useEffect, useState } from "react";

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E")`;

const CARD_BG = `linear-gradient(135deg, #eef0ff 0%, #f0eef8 50%, #f8f7fb 100%)`;
const CARD_BG_ACTIVE = `linear-gradient(135deg, #e0e4ff 0%, #e8e5f8 50%, #f0eef8 100%)`;

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
            {/* Mock UI card — highlights when active in sequence */}
            <div className="flex-1 rounded-[12px] p-6 mb-5 min-h-[280px] flex items-center justify-center relative overflow-hidden border transition-all duration-700" style={{
              background: (i === 0 && phase === "step1") || (i === 1 && phase === "step2") || (i === 2 && phase === "step3") ? CARD_BG_ACTIVE : CARD_BG,
              backgroundImage: NOISE_BG,
              borderColor: (i === 0 && phase === "step1") || (i === 1 && phase === "step2") || (i === 2 && phase === "step3") ? "#c0bdf0" : "#e0dff0",
            }}>
              {i === 0 && <AnswerAnimated active={phase === "step1"} />}
              {i === 1 && <BookAnimated active={phase === "step2"} />}
              {i === 2 && <ReportAnimated active={phase === "step3"} />}
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

function AnswerAnimated({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[240px] space-y-3">
      {/* Phone indicator — pulses when active */}
      <div className="bg-white rounded-[8px] border border-[#e0dff0] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full ${active ? "bg-[#6B7FFF]" : "bg-[#ddd]"}`} style={active ? { animation: "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite" } : {}}></div>
          <span className="text-[11px] font-medium" style={{ color: active ? "#111" : "#999" }}>
            {active ? "Incoming call" : "Waiting..."}
          </span>
        </div>
        <span className="text-[10px] font-mono" style={{ color: active ? "#111" : "#ccc" }}>2:34 PM</span>
      </div>

      {/* Transcript — fades in sequentially when active */}
      <div className="bg-white rounded-[8px] border border-[#e0dff0] p-3 space-y-2">
        <div className="flex items-start gap-2" style={{ opacity: active ? 1 : 0.35, transition: "opacity 0.5s ease" }}>
          <div className="h-5 w-5 rounded-full bg-[#f0eef8] flex items-center justify-center shrink-0">
            <span className="text-[8px] font-bold text-[#6B7FFF]">S</span>
          </div>
          <div className="flex-1">
            <div className="text-[9px] text-[#999] mb-0.5">Sarah P.</div>
            <p className="text-[11px] text-[#111] leading-[1.4]">"Need a cleaning next Tuesday"</p>
          </div>
        </div>
        <div className="flex items-start gap-2" style={{ opacity: active ? 1 : 0.2, transition: "opacity 0.5s ease 0.6s" }}>
          <div className="h-5 w-5 rounded-full bg-[#6B7FFF] flex items-center justify-center shrink-0">
            <svg width="7" height="7" viewBox="0 0 32 32" fill="none">
              <path d="M5 6L11.5 24C11.9 25.1 13.4 25.1 13.8 24L18 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[9px] font-medium mb-0.5" style={{ color: active ? "#6B7FFF" : "#ccc" }}>Vox</div>
            <p className="text-[11px] text-[#111] leading-[1.4]">"Tuesday 2:30 or 4:00?"</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 p-2 rounded-md" style={{
          backgroundColor: active ? "#f0eef8" : "transparent",
          border: active ? "1px solid #e0dff0" : "1px solid transparent",
          transition: "all 0.5s ease 1.2s",
          opacity: active ? 1 : 0,
        }}>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 5" stroke="#6B7FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[10px] font-medium" style={{ color: active ? "#6B7FFF" : "#ccc" }}>Call answered in 0.8s</span>
        </div>
      </div>
    </div>
  );
}

function BookAnimated({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[240px]">
      <div className="bg-white rounded-[8px] border border-[#e0dff0] p-3">
        <div className="flex items-center gap-1.5 mb-3">
          <div className="h-3 w-3 rounded bg-gradient-to-br from-[#6B7FFF] to-[#9B8FFF]"></div>
          <span className="text-[10px] font-medium" style={{ color: active ? "#111" : "#999" }}>Google Calendar</span>
          <span className="text-[9px] ml-auto" style={{ color: active ? "#999" : "#ccc" }}>Tue, Mar 18</span>
        </div>

        <div className="space-y-1">
          {["9:00 AM", "10:00 AM", "11:00 AM"].map((t) => (
            <div key={t} className="h-6 bg-[#f8f7fb] rounded border border-[#e0dff0] flex items-center px-2">
              <span className="text-[8px]" style={{ color: active ? "#999" : "#ccc" }}>{t}</span>
            </div>
          ))}
          <div className="h-8 rounded flex items-center px-2 transition-all duration-700" style={{
            backgroundColor: active ? "#6B7FFF" : "#e0dff0",
          }}>
            <span className="text-[9px] font-medium" style={{ color: active ? "white" : "#999" }}>2:30 PM — Cleaning</span>
          </div>
          {["3:30 PM", "4:00 PM", "5:00 PM"].map((t) => (
            <div key={t} className="h-6 bg-[#f8f7fb] rounded border border-[#e0dff0] flex items-center px-2">
              <span className="text-[8px]" style={{ color: active ? "#999" : "#ccc" }}>{t}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-1.5 transition-all duration-700" style={{ opacity: active ? 1 : 0 }}>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 5" stroke="#6B7FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[9px] font-medium text-[#6B7FFF]">Booked automatically</span>
        </div>
      </div>
    </div>
  );
}

function ReportAnimated({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[240px] space-y-2">
      <div className="bg-white rounded-[8px] border border-[#e0dff0] p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-medium" style={{ color: active ? "#111" : "#999" }}>Today's calls</span>
          <span className="text-[9px] font-medium" style={{ color: active ? "#6B7FFF" : "#ccc" }}>12 answered</span>
        </div>

        <div className="space-y-1.5">
          {[
            { name: "Maria S.", status: "Booked", time: "10:24 AM" },
            { name: "James T.", status: "Booked", time: "11:08 AM" },
            { name: "Linda P.", status: "Question", time: "1:45 PM" },
            { name: "Sarah P.", status: "Booked", time: "2:34 PM", isNew: true },
          ].map((call, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-[#f0eef8] last:border-0 transition-all duration-500" style={{
              opacity: call.isNew ? (active ? 1 : 0) : 1,
              transform: call.isNew ? (active ? "translateY(0)" : "translateY(-4px)") : "translateY(0)",
              backgroundColor: call.isNew && active ? "#f0eef8" : "transparent",
              borderRadius: call.isNew && active ? "4px" : "0",
            }}>
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 rounded-full bg-[#f0eef8] flex items-center justify-center">
                  <span className="text-[7px] font-bold text-[#6B7FFF]">{call.name[0]}</span>
                </div>
                <div>
                  <div className="text-[9px] font-medium" style={{ color: call.isNew && active ? "#6B7FFF" : "#111" }}>{call.name}</div>
                  <div className="text-[8px]" style={{ color: call.isNew && active ? "#6B7FFF" : "#999" }}>{call.isNew && active ? "Just now" : call.time}</div>
                </div>
              </div>
              <div className="text-[8px] font-medium px-1.5 py-0.5 rounded bg-[#f0eef8] text-[#6B7FFF]">
                {call.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
