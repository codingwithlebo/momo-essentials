const { db, findById } = require('../data/store');

function getNearbyDeals() {
  // MVP: return all deals with merchant info attached.
  // Later: filter by lat/lng radius using the user's location.
  return db.deals.map((deal) => ({
    ...deal,
    merchant: findById('merchants', deal.merchantId),
  }));
}

function getDealById(dealId) {
  const deal = findById('deals', dealId);
  if (!deal) return null;
  return { ...deal, merchant: findById('merchants', deal.merchantId) };
}

module.exports = { getNearbyDeals, getDealById };
