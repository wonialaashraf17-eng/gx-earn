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
- Admin dashboard at `/admin.html` for user management, task management, submission approvals/rejections and withdrawal review
- Admin-only API endpoints protected by BOTH a database `admin_enabled` flag and the `ADMIN_EMAILS` allow-list

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

## Admin dashboard setup
1. Deploy the updated project and let the app run once so database migrations add `admin_enabled` to the users table.
2. Register your own account on the public GX Earn website.
3. In your Neon dashboard, open SQL Editor and run this statement with your own registered email (replace the example):
   `UPDATE users SET admin_enabled = TRUE WHERE email = 'you@example.com';`
4. In Render Environment, set `ADMIN_EMAILS` to exactly the same email (or comma-separated emails for multiple trusted admins), then redeploy.
5. Visit `https://YOUR-SERVICE.onrender.com/admin.html` and sign in with that account.
6. Keep this email inbox and account password secure. Never share admin credentials. Do not enable admin access for an account you do not control.

The dashboard supports searching users, suspending/restoring accounts, creating and activating/deactivating tasks, marking verified task funding, approving/rejecting submissions, and reviewing/marking/rejecting withdrawal requests. Admin access requires both the database flag and allow-list membership. A regular account cannot grant itself admin privileges.

Mark a withdrawal paid only after sending the funds through the official payment provider and confirming success. This starter does not automate transfers. For a production payment integration, add provider authentication, signed webhook verification, idempotency and reconciliation. Before public launch, arrange security review, backups, audit logging, privacy/terms and compliance appropriate to Uganda. Automatic Mobile Money/bank payouts require official provider merchant accounts, server-side API integration, verified webhooks, idempotency and reconciliation. Keep provider secrets only in server environment variables.