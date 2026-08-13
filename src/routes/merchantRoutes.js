const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController');

router.get('/', merchantController.listMerchants);
router.post('/:merchantId/deals', merchantController.createDeal);
router.post('/:merchantId/quests', merchantController.createQuest);
router.get('/:merchantId/analytics', merchantController.getAnalytics);

module.exports = router;
