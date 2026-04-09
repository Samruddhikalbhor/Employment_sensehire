# F12 — Employer Dashboard

## What is this feature?
A recruiter-facing view listing all candidates who applied to a job, sorted by compatibility score. Each card shows score, profile summary, and a one-line gap summary from F09.

---

## Employer login credentials
- Username: `employer.admin`
- Password: `employer123`
- Role must be `"employer"` — reject candidate-role logins

---

## What you need to build

### Employer login at `/employer/login`
- Same login endpoint as F11 (`POST /api/login`)
- Redirect to dashboard only if `role === "employer"`
- Show "Access denied" for candidate accounts

### Dashboard at `/employer/dashboard`

#### Job selector
- Dropdown of all jobs from `jobs.json`
- Selecting a job loads its applicants

#### Applicant list
Show only candidates whose `appliedJobs` array includes the selected job ID.

Each card shows:
- Name, preferred role, location
- Compatibility score % (calculated via cosineSimilarity)
- Tier badge (Excellent / Good / Possible / Unlikely)
- One-line gap summary — take the worst gap from F09 logic and show as one sentence. If no gaps: "No significant gaps identified."
- "View Full Profile" button → `/match/:jobId?candidateId=xxx`

#### Sort toggle
- Default: by compatibility score descending
- Toggle: by candidate name A–Z

---

## Expected output
- Employer login at `/employer/login`
- Dashboard at `/employer/dashboard`
- Job selector dropdown
- Applicant cards: score, tier badge, one-line gap
- Sort toggle working

---

---

## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f12/f12.jsx` | Employer dashboard UI |
| `frontend/src/features/f12/f12.css` | Styles |
| `backend/routes/f12-routes.js` | `GET /api/employer/applicants/:jobId` |
| `backend/controllers/f12.js` | Filter candidates + compute scores + gap summary |
| `backend/data/candidates.json` | Read-only |
| `backend/data/ability-vectors.json` | Read-only |

---

