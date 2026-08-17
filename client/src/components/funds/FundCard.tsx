import type { Fund } from "../../types";
import Button from "../common/Button";
import ProgressBar from "../common/ProgressBar";

interface FundCardProps {
  fund: Fund;
}

export default function FundCard({ fund }: FundCardProps) {
  const percent = Math.round((fund.raised / fund.goal) * 100);

  return (
    <div className="mb-3 rounded-[14px] bg-mtn-grey p-4">
      <div className="mb-2.5 flex items-start gap-3">
        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-mtn-yellow text-[18px]">
          {fund.icon}
        </div>
        <div>
          <div className="text-[14px] font-bold">{fund.title}</div>
          <div className="mt-0.5 text-[12px] text-mtn-grey-mid">{fund.daysLeft} days left</div>
        </div>
      </div>

      <div className="mb-0.5 flex items-baseline justify-between">
        <span className="font-display text-[16px] font-bold">R{fund.raised}</span>
        <span className="text-[12px] font-semibold text-mtn-grey-mid">of R{fund.goal}</span>
      </div>

      <ProgressBar percent={percent} />

      <div className="mt-2.5 flex items-center">
        {fund.contributorInitials.map((initial, index) => (
          <div
            key={`${fund.id}-${initial}-${index}`}
            className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-mtn-yellow text-[10px] font-bold -ml-2 first:ml-0"
          >
            {initial}
          </div>
        ))}
        <span className="ml-1.5 text-[11px] font-semibold text-mtn-grey-mid">
          {fund.contributorInitials.length} contributors
        </span>
      </div>

      <Button variant="primary" className="mt-3">
        Contribute with MoMo
      </Button>
    </div>
  );
}
