# F10 — AI Recommendation Engine

## What is this feature?
Feeds the gaps from F09 into an AI API and returns specific, actionable accommodation suggestions. Each suggestion links to a real tool. Displayed as "Fix It" cards.

---

## ⚠️ API KEY RULES — READ BEFORE WRITING ANY CODE

1. **NEVER commit your API key** — instant PR rejection, no exceptions
2. **Use `backend/.env` only** — add `AI_API_KEY=your_key_here` (already in .gitignore)
3. **Graceful error card required** — if the key is missing or the call fails, show an error card, not a crash
4. **Error stays local** — F10's error must not affect F01–F09 or F11–F15
5. **No key required for others** — the rest of the app must work with no API key at all

---

## What you need to build

### Backend — AI prompt
- `POST /api/recommendations` with body `{ gaps: [...] }`
- Build a prompt from gap data and call your AI API (OpenAI / Anthropic / Gemini)
- Parse response into structured suggestion objects

### Prompt example
```
You are a workplace accessibility expert.
A candidate has these gaps vs. a job's requirements:
${gaps.map(g => `- ${g.plainLanguageSentence}`).join('\n')}

For each gap, provide one specific workplace accommodation.
Respond ONLY as JSON: [{ "gap": "...", "suggestion": "...", "tool": "...", "link": "..." }]
```

### "Fix It" card display
Each card shows:
- Which gap it addresses
- The specific suggestion
- Tool name + clickable link

### Required states

**Loading:** Show a spinner or skeleton while the API call is in progress.

**Error (required):**
```jsx
<div className="error-card">
  <p>AI recommendations unavailable.</p>
  <p>{errorMessage}</p>
  <p>All other features continue to work normally.</p>
</div>
```

**Success:** Rendered "Fix It" cards.

---

## Expected output
- "Fix It" cards below gap cards at `/match/:jobId`
- Loading skeleton while fetching
- Graceful isolated error card if API fails
- Each card: gap reference, suggestion, tool, link

---

## What NOT to do
- **Do NOT commit your API key** — PR will be rejected
- Do NOT make the AI call from the frontend — backend route only
- Do NOT let an API error crash any other page

---

## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f10/f10.jsx` | Fix It cards + loading + error states |
| `frontend/src/features/f10/f10.css` | Styles |
| `backend/routes/f10-routes.js` | `POST /api/recommendations` |
| `backend/controllers/f10.js` | Build prompt → call AI API → parse → return cards |
| `backend/.env` | Add your API key here (NEVER commit this file) |

---

## Pre-submit check
Run this before opening your PR:
```bash
git grep -r "AI_API_KEY\s*=" --include="*.js" --include="*.jsx"
```
If anything is printed other than `.env`, your key is exposed. Fix it before submitting.

---
