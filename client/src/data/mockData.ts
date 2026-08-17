import type { Deal, Fund, Quest, RewardActivity, WalletSummary } from "../types";

export const deals: Deal[] = [
  {
    id: "deal-1",
    merchant: "Shoprite Rosebank",
    description: "Selected groceries, pay with MoMo to redeem.",
    icon: "🛒",
    distance: "500m away",
    points: 10,
    tagLabel: "15% OFF",
    tagVariant: "default",
  },
  {
    id: "deal-2",
    merchant: "Campus Café",
    description: "Buy 2 meals, get R10 back as a MoMo reward.",
    icon: "☕",
    distance: "150m away",
    points: 15,
    tagLabel: "Ends today",
    tagVariant: "expiring",
  },
  {
    id: "deal-3",
    merchant: "MTN Data Store",
    description: "Buy 1GB data, earn double loyalty points.",
    icon: "📱",
    distance: "Online",
    points: 20,
    tagLabel: "Bundle",
    tagVariant: "default",
  },
  {
    id: "deal-4",
    merchant: "Rea Vaya Transport",
    description: "This offer is no longer available.",
    icon: "🚕",
    distance: "1.2km away",
    points: 0,
    tagLabel: "Expired",
    tagVariant: "expired",
  },
];

export const quests: Quest[] = [
  {
    id: "quest-1",
    title: "Campus Coffee Quest",
    description: "Visit café · pay with MoMo",
    icon: "🎓",
    rewardLabel: "+20 pts",
    progress: 33,
    progressLabel: "1 of 3 visits",
    status: "in-progress",
  },
  {
    id: "quest-2",
    title: "Weekend Essentials Quest",
    description: "3 qualifying purchases, any merchant",
    icon: "🧺",
    rewardLabel: "+R30",
    progress: 0,
    progressLabel: "Not started",
    status: "not-started",
  },
  {
    id: "quest-3",
    title: "First MoMo Payment",
    description: "Make your first in-app payment",
    icon: "🎁",
    rewardLabel: "+10 pts",
    progress: 100,
    progressLabel: "Completed · reward claimed",
    status: "completed",
  },
];

export const funds: Fund[] = [
  {
    id: "fund-1",
    title: "House Electricity Fund",
    icon: "⚡",
    daysLeft: 3,
    raised: 350,
    goal: 500,
    contributorInitials: ["T", "K", "S", "+1"],
  },
  {
    id: "fund-2",
    title: "School Supplies Fund",
    icon: "📚",
    daysLeft: 9,
    raised: 120,
    goal: 400,
    contributorInitials: ["M", "R"],
  },
];

export const rewardActivity: RewardActivity[] = [
  { id: "act-1", icon: "🎓", label: "Campus Quest", time: "Today, 12:04", points: 20 },
  { id: "act-2", icon: "🛒", label: "Grocery purchase", time: "Yesterday, 18:22", points: 10 },
  { id: "act-3", icon: "🏆", label: "Merchant challenge", time: "Mon, 09:15", points: 30 },
];

export const walletSummary: WalletSummary = {
  totalPoints: 240,
  redeemableValueLabel: "R20 available to redeem",
};

export const rewardRingProgress = {
  percent: 68,
  title: "R20 reward unlocking",
  subtitle: "2 more MoMo purchases to go",
};
