// In-memory data store for the hackathon MVP.
// Swap this out for a real DB (Postgres/Supabase) later — every
// service below only talks to this file, so that's a small change.

const { v4: uuidv4 } = require('uuid');

const db = {
  users: [
    { id: 'u1', name: 'Malebo', phone: '27821234567', points: 0 },
  ],
  merchants: [
    { id: 'm1', name: 'Campus Café', location: 'Rosebank Campus' },
    { id: 'm2', name: 'Shoprite Rosebank', location: 'Rosebank' },
  ],
  deals: [
    {
      id: 'd1',
      merchantId: 'm1',
      title: '15% off selected groceries',
      distanceMeters: 500,
      validFrom: '2026-08-13',
      validTo: '2026-08-20',
      rewardPoints: 10,
    },
  ],
  quests: [
    {
      id: 'q1',
      merchantId: 'm1',
      title: 'Campus Coffee Quest',
      description: 'Buy lunch using MoMo and earn points',
      rewardPoints: 20,
      rewardCash: 10,
    },
  ],
  questCompletions: [], // { id, userId, questId, completedAt }
  rewardTransactions: [], // { id, userId, points, reason, createdAt }
  funds: [
    {
      id: 'f1',
      title: 'House Electricity Fund',
      targetAmount: 500,
      currentAmount: 0,
      contributors: [],
    },
  ],
  contributions: [], // { id, fundId, userId, amount, momoReferenceId, createdAt }
  paymentTransactions: [], // { id, userId, referenceId, amount, status, purpose }
};

function findById(collection, id) {
  return db[collection].find((item) => item.id === id);
}

function insert(collection, item) {
  const record = { id: uuidv4(), ...item };
  db[collection].push(record);
  return record;
}

module.exports = { db, findById, insert };
