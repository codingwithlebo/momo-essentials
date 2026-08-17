import { useState } from "react";
import AppHeader from "./components/layout/AppHeader";
import BottomNav from "./components/layout/BottomNav";
import HomeScreen from "./components/home/HomeScreen";
import DealsScreen from "./components/deals/DealsScreen";
import QuestsScreen from "./components/quests/QuestsScreen";
import RewardsScreen from "./components/rewards/RewardsScreen";
import FundsScreen from "./components/funds/FundsScreen";
import type { ScreenId } from "./types";
import { deals, funds, quests, rewardActivity, rewardRingProgress, walletSummary } from "./data/mockData";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("home");

  return (
    <div className="mx-auto flex h-dvh max-w-[430px] flex-col bg-white">
      <AppHeader location="Johannesburg" points={walletSummary.totalPoints} />

      <main className="no-scrollbar flex-1 overflow-y-auto">
        {activeScreen === "home" && (
          <HomeScreen
            deals={deals}
            activeQuest={quests[0]}
            featuredFund={funds[0]}
            ringProgress={rewardRingProgress}
          />
        )}
        {activeScreen === "deals" && <DealsScreen deals={deals} />}
        {activeScreen === "quests" && <QuestsScreen quests={quests} />}
        {activeScreen === "rewards" && <RewardsScreen wallet={walletSummary} activity={rewardActivity} />}
        {activeScreen === "funds" && <FundsScreen funds={funds} />}
      </main>

      <BottomNav active={activeScreen} onNavigate={setActiveScreen} />
    </div>
  );
}
