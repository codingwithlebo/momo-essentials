import type { ReactNode } from "react";

export type BadgeVariant = "yellow" | "red" | "green";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  yellow: "bg-mtn-yellow text-mtn-black",
  red: "bg-mtn-red-bg text-mtn-red",
  green: "bg-mtn-green-bg text-mtn-green",
};

export default function Badge({ children, variant = "yellow" }: BadgeProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
