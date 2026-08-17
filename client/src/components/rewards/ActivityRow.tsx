import type { RewardActivity } from "../../types";

interface ActivityRowProps {
  activity: RewardActivity;
  isLast?: boolean;
}

export default function ActivityRow({ activity, isLast = false }: ActivityRowProps) {
  return (
    <div className={`flex items-center justify-between py-3 ${isLast ? "" : "border-b border-mtn-grey"}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-mtn-grey text-[15px]">
          {activity.icon}
        </div>
        <div>
          <div className="text-[13px] font-semibold">{activity.label}</div>
          <div className="mt-0.5 text-[11px] text-mtn-grey-mid">{activity.time}</div>
        </div>
      </div>
      <div className="text-[13px] font-bold text-mtn-green">+{activity.points}</div>
    </div>
  );
}
