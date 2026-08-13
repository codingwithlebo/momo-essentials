const { db, findById, insert } = require('../data/store');

function createUser({ name, phone }) {
  if (!name || !phone) throw new Error('name and phone are required');

  const existing = db.users.find((u) => u.phone === phone);
  if (existing) return existing; // idempotent: same phone returns existing user

  return insert('users', { name, phone, points: 0 });
}

function getUser(userId) {
  return findById('users', userId);
}

// Pulls together everything money-related for a user: direct MoMo
// payments and fund contributions, newest first.
function getTransactionHistory(userId) {
  const user = findById('users', userId);
  if (!user) throw new Error('User not found');

  const payments = db.paymentTransactions
    .filter((t) => t.userId === userId)
    .map((t) => ({ type: 'payment', ...t }));

  const contributions = db.contributions
    .filter((c) => c.userId === userId)
    .map((c) => ({
      type: 'contribution',
      id: c.id,
      fundId: c.fundId,
      amount: c.amount,
      momoReferenceId: c.momoReferenceId,
      createdAt: c.createdAt,
    }));

  return [...payments, ...contributions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

module.exports = { createUser, getUser, getTransactionHistory };
