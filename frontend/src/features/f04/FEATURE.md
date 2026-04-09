# F04 — Job Posting Creator

## What is this feature?
A rich employer form to post a job. Beyond standard fields (title, description, skills), it collects physical and cognitive task requirements via sliders — these are what get converted into the Job Vector for matching.

---

## What you need to build

### Section 1 — Basic Info
- Job title (required)
- Company name (required)
- Job description (textarea, min 100 chars)
- Experience level dropdown: Junior / Mid / Senior
- Location (text)
- Remote checkbox

### Section 2 — Required Skills
- Tag chip input (same pattern as F01) — min 2 skills

### Section 3 — Task Requirements (CRITICAL)
Five sliders (1–5) representing job demands:

| Slider | Label |
|--------|-------|
| `visualMonitoring` | Visual Monitoring Required |
| `phoneCalls` | Phone / Audio Communication |
| `fineMotorInput` | Keyboard / Computer Input |
| `sustainedFocus` | Sustained Focus Required |
| `verbalCommunication` | Verbal Communication |

### Submission
- POST to `/api/jobs`
- Backend appends to `jobs.json`
- Show success message

---

## Expected output
- Form at `/jobs/new`
- 3 clear sections with headers
- Task requirement sliders with descriptions (same pattern as F03)
- Data saved to `jobs.json`

---
## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f04/f04.jsx` | Build the full employer form |
| `frontend/src/features/f04/f04.css` | All styles |
| `backend/routes/f04-routes.js` | `POST /api/jobs` |
| `backend/controllers/f04.js` | Append to jobs.json |
| `backend/data/jobs.json` | New jobs appended here |

---

## Data shape to append to jobs.json

```json
{
  "id": "j007",
  "title": "string",
  "company": "string",
  "description": "string",
  "requiredSkills": ["string"],
  "experienceLevel": "Mid",
  "location": "string",
  "remote": true,
  "taskRequirements": {
    "visualMonitoring": 3,
    "phoneCalls": 1,
    "fineMotorInput": 4,
    "sustainedFocus": 5,
    "verbalCommunication": 2
  },
  "jobVectorId": null,
  "postedDate": "2025-01-20T10:00:00Z",
  "accessibilityScore": null
}
```

---