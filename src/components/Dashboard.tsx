import { Badge } from "@/components/ui/badge";
import { COPY } from "@/content/copy";

export function Dashboard() {
  return (
    <section id="dashboard" className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-20">
      <div className="mb-10 max-w-[640px]">
        <div className="text-[11px] text-[#999] uppercase tracking-wider mb-3">{COPY.dashboard.label}</div>
        <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-[#111] mb-4">
          {COPY.dashboard.headline}
        </h2>
        <p className="text-[14px] text-[#666] leading-[1.65]">
          {COPY.dashboard.subhead}
        </p>
      </div>

      <div className="bg-white border border-[#eee] rounded-[12px] overflow-hidden">
        <div className="bg-[#fafafa] border-b border-[#eee] px-4 py-2.5 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></div>
          </div>
          <div className="flex-1 bg-white border border-[#eee] rounded-md px-3 py-1 text-[11px] text-[#999] max-w-[320px]">
            app.voxfront.com/dashboard
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr]">
          <div className="border-r border-[#eee] p-3 bg-white">
            <div className="flex items-center gap-2 px-2 py-2 mb-3">
              <div className="h-6 w-6 rounded-md bg-[#111] flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 32 32" fill="none">
                  <path d="M5 6L11.5 24C11.9 25.1 13.4 25.1 13.8 24L18 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[12px] font-medium text-[#111]">Vox Front</span>
            </div>
            {[
              { label: "Overview", active: true },
              { label: "Calls" },
              { label: "Appointments" },
              { label: "Profile" },
              { label: "Knowledge" },
              { label: "Analytics" },
            ].map((item, i) => (
              <div key={i} className={`px-3 py-1.5 rounded-md text-[12px] ${item.active ? "bg-[#111] text-white font-medium" : "text-[#666] hover:bg-[#f5f5f5]"}`}>
                {item.label}
              </div>
            ))}
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[16px] font-medium text-[#111]">Overview</h3>
                <p className="text-[11px] text-[#999]">Last 30 days</p>
              </div>
              <div className="border border-[#eee] rounded-md px-2.5 py-1 text-[11px] text-[#666]">Last 30 days</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {[
                { label: "Calls answered", value: "847", change: "+12%" },
                { label: "Bookings", value: "182", change: "+24%" },
                { label: "Resolution rate", value: "94%", change: "+3%" },
                { label: "Avg. response", value: "0.8s", change: "" },
              ].map((s, i) => (
                <div key={i} className="border border-[#eee] rounded-[8px] p-3.5">
                  <div className="text-[11px] text-[#999] mb-1.5">{s.label}</div>
                  <div className="text-[22px] font-medium text-[#111] tracking-tight leading-none">{s.value}</div>
                  {s.change && <div className="text-[10px] text-emerald-600 font-medium mt-1.5">{s.change} vs last</div>}
                </div>
              ))}
            </div>

            <div className="border border-[#eee] rounded-[8px] p-4 mb-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-medium text-[#111]">Call volume</span>
                <div className="flex items-center gap-3 text-[10px] text-[#999]">
                  <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#111]"></span>Answered</div>
                  <div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#ddd]"></span>Booked</div>
                </div>
              </div>
              <div className="h-28">
                <Chart />
              </div>
            </div>

            <div className="border border-[#eee] rounded-[8px] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] font-medium text-[#111]">Recent calls</span>
                <span className="text-[11px] text-[#999]">View all →</span>
              </div>
              <div>
                {[
                  { name: "Maria Santos", time: "2:14 PM", status: "Booked", variant: "default" as const, badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                  { name: "James Turner", time: "11:08 AM", status: "Booked", variant: "default" as const, badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                  { name: "Linda Park", time: "9:42 AM", status: "Transferred", variant: "secondary" as const, badgeClass: "bg-amber-50 text-amber-600 border-amber-100" },
                  { name: "Robert Chen", time: "Yesterday", status: "Question", variant: "outline" as const, badgeClass: "bg-neutral-50 text-neutral-800 border-neutral-200" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#f5f5f5] last:border-0">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[11px] font-medium text-[#111]">
                        {c.name[0]}
                      </div>
                      <div>
                        <div className="text-[12px] font-medium text-[#111]">{c.name}</div>
                        <div className="text-[10px] text-[#999]">{c.time}</div>
                      </div>
                    </div>
                    <Badge variant={c.variant} className={`text-[10px] font-medium ${c.badgeClass}`}>
                      {c.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chart() {
  return (
    <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#111" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#111" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#f5f5f5" strokeWidth="1" />
      ))}
      <path
        d="M 0 70 L 25 60 L 50 65 L 75 45 L 100 50 L 125 35 L 150 45 L 175 25 L 200 35 L 225 20 L 250 30 L 275 15 L 300 25 L 325 30 L 350 20 L 375 30 L 400 25 L 400 100 L 0 100 Z"
        fill="url(#chartGrad)"
      />
      <path
        d="M 0 70 L 25 60 L 50 65 L 75 45 L 100 50 L 125 35 L 150 45 L 175 25 L 200 35 L 225 20 L 250 30 L 275 15 L 300 25 L 325 30 L 350 20 L 375 30 L 400 25"
        stroke="#111"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
