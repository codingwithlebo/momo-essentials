const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/pay', paymentController.initiatePayment);
router.get('/pay/:referenceId', paymentController.checkPaymentStatus);
router.post('/callback', paymentController.handleCallback);

module.exports = router;
