export type ProgressVariant = "yellow" | "green";

interface ProgressBarProps {
  percent: number;
  variant?: ProgressVariant;
}

export default function ProgressBar({ percent, variant = "yellow" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const fillClass = variant === "green" ? "bg-mtn-green" : "bg-mtn-yellow";

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2E2E2]">
      <div
        className={`h-full rounded-full transition-[width] duration-300 ease-out ${fillClass}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
