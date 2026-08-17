import type { Deal, Fund, Quest } from "../../types";
import Button from "../common/Button";
import ProgressBar from "../common/ProgressBar";
import RewardRing from "../common/RewardRing";
import DealCard from "../deals/DealCard";

interface HomeScreenProps {
  deals: Deal[];
  activeQuest: Quest;
  featuredFund: Fund;
  ringProgress: {
    percent: number;
    title: string;
    subtitle: string;
  };
}

export default function HomeScreen({ deals, activeQuest, featuredFund, ringProgress }: HomeScreenProps) {
  const fundPercent = Math.round((featuredFund.raised / featuredFund.goal) * 100);

  return (
    <section className="px-5 pb-24 pt-[18px]">
      {/* Signature reward-progress element */}
      <div className="flex items-center gap-[18px] rounded-[20px] bg-mtn-black p-5 text-white">
        <RewardRing percent={ringProgress.percent} />
        <div>
          <div className="text-[14px] font-bold">{ringProgress.title}</div>
          <div className="text-[12px] text-[#B9B9B9]">{ringProgress.subtitle}</div>
          <div className="mt-2 inline-block rounded-full bg-mtn-yellow px-2.5 py-1 text-[11px] font-bold text-mtn-black">
            Keep going →
          </div>
        </div>
      </div>

      <div className="mb-3 mt-6 flex items-center justify-between">
        <h2 className="text-[15px] font-bold">Deals nearby</h2>
        <span className="text-[12px] font-semibold text-mtn-grey-mid">See all</span>
      </div>
      <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      <h2 className="mb-3 mt-6 text-[15px] font-bold">Active quest</h2>
      <div className="rounded-[14px] bg-mtn-grey p-4">
        <div className="mb-2.5 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-mtn-yellow text-[18px]">
              {activeQuest.icon}
            </div>
            <div>
              <div className="text-[14px] font-bold">{activeQuest.title}</div>
              <div className="mt-0.5 text-[12px] text-mtn-grey-mid">{activeQuest.description}</div>
            </div>
          </div>
          <span className="whitespace-nowrap rounded-full bg-mtn-yellow px-2.5 py-1 text-[11px] font-bold text-mtn-black">
            {activeQuest.rewardLabel}
          </span>
        </div>
        <ProgressBar percent={activeQuest.progress} />
        <div className="mt-2 flex justify-between text-[11px] font-semibold text-mtn-grey-mid">
          <span>{activeQuest.progressLabel}</span>
          <span>{activeQuest.progress}%</span>
        </div>
      </div>

      <h2 className="mb-3 mt-6 text-[15px] font-bold">Essentials fund</h2>
      <div className="rounded-[14px] bg-mtn-grey p-4">
        <div className="mb-2.5 flex items-start gap-3">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-mtn-yellow text-[18px]">
            {featuredFund.icon}
          </div>
          <div>
            <div className="text-[14px] font-bold">{featuredFund.title}</div>
            <div className="mt-0.5 text-[12px] text-mtn-grey-mid">
              {featuredFund.contributorInitials.length} contributors · {featuredFund.daysLeft} days left
            </div>
          </div>
        </div>
        <ProgressBar percent={fundPercent} />
        <div className="mt-2 flex justify-between text-[11px] font-semibold text-mtn-grey-mid">
          <span>R{featuredFund.raised} raised</span>
          <span>R{featuredFund.goal} goal</span>
        </div>
        <Button variant="primary" className="mt-3">
          Contribute with MoMo
        </Button>
      </div>
    </section>
  );
}
