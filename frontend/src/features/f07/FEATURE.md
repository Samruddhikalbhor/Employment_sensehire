# F07 — Cosine Similarity Engine

## What is this feature?
The mathematical heart of SenseHire. Implement cosine similarity from scratch — no libraries. Measures how well a candidate's Ability Vector matches a Job Vector.

---

## The formula

```
similarity = (A · B) / (|A| × |B|)

A · B  = sum of (A[i] × B[i])   ← dot product
|A|    = sqrt(sum of A[i]²)      ← magnitude of A
|B|    = sqrt(sum of B[i]²)      ← magnitude of B

Result: 0.0 (no match) to 1.0 (perfect match)
```

---

## Implementation (write this yourself — no libraries)

```js
function cosineSimilarity(vecA, vecB) {
  if (!vecA.length || vecA.length !== vecB.length) return 0

  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))

  if (magA === 0 || magB === 0) return 0
  return dot / (magA * magB)
}
```

### Verify with these test cases before submitting

```
cosineSimilarity([1,0,0,0,0], [1,0,0,0,0]) → 1.0
cosineSimilarity([1,0,0,0,0], [0,1,0,0,0]) → 0.0
cosineSimilarity([3,4,4,5,3], [2,1,4,4,2]) → ~0.89
cosineSimilarity([1,5,5,5,1], [3,5,2,3,5]) → ~0.78
```

---

## What you need to build
- `cosineSimilarity(vecA, vecB)` function in `f07.jsx`
- `POST /api/similarity` endpoint: body `{ abilityVectorId, jobVectorId }` → returns `{ score: 0.92, percentage: "92%" }`
- Simple debug UI: two dropdowns (candidate / job) + "Calculate" button + show raw score and percentage

---

## Expected output
- Function passes all 4 test cases above
- API endpoint returns correct scores
- Debug UI at `/match/debug`

---

## What NOT to do
- Do NOT round inside `cosineSimilarity()` — return the full float (rounding happens in F08)
- Do NOT skip the zero-vector check — causes division by zero
---

## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f07/f07.jsx` | Debug UI + export `cosineSimilarity` function |
| `frontend/src/features/f07/f07.css` | Styles |
| `backend/routes/f07-routes.js` | `POST /api/similarity` |
| `backend/controllers/f07.js` | Read vectors, call similarity, return score |

---

## How to claim
1. Open GitHub Issue → **F07 — Cosine Similarity Engine** template
2. Branch: `feature/f07-your-name`
3. PR title must start with: `[F07]`