import { COPY } from "@/content/copy";

export function Dashboard() {
  return (
    <section id="dashboard" className="w-full" style={{ background: "#0a0a0a" }}>
      <div className="max-w-[1320px] mx-auto px-8 lg:px-16 py-24">
        <div className="mb-12 max-w-[640px]">
          <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-white mb-4">
            {COPY.dashboard.headline}
          </h2>
          <p className="text-[14px] text-[#888] leading-[1.65]">
            {COPY.dashboard.subhead}
          </p>
        </div>

        <div
          className="rounded-[8px] overflow-hidden border border-[#1a1a1a]"
          style={{
            boxShadow: "0 1px 2px rgba(0,0,0,0.4), 0 4px 12px -4px rgba(0,0,0,0.5), 0 24px 48px -12px rgba(0,0,0,0.6)",
          }}
        >
          {/* Browser chrome */}
          <div className="bg-[#141414] border-b border-[#1a1a1a] px-4 py-2.5 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]"></div>
            </div>
            <div className="flex-1 bg-[#1a1a1a] border border-[#222] rounded-md px-3 py-1 text-[11px] text-[#666] max-w-[320px]">
              app.voxfront.com/dashboard
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr]">
            {/* Sidebar */}
            <div className="border-r border-[#1a1a1a] p-3 bg-[#0f0f0f]">
              <div className="flex items-center gap-2 px-2 py-2 mb-3">
                <div className="h-6 w-6 rounded-md bg-[#111] border border-[#222] flex items-center justify-center">
                  <svg width="11" height="11" viewBox="0 0 32 32" fill="none">
                    <path d="M5 6L11.5 24C11.9 25.1 13.4 25.1 13.8 24L18 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[12px] font-medium text-white">Vox Front</span>
              </div>
              {[
                { label: "Overview", active: true },
                { label: "Calls" },
                { label: "Appointments" },
                { label: "Profile" },
                { label: "Knowledge" },
                { label: "Analytics" },
              ].map((item, i) => (
                <div key={i} className={`px-3 py-1.5 rounded-md text-[12px] mb-0.5 ${item.active ? "bg-white text-[#111] font-medium" : "text-[#888] hover:bg-[#1a1a1a] hover:text-white"}`}>
                  {item.label}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 bg-[#111111]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-[16px] font-medium text-white">Overview</h3>
                  <p className="text-[11px] text-[#666]">Last 30 days</p>
                </div>
                <div className="border border-[#1f1f1f] rounded-md px-2.5 py-1 text-[11px] text-[#888] bg-[#161616]">Last 30 days</div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {[
                  { label: "Calls answered", value: "847", change: "+12%" },
                  { label: "Bookings", value: "182", change: "+24%" },
                  { label: "Resolution rate", value: "94%", change: "+3%" },
                  { label: "Avg. response", value: "0.8s", change: "" },
                ].map((s, i) => (
                  <div key={i} className="border border-[#1f1f1f] rounded-[6px] p-3.5 bg-[#161616]">
                    <div className="text-[11px] text-[#666] mb-1.5">{s.label}</div>
                    <div className="text-[22px] font-medium text-white tracking-tight leading-none">{s.value}</div>
                    {s.change && <div className="text-[10px] text-[#4F6BFF] font-medium mt-1.5">{s.change} vs last</div>}
                  </div>
                ))}
              </div>

              <div className="border border-[#1f1f1f] rounded-[6px] p-4 mb-3 bg-[#161616]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-medium text-white">Call volume</span>
                <div className="flex items-center gap-4 text-[10px] text-[#666]">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-[2px] bg-white rounded-full"></span>Answered
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-[2px] bg-[#333] rounded-full"></span>Booked
                  </div>
                </div>
                </div>
                <div className="h-28">
                  <ChartDark />
                </div>
              </div>

              <div className="border border-[#1f1f1f] rounded-[6px] p-4 bg-[#161616]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-medium text-white">Recent calls</span>
                  <span className="text-[11px] text-[#666]">View all →</span>
                </div>
                <div>
                  {[
                    { name: "Maria Santos", time: "2:14 PM", status: "Booked" },
                    { name: "James Turner", time: "11:08 AM", status: "Booked" },
                    { name: "Linda Park", time: "9:42 AM", status: "Transferred" },
                    { name: "Robert Chen", time: "Yesterday", status: "Question" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#1a1a1a] last:border-0">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[11px] font-medium text-white">
                          {c.name[0]}
                        </div>
                        <div>
                          <div className="text-[12px] font-medium text-white">{c.name}</div>
                          <div className="text-[10px] text-[#666]">{c.time}</div>
                        </div>
                      </div>
                      <div className={`text-[10px] font-medium px-2 py-0.5 rounded ${c.status === "Booked" ? "text-[#4F6BFF] bg-[#4F6BFF]/10" : c.status === "Transferred" ? "text-[#F59E0B] bg-[#F59E0B]/10" : "text-[#888] bg-[#1a1a1a]"}`}>
                        {c.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChartDark() {
  return (
    <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGradDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#1a1a1a" strokeWidth="1" />
      ))}
      <path
        d="M 0 70 L 25 60 L 50 65 L 75 45 L 100 50 L 125 35 L 150 45 L 175 25 L 200 35 L 225 20 L 250 30 L 275 15 L 300 25 L 325 30 L 350 20 L 375 30 L 400 25 L 400 100 L 0 100 Z"
        fill="url(#chartGradDark)"
      />
      <path
        d="M 0 70 L 25 60 L 50 65 L 75 45 L 100 50 L 125 35 L 150 45 L 175 25 L 200 35 L 225 20 L 250 30 L 275 15 L 300 25 L 325 30 L 350 20 L 375 30 L 400 25"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
