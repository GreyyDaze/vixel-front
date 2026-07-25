"use client";

import { Phone, User, LayoutDashboard, Calendar, BookOpen, BarChart3 } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { StatusChip } from "./StatusChip";
import { CallAnimation } from "./CallAnimation";
import { PhoneMockup } from "./PhoneMockup";
import { BookedToast } from "./BookedToast";
import { ChartSVG } from "./ChartSVG";
import type { Phase } from "./HeroStage";

interface DesktopMockupProps {
  phase: Phase;
  callSeconds: number;
  newCallInDashboard: boolean;
  bookingsCount: number;
}

export function DesktopMockup({ phase, callSeconds, newCallInDashboard, bookingsCount }: DesktopMockupProps) {
  const showPhone = phase === "ringing" || phase === "accepted";
  const showCallCard = phase !== "ringing" && phase !== "done" && phase !== "accepted";
  const showBookedToast = phase === "updating" || phase === "done";

  return (
    <div className="relative w-full h-full bg-white rounded-md border">
      <div className="h-full grid grid-cols-[180px_1fr]">
        <div className="border-r p-3 bg-sidebar-bg">
          <div className="flex items-center gap-2 px-3 py-2 mb-3">
            <div className="h-6 w-6 rounded-[5px] bg-brand-blue flex items-center justify-center">
              <LogoMark size={14} color="white" />
            </div>
            <span className="text-xs font-semibold text-text-primary">Vox Front</span>
          </div>
          {[
            { label: "Overview", icon: LayoutDashboard, active: true },
            { label: "Calls", icon: Phone },
            { label: "Appointments", icon: Calendar },
            { label: "Profile", icon: User },
            { label: "Knowledge", icon: BookOpen },
            { label: "Analytics", icon: BarChart3 },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-[11.5px] mb-0.5 ${item.active ? "bg-element-bg text-white font-medium" : "text-text-secondary"}`}>
                <Icon size={14} strokeWidth={1.8} />
                {item.label}
              </div>
            );
          })}
          <div className="absolute bottom-4 left-3 right-[calc(100%-180px)] flex items-center gap-2 px-2 py-2 border-t pt-3">
            <div className="h-6 w-6 rounded-full bg-avatar-bg flex items-center justify-center shrink-0"><User size={12} strokeWidth={2} color="var(--color-text-tertiary)" /></div>
            <div className="leading-tight min-w-0">
              <div className="text-[10.5px] font-medium text-text-primary truncate">Dr. Chen</div>
              <div className="text-[9px] text-text-tertiary truncate">Clearview Dental</div>
            </div>
          </div>
        </div>

        <div className="p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-semibold text-text-primary">Overview</h3>
              <p className="text-[10.5px] text-text-tertiary">Last 30 days</p>
            </div>
            <div className="border rounded-md px-2.5 py-1 text-[10.5px] text-text-secondary">Last 30 days</div>
          </div>

          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {[
              { label: "Calls answered", value: "847", change: "+12%" },
              { label: "Bookings", value: String(bookingsCount), change: bookingsCount > 182 ? "Live" : "+24%" },
              { label: "Resolution", value: "94%", change: "+3%" },
              { label: "Avg. response", value: "0.8s", change: "" },
            ].map((s, i) => (
              <div key={i} className="border rounded-md p-2.5 shadow-card">
                <div className="text-[9.5px] text-text-secondary mb-1">{s.label}</div>
                <div className="text-lg font-semibold text-text-primary tracking-tight leading-none">{s.value}</div>
                {s.change && (
                  <div className={`text-[9px] font-medium mt-1 ${s.change === "Live" ? "text-brand-blue" : "text-brand-blue"}`}>
                    {s.change === "Live" ? "● Live" : s.change}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border rounded-md p-3 mb-3 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] font-medium text-text-primary">Call volume</span>
              <div className="flex items-center gap-2 text-[9px] text-text-tertiary">
                <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-[2px] bg-white rounded-full"></span>Answered
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-[2px] bg-text-conversation rounded-full"></span>Booked
                  </div>
                </div>
              </div>
            </div>
            <div className="h-20"><ChartSVG /></div>
          </div>

          <div className="border rounded-md p-3 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10.5px] font-medium text-text-primary">Recent calls</span>
              <span className="text-[9.5px] text-text-tertiary">View all →</span>
            </div>
            <div>
              {newCallInDashboard && (
                <div className="flex items-center justify-between py-1.5 border-b bg-brand-light -mx-1 px-1 rounded transition-all duration-700" style={{ animation: "slideIn 0.6s ease-out" }}>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-element-bg flex items-center justify-center text-[11px] font-medium text-white">S</div>
                    <div>
                      <div className="text-[10.5px] font-medium text-text-primary">Sarah Patel</div>
                      <div className="text-[9px] text-text-tertiary">Just now</div>
                    </div>
                  </div>
                  <StatusChip size="sm">Booked</StatusChip>
                </div>
              )}
              {[
                { name: "Maria Santos", time: "2:14 PM", status: "Booked" },
                { name: "James Turner", time: "11:08 AM", status: "Booked" },
                { name: "Linda Park", time: "9:42 AM", status: "Transferred" },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-avatar-bg flex items-center justify-center text-[11px] font-medium text-text-tertiary">{c.name[0]}</div>
                    <div>
                      <div className="text-[10.5px] font-medium text-text-primary">{c.name}</div>
                      <div className="text-[9px] text-text-tertiary">{c.time}</div>
                    </div>
                  </div>
                  <StatusChip size="sm" variant={c.status === "Booked" ? "active" : "inactive"}>{c.status}</StatusChip>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Overlays */}
      {showPhone && (
        <div className="absolute right-[-2%] top-[8%] z-10 w-[200px] lg:w-[220px] aspect-[9/19] transition-opacity duration-500 hidden lg:block" style={{ opacity: phase === "ringing" ? 1 : 0 }}>
          <PhoneMockup />
        </div>
      )}
      {showCallCard && (
        <div className="absolute right-[14%] top-[2%] z-20 w-[260px] transition-opacity duration-500 hidden lg:block">
          <CallAnimation phase={phase} seconds={callSeconds} />
        </div>
      )}
      {showBookedToast && (
        <div className="absolute right-[16%] bottom-[6%] z-20 transition-opacity duration-500 hidden lg:block" style={{ opacity: 1 }}>
          <BookedToast />
        </div>
      )}
    </div>
  );
}