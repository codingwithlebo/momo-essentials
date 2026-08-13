const userService = require('../services/userService');

function createUser(req, res, next) {
  try {
    const { name, phone } = req.body;
    const user = userService.createUser({ name, phone });
    res.status(201).json(user);
  } catch (err) {
    if (err.message === 'name and phone are required') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

function getUser(req, res, next) {
  try {
    const user = userService.getUser(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

function getTransactions(req, res, next) {
  try {
    const transactions = userService.getTransactionHistory(req.params.id);
    res.json(transactions);
  } catch (err) {
    next(err);
  }
}

module.exports = { createUser, getUser, getTransactions };
