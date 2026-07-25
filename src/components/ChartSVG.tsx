export function ChartSVG() {
  return (
    <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-text-primary)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--color-text-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M 0 60 L 25 50 L 50 55 L 75 35 L 100 40 L 125 25 L 150 35 L 175 20 L 200 30 L 225 15 L 250 25 L 275 10 L 300 20 L 325 25 L 350 15 L 375 25 L 400 20 L 400 80 L 0 80 Z" fill="url(#chartGrad)" />
      <path d="M 0 60 L 25 50 L 50 55 L 75 35 L 100 40 L 125 25 L 150 35 L 175 20 L 200 30 L 225 15 L 250 25 L 275 10 L 300 20 L 325 25 L 350 15 L 375 25 L 400 20" stroke="var(--color-text-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}