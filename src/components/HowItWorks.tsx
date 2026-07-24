"use client";

import { COPY } from "@/content/copy";
import { useEffect, useState } from "react";
import { Phone, PhoneCall, Calendar, Clock, User } from "lucide-react";

type Phase = "idle" | "step1" | "step2" | "step3";
type SubPhase = "idle" | "ringing" | "stop" | "speaking" | "time" | "counting" | "freeze";

const PHASE_DURATION: Record<Phase, number> = { idle: 1500, step1: 12000, step2: 5000, step3: 5000 };
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
            <div className="flex-1 rounded-[16px] p-8 mb-5 min-h-[360px] flex items-center justify-center" style={{ backgroundColor: "#f5f5f7" }}>
              {i === 0 && <AnswerCard active={phase === "step1"} />}
              {i === 1 && <BookCard active={phase === "step2"} />}
              {i === 2 && <ReportCard active={phase === "step3"} />}
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

/* ─── CARD 1: ANSWER ─── */
function AnswerCard({ active }: { active: boolean }) {
  const [sub, setSub] = useState<SubPhase>("idle");
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
    schedule(() => setSub("stop"), 2500);
    schedule(() => setSub("speaking"), 3500);
    schedule(() => setSub("time"), 6500);
    schedule(() => { setSub("counting"); setSeconds(0); }, 8500);

    // Counter ticks during "counting" phase
    const counterStart = 8500;
    for (let s = 1; s <= 3; s++) {
      schedule(() => setSeconds(s), counterStart + s * 1000);
    }

    schedule(() => setSub("freeze"), 12000);

    return () => { timers.forEach(clearTimeout); };
  }, [active]);

  const isSpeaking = sub === "speaking" || sub === "time" || sub === "counting" || sub === "freeze";
  const isCounting = sub === "counting" || sub === "freeze";
  const showTime = sub === "time" || isCounting;

  return (
    <div className="w-full max-w-[240px]">
      {/* Main card */}
      <div className="bg-white rounded-[12px] p-5" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>

        {/* Phone status row */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <div
              className="h-10 w-10 rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-700"
              style={{
                backgroundColor: sub === "ringing" ? "#EEF0FF" : isSpeaking ? "#6B7FFF" : "#F0F0F0",
                animation: sub === "ringing" ? "ringPulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
              }}
            >
              {sub === "ringing" ? (
                <Phone size={18} strokeWidth={1.5} color="#111" />
              ) : isSpeaking ? (
                <PhoneCall size={18} strokeWidth={1.5} color="white" />
              ) : (
                <Phone size={18} strokeWidth={1.5} color="#999" />
              )}
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-[11px] font-medium transition-all duration-700" style={{
              color: isSpeaking ? "#6B7FFF" : sub === "ringing" ? "#111" : "#999",
            }}>
              {sub === "ringing" && "Ring ring…"}
              {sub === "stop" && "Call connected"}
              {sub === "speaking" && "Speaking…"}
              {sub === "time" && "Appointment set"}
              {isCounting && "Call in progress"}
              {sub === "idle" && "Waiting for call"}
            </div>
            <div className="text-[10px] font-mono transition-all duration-700" style={{ color: isCounting ? "#6B7FFF" : "#999" }}>
              {isCounting ? `0:${String(seconds).padStart(2, "0")}` : sub === "idle" ? "—" : "0:00"}
            </div>
          </div>
        </div>

        {/* Voice waveform bars */}
        <div className="flex items-end justify-center gap-[3px] h-12 mb-5 transition-opacity duration-700" style={{ opacity: isSpeaking ? 1 : 0.12 }}>
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="w-[2.5px] rounded-full transition-all duration-500"
              style={{
                backgroundColor: isSpeaking ? "#6B7FFF" : "#E0E0E0",
                height: isSpeaking ? `${12 + Math.sin(i * 0.85) * 10}px` : "4px",
                animation: isSpeaking ? `voiceBar 0.8s ease-in-out ${i * 0.035}s infinite alternate` : "none",
              }}
            />
          ))}
        </div>

        {/* Time mentioned */}
        <div className="bg-[#F5F5F7] rounded-[8px] p-3 mb-4 transition-all duration-700" style={{
          opacity: showTime ? 1 : 0.2,
          transform: showTime ? "translateY(0)" : "translateY(4px)",
        }}>
          <div className="flex items-center gap-2">
            <Calendar size={13} strokeWidth={1.5} color={showTime ? "#6B7FFF" : "#CCC"} />
            <span className="text-[11px] font-medium transition-colors duration-700" style={{ color: showTime ? "#111" : "#CCC" }}>
              Tuesday, March 18
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <Clock size={13} strokeWidth={1.5} color={showTime ? "#6B7FFF" : "#CCC"} />
            <span className="text-[11px] font-medium transition-colors duration-700" style={{ color: showTime ? "#111" : "#CCC" }}>
              2:30 PM — Dental cleaning
            </span>
          </div>
        </div>

        {/* Caller info */}
        <div className="flex items-center gap-2.5 transition-all duration-700" style={{ opacity: sub === "idle" ? 0.3 : 1 }}>
          <div className="h-7 w-7 rounded-[8px] bg-[#F0F0F0] flex items-center justify-center">
            <User size={13} strokeWidth={1.5} color="#666" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-[#111]">Sarah Patel</div>
            <div className="text-[9px] text-[#999]">+1 (415) 555-0142</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CARD 2: BOOK ─── */
function BookCard({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[220px]">
      <div className="bg-white rounded-[12px] p-5" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-[8px] bg-[#F0F0F0] flex items-center justify-center">
            <Calendar size={16} strokeWidth={1.5} color={active ? "#6B7FFF" : "#999"} />
          </div>
          <div>
            <div className="text-[11px] font-medium text-[#111]">Google Calendar</div>
            <div className="text-[9px] text-[#999]">Tue, Mar 18</div>
          </div>
        </div>

        <div className="space-y-1.5">
          {["9:00 AM", "10:00 AM", "11:00 AM"].map((t) => (
            <div key={t} className="h-6 bg-[#F5F5F7] rounded-[6px] flex items-center px-2.5">
              <span className="text-[8px] text-[#999]">{t}</span>
            </div>
          ))}
          <div className="h-8 rounded-[6px] flex items-center px-2.5 transition-all duration-700" style={{
            backgroundColor: active ? "#6B7FFF" : "#E8E8E8",
          }}>
            <span className="text-[9px] font-medium" style={{ color: active ? "white" : "#999" }}>2:30 PM — Cleaning</span>
          </div>
          {["3:30 PM", "4:00 PM", "5:00 PM"].map((t) => (
            <div key={t} className="h-6 bg-[#F5F5F7] rounded-[6px] flex items-center px-2.5">
              <span className="text-[8px] text-[#999]">{t}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 transition-all duration-700" style={{
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(4px)",
        }}>
          <Clock size={12} strokeWidth={1.5} color="#6B7FFF" />
          <span className="text-[10px] font-medium text-[#6B7FFF]">Booked automatically</span>
        </div>
      </div>
    </div>
  );
}

/* ─── CARD 3: REPORT ── */
function ReportCard({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-[220px]">
      <div className="bg-white rounded-[12px] p-5" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-[8px] bg-[#F0F0F0] flex items-center justify-center">
            <User size={16} strokeWidth={1.5} color={active ? "#6B7FFF" : "#999"} />
          </div>
          <div>
            <div className="text-[11px] font-medium text-[#111]">Recent calls</div>
            <div className="text-[9px] text-[#999]">Today</div>
          </div>
        </div>

        <div className="space-y-1.5">
          {[
            { name: "Maria S.", status: "Booked", time: "10:24 AM" },
            { name: "James T.", status: "Booked", time: "11:08 AM" },
            { name: "Linda P.", status: "Question", time: "1:45 PM" },
            { name: "Sarah P.", status: "Booked", time: "2:34 PM", isNew: true },
          ].map((call, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-[#F0F0F0] last:border-0 transition-all duration-700" style={{
              opacity: call.isNew ? (active ? 1 : 0.25) : 1,
              transform: call.isNew ? (active ? "translateY(0)" : "translateY(-4px)") : "translateY(0)",
              backgroundColor: call.isNew && active ? "#F8F7FB" : "transparent",
              borderRadius: "6px",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-[6px] bg-[#F0F0F0] flex items-center justify-center">
                  <span className="text-[7px] font-bold" style={{ color: call.isNew && active ? "#6B7FFF" : "#666" }}>{call.name[0]}</span>
                </div>
                <div>
                  <div className="text-[10px] font-medium" style={{ color: call.isNew && active ? "#6B7FFF" : "#111" }}>{call.name}</div>
                  <div className="text-[8px] text-[#999]">{call.isNew && active ? "Just now" : call.time}</div>
                </div>
              </div>
              <div className="text-[8px] font-medium px-2 py-0.5 rounded-[4px]" style={{
                backgroundColor: call.status === "Booked" ? "#6B7FFF" : "#F0F0F0",
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
