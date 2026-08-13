const express = require('express');
const router = express.Router();
const fundController = require('../controllers/fundController');

router.get('/', fundController.listFunds);
router.get('/:id', fundController.getFund);
router.post('/:id/contribute', fundController.contribute);

module.exports = router;
