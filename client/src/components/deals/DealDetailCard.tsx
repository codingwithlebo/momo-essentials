import type { Deal } from "../../types";
import Badge from "../common/Badge";
import Button from "../common/Button";

interface DealDetailCardProps {
  deal: Deal;
}

export default function DealDetailCard({ deal }: DealDetailCardProps) {
  const isExpired = deal.tagVariant === "expired";
  const badgeVariant = deal.tagVariant === "default" ? "yellow" : "red";

  return (
    <div className={`mb-3 rounded-[14px] bg-mtn-grey p-4 ${isExpired ? "opacity-55" : ""}`}>
      <div className="mb-2.5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] text-[18px] ${
              isExpired ? "bg-white text-mtn-grey-mid" : "bg-mtn-yellow"
            }`}
          >
            {deal.icon}
          </div>
          <div>
            <div className="text-[14px] font-bold">{deal.merchant}</div>
            <div className="mt-0.5 text-[12px] text-mtn-grey-mid">{deal.distance}</div>
          </div>
        </div>
        <Badge variant={badgeVariant}>{deal.tagLabel}</Badge>
      </div>

      {!isExpired && (
        <>
          <p className="text-[12px] leading-snug text-mtn-grey-mid">{deal.description}</p>
          <Button variant="primary" className="mt-3">
            View deal
          </Button>
        </>
      )}
    </div>
  );
}
