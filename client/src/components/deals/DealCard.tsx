import type { Deal } from "../../types";
import Badge from "../common/Badge";

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
  const badgeVariant = deal.tagVariant === "expiring" ? "red" : "yellow";

  return (
    <div className="w-[200px] shrink-0 rounded-[14px] bg-mtn-grey p-3.5">
      <div className="mb-2.5">
        <Badge variant={badgeVariant}>{deal.tagLabel}</Badge>
      </div>
      <div className="text-[14px] font-bold leading-tight">{deal.merchant}</div>
      <p className="mb-2.5 mt-0.5 text-[12px] leading-snug text-mtn-grey-mid">{deal.description}</p>
      <div className="flex items-center justify-between text-[11px] font-semibold text-mtn-grey-mid">
        <span>{deal.distance}</span>
        <span>{deal.points} pts</span>
      </div>
    </div>
  );
}
