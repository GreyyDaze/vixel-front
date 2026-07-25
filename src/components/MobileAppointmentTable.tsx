"use client";

import { StatusChip } from "./StatusChip";

export function MobileAppointmentTable() {
  return (
    <div className="flex flex-col h-full max-h-[300px] bg-white rounded-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <span className="text-[11px] font-semibold text-text-primary">Recent</span>
      </div>
      <div className="flex items-center gap-2.5 px-3 py-2.5 border-b bg-brand-light animate-fade-in">
        <div className="h-6 w-6 bg-element-bg text-white flex items-center justify-center text-[8px] font-bold shrink-0 rounded-full">S</div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-medium text-text-primary truncate">Sarah Patel</div>
          <div className="text-[9px] text-text-tertiary">Cleaning · Booked</div>
        </div>
        <span className="text-[9px] text-green font-medium shrink-0">Now</span>
      </div>
      <div className="flex-1 overflow-auto">
        {[
          { name: "Maria Santos", time: "2:14 PM", detail: "Booking", color: "text-brand-blue" },
          { name: "James Turner", time: "11:08 AM", detail: "Question", color: "text-text-tertiary" },
          { name: "Linda Park", time: "9:42 AM", detail: "Transferred", color: "text-[#F59E0B]" },
        ].map((c, i) => (
          <div key={i} className="flex items-center gap-2.5 px-3 py-2 border-b last:border-0">
            <div className="h-6 w-6 bg-avatar-bg text-text-tertiary flex items-center justify-center text-[8px] font-bold shrink-0 rounded-full">{c.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-text-primary truncate">{c.name}</div>
              <div className="text-[9px] text-text-tertiary">{c.detail} · {c.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}