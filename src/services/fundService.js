const { db, findById, insert } = require('../data/store');
const collectionService = require('./collectionService');

function getAllFunds() {
  return db.funds;
}

function getFundById(fundId) {
  return findById('funds', fundId);
}

// Contributing triggers a real MoMo request-to-pay, then records the
// contribution against the fund once it's initiated. Status can be
// confirmed later via the /payments/pay/:referenceId endpoint.
async function contributeToFund({ fundId, userId, amount, payerPhone }) {
  const fund = findById('funds', fundId);
  if (!fund) throw new Error('Fund not found');

  const { referenceId } = await collectionService.requestToPay({
    amount,
    currency: 'EUR', // sandbox currency; switch to real currency in production
    payerPhone,
    payerMessage: `Contribution to ${fund.title}`,
    payeeNote: 'MoMo Local fund contribution',
  });

  const contribution = insert('contributions', {
    fundId,
    userId,
    amount,
    momoReferenceId: referenceId,
    createdAt: new Date().toISOString(),
  });

  fund.currentAmount += Number(amount);
  if (!fund.contributors.includes(userId)) fund.contributors.push(userId);

  return { contribution, fund };
}

module.exports = { getAllFunds, getFundById, contributeToFund };
