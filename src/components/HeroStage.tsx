"use client";

import { useEffect, useState } from "react";
import { DesktopMockup } from "./DesktopMockup";
import { MobileMockup } from "./MobileMockup";

export type Phase = "ringing" | "accepted" | "caller1" | "vox1" | "caller2" | "vox2" | "updating" | "done";

const PHASE_DURATIONS: Record<Phase, number> = {
  ringing: 3200,
  accepted: 0,
  caller1: 3200,
  vox1: 3200,
  caller2: 2800,
  vox2: 2600,
  updating: 2600,
  done: 4500,
};
const PHASE_ORDER: Phase[] = ["ringing", "accepted", "caller1", "vox1", "caller2", "vox2", "updating", "done"];

export function HeroStage() {
  const [phase, setPhase] = useState<Phase>("ringing");
  const [callSeconds, setCallSeconds] = useState(0);
  const [newCallInDashboard, setNewCallInDashboard] = useState(false);
  const [bookingsCount, setBookingsCount] = useState(182);

  useEffect(() => {
    let timer: number | undefined;
    const advance = () => {
      const idx = PHASE_ORDER.indexOf(phase);
      const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length];
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

  useEffect(() => {
    const liveCall = phase !== "ringing" && phase !== "done" && phase !== "accepted";
    if (!liveCall) return;
    const t = window.setInterval(() => setCallSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "updating") {
      const t = window.setTimeout(() => {
        setNewCallInDashboard(true);
        setBookingsCount(183);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full h-[88%] flex items-center justify-center">
        {/* Desktop (lg and up) */}
        <div className="hidden lg:block w-full h-full">
          <DesktopMockup
            phase={phase}
            callSeconds={callSeconds}
            newCallInDashboard={newCallInDashboard}
            bookingsCount={bookingsCount}
          />
        </div>

        {/* Mobile/tablet (below lg) */}
        <div className="lg:hidden w-full h-full">
          <MobileMockup phase={phase} callSeconds={callSeconds} />
        </div>
      </div>
    </div>
  );
}
