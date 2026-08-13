const express = require('express');
const router = express.Router();

const paymentRoutes = require('./paymentRoutes');
const dealRoutes = require('./dealRoutes');
const questRoutes = require('./questRoutes');
const rewardRoutes = require('./rewardRoutes');
const fundRoutes = require('./fundRoutes');
const merchantRoutes = require('./merchantRoutes');
const userRoutes = require('./userRoutes');

router.get('/health', (req, res) => res.json({ status: 'ok' }));

router.use('/payments', paymentRoutes);
router.use('/deals', dealRoutes);
router.use('/quests', questRoutes);
router.use('/rewards', rewardRoutes);
router.use('/funds', fundRoutes);
router.use('/merchants', merchantRoutes);
router.use('/users', userRoutes);

module.exports = router;
