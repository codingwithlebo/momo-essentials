export type ScreenId = "home" | "deals" | "quests" | "rewards" | "funds";

export interface Deal {
  id: string;
  merchant: string;
  description: string;
  icon: string;
  distance: string;
  points: number;
  tagLabel: string;
  tagVariant: "default" | "expiring" | "expired";
}

export type QuestStatus = "not-started" | "in-progress" | "completed";

export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  rewardLabel: string;
  progress: number; // 0-100
  progressLabel: string;
  status: QuestStatus;
}

export interface Fund {
  id: string;
  title: string;
  icon: string;
  daysLeft: number;
  raised: number;
  goal: number;
  contributorInitials: string[];
}

export interface RewardActivity {
  id: string;
  icon: string;
  label: string;
  time: string;
  points: number;
}

export interface WalletSummary {
  totalPoints: number;
  redeemableValueLabel: string;
}
