import type { Quest } from "../../types";
import QuestCard from "./QuestCard";

interface QuestsScreenProps {
  quests: Quest[];
}

export default function QuestsScreen({ quests }: QuestsScreenProps) {
  return (
    <section className="px-5 pb-24 pt-[18px]">
      <h2 className="mb-3 text-[15px] font-bold">Your quests</h2>
      {quests.map((quest) => (
        <QuestCard key={quest.id} quest={quest} />
      ))}
    </section>
  );
}
