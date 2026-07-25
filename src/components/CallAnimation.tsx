"use client";

import { LogoMark } from "./LogoMark";

interface CallAnimationProps {
  phase: string;
  seconds: number;
}

export function CallAnimation({ phase, seconds }: CallAnimationProps) {
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