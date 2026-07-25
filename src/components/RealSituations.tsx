"use client";

import { COPY } from "@/content/copy";
import { useEffect, useState } from "react";
import { Phone, Calendar, ArrowRight, Search } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { StatusChip } from "./StatusChip";
import { LogoMark } from "./LogoMark";

const situations = [
  { title: "Answer calls when your team is busy", visual: <BusyCallPanel /> },
  { title: "Handle calls after business hours", visual: <AfterHoursPanel /> },
  {
    title: "Book, reschedule, and confirm appointments",
    visual: <BookingPanel />,
  },
  {
    title: "Transfer urgent calls to the right person",
    visual: <UrgentPanel />,
  },
  {
    title: "Answer common questions automatically",
    visual: <QuestionsPanel />,
  },
  {
    title: "Handle multiple calls at the same time",
    visual: <MultiplePanel />,
  },
];

export function RealSituations() {
  return (
    <section
      id="situations"
      className="w-full max-w-[1320px] mx-auto px-5 lg:px-16 pt-12 sm:pt-16 lg:pt-24 pb-10 sm:pb-12 lg:pb-16 mb-11"
    >
      <div className="mb-16 max-w-[640px]">
        <SectionHeading className="mb-4">
          {COPY.realSituations.headline}
        </SectionHeading>
        <p className="text-sm text-text-secondary leading-[1.65]">
          {COPY.realSituations.subhead}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {situations.map((s, i) => {
          let colSpan = "";
          if (i === 0) colSpan = "sm:col-span-2 lg:col-span-2";
          else if (i === 5) colSpan = "sm:col-span-2 lg:col-span-3";

          return (
            <div
              key={i}
              className={`overflow-hidden flex flex-col rounded-lg border border-border-light ${colSpan}`}
              style={{
                backgroundColor: "var(--color-card-warm)",
              }}
            >
              <div className="flex-1 min-h-[200px] sm:min-h-[240px] flex items-center justify-center p-6 lg:p-8">
                {s.visual}
              </div>
              <div className="px-5 pb-6 pt-0">
                <h3 className="text-sm font-medium text-text-primary leading-[1.4]">
                  {s.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHARED DESIGN SYSTEM
   ══════════════════════════════════════════════════════════════
   Typography:
     - 13px/600 → section titles
     - 12px/400 → body text
     - 11px/500 → labels
     - 10px/400 → metadata (timestamps, sources)

   Spacing: consistent 3/4/6/8 scale
   Radius: 8px outer, 6px inner, 100% avatars
   Shadow: 0 1px 2px rgba(0,0,0,0.04)
*/

const INNER_RADIUS = "rounded-md";

/* ══════════════════════════════════════════════════════════════
   1. BUSY CALL — Horizontal carousel showing the AI handling
      live conversations across different business types.
      Cards slide in from the right (carousel), distinct from
      Urgent's stack effect (cards falling back).
   ══════════════════════════════════════════════════════════════ */
const busyCases = [
  {
    name: "Mike Torres",
    biz: "Auto Repair",
    initials: "M",
    detail: "Check engine light",
    queueName: "Lisa Park",
    queueDetail: "Quote · Waiting",
    customerSays: "My check engine light just came on",
    aiSays: "We can fit you in at 4 PM today",
  },
  {
    name: "Jenna Kim",
    biz: "Salon",
    initials: "J",
    detail: "Balayage booking",
    queueName: "Amy Wu",
    queueDetail: "Color consult · Waiting",
    customerSays: "I want to book a balayage for Saturday",
    aiSays: "We have 10 AM or 1 PM available",
  },
  {
    name: "Nancy Reeves",
    biz: "Dental",
    initials: "N",
    detail: "Cleaning appointment",
    queueName: "Robert Chen",
    queueDetail: "Reschedule · Waiting",
    customerSays: "Need a cleaning next Tuesday afternoon",
    aiSays: "Tuesday 2:30 or 4:00 PM?",
  },
  {
    name: "Diane Miller",
    biz: "Plumbing",
    initials: "D",
    detail: "Furnace issue",
    queueName: "Tom Banks",
    queueDetail: "Emergency · Waiting",
    customerSays: "My furnace stopped working overnight",
    aiSays: "A technician can be there in 30 minutes",
  },
];

function BusyCallPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % busyCases.length),
      3500,
    );
    return () => clearInterval(t);
  }, []);

  const c = busyCases[index];

  return (
    <div className="w-full max-w-[380px]">
      {/* Queue badge */}
      <div className="flex justify-end mb-1 -mr-2">
        <div className="inline-flex items-center gap-1 bg-element-bg text-white text-[9px] font-medium px-2 py-0.5 rounded-full">
          <Phone size={9} strokeWidth={2} color="white" />2 in queue
        </div>
      </div>

      {/* Conversation card — carousel slide */}
      <div className="relative overflow-hidden" style={{ minHeight: 152 }}>
        {busyCases.map((scenario, i) => {
          const isActive = i === index;
          const isPrev =
            i === (index - 1 + busyCases.length) % busyCases.length;
          return (
            <div
              key={i}
              className="transition-all duration-500 w-full"
              style={{
                transform: isActive
                  ? "translateX(0)"
                  : isPrev
                    ? "translateX(-30px)"
                    : "translateX(30px)",
                opacity: isActive ? 1 : 0,
                position: isActive ? "relative" : "absolute",
                top: 0,
                left: 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <div className="space-y-2.5">
                {/* Caller row */}
                <div className="flex items-center gap-2.5">
                  <div
                    className="h-7 w-7 bg-element-bg text-white flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ borderRadius: 100 }}
                  >
                    {scenario.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-text-primary">
                      {scenario.name}
                    </div>
                    <div className="text-[10px] text-text-tertiary">
                      {scenario.detail}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[9px] text-text-dim font-mono">
                      0:42
                    </span>
                    <StatusChip>Handling</StatusChip>
                  </div>
                </div>

                {/* Chat bubbles */}
                <div
                  className={`bg-white ${INNER_RADIUS} p-3 shadow-card space-y-2`}
                >
                  <div className="flex items-start gap-1.5">
                    <span className="text-[10px] font-semibold text-text-tertiary w-5 shrink-0 mt-0.5">
                      {scenario.initials}
                    </span>
                    <p className="text-[11px] text-text-conversation leading-[1.45]">
                      &ldquo;{scenario.customerSays}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[10px] font-semibold text-brand-blue w-5 shrink-0 mt-0.5">
                      V
                    </span>
                    <p className="text-[11px] text-text-conversation leading-[1.45]">
                      &ldquo;{scenario.aiSays}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Voice indicator */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-brand-blue font-semibold">
                    Vox
                  </span>
                  <div className="flex items-center gap-[2px] h-4">
                    {[4, 7, 5, 9, 6, 8, 3].map((h, j) => (
                      <div
                        key={j}
                        className="w-[2px] bg-brand-blue rounded-full animate-pulse"
                        style={{
                          height: `${h}px`,
                          animationDelay: `${j * 0.12}s`,
                          opacity: 0.7,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next in queue */}
      <div className="flex items-center gap-2 mt-3 -mb-1">
        <div
          className="h-6 w-6 bg-avatar-bg text-text-tertiary flex items-center justify-center text-[9px] font-bold shrink-0"
          style={{ borderRadius: 100 }}
        >
          {c.queueName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] text-text-tertiary">{c.queueName}</div>
          <div className="text-[9px] text-text-dim">{c.queueDetail}</div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {busyCases.map((_, i) => (
          <div
            key={i}
            className="transition-all duration-300"
            style={{
              width: i === index ? 14 : 4,
              height: 4,
              borderRadius: 2,
              backgroundColor:
                i === index
                  ? "var(--color-brand-blue)"
                  : "var(--color-text-faint)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. AFTER HOURS — Dark phone lock-screen style.
      High contrast: bright time on dark bg, AI badge glows.
      Tells the story: call came in late, AI answered it.
   ══════════════════════════════════════════════════════════════ */
function AfterHoursPanel() {
  return (
    <div className="w-full max-w-[280px]">
      <div className="bg-element-bg rounded-lg overflow-hidden shadow-card">
        {/* Status bar */}
        <div className="flex items-center justify-between px-3.5 pt-3 pb-1.5">
          <span className="text-[10px] font-medium text-white/80">9:42</span>
          <span className="text-[9px] text-white/40">PM</span>
        </div>

        {/* Notification card */}
        <div className="mx-3 mb-3 bg-white/10 rounded-md p-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-white/15 text-white flex items-center justify-center text-[11px] font-bold shrink-0" style={{ borderRadius: 100 }}>J</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white">James Turner</div>
              <div className="text-[9px] text-white/50">Incoming call</div>
            </div>
            <div className="flex items-center gap-1 text-green text-[9px] font-medium bg-green/15 rounded-full px-2 py-0.5 border border-green/20">
              <Phone size={8} strokeWidth={2} color="var(--color-green)" />
              Answered
            </div>
          </div>
        </div>

        {/* Booking summary */}
        <div className="px-3.5 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Calendar size={10} strokeWidth={2} color="white/40" />
            <span className="text-[9px] text-white/60">Sat 10:00 AM</span>
          </div>
          <span className="text-[9px] text-green font-medium">After hours</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   3. BOOKING — Horizontal pipeline showing the booking workflow.
      Three connected nodes: Call comes in → Calendar chosen →
      Confirmed. Compact and pipeline-like, no white card.
   ══════════════════════════════════════════════════════════════ */
function BookingPanel() {
  return (
    <div className="w-full max-w-[280px]">
      {/* Step 1 — Call */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="h-7 w-7 bg-brand-blue text-white flex items-center justify-center text-[10px] font-bold shrink-0"
          style={{ borderRadius: 100 }}
        >
          S
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-medium text-text-primary">
            &ldquo;Need a cleaning Tuesday&rdquo;
          </div>
          <div className="text-[9px] text-text-tertiary">
            Nancy Reeves · Incoming
          </div>
        </div>
      </div>

      {/* Connector line */}
      <div className="flex justify-center">
        <div className="w-px h-4 bg-card-border" />
      </div>

      {/* Step 2 — Calendar */}
      <div className="flex items-center gap-3 my-3">
        <div
          className="h-7 w-7 bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0"
          style={{ borderRadius: 100 }}
        >
          <Calendar size={12} strokeWidth={2} color="var(--color-brand-blue)" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-medium text-text-primary">
            2:30 PM Tue
          </div>
          <div className="text-[9px] text-text-tertiary">
            Slot open · 60 min
          </div>
        </div>
      </div>

      {/* Connector line */}
      <div className="flex justify-center">
        <div className="w-px h-4 bg-card-border" />
      </div>

      {/* Step 3 — Confirmed */}
      <div className="flex items-center gap-3 mt-3 bg-white rounded-md p-2.5 shadow-card">
        <div
          className="h-7 w-7 bg-green text-white flex items-center justify-center text-[10px] font-bold shrink-0"
          style={{ borderRadius: 100 }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8l3.5 3.5L13 5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-medium text-text-primary">
            Cleaning — Nancy Reeves
          </div>
          <div className="text-[9px] text-green font-medium">
            Booked automatically
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. URGENT — Stack of call cards that auto-advance, showing
      the AI handling urgent situations across different
      business types (dental, auto repair, salon, law, plumbing).
      Each card fades forward, revealing the next scenario.
   ══════════════════════════════════════════════════════════════ */
type UrgentCase = {
  name: string;
  biz: string;
  initials: string;
  phone: string;
  quote: string;
  action: string;
  line: string;
};

const urgentCases: UrgentCase[] = [
  {
    name: "Linda Park",
    biz: "Dental",
    initials: "L",
    phone: "+1 (408) 555-0167",
    quote: "My tooth is cracked — I need to see someone immediately.",
    action: "Connecting to Dr. Chen",
    line: "Emergency line",
  },
  {
    name: "Mike Torres",
    biz: "Auto Repair",
    initials: "M",
    phone: "+1 (415) 555-0233",
    quote: "My car is making a grinding noise, can you fit me in today?",
    action: "Booking diagnosis appointment",
    line: "Today 4:00 PM",
  },
  {
    name: "Jenna Kim",
    biz: "Salon",
    initials: "J",
    phone: "+1 (650) 555-0188",
    quote: "I need to cancel my 3 PM highlight appointment and reschedule.",
    action: "Rescheduling to next Tuesday",
    line: "11:00 AM slot",
  },
  {
    name: "Robert Chen",
    biz: "Law Firm",
    initials: "R",
    phone: "+1 (408) 555-0312",
    quote: "I was in a car accident, I need to speak with a lawyer immediately.",
    action: "Connecting to Sarah Mitchell",
    line: "Personal injury",
  },
  {
    name: "Dave Miller",
    biz: "Plumbing",
    initials: "D",
    phone: "+1 (510) 555-0477",
    quote: "My basement is flooding, I need a plumber here right now.",
    action: "Dispatching emergency plumber",
    line: "Estimated 25 min",
  },
];

const SHOW_MS = 5600;
const ANIM_MS = 900;

// Increased peek so the deeper stack layers are clearly visible
// below the current/next cards instead of being nearly hidden.
const STACK_PEEK = 52;

export default function UrgentPanel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [suppressEnterTransition, setSuppressEnterTransition] = useState(false);

  const len = urgentCases.length;
  const next = (current + 1) % len;
  const back2 = (current + 2) % len;
  const back3 = (current + 3) % len;
  const back4 = (current + 4) % len;

  useEffect(() => {
    let holdTimer: ReturnType<typeof setTimeout>;
    let swapTimer: ReturnType<typeof setTimeout>;
    let raf1 = 0;
    let raf2 = 0;

    const run = () => {
      holdTimer = setTimeout(() => {
        setAnimating(true);

        swapTimer = setTimeout(() => {
          setSuppressEnterTransition(true);
          setCurrent((prev) => (prev + 1) % len);
          setAnimating(false);

          raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
              setSuppressEnterTransition(false);
            });
          });

          run();
        }, ANIM_MS);
      }, SHOW_MS);
    };

    run();

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(swapTimer);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [len]);

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div className="w-full max-w-[380px]">
      {/* 
        The paddingBottom here is intentional:
        it reserves enough room to show the stacked cards peeking out
        clearly below the top card.
      */}
      <div className="relative" style={{ paddingBottom: STACK_PEEK }}>
        {/* Height reference */}
        <div className="invisible rounded-xl border border-transparent bg-white p-4">
          <UrgentCard c={urgentCases[current]} />
        </div>

        {/* Deep stack — furthest back, most offset, most faded */}
        <div
          className="absolute inset-x-0 rounded-xl border border-stone-300/70 p-4"
          style={{
            top: 42,
            zIndex: 0,
            backgroundColor: "#e7e9ec",
            transform: "scale(0.86)",
            transformOrigin: "top center",
            opacity: 0.45,
            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
          }}
        >
          <UrgentCard c={urgentCases[back4]} dim />
        </div>

        {/* Middle stack */}
        <div
          className="absolute inset-x-0 rounded-xl border border-stone-300/70 p-4"
          style={{
            top: 28,
            zIndex: 1,
            backgroundColor: "#f0f2f4",
            transform: "scale(0.91)",
            transformOrigin: "top center",
            opacity: 0.62,
            boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
          }}
        >
          <UrgentCard c={urgentCases[back3]} dim />
        </div>

        {/* Front stack — closest visible "behind" card, clearly peeking */}
        <div
          className="absolute inset-x-0 rounded-xl border border-stone-200 bg-white p-4"
          style={{
            top: 14,
            zIndex: 2,
            transform: "scale(0.955)",
            transformOrigin: "top center",
            opacity: 0.85,
            boxShadow: "0 6px 16px rgba(0,0,0,0.07)",
          }}
        >
          <UrgentCard c={urgentCases[back2]} dim />
        </div>

        {/* Next card already in place underneath current (full size, hidden) */}
        <div
          className="absolute inset-x-0 rounded-xl border border-stone-200 bg-white p-4"
          style={{
            top: 0,
            zIndex: 3,
          }}
        >
          <UrgentCard c={urgentCases[next]} />
        </div>

        {/* Current top card only exits upward; entrance snap is transition-less */}
        <div
          className="absolute inset-x-0 rounded-xl border border-stone-200 bg-white p-4"
          style={{
            top: 0,
            zIndex: 4,
            transform: animating ? "translateY(-40px)" : "translateY(0)",
            opacity: animating ? 0 : 1,
            transition: suppressEnterTransition
              ? "none"
              : `transform ${ANIM_MS}ms ${ease}, opacity ${ANIM_MS * 0.7}ms ease`,
            transformOrigin: "top center",
          }}
        >
          <UrgentCard c={urgentCases[current]} />
        </div>
      </div>
    </div>
  );
}

function UrgentCard({ c, dim = false }: { c: UrgentCase; dim?: boolean }) {
  const nameColor = dim ? "text-stone-500" : "text-stone-900";
  const subtleColor = dim ? "text-stone-400" : "text-stone-500";
  const dimClass = dim ? "opacity-45" : "";

  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-red-500">
          Emergency
        </div>
        <span className="font-mono text-[9px] font-medium text-red-500">
          0:05
        </span>
      </div>

      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-800 text-[11px] font-bold text-white">
          {c.initials}
        </div>
        <div className="min-w-0">
          <div className={`truncate text-xs font-medium ${nameColor}`}>
            {c.name}
          </div>
          <div className={`truncate text-[9px] ${subtleColor}`}>
            {c.biz} • {c.phone}
          </div>
        </div>
      </div>

      <p className={`mb-3 text-[11px] leading-[1.55] text-stone-700 ${dimClass}`}>
        &ldquo;{c.quote}&rdquo;
      </p>

      <div className="mb-3 border-t border-stone-200" />

      <div className={`flex items-center gap-3 rounded-lg bg-blue-50 p-2.5 ${dimClass}`}>
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-600">
          <ArrowRight size={13} strokeWidth={2} color="white" />
        </div>

        <div className="min-w-0 flex-1">
          <div className={`truncate text-[11px] font-medium ${nameColor}`}>
            {c.action}
          </div>
          <div className={`truncate text-[9px] ${subtleColor}`}>{c.line}</div>
        </div>

        <div
          className={`h-4 w-4 shrink-0 rounded-full border-2 border-blue-600 border-t-transparent ${
            dim ? "" : "animate-spin"
          }`}
        />
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. QUESTIONS — Dark knowledge-base interface.
      Full-bleed dark panel with search bar and AI-generated
      answer card. Feels like a back-end tool, not a chat.
   ══════════════════════════════════════════════════════════════ */
function QuestionsPanel() {
  return (
    <div className="w-full max-w-[280px]">
      <div className="bg-element-bg rounded-lg overflow-hidden shadow-card">
        {/* Search bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10">
          <Search size={11} strokeWidth={2} color="white/40" />
          <span className="text-[10px] text-white/40">
            Search knowledge base...
          </span>
        </div>

        {/* Answer area */}
        <div className="p-3.5 space-y-3">
          {/* Question */}
          <div className="flex items-start gap-2">
            <div
              className="h-5 w-5 bg-white/10 text-white/60 flex items-center justify-center text-[7px] font-bold shrink-0 mt-0.5"
              style={{ borderRadius: 100 }}
            >
              C
            </div>
            <p className="text-[10px] text-white/60 leading-[1.5]">
              &ldquo;What are your hours and do you take insurance?&rdquo;
            </p>
          </div>

          {/* AI answer card */}
          <div className="bg-white/10 rounded-md p-2.5 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div
                className="h-4 w-4 bg-brand-blue flex items-center justify-center"
                style={{ borderRadius: 4 }}
              >
                <LogoMark size={10} />
              </div>
              <span className="text-[9px] text-white/80 font-medium">
                Answering the call
              </span>
            </div>
            <p className="text-[10px] text-white/80 leading-[1.5]">
              Mon–Fri 8 AM–6 PM, Saturday 9–2.
            </p>
            <p className="text-[10px] text-white/60 leading-[1.5]">
              Accepts Delta, MetLife, Cigna, Aetna.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3.5 py-2 border-t border-white/10 flex items-center gap-1.5">
          <span className="text-[8px] text-white/40">
            3 sources · Updated 2 days ago
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   6. MULTIPLE — Split-panel kanban view.
      Two columns: "Active" and "Queue". Each shows compact
      call cards. Wide composition, high density, no white card.
   ══════════════════════════════════════════════════════════════ */
function MultiplePanel() {
  return (
    <div className="w-full max-w-[520px]">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Active column */}
        <div className="flex-1 bg-white rounded-lg p-3 shadow-card">
          <div className="text-[10px] font-semibold text-text-primary uppercase tracking-wider mb-2.5">
            Active
          </div>
          <div className="space-y-2">
            <div className="bg-brand-light rounded-md p-2.5">
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="h-5 w-5 bg-element-bg text-white flex items-center justify-center text-[8px] font-bold shrink-0"
                  style={{ borderRadius: 100 }}
                >
                  M
                </div>
                <span className="text-[10px] font-medium text-text-primary">
                  Maria Santos
                </span>
                <span className="text-[8px] text-text-dim font-mono ml-auto">
                  1:24
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-text-tertiary">Booking</span>
                <StatusChip size="sm">Answering</StatusChip>
              </div>
            </div>
          </div>
        </div>

        {/* Queue column */}
        <div className="flex-1 bg-white rounded-lg p-3 shadow-card">
          <div className="text-[10px] font-semibold text-text-primary uppercase tracking-wider mb-2.5">
            Queue
          </div>
          <div className="space-y-2">
            <div className="rounded-md p-2.5 border border-border-light">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="h-5 w-5 bg-avatar-bg text-text-tertiary flex items-center justify-center text-[8px] font-bold shrink-0"
                  style={{ borderRadius: 100 }}
                >
                  J
                </div>
                <span className="text-[10px] text-text-tertiary">
                  James Turner
                </span>
                <span className="text-[8px] text-text-dim font-mono ml-auto">
                  0:42
                </span>
              </div>
              <span className="text-[8px] text-text-dim">Question</span>
            </div>
            <div className="rounded-md p-2.5 border border-border-light">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="h-5 w-5 bg-avatar-bg text-text-tertiary flex items-center justify-center text-[8px] font-bold shrink-0"
                  style={{ borderRadius: 100 }}
                >
                  L
                </div>
                <span className="text-[10px] text-text-tertiary">
                  Linda Park
                </span>
                <span className="text-[8px] text-text-dim font-mono ml-auto">
                  0:15
                </span>
              </div>
              <span className="text-[8px] text-[#F59E0B] font-medium">
                Transfer · Routing
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[8px] text-text-dim">12 answered today</span>
        <span className="text-[8px] font-medium text-brand-blue">0 missed</span>
      </div>
    </div>
  );
}
