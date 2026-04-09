# F09 — Gap Identification Engine

## What is this feature?
When a match is not 100%, this engine identifies which vector dimensions diverge and translates them into ranked, plain-language gap cards. Powers both the candidate match view and the employer dashboard's one-line gap summary.

---

## Gap detection logic

```js
function identifyGaps(abilityVector, jobVector) {
  const dims = ['visual', 'auditory', 'fineMotor', 'cognitiveLoad', 'verbalComm']

  return dims
    .map((dim, i) => ({
      dimension: dim,
      candidateScore: abilityVector[i],
      jobDemand: jobVector[i],
      gap: jobVector[i] - abilityVector[i],   // positive = job demands more than candidate has
    }))
    .filter(g => g.gap > 0)                   // only real gaps
    .map(g => ({
      ...g,
      severity: g.gap === 1 ? 'Minor' : g.gap === 2 ? 'Moderate' : 'Significant',
    }))
    .sort((a, b) => b.gap - a.gap)            // worst first
}
```

---

## Plain-language gap sentences

| Dimension | Template |
|-----------|---------|
| auditory | "This job requires frequent audio/phone communication (demand: {jobDemand}/5). Your hearing profile scores {candidateScore}/5." |
| visual | "This role involves significant visual monitoring (demand: {jobDemand}/5). Your visual ability scores {candidateScore}/5." |
| fineMotor | "Heavy keyboard input is required (demand: {jobDemand}/5). Your fine motor score is {candidateScore}/5." |
| cognitiveLoad | "This job demands sustained deep focus (demand: {jobDemand}/5). Your cognitive profile scores {candidateScore}/5." |
| verbalComm | "Frequent verbal communication is required (demand: {jobDemand}/5). Your verbal communication score is {candidateScore}/5." |

---

## Severity badge colours
- Minor → Amber
- Moderate → Orange
- Significant → Red

---

## What you need to build
- Ranked gap card list below the F08 score ring at `/match/:jobId`
- Each card: dimension name, severity badge, plain-language sentence
- Zero-gap state: "No gaps identified — you meet all demands of this role!"

---

## Expected output
- Gap cards sorted worst-first
- Correct severity badge colours
- Plain-language sentence on every card
- Graceful zero-gap state

---

## What NOT to do
- Do NOT show raw numbers without context
- Do NOT show dimensions where candidate meets or exceeds demand (gap ≤ 0)
- Do NOT sort alphabetically — sort by gap size descending

---

## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f09/f09.jsx` | Gap card list UI |
| `frontend/src/features/f09/f09.css` | Severity badge styles |
| `backend/routes/f09-routes.js` | `GET /api/gaps/:candidateId/:jobId` |
| `backend/controllers/f09.js` | Compute and return ranked gaps with plain-language sentences |

---

