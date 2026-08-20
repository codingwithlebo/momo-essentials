const API_BASE = "http://localhost:5000/api";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

export interface BackendDeal {
  id: string;
  merchantId: string;
  title: string;
  distanceMeters: number;
  validFrom: string;
  validTo: string;
  rewardPoints: number;
  merchant: { id: string; name: string; location: string };
}

export interface BackendQuest {
  id: string;
  merchantId: string;
  title: string;
  description: string;
  rewardPoints: number;
  rewardCash: number;
  merchant: { id: string; name: string; location: string };
}

export interface BackendFund {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  contributors: string[];
}

export const fetchDeals = () => get<BackendDeal[]>("/deals");
export const fetchQuests = () => get<BackendQuest[]>("/quests");
export const fetchFunds = () => get<BackendFund[]>("/funds");
export const fetchRewards = (userId: string) =>
  get<{ points: number; activity: any[] }>(`/rewards/${userId}`);

export const completeQuest = (questId: string, userId: string) =>
  fetch(`${API_BASE}/quests/${questId}/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  }).then((res) => {
    if (!res.ok) throw new Error(`Complete quest failed: ${res.status}`);
    return res.json();
  });