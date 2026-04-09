# F13 — Search & Accessibility Filter

## What is this feature?
Live search and filter system for the jobs listing page. All filtering happens in-memory — no backend call on every keystroke.

---

## What you need to build

### Search bar at `/jobs`
- Searches across: title, company, description, required skills
- Case-insensitive, updates on every keystroke
- Result count: "Showing 4 of 6 jobs"

### Accessibility Score slider
- Range slider: "Minimum Compatibility: 75%"
- Filters out jobs whose score (for logged-in candidate) is below threshold
- If no candidate logged in: show "Log in to use this filter"

### Filter chips (instant toggle, no reload)

| Chip | Filter logic |
|------|-------------|
| Remote Only | `job.remote === true` |
| On-site | `job.remote === false` |
| Visual Friendly | `job.taskRequirements.visualMonitoring <= 2` |
| Hearing Friendly | `job.taskRequirements.phoneCalls <= 1` |
| Motor Friendly | `job.taskRequirements.fineMotorInput <= 3` |
| No Accommodation Needed | compatibility score ≥ 90% |

- Multiple chips active at once
- Click to toggle on/off
- Apply instantly

### Clear all
- "Clear all filters" button resets everything

### Empty state
- "No jobs match your filters. Try adjusting the filters above."

---

## Expected output
- Search bar with live results
- Score range slider
- Toggleable filter chips (multiple at once)
- Result count updates live
- All in-memory — zero fetch on filter change
- Empty state when no results

---


## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f13/f13.jsx` | Search bar + chips + filtered results |
| `frontend/src/features/f13/f13.css` | Styles |
| `backend/routes/f13-routes.js` | `GET /api/jobs` — returns all jobs (load once on page mount) |
| `backend/controllers/f13.js` | Read and return jobs.json |
| `backend/data/jobs.json` | Read-only |

---