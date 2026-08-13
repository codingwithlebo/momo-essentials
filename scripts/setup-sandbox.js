// One-time helper: creates a MoMo Collections sandbox API user + API key.
// Run this ONCE after subscribing to Collections on momodeveloper.mtn.com
// and pasting your subscription key below (or via env var).
//
// Usage:
//   MOMO_SUBSCRIPTION_KEY=your_primary_key node scripts/setup-sandbox.js

const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const BASE_URL = 'https://sandbox.momodeveloper.mtn.com';
const subscriptionKey = process.env.MOMO_SUBSCRIPTION_KEY;

if (!subscriptionKey) {
  console.error('Set MOMO_SUBSCRIPTION_KEY first, e.g.:');
  console.error('  MOMO_SUBSCRIPTION_KEY=your_primary_key node scripts/setup-sandbox.js');
  process.exit(1);
}

async function main() {
  const apiUser = uuidv4();

  // Step 1: create the API user
  await axios.post(
    `${BASE_URL}/v1_0/apiuser`,
    { providerCallbackHost: 'webhook.site' }, // placeholder, fine for sandbox
    {
      headers: {
        'X-Reference-Id': apiUser,
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log('Created API User:', apiUser);

  // Step 2: create the API key for that user
  const keyRes = await axios.post(
    `${BASE_URL}/v1_0/apiuser/${apiUser}/apikey`,
    {},
    { headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey } }
  );
  console.log('Created API Key:', keyRes.data.apiKey);

  console.log('\nAdd these to your .env:');
  console.log(`MOMO_COLLECTION_SUBSCRIPTION_KEY=${subscriptionKey}`);
  console.log(`MOMO_COLLECTION_API_USER=${apiUser}`);
  console.log(`MOMO_COLLECTION_API_KEY=${keyRes.data.apiKey}`);
  console.log('\nSave the API Key now — sandbox does not let you retrieve it again.');
}

main().catch((err) => {
  console.error('Failed:', err.response?.data || err.message);
});
