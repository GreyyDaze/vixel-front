"use client";

type Bar = { x: number; w: number; h: number; delay: number; dur: number };

function TopBars({ bars, fill, offset = 0 }: { bars: Bar[]; fill: string; offset?: number }) {
  return (
    <g transform="translate(0, 0)">
      {bars.map((b, i) => (
        <rect key={`t-${i}`} x={b.x} y={0} width={b.w} height={b.h} rx="2" fill={fill}
          className="bg-wave-bar-top"
          style={{ animation: `voiceAmbient ${b.dur}s ease-in-out ${b.delay + offset}s infinite alternate` }} />
      ))}
    </g>
  );
}

function BottomBars({ bars, fill, offset = 0 }: { bars: Bar[]; fill: string; offset?: number }) {
  return (
    <g transform="translate(0, 900)">
      {bars.map((b, i) => (
        <rect key={`b-${i}`} x={b.x} y={-b.h} width={b.w} height={b.h} rx="2" fill={fill}
          className="bg-wave-bar"
          style={{ animation: `bgWave ${b.dur}s ease-in-out ${b.delay + offset}s infinite` }} />
      ))}
    </g>
  );
}

export function AnimatedVoiceField() {
  // Soft, barely-there bars. Goal: support the dashboard, not compete with it.
  // Opacity max ~10%, soft blur, very slow ambient movement.
  const generateBars = (
    count: number,
    spacing: number,
    minH: number,
    maxH: number,
    seed: number,
    gapEvery: number,
    widthRange: [number, number]
  ): Bar[] => {
    const bars: Bar[] = [];
    for (let i = 0; i < count; i++) {
      if (i % gapEvery === 0 && i > 0 && i < count - 1) continue;
      const r1 = Math.abs(Math.sin(seed * 9301 + i * 49297));
      const r2 = Math.abs(Math.sin(seed * 313 + i * 7919 + 17));
      const r3 = Math.abs(Math.sin(seed * 1117 + i * 2143 + 9));
      const heightFactor = Math.pow(r1 * r2, 0.6);
      const h = minH + heightFactor * (maxH - minH);
      const w = widthRange[0] + r3 * (widthRange[1] - widthRange[0]);
      // Very slow ambient — 6-12 second cycles
      const delay = (i * 0.15) % 8;
      const dur = 6 + r3 * 6;
      bars.push({ x: i * spacing, w, h, delay, dur });
    }
    return bars;
  };

  // Fewer bars, more space between them, narrower widths
  const backBars = generateBars(75, 22, 60, 320, 11, 6, [8, 14]);
  const frontBars = generateBars(95, 18, 18, 90, 5, 5, [4, 7]);

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ filter: "blur(2px)" }}
    >
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#eef2fb" />
          <stop offset="50%" stopColor="#dde6f5" />
          <stop offset="100%" stopColor="#c8d4ec" />
        </linearGradient>
        {/* Front bars — soft but visible */}
        <linearGradient id="barFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#002FD2" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#002FD2" stopOpacity="0.10" />
        </linearGradient>
        {/* Back bars — barely there for depth */}
        <linearGradient id="barBack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#002FD2" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#002FD2" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#bg)" />

      <g>
        {/* TOP pattern */}
        <TopBars bars={backBars} fill="url(#barBack)" />
        <TopBars bars={frontBars} fill="url(#barFront)" offset={1} />

        {/* BOTTOM pattern */}
        <BottomBars bars={backBars} fill="url(#barBack)" />
        <BottomBars bars={frontBars} fill="url(#barFront)" offset={1} />
      </g>

      </svg>
  );
}