"use client";

import { PhoneMockup } from "./PhoneMockup";
import { CallAnimation } from "./CallAnimation";
import { BookedToast } from "./BookedToast";
import type { Phase } from "./HeroStage";

interface MobileMockupProps {
  phase: Phase;
  callSeconds: number;
}

export function MobileMockup({ phase, callSeconds }: MobileMockupProps) {
  const showPhone = phase === "ringing" || phase === "accepted";
  const showCallCard = phase !== "ringing" && phase !== "done" && phase !== "accepted";
  const showBookedToast = phase === "updating" || phase === "done";

  return (
    <div className="relative w-full h-full max-w-sm mx-auto sm:max-w-md md:max-w-lg">
      <div className="relative w-full h-full">
        {/* Step 1 — Phone mockup */}
        <div
          className="absolute inset-0 z-10 transition-opacity duration-500"
          style={{ opacity: showPhone ? 1 : 0, pointerEvents: showPhone ? "auto" : "none" }}
        >
          <PhoneMockup />
        </div>

        {/* Step 2 — Live call card */}
        <div
          className="absolute inset-x-3 bottom-4 z-20 transition-opacity duration-500"
          style={{ opacity: showCallCard ? 1 : 0, pointerEvents: showCallCard ? "auto" : "none" }}
        >
          <CallAnimation phase={phase} seconds={callSeconds} />
        </div>

        {/* Step 3 — Booking toast */}
        <div
          className="absolute inset-3 z-30 transition-opacity duration-500"
          style={{ opacity: showBookedToast ? 1 : 0, pointerEvents: showBookedToast ? "auto" : "none" }}
        >
          <BookedToast />
        </div>
      </div>
    </div>
  );
}