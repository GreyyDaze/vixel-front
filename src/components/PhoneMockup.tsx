"use client";

import { Phone } from "lucide-react";

export function PhoneMockup() {
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full bg-[#1C1C1C] rounded-[20px] p-[6px]">
        <div className="w-full h-full bg-white rounded-[16px] overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[18px] bg-[#1C1C1C] rounded-b-[14px] z-10"></div>

          <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[8px] font-semibold text-text-primary relative z-[1]">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[1px] items-end">
                <div className="w-[2px] h-[3px] bg-element-bg"></div>
                <div className="w-[2px] h-[4px] bg-element-bg"></div>
                <div className="w-[2px] h-[5px] bg-element-bg"></div>
                <div className="w-[2px] h-[6px] bg-element-bg"></div>
              </div>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="ml-1">
                <rect x="0" y="1" width="11" height="6" rx="1" stroke="#111" strokeWidth="0.8" />
                <rect x="12" y="3" width="1.5" height="2" rx="0.5" fill="#111" />
              </svg>
            </div>
          </div>

          <div className="px-4 pt-6 pb-4 h-[calc(100%-22px)] flex flex-col">
            <div className="text-center mb-4">
              <div className="text-[8px] text-text-secondary uppercase tracking-wider mb-1">Vox Front</div>
              <div className="text-[10px] text-text-secondary">Incoming call</div>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="h-14 w-14 rounded-full bg-avatar-bg flex items-center justify-center mb-2 phone-ringing"><Phone size={24} strokeWidth={1.8} color="var(--color-text-tertiary)" /></div>
              <div className="text-xs font-semibold text-text-primary">Sarah Patel</div>
              <div className="text-[9px] text-text-secondary">+1 (415) 555-0142</div>
            </div>

            <div className="mt-auto flex items-center justify-around pb-2">
              <div className="flex flex-col items-center gap-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5">
                  <path d="M3 9c0-1 1-2 2-2h2l2 3-2 1c1 2 2 3 4 4l1-2 3 2v2c0 1-1 2-2 2-7 0-10-3-10-10z" transform="rotate(135 12 12)" />
                </svg>
                <span className="text-[11px] text-text-tertiary">Decline</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-blue)" strokeWidth="1.5">
                  <path d="M3 9c0-1 1-2 2-2h2l2 3-2 1c1 2 2 3 4 4l1-2 3 2v2c0 1-1 2-2 2-7 0-10-3-10-10z" />
                </svg>
                <span className="text-[11px] text-text-tertiary">Accept</span>
              </div>
            </div>

            <div className="flex justify-center pt-1">
              <div className="h-[3px] w-20 bg-element-bg rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}