# GX Earn — Website + PWA

Starter platform for sponsor-funded tasks, affiliate commissions and referral opportunities.

## Included
- Responsive website and installable PWA shell
- Node.js + Express backend and PostgreSQL database
- Registration/login with bcrypt password hashing
- HttpOnly, SameSite session cookie; JWT signing
- Rate limiting, Helmet security headers, parameterized SQL
- Funded task listing and task submission review
- Wallet ledger, referral codes, withdrawal requests
- Admin-only API endpoints to create tasks, approve submissions and review withdrawals

## Important limits
This is a starter, not a promise of income. It does NOT connect to MTN MoMo, Airtel Money, banks, survey providers, ad networks or affiliate networks. Withdrawal requests are stored for manual review; the operator must complete a payment separately before marking it paid. No task is available until an admin activates it as funded. Do not advertise or pay rewards unless a real sponsor has committed funds. Never charge users to unlock tasks or promise returns on deposits. Never collect PINs, passwords or OTPs.

Before public launch in Uganda, get appropriate legal/accounting advice and check applicable data-protection, consumer, tax, advertising and payment-provider requirements. Publish clear terms, privacy, complaints and payout rules. Establish age eligibility and support processes. A responsible adult/business operator should control payment accounts and review requests.

## Run locally
Requirements: Node.js 20+ and PostgreSQL.
1. Extract ZIP and create a PostgreSQL database (Neon is one hosted option).
2. Copy `.env.example` to `.env`.
3. Set `DATABASE_URL`, `JWT_SECRET` (random, 32+ characters), and `ADMIN_EMAILS` (your admin email).
4. Run `npm install`, then `npm start`.
5. Open `http://localhost:3000`.

## Deploy using Android phone (Render + Neon)
1. Create a GitHub repository and upload extracted project files. Do NOT upload `.env`.
2. Create a PostgreSQL database at Neon and copy its private connection string.
3. In Render choose New → Web Service and connect the GitHub repository.
4. Build command `npm install`; start command `npm start`.
5. In Render Environment add `DATABASE_URL`, `JWT_SECRET` (32+ random characters), `ADMIN_EMAILS` (admin email), `MIN_WITHDRAWAL_UGX` (`10000`), and `NODE_ENV` (`production`).
6. Deploy. Test `https://YOUR-SERVICE.onrender.com/api/health`; expected JSON includes `"ok":true`.
7. Open the service URL in Chrome Android → menu → Install app / Add to Home screen.

## Admin API (requires an email in ADMIN_EMAILS)
- `POST /api/admin/tasks` JSON: `{"title":"...","description":"...","sponsorName":"...","rewardUgx":5000,"isFunded":true}`. Only set funded true after verifying sponsor funds and terms.
- `GET /api/admin/submissions`
- `POST /api/admin/submissions/:id/approve`
- `GET /api/admin/withdrawals`
- `POST /api/admin/withdrawals/:id/paid` only after completing external payment
- `POST /api/admin/withdrawals/:id/reject`

These are API endpoints, not a finished admin dashboard. Build an audited admin interface before production. Automatic Mobile Money/bank payouts require official provider merchant accounts, server-side API integration, verified webhooks, idempotency and reconciliation. Keep provider secrets only in server environment variables.