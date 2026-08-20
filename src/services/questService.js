const { db, findById, insert } = require('../data/store');

function getAllQuests() {
  return db.quests.map((quest) => ({
    ...quest,
    merchant: findById('merchants', quest.merchantId),
  }));
}

// Completing a quest awards points and (optionally) triggers a MoMo
// reward payout later. Guards against the same user completing the
// same quest more than once.
function completeQuest({ userId, questId }) {
  const quest = findById('quests', questId);
  if (!quest) throw new Error('Quest not found');

  const user = findById('users', userId);
  if (!user) throw new Error('User not found');

  const alreadyCompleted = db.questCompletions.some(
    (c) => c.userId === userId && c.questId === questId
  );
  if (alreadyCompleted) {
    const err = new Error('Quest already completed by this user');
    err.status = 409;
    throw err;
  }

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
