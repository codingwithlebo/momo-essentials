const fundService = require('../services/fundService');

function listFunds(req, res) {
  res.json(fundService.getAllFunds());
}

function getFund(req, res) {
  const fund = fundService.getFundById(req.params.id);
  if (!fund) return res.status(404).json({ error: 'Fund not found' });
  res.json(fund);
}

async function contribute(req, res, next) {
  try {
    const { userId, amount, payerPhone } = req.body;
    if (!userId || !amount || !payerPhone) {
      return res.status(400).json({ error: 'userId, amount and payerPhone are required' });
    }

    const result = await fundService.contributeToFund({
      fundId: req.params.id,
      userId,
      amount,
      payerPhone,
    });

    res.status(202).json({
      message: 'Contribution initiated — payer must approve on their MoMo app',
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { listFunds, getFund, contribute };
