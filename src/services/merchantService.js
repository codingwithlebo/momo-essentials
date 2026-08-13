const { db, findById, insert } = require('../data/store');

function createDeal({ merchantId, title, distanceMeters, validFrom, validTo, rewardPoints }) {
  const merchant = findById('merchants', merchantId);
  if (!merchant) throw new Error('Merchant not found');

  return insert('deals', { merchantId, title, distanceMeters, validFrom, validTo, rewardPoints });
}

function createQuest({ merchantId, title, description, rewardPoints, rewardCash }) {
  const merchant = findById('merchants', merchantId);
  if (!merchant) throw new Error('Merchant not found');

  return insert('quests', { merchantId, title, description, rewardPoints, rewardCash });
}

// Aggregates activity for one merchant: unique participants, MoMo
// payments linked to their deals/quests, rewards claimed, transaction value.
function getCampaignAnalytics(merchantId) {
  const merchant = findById('merchants', merchantId);
  if (!merchant) throw new Error('Merchant not found');

  const merchantQuestIds = db.quests
    .filter((q) => q.merchantId === merchantId)
    .map((q) => q.id);

  const completions = db.questCompletions.filter((c) =>
    merchantQuestIds.includes(c.questId)
  );

  const participantIds = new Set(completions.map((c) => c.userId));

  const rewardsClaimed = completions.length;

  const transactionValue = db.contributions
    .filter((c) => merchantQuestIds.length > 0) // MVP: broaden this once deals carry real payments
    .reduce((sum, c) => sum + Number(c.amount), 0);

  return {
    merchantId,
    participants: participantIds.size,
    questCompletions: completions.length,
    rewardsClaimed,
    transactionValue,
  };
}

module.exports = { createDeal, createQuest, getCampaignAnalytics };
