# F11 — Candidate Dashboard

## What is this feature?
A personal dashboard for logged-in candidates. Shows profile completeness, ranked job matches, and a "Best Fit" hero card. Login uses username/password lookup against `users.json` — no real auth needed.

---

## Test credentials (from users.json)

| Username | Password | Candidate name |
|----------|----------|---------------|
| priya.mehta | priya123 | Priya Mehta |
| arjun.sharma | arjun123 | Arjun Sharma |
| mei.lin | mei123 | Mei Lin |
| tomas.rivera | tomas123 | Tomás Rivera |

---

## What you need to build

### Login screen at `/candidate/login`
- Username + password fields
- `POST /api/login` → backend searches `users.json`
- Match found + `role === "candidate"` → return candidate data from `candidates.json`
- No match → show "Invalid credentials" inline (not an alert)
- Store logged-in candidate in React state or Context

### Dashboard at `/candidate/dashboard`
Redirect here after login. Redirect back to login if not logged in.

#### 1. Profile completeness meter
- Horizontal progress bar using `candidate.profileComplete` (0–100)
- Green if ≥ 80%, amber if 50–79%, red if < 50%
- Label: "Your profile is X% complete"

#### 2. Best Fit hero card
- Top job by compatibility score for this candidate
- Shows: title, company, score ring (reuse F08), "View Full Match" button

#### 3. Ranked job list
- All jobs from `jobs.json` with their compatibility scores
- Calculate: `cosineSimilarity(candidateVector, jobVector)` using F07's function
- Sorted descending by score
- Each row: title, company, score %, tier badge, "View Details" button

### Match detail at `/match/:jobId`
Clicking "View Details" renders F08 score ring + F09 gap cards for that job.

---

## Expected output
- Login screen with JSON lookup validation
- Dashboard redirects if not logged in
- Completeness bar with correct colour
- Best Fit hero card (top scoring job)
- Job list sorted by score descending
- Match detail view on click

---

## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f11/f11.jsx` | Login screen + full dashboard UI |
| `frontend/src/features/f11/f11.css` | Styles |
| `backend/routes/f11-routes.js` | `POST /api/login` and `GET /api/candidate/:id` |
| `backend/controllers/f11.js` | Auth lookup + candidate data retrieval |
| `backend/data/users.json` | Read-only — credentials already here |
| `backend/data/candidates.json` | Read-only for this feature |

---
