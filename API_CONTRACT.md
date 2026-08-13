# MoMo Local — API Contract

Base URL (local): `http://localhost:5000/api`

All responses are JSON. Timestamps are ISO 8601 strings.

---

## Health

`GET /health`
→ `{ "status": "ok" }`

---

## Deals

`GET /deals`
→ Array of deals, each with merchant info attached:
```json
[{
  "id": "d1",
  "merchantId": "m1",
  "title": "15% off selected groceries",
  "distanceMeters": 500,
  "validFrom": "2026-08-13",
  "validTo": "2026-08-20",
  "rewardPoints": 10,
  "merchant": { "id": "m1", "name": "Campus Café", "location": "Rosebank Campus" }
}]
```

`GET /deals/:id` → single deal object (same shape), or `404` if not found.

---

## Quests

`GET /quests` → array of quests, same `merchant` attachment as deals.

`POST /quests/:id/complete`
Body: `{ "userId": "u1" }`
→ `202`:
```json
{
  "completion": { "id": "...", "userId": "u1", "questId": "q1", "completedAt": "..." },
  "pointsAwarded": 20,
  "totalPoints": 40
}
```

---

## Rewards

`GET /rewards/:userId`
→
```json
{
  "points": 40,
  "activity": [
    { "id": "...", "userId": "u1", "points": 20, "reason": "Completed quest: ...", "createdAt": "..." }
  ]
}
```

---

## Funds (Essentials / Community Funds)

`GET /funds` → array of funds:
```json
[{ "id": "f1", "title": "House Electricity Fund", "targetAmount": 500, "currentAmount": 0, "contributors": [] }]
```

`GET /funds/:id` → single fund, or `404`.

`POST /funds/:id/contribute`
Body: `{ "userId": "u1", "amount": 50, "payerPhone": "27821234567" }`
→ `202`, triggers a **real MoMo request-to-pay** (payer approves on their MoMo app):
```json
{
  "message": "Contribution initiated — payer must approve on their MoMo app",
  "contribution": { "id": "...", "fundId": "f1", "userId": "u1", "amount": 50, "momoReferenceId": "...", "createdAt": "..." },
  "fund": { "id": "f1", "currentAmount": 50, ... }
}
```

---

## Payments (direct)

`POST /payments/pay`
Body: `{ "amount": 100, "currency": "EUR", "payerPhone": "27821234567", "payerMessage": "...", "payeeNote": "..." }`
→ `202`: `{ "message": "...", "referenceId": "..." }`

`GET /payments/pay/:referenceId` → MoMo transaction status object.

---

## Notes for frontend

- No auth yet — `userId` is passed directly in request bodies for the MVP.
- All MoMo-touching endpoints (`/payments/pay`, `/funds/:id/contribute`) require real sandbox credentials in the backend's `.env` to actually complete — until then they'll fail at the MTN API call step.
- Data is currently in-memory (resets on server restart) — fine for demo/dev, will move to a real DB before final submission.
