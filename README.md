# PlantPulse

Production lines and downtime incidents in one operational view. A newly built portfolio MVP, not an employer system or a claim of past commercial deployment. All sample people and work items are synthetic.

## What works
- Responsive React / JavaScript interface with a distinct plantpulse visual theme, summary metrics, search, status filtering, and linked groups.
- Full create, read, update, and delete for incidents and production lines through an Express REST API.
- One-click status transitions, editable numeric/date/text fields, validation feedback, and delete confirmation.
- PostgreSQL persistence via `pg`, parameterized SQL, an idempotent schema/seed setup, and an explicitly ephemeral in-memory demo mode.
- API and store tests using Node's built-in test runner. Semantic controls, labels, focus outlines, responsive layouts, and live error/status text.

## Run locally
Node 24 and npm are recommended. Run one application at a time (default ports 5173 and 3001).

```sh
npm ci
DEMO_MODE=true npm run dev
```
Open http://localhost:5173. Demo data resets whenever the API restarts. This mode does not require PostgreSQL. On PowerShell use `$env:DEMO_MODE="true"; npm run dev`.

### PostgreSQL
Create a dedicated local database first. Export `DATABASE_URL` using the format in `.env.example`, then:

```sh
npm run db:setup
npm run dev
```
Do not set `DEMO_MODE=true` when using PostgreSQL. Environment files are examples only; no implicit dotenv loader is installed. Export variables in the shell or run Node with `--env-file=.env` for individual server scripts. Setup inserts safe sample records only when their IDs do not exist; it does not clear data. The SQL schema stores API-validated fields in JSONB with entity/status indexes. Group references are enforced in the API, not database foreign keys.

## REST API
`GET /api/health` reports storage mode. Both `/api/incidents` and `/api/lines` support `GET` and `POST`; append `/:id` for `PUT` or `DELETE`. PUT replaces the editable fields of a record. Required fields and allowed statuses are defined in `domain.js`. Numeric fields must be between 0 and 10,000,000; dates must be ISO calendar dates. Linked groups cannot be deleted while referenced. Validation errors return 400; missing records return 404; linked-group deletion returns 409. Delete returns 204.

```sh
npm test
npm run build
npm run preview # frontend preview only; run API separately
npm start       # API only, requires storage environment configuration
```
The Vite dev server proxies `/api` to port 3001. The build emits static frontend files into `dist`; production hosting must serve these and route `/api` to the API separately. The API binds loopback by default and is intended for local demonstration.

## Scope and limitations
No authentication, authorization, audit ledger, notifications, real equipment integration, concurrent-update protection, or security certification is implemented. Any local caller can modify demo data. Status actions do not enforce a permissioned approval policy. This is not production-ready and should not contain real customer, employee, financial, or factory data. API link checks are not transactionally protected against concurrent requests. There is no pagination, multi-tenant isolation, or automated browser accessibility audit. PostgreSQL integration needs a running database; automated tests exercise memory mode and REST behavior. External Google Fonts are cosmetic; system fonts work offline.

## Project structure
`src/` contains the React app, styles, and API client; `server/` contains Express routes, validation, storage adapters, setup, and tests; `sql/` contains the PostgreSQL schema. `domain.js` defines the application vocabulary, editable fields, transitions, and synthetic seeds. A CI workflow is prepared locally but could not be uploaded through the connected GitHub tool; remote CI has not run. Run npm ci, npm test, and npm run build locally for verification.
