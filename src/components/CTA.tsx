function Clouds() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="ctaCloud" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#e8f4fa" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#cce4ef" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ctaBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a8bbf" />
          <stop offset="50%" stopColor="#1d9dd0" />
          <stop offset="100%" stopColor="#0a8bbf" />
        </linearGradient>
      </defs>
      <rect width="1400" height="600" fill="url(#ctaBg)" />
      <ellipse cx="100" cy="100" rx="220" ry="100" fill="url(#ctaCloud)" />
      <ellipse cx="400" cy="60" rx="260" ry="120" fill="url(#ctaCloud)" />
      <ellipse cx="800" cy="80" rx="300" ry="140" fill="url(#ctaCloud)" />
      <ellipse cx="1200" cy="100" rx="240" ry="110" fill="url(#ctaCloud)" />
      <ellipse cx="50" cy="300" rx="220" ry="100" fill="url(#ctaCloud)" />
      <ellipse cx="350" cy="320" rx="280" ry="130" fill="url(#ctaCloud)" />
      <ellipse cx="700" cy="280" rx="320" ry="150" fill="url(#ctaCloud)" />
      <ellipse cx="1050" cy="320" rx="260" ry="120" fill="url(#ctaCloud)" />
      <ellipse cx="1350" cy="300" rx="220" ry="100" fill="url(#ctaCloud)" />
      <ellipse cx="150" cy="500" rx="280" ry="130" fill="url(#ctaCloud)" />
      <ellipse cx="500" cy="520" rx="300" ry="140" fill="url(#ctaCloud)" />
      <ellipse cx="900" cy="500" rx="320" ry="150" fill="url(#ctaCloud)" />
      <ellipse cx="1300" cy="520" rx="280" ry="120" fill="url(#ctaCloud)" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7">
      <path d="M3 6l5 5 5-5" />
    </svg>
  );
}

export function CTA() {
  return (
    <section id="cta" className="w-full max-w-[1320px] mx-auto px-8 lg:px-16 py-12">
      <div className="relative w-full aspect-[16/6] rounded-[14px] overflow-hidden">
        <Clouds />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <h2 className="text-[36px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-white mb-6">
            Stop losing calls.
          </h2>
          <div className="flex flex-col gap-0.5 mb-7">
            <Chevron />
            <Chevron />
            <Chevron />
            <Chevron />
            <Chevron />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#" className="bg-[#111] text-white text-[13px] font-medium px-5 py-2.5 rounded-[6px] hover:bg-[#000] transition-colors">
              Book a demo
            </a>
            <a href="#" className="bg-white text-[#111] text-[13px] font-medium px-5 py-2.5 rounded-[6px] hover:bg-white/95 transition-colors">
              Talk to the team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
