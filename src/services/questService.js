const { db, findById, insert } = require('../data/store');

function getAllQuests() {
  return db.quests.map((quest) => ({
    ...quest,
    merchant: findById('merchants', quest.merchantId),
  }));
}

// Completing a quest awards points and (optionally) triggers a MoMo
// reward payout later. For now it just records the completion + points.
function completeQuest({ userId, questId }) {
  const quest = findById('quests', questId);
  if (!quest) throw new Error('Quest not found');

  const user = findById('users', userId);
  if (!user) throw new Error('User not found');

  const completion = insert('questCompletions', {
    userId,
    questId,
    completedAt: new Date().toISOString(),
  });

  user.points += quest.rewardPoints;

  insert('rewardTransactions', {
    userId,
    points: quest.rewardPoints,
    reason: `Completed quest: ${quest.title}`,
    createdAt: new Date().toISOString(),
  });

  return { completion, pointsAwarded: quest.rewardPoints, totalPoints: user.points };
}

module.exports = { getAllQuests, completeQuest };
