import type { Quest } from "../../types";
import Badge from "../common/Badge";
import Button from "../common/Button";
import ProgressBar from "../common/ProgressBar";

interface QuestCardProps {
  quest: Quest;
  onJoin?: (questId: string) => void;
}

export default function QuestCard({ quest, onJoin }: QuestCardProps) {
  const isCompleted = quest.status === "completed";
  return (
    <div className="mb-3 rounded-[14px] bg-mtn-grey p-4">
      <div className="mb-2.5 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-mtn-yellow text-[18px]">
            {quest.icon}
          </div>
          <div>
            <div className="text-[14px] font-bold">{quest.title}</div>
            <div className="mt-0.5 text-[12px] text-mtn-grey-mid">{quest.description}</div>
          </div>
        </div>
        <Badge variant="yellow">{quest.rewardLabel}</Badge>
      </div>
      <ProgressBar percent={quest.progress} variant={isCompleted ? "green" : "yellow"} />
      {isCompleted ? (
        <div className="mt-3 flex items-center gap-1.5 rounded-[10px] bg-mtn-green-bg px-2.5 py-2 text-[12px] font-bold text-mtn-green">
          ✓ {quest.progressLabel}
        </div>
      ) : (
        <div className="mt-2 flex justify-between text-[11px] font-semibold text-mtn-grey-mid">
          <span>{quest.progressLabel}</span>
          <span>{quest.progress}%</span>
        </div>
      )}
      {quest.status === "not-started" && (
        <Button variant="dark" className="mt-3" onClick={() => onJoin?.(quest.id)}>
          Join quest
        </Button>
      )}
    </div>
  );
}