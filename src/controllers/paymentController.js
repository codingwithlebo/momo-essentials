const collectionService = require('../services/collectionService');
const { insert, db } = require('../data/store');
const { isValidAmount, isValidPhone } = require('../utils/validation');

async function initiatePayment(req, res, next) {
  try {
    const { amount, currency, payerPhone, payerMessage, payeeNote, userId } = req.body;

    if (!amount || !payerPhone) {
      return res.status(400).json({ error: 'amount and payerPhone are required' });
    }
    if (!isValidAmount(amount)) {
      return res.status(400).json({ error: 'amount must be a positive number' });
    }
    if (!isValidPhone(payerPhone)) {
      return res.status(400).json({ error: 'payerPhone must be a valid MSISDN (digits only, 8-15 chars)' });
    }

    const result = await collectionService.requestToPay({
      amount,
      currency: currency || 'EUR', // sandbox uses EUR by default
      payerPhone,
      payerMessage: payerMessage || 'Payment via MoMo Mini App',
      payeeNote: payeeNote || 'Thank you',
    });

    if (userId) {
      insert('paymentTransactions', {
        userId,
        referenceId: result.referenceId,
        amount,
        status: 'PENDING',
        purpose: payerMessage || 'Payment via MoMo Mini App',
        createdAt: new Date().toISOString(),
      });
    }

    res.status(202).json({
      message: 'Payment request sent to payer for approval',
      referenceId: result.referenceId,
    });
  } catch (err) {
    next(err);
  }
}

async function checkPaymentStatus(req, res, next) {
  try {
    const { referenceId } = req.params;
    const status = await collectionService.getTransactionStatus(referenceId);
    res.status(200).json(status);
  } catch (err) {
    next(err);
  }
}

// MoMo calls this automatically when a request-to-pay resolves
// (set MOMO_CALLBACK_HOST to a URL that routes here, e.g. via ngrok in dev).
// Updates the locally-stored transaction status so the app doesn't need
// to keep polling checkPaymentStatus.
function handleCallback(req, res) {
  const { referenceId, status } = req.body;

  if (!referenceId) {
    return res.status(400).json({ error: 'referenceId is required in callback payload' });
  }

  const transaction = db.paymentTransactions.find((t) => t.referenceId === referenceId);
  if (transaction) {
    transaction.status = status || 'UNKNOWN';
  }

  // Also reflect status onto any fund contribution with this reference.
  const contribution = db.contributions.find((c) => c.momoReferenceId === referenceId);
  if (contribution) {
    contribution.status = status || 'UNKNOWN';
  }

  res.status(200).json({ received: true });
}

module.exports = { initiatePayment, checkPaymentStatus, handleCallback };
