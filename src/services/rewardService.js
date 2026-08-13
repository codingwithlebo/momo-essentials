const { db, findById } = require('../data/store');

function getRewardsForUser(userId) {
  const user = findById('users', userId);
  if (!user) throw new Error('User not found');

  const activity = db.rewardTransactions
    .filter((tx) => tx.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return { points: user.points, activity };
}

module.exports = { getRewardsForUser };
