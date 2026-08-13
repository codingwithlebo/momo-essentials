const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');

router.get('/:userId', rewardController.getRewards);

module.exports = router;
