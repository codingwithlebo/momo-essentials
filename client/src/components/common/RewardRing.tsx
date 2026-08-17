interface RewardRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
}

export default function RewardRing({ percent, size = 74, strokeWidth = 7 }: RewardRingProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const center = size / 2;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={center} cy={center} r={radius} stroke="#2B2B2B" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#FFCC00"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-display text-[15px] font-bold text-mtn-yellow">
        {clamped}%
      </div>
    </div>
  );
}
