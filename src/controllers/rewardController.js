const rewardService = require('../services/rewardService');

function getRewards(req, res, next) {
  try {
    const rewards = rewardService.getRewardsForUser(req.params.userId);
    res.json(rewards);
  } catch (err) {
    next(err);
  }
}

module.exports = { getRewards };
