# F02 — Disability Profiler

## What is this feature?
An interactive expandable selector where candidates choose their disability category and sub-type. This selection drives ALL downstream logic — vector generation, gap analysis, and accommodation suggestions.

---

## What you need to build

### Category accordion
Load all 4 top-level categories from `GET /api/disability-types`:
- Visual, Hearing, Motor, Cognitive

Each category card shows: icon, name, short description.

### Expanding sub-types
- Click a category → expands to show its sub-types (accordion style)
- Only one category open at a time
- Each sub-type shows its label and description
- Click a sub-type → selects it (highlighted)

### Selection state
- Summary at bottom: "Selected: Visual → Low Vision"
- Confirm button appears once a sub-type is chosen
- On confirm: POST `{ disabilityCategory, disabilitySubType }` to `/api/disability`

---

## Expected output
- Rendered at `/profile/disability`
- Smooth open/close animation on accordion
- One active selection at a time
- Confirmation before submitting
- Data saved on confirm

---

## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f02/f02.jsx` | Build the accordion UI here |
| `frontend/src/features/f02/f02.css` | All styles for this feature |
| `backend/routes/f02-routes.js` | `GET /api/disability-types` and `POST /api/disability` |
| `backend/controllers/f02.js` | Read disability-types.json; update candidates.json |
| `backend/data/disability-types.json` | Read-only — do not modify |

---

## disability-types.json shape (read only)

```json
[
  {
    "id": "cat-visual",
    "category": "Visual",
    "icon": "👁",
    "description": "...",
    "subTypes": [
      { "id": "vis-lowvision", "label": "Low Vision", "description": "..." }
    ]
  }
]
```

---

