# F03 — Ability Input Module

## What is this feature?
Five visual 1–5 sliders where candidates rate their functional abilities. Each slider has live plain-language descriptions that update as the user drags. The output feeds directly into the Ability Vector (F05).

---

## The 5 sliders

| Dimension | User-facing label | Value 1 description | Value 5 description |
|-----------|------------------|--------------------|--------------------|
| `visual` | Visual Processing | "I use a screen reader exclusively" | "Full visual capability" |
| `auditory` | Hearing | "I am Deaf — I need captions or text" | "Full hearing capability" |
| `fineMotor` | Hand & Typing | "I use voice input only" | "Full keyboard and mouse use" |
| `cognitiveLoad` | Focus & Concentration | "I need frequent breaks and reminders" | "Excellent sustained focus" |
| `verbalComm` | Verbal Communication | "I prefer text-only communication" | "Comfortable presenting to large groups" |

Each slider must have 5 preset description strings — one per value (1 through 5).

---

## What you need to build
- 5 labeled range sliders (1–5)
- Description text below each slider updates instantly on drag
- Gradient fill on slider track from left edge to thumb position
- Current value displayed as a number badge near the thumb
- "Save Ability Profile" button at bottom
- POST 5 values to `/api/ability`
- Backend saves to `ability-vectors.json`

---

## Expected output
- Rendered at `/profile/ability`
- Live description updates on every drag (no delay)
- Gradient track fill
- Saved correctly to `ability-vectors.json`

---

## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f03/f03.jsx` | Slider UI with live description updates |
| `frontend/src/features/f03/f03.css` | All styles including custom range track fill |
| `backend/routes/f03-routes.js` | `POST /api/ability` |
| `backend/controllers/f03.js` | Save new vector entry to ability-vectors.json |
| `backend/data/ability-vectors.json` | New entries appended here |

---

## Vector format to save

```json
{
  "id": "av009",
  "candidateId": "c001",
  "vector": [3, 4, 4, 5, 3],
  "dimensions": {
    "visual": 3, "auditory": 4, "fineMotor": 4,
    "cognitiveLoad": 5, "verbalComm": 3
  },
  "labels": {
    "visual": "I can read with magnification tools",
    "auditory": "I hear well, prefer written summaries",
    "fineMotor": "Comfortable typing with adapted keyboard",
    "cognitiveLoad": "Excellent focus and multitasking",
    "verbalComm": "Comfortable in small group meetings"
  },
  "generatedAt": "2025-01-20T10:00:00Z"
}
```
