const express = require('express');
const { db, findById } = require('../data/store');
const { getRecommendations } = require('../services/aiService');

const router = express.Router();

router.post('/recommend', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required',
      });
    }

    const user = findById('users', userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const today = new Date().toISOString().split('T')[0];

    // Only include active deals.
    const activeDeals = db.deals
      .filter((deal) => deal.validTo >= today)
      .map((deal) => ({
        ...deal,
        merchant: findById('merchants', deal.merchantId),
      }));

    // Find quests this user has already completed.
    const completedQuestIds = db.questCompletions
      .filter((completion) => completion.userId === userId)
      .map((completion) => completion.questId);

    // Don't recommend quests the user already completed.
    const availableQuests = db.quests
      .filter((quest) => !completedQuestIds.includes(quest.id))
      .map((quest) => ({
        ...quest,
        merchant: findById('merchants', quest.merchantId),
      }));

    const activity = db.rewardTransactions
      .filter((transaction) => transaction.userId === userId)
      .slice(-10);

    const funds = db.funds.map((fund) => ({
      id: fund.id,
      title: fund.title,
      targetAmount: fund.targetAmount,
      currentAmount: fund.currentAmount,
      progressPercent:
        fund.targetAmount > 0
          ? Math.round((fund.currentAmount / fund.targetAmount) * 100)
          : 0,
    }));

    const context = {
      user: {
        id: user.id,
        name: user.name,
        points: user.points,
      },
      activity,
      deals: activeDeals,
      quests: availableQuests,
      funds,
    };

    const recommendations = await getRecommendations(context);

    return res.json({
  success: true,
  userId,
  ...recommendations,
});
  } catch (error) {
    console.error('Recommendation error:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate recommendations',
    });
  }
});

module.exports = router;