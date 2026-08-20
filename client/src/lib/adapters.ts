import type { Deal, Quest, Fund } from "../types";
import type { BackendDeal, BackendQuest, BackendFund } from "./api";

export function adaptDeal(d: BackendDeal): Deal {
  const isExpiringSoon =
    new Date(d.validTo).getTime() - Date.now() < 1000 * 60 * 60 * 24;

  return {
    id: d.id,
    merchant: d.merchant?.name ?? "Merchant",
    description: d.title,
    icon: "🛒",
    distance: `${d.distanceMeters}m away`,
    points: d.rewardPoints,
    tagLabel: isExpiringSoon ? "Ends today" : "Deal",
    tagVariant: isExpiringSoon ? "expiring" : "default",
  };
}

export function adaptQuest(q: BackendQuest): Quest {
  return {
    id: q.id,
    title: q.title,
    description: q.description,
    icon: "🎯",
    rewardLabel: q.rewardCash ? `+R${q.rewardCash}` : `+${q.rewardPoints} pts`,
    progress: 0,
    progressLabel: "Not started",
    status: "not-started",
  };
}

export function adaptFund(f: BackendFund): Fund {
  return {
    id: f.id,
    title: f.title,
    icon: "💰",
    daysLeft: 7,
    raised: f.currentAmount,
    goal: f.targetAmount,
    contributorInitials: f.contributors.map((id) => id.slice(0, 1).toUpperCase()),
  };
}