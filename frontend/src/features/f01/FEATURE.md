# F01 — Onboarding Form

## What is this feature?
The entry point for every new candidate. A clean, multi-step form collecting full name, professional skills (as removable tag chips), years of experience, and preferred job roles — with animated step transitions and real-time field validation.

---

## What you need to build

### Step 1 — Personal Info
- Full name (required, min 2 chars)
- Email address (required, valid format)

### Step 2 — Professional Profile
- Skills input: type a skill → press Enter or comma → adds as a tag chip with × to remove
- At least 1 skill required
- Years of experience (number, 0–50)

### Step 3 — Job Preferences
- Preferred job roles (same tag chip input)
- At least 1 role required

### Step indicator
- Show "Step 1 of 3" with visual dots or progress bar at top
- Each step validates before allowing Next
- Inline error messages — no alert() calls

### Submission
- POST to `/api/onboarding`
- Backend appends new entry to `backend/data/candidates.json`
- Show success screen after submit

---

## Expected output
- Multi-step form rendered at `/onboarding`
- Smooth CSS transition between steps (no page reload)
- Real-time validation — errors appear as you type
- Data saved to `candidates.json` on success

---

## What NOT to do
- Do NOT use react-hook-form, formik, yup or any form library
- Do NOT reload the page between steps
- Do NOT use `alert()` for errors — inline messages only
- Do NOT use a plain text input for skills — tag chips are required

---

## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f01/f01.jsx` | Build the entire multi-step form UI here |
| `frontend/src/features/f01/f01.css` | All styles for this feature go here |
| `backend/routes/f01-routes.js` | Add `POST /api/onboarding` route |
| `backend/controllers/f01.js` | Read candidates.json → append → write back |
| `backend/data/candidates.json` | New candidate entries are appended here |

---

## Data shape to append to candidates.json

```json
{
  "id": "c009",
  "userId": null,
  "fullName": "New Candidate Name",
  "skills": ["React", "Node.js"],
  "yearsExperience": 3,
  "preferredRoles": ["Frontend Developer"],
  "disabilityCategory": null,
  "disabilitySubType": null,
  "abilityVectorId": null,
  "profileComplete": 30,
  "bio": "",
  "location": "",
  "remote": true,
  "appliedJobs": []
}
```

Generate `id` as `"c"` + (existing array length + 1) zero-padded to 3 digits.

---

