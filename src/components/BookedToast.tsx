export function BookedToast() {
  return (
    <div className="bg-white rounded-[5px] shadow-2xl border px-3.5 py-3 flex items-center gap-3 booked-toast-slide w-[280px]">
      <div className="h-8 w-8 rounded-full bg-brand-tint flex items-center justify-center shrink-0">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 8l3.5 3.5L13 5" stroke="var(--color-brand-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11.5px] font-semibold text-text-primary">Appointment Booked</div>
        <div className="text-[10px] text-text-secondary">Tue, Mar 18 at 2:30 PM</div>
      </div>
      <div className="text-[9.5px] text-text-tertiary">now</div>
    </div>
  );
}