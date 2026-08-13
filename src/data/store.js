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
    { id: 'm3', name: 'PEP Braamfontein', location: 'Braamfontein' },
    { id: 'm4', name: 'MTN Store Sandton', location: 'Sandton City' },
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
    {
      id: 'd2',
      merchantId: 'm2',
      title: 'R20 off orders over R200',
      distanceMeters: 800,
      validFrom: '2026-08-13',
      validTo: '2026-08-27',
      rewardPoints: 15,
    },
    {
      id: 'd3',
      merchantId: 'm3',
      title: 'Buy 1 get 1 on stationery',
      distanceMeters: 1200,
      validFrom: '2026-08-10',
      validTo: '2026-08-24',
      rewardPoints: 5,
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
    {
      id: 'q2',
      merchantId: 'm4',
      title: 'Weekend Data Quest',
      description: 'Buy data via MoMo this weekend',
      rewardPoints: 15,
      rewardCash: 5,
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
    {
      id: 'f2',
      title: 'Res Data Fund',
      targetAmount: 300,
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
