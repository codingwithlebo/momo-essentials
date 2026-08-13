const dealService = require('../services/dealService');

function listDeals(req, res) {
  res.json(dealService.getNearbyDeals());
}

function getDeal(req, res) {
  const deal = dealService.getDealById(req.params.id);
  if (!deal) return res.status(404).json({ error: 'Deal not found' });
  res.json(deal);
}

module.exports = { listDeals, getDeal };
