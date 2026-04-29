interface OrbitalProps {
  size?: number;
  animate?: boolean;
  className?: string;
}

export function Orbital({ size = 540, animate = true, className }: OrbitalProps) {
  const c = size / 2;
  const orbits = [110, 170, 230];
  const agents = [
    { o: 0, deg: 30 }, { o: 0, deg: 160 }, { o: 0, deg: 280 },
    { o: 1, deg: 60 }, { o: 1, deg: 200 }, { o: 1, deg: 320 },
    { o: 2, deg: 90 }, { o: 2, deg: 240 },
  ];
  const pos = (deg: number, r: number): [number, number] => [
    c + Math.cos((deg * Math.PI) / 180) * r,
    c + Math.sin((deg * Math.PI) / 180) * r,
  ];
  return (
    <svg viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="had-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity=".9" />
          <stop offset="40%" stopColor="hsl(var(--accent))" stopOpacity=".15" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="had-flow" x1="0" x2="1">
          <stop offset="0" stopColor="hsl(var(--accent))" stopOpacity="0" />
          <stop offset=".4" stopColor="hsl(var(--accent))" stopOpacity=".7" />
          <stop offset="1" stopColor="hsl(var(--accent-2))" stopOpacity=".7" />
        </linearGradient>
        <filter id="had-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx={c} cy={c} r="200" fill="url(#had-core)" />
      {orbits.map((r, i) => (
        <circle key={i} cx={c} cy={c} r={r}
          fill="none" stroke={`hsla(0, 0%, 100%, ${i === 2 ? 0.08 : 0.13})`}
          strokeDasharray={i === 2 ? "1 6" : "2 5"} strokeWidth="1" />
      ))}
      <g>
        <circle cx={c} cy={c} r="62" fill="hsl(var(--bg-2))" stroke="hsl(var(--warm))" strokeWidth="1.5" />
        <circle cx={c} cy={c} r="48" fill="none" stroke="hsl(var(--warm))" strokeOpacity=".35" strokeDasharray="1 4" />
        <text x={c} y={c - 6} textAnchor="middle" fill="hsl(var(--warm))" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2">HUMAN</text>
        <text x={c} y={c + 8} textAnchor="middle" fill="hsl(var(--warm))" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2">GOVERNANCE</text>
        <text x={c} y={c + 22} textAnchor="middle" fill="hsl(var(--ink-3))" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="2">CORE</text>
      </g>
      <path
        d={`M ${c} ${c + 62} Q ${c + 40} ${size - 40} ${size - 30} ${size - 30}`}
        fill="none" stroke="url(#had-flow)" strokeWidth="1.5" strokeDasharray="2 4"
      />
      <text x={size - 30} y={size - 12} textAnchor="end" fill="hsl(var(--accent-2))"
        fontFamily="var(--font-mono)" fontSize="9" letterSpacing="2">VALUE FLOW →</text>
      {agents.map((a, idx) => {
        const r = orbits[a.o];
        const [x, y] = pos(a.deg, r);
        return (
          <g key={idx} filter="url(#had-glow)">
            <line x1={c} y1={c} x2={x} y2={y} stroke="hsl(var(--accent))" strokeOpacity=".18" strokeWidth=".75" />
            <circle cx={x} cy={y} r={a.o === 2 ? 3 : 4.5} fill="hsl(var(--accent))" />
            <circle cx={x} cy={y} r={a.o === 2 ? 3 : 4.5} fill="none" stroke="hsl(var(--accent-2))" strokeOpacity=".5" strokeWidth="1" />
          </g>
        );
      })}
      {[0, 90, 180, 270].map((d, i) => {
        const [x, y] = pos(d, 250);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="1.5" fill="hsl(var(--ink-3))" />
            <text x={x} y={y - 8} fill="hsl(var(--ink-4))" fontFamily="var(--font-mono)"
              fontSize="8" textAnchor="middle" letterSpacing="2">
              {["DISCOVER", "CONCEIVE", "DELIVER", "VALIDATE"][i]}
            </text>
          </g>
        );
      })}
      {animate && (
        <g className="anim-spin-slow" style={{ transformOrigin: `${c}px ${c}px` }}>
          <circle cx={c} cy={c} r="170" fill="none" stroke="hsl(var(--accent-2))"
            strokeOpacity=".18" strokeWidth="1" strokeDasharray="1 14" />
        </g>
      )}
    </svg>
  );
}

export function BrandMark({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="none" stroke="hsl(var(--ink-3))" strokeDasharray="1 3" />
      <circle cx="12" cy="12" r="5" fill="hsl(var(--accent))" fillOpacity=".25" stroke="hsl(var(--accent))" strokeWidth="1" />
      <circle cx="12" cy="12" r="1.6" fill="hsl(var(--accent))" />
      <circle cx="22" cy="12" r="1.4" fill="hsl(var(--accent))" />
      <circle cx="2" cy="12" r="1.4" fill="hsl(var(--accent))" />
      <circle cx="12" cy="2" r="1.4" fill="hsl(var(--warm))" />
    </svg>
  );
}
