import type { RewardActivity, WalletSummary } from "../../types";
import Button from "../common/Button";
import ActivityRow from "./ActivityRow";

interface RewardsScreenProps {
  wallet: WalletSummary;
  activity: RewardActivity[];
}

export default function RewardsScreen({ wallet, activity }: RewardsScreenProps) {
  return (
    <section className="px-5 pb-24 pt-[18px]">
      <div className="mb-[22px] rounded-[20px] bg-mtn-black px-5 py-[26px] text-center text-white">
        <div className="font-display text-[44px] font-bold leading-none text-mtn-yellow">
          {wallet.totalPoints}
        </div>
        <div className="mt-1.5 text-[12px] font-semibold text-[#B9B9B9]">TOTAL POINTS</div>
        <div className="mt-4 inline-block rounded-full bg-mtn-yellow/10 px-3.5 py-1.5 text-[12px] font-bold text-mtn-yellow">
          {wallet.redeemableValueLabel}
        </div>
      </div>

      <Button variant="primary" className="mb-[22px]">
        Redeem for MoMo cashback
      </Button>

      <h2 className="mb-3 text-[15px] font-bold">Recent activity</h2>
      <div className="rounded-[14px] bg-mtn-grey px-4">
        {activity.map((item, index) => (
          <ActivityRow key={item.id} activity={item} isLast={index === activity.length - 1} />
        ))}
      </div>
    </section>
  );
}
