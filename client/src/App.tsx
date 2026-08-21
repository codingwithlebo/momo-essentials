import { useEffect, useState } from "react";
import AppHeader from "./components/layout/AppHeader";
import BottomNav from "./components/layout/BottomNav";
import HomeScreen from "./components/home/HomeScreen";
import DealsScreen from "./components/deals/DealsScreen";
import QuestsScreen from "./components/quests/QuestsScreen";
import RewardsScreen from "./components/rewards/RewardsScreen";
import FundsScreen from "./components/funds/FundsScreen";
import type { ScreenId, Deal, Quest, Fund } from "./types";
import { fetchDeals, fetchQuests, fetchFunds, completeQuest, contributeToFund } from "./lib/api";
import { adaptDeal, adaptQuest, adaptFund } from "./lib/adapters";
import {
  deals as mockDeals,
  quests as mockQuests,
  funds as mockFunds,
  rewardActivity,
  walletSummary,
  rewardRingProgress,
} from "./data/mockData";

// Temporary until real login/user-select exists.
const CURRENT_USER_ID = "u1";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("home");
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [quests, setQuests] = useState<Quest[]>(mockQuests);
  const [funds, setFunds] = useState<Fund[]>(mockFunds);

  useEffect(() => {
    fetchDeals().then((data) => setDeals(data.map(adaptDeal))).catch(console.error);
    fetchQuests().then((data) => setQuests(data.map(adaptQuest))).catch(console.error);
    fetchFunds().then((data) => setFunds(data.map(adaptFund))).catch(console.error);
  }, []);

  const handleJoinQuest = async (questId: string) => {
    try {
      await completeQuest(questId, CURRENT_USER_ID);
      setQuests((prev) =>
        prev.map((q) =>
          q.id === questId
            ? { ...q, status: "completed", progress: 100, progressLabel: "Completed · reward claimed" }
            : q
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleContribute = async (fundId: string, amount: number, payerPhone: string) => {
    try {
      const result = await contributeToFund(fundId, CURRENT_USER_ID, amount, payerPhone);
      setFunds((prev) =>
        prev.map((f) =>
          f.id === fundId ? { ...f, raised: result.fund.currentAmount } : f
        )
      );
      window.alert("Contribution sent! Approve it on your MoMo app (sandbox: auto-approves).");
    } catch (err) {
      console.error(err);
      window.alert("Contribution failed — check the console for details.");
    }
  };

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
        {activeScreen === "quests" && (
          <QuestsScreen quests={quests} onJoinQuest={handleJoinQuest} />
        )}
        {activeScreen === "rewards" && (
          <RewardsScreen wallet={walletSummary} activity={rewardActivity} />
        )}
        {activeScreen === "funds" && (
          <FundsScreen funds={funds} onContribute={handleContribute} />
        )}
      </main>
      <BottomNav active={activeScreen} onNavigate={setActiveScreen} />
    </div>
  );
}