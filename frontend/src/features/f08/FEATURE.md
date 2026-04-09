# F08 — Compatibility Score Display

## What is this feature?
Converts the raw cosine similarity float from F07 into a visually rich Compatibility Score card — animated SVG ring, plain-language summary, and colour-coded tier badge.

---

## Score tiers

| Range | Tier | Colour |
|-------|------|--------|
| 90–100% | Excellent Match | Green |
| 75–89% | Good Match | Teal / Blue |
| 55–74% | Possible Match | Amber |
| Below 55% | Unlikely Match | Red |

---

## Animated SVG ring (build with raw SVG — no library)

```js
const radius = 54
const circumference = 2 * Math.PI * radius   // ≈ 339.3
const offset = circumference - (score / 100) * circumference
// Apply to: stroke-dasharray={circumference} stroke-dashoffset={offset}
// Animate: CSS transition on stroke-dashoffset from circumference → offset
```

Show the percentage number centred inside the ring. Ring colour matches the tier.

---

## Plain-language summary (below the ring)

- **Excellent:** "This job is an excellent fit. You meet or exceed all task demands."
- **Good:** "This job is a strong fit. There are minor gaps that can be accommodated."
- **Possible:** "There are some gaps. Accommodations may help bridge them."
- **Unlikely:** "There are significant gaps between this job's demands and your profile."

---

## What you need to build
- Score card component rendered at `/match/:jobId`
- SVG ring animating from 0 to actual score on mount (~1 second)
- Tier badge pill with correct colour
- Plain-language summary paragraph

---

## Expected output
- Animated SVG ring 
- Correct tier label and colour per score range
- Summary paragraph changes based on tier
- Shows rounded percentage (e.g. 89%, not 89.23%)

---

## What NOT to do
- Do NOT display the raw float — always show as rounded integer percentage
- Do NOT use the same colour for all tiers

---

## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f08/f08.jsx` | Animated ring + tier badge + summary |
| `frontend/src/features/f08/f08.css` | Ring animation styles |
| `backend/routes/f08-routes.js` | `GET /api/compatibility/:candidateId/:jobId` |
| `backend/controllers/f08.js` | Fetch vectors, compute score via F07 logic, return |

---