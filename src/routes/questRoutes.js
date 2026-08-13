const express = require('express');
const router = express.Router();
const questController = require('../controllers/questController');

router.get('/', questController.listQuests);
router.post('/:id/complete', questController.completeQuest);

module.exports = router;
