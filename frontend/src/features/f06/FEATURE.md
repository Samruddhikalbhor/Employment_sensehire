# F06 — Job Vector Generator

## What is this feature?
The employer-side mirror of F05. Converts the job's task requirement sliders (from F04) into a Job Vector — the same 5-dimension array — enabling direct mathematical comparison against candidate ability vectors.

---

## Mapping (F04 slider → vector dimension)

| F04 Slider | Vector Dimension | Array Index |
|-----------|-----------------|-------------|
| `visualMonitoring` | visual | 0 |
| `phoneCalls` | auditory | 1 |
| `fineMotorInput` | fineMotor | 2 |
| `sustainedFocus` | cognitiveLoad | 3 |
| `verbalCommunication` | verbalComm | 4 |

```js
function generateJobVector(taskRequirements) {
  return [
    taskRequirements.visualMonitoring,
    taskRequirements.phoneCalls,
    taskRequirements.fineMotorInput,
    taskRequirements.sustainedFocus,
    taskRequirements.verbalCommunication,
  ]
}
```

---

## What you need to build
- Auto-trigger job vector generation when a new job is saved via F04
- Save resulting vector to `job-vectors.json`
- Link back via `jobVectorId` in the job record
- Show a radar chart of job demands on the job detail page

---

## Expected output
- `generateJobVector()` working correctly
- Job vector auto-generated on job creation
- Saved to `job-vectors.json` with correct structure
- Radar chart on job detail page

---

## What NOT to do
- Do NOT change the dimension order — must match F05: [visual, auditory, fineMotor, cognitiveLoad, verbalComm]

---

## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f06/f06.jsx` | Job demand radar chart on job detail page |
| `frontend/src/features/f06/f06.css` | Styles |
| `backend/routes/f06-routes.js` | `POST /api/job-vector` |
| `backend/controllers/f06.js` | Generate and save job vector |
| `backend/data/job-vectors.json` | New job vectors saved here |

---
