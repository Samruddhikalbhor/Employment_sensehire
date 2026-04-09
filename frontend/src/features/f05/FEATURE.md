# F05 — Ability Vector Generator

## What is this feature?
Takes the 5 slider values from F03 and converts them into a structured numerical array — the Ability Vector. Displayed as a radar/spider chart on the candidate profile.

---

## What you need to build

### Vector generation function
```js
// Put this in frontend/src/features/f05/f05.jsx (or a shared util)
function generateAbilityVector(dimensions) {
  // dimensions = { visual: 3, auditory: 4, fineMotor: 4, cognitiveLoad: 5, verbalComm: 3 }
  // ALWAYS this fixed order:
  return [
    dimensions.visual,
    dimensions.auditory,
    dimensions.fineMotor,
    dimensions.cognitiveLoad,
    dimensions.verbalComm,
  ]
}
```

### Radar chart
- Use Chart.js (`npm install chart.js react-chartjs-2`) or Recharts
- 5 axes labelled: Visual, Auditory, Fine Motor, Cognitive, Verbal
- Scale 0–5
- Filled polygon

### Profile page integration
- Show radar chart at `/candidate/profile`
- Below chart: list each dimension with score + plain-language label
- "Regenerate" button re-runs from current slider values

---

## Expected output
- `generateAbilityVector()` function working correctly
- Radar chart rendered with all 5 axes labelled
- Vector saved to `ability-vectors.json`

---

## What NOT to do
- Do NOT change the dimension order: [visual, auditory, fineMotor, cognitiveLoad, verbalComm]

---

## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f05/f05.jsx` | Radar chart component + vector display |
| `frontend/src/features/f05/f05.css` | Styles |
| `backend/routes/f05-routes.js` | `GET /api/ability-vector/:candidateId` |
| `backend/controllers/f05.js` | Read and return vector from ability-vectors.json |
| `backend/data/ability-vectors.json` | Read existing vectors here |

---

