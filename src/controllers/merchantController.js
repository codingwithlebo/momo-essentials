const merchantService = require('../services/merchantService');
const { db } = require('../data/store');

function listMerchants(req, res) {
  res.json(db.merchants);
}

function createDeal(req, res, next) {
  try {
    const { merchantId } = req.params;
    const { title, distanceMeters, validFrom, validTo, rewardPoints } = req.body;

    if (!title) return res.status(400).json({ error: 'title is required' });

    const deal = merchantService.createDeal({
      merchantId,
      title,
      distanceMeters,
      validFrom,
      validTo,
      rewardPoints: rewardPoints || 0,
    });

    res.status(201).json(deal);
  } catch (err) {
    next(err);
  }
}

function createQuest(req, res, next) {
  try {
    const { merchantId } = req.params;
    const { title, description, rewardPoints, rewardCash } = req.body;

    if (!title) return res.status(400).json({ error: 'title is required' });

    const quest = merchantService.createQuest({
      merchantId,
      title,
      description,
      rewardPoints: rewardPoints || 0,
      rewardCash: rewardCash || 0,
    });

    res.status(201).json(quest);
  } catch (err) {
    next(err);
  }
}

function getAnalytics(req, res, next) {
  try {
    const analytics = merchantService.getCampaignAnalytics(req.params.merchantId);
    res.json(analytics);
  } catch (err) {
    next(err);
  }
}

module.exports = { listMerchants, createDeal, createQuest, getAnalytics };
