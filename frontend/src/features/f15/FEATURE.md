# F15 — Speech-to-Text Profile Builder

## What is this feature?
Candidates fill out their profile entirely by voice. Each profile field has a hold-to-speak button. Hold it, speak, and the transcript appears in real time in that field using the Web Speech API.

---

## What you need to build

### Profile form at `/accessibility/stt`
Fields — each has its own mic button:
- Full Name
- Professional Bio (textarea)
- Location
- Skills (voice input adds tag chips)
- Years of Experience

### Hold-to-speak per field

```
┌─────────────────────────────────┐  🎤
│ Your name here...               │  Hold
└─────────────────────────────────┘
```

- **Hold** the button → recognition starts → button pulses red, shows "Listening..."
- **Release** → recognition stops → transcript committed to that field
- Nothing spoken → "No speech detected"

### Web Speech API

```js
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continuous = false      // stops on release
recognition.interimResults = true   // show live transcript

recognition.onresult = (event) => {
  const transcript = Array.from(event.results)
    .map(r => r[0].transcript)
    .join('')
  setFieldValue(transcript)   // updates the field live
}
```

### Microphone permission handling
- On first use browser asks for mic permission
- If denied → show inline: "Microphone access was denied. Please enable it in your browser settings."
- Do NOT crash — handle gracefully

### Browser check
```js
if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
  // Show: "Voice input requires Chrome or Edge."
}
```

### Save profile
- "Save Profile" button at bottom
- `POST /api/profile` with all field values
- Show success message

---

## Expected output
- Form at `/accessibility/stt`
- Hold-to-speak button on each field
- Live transcript appears while speaking
- Mic permission denial handled gracefully
- Browser warning if unsupported
- Profile saves on submit


## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f15/f15.jsx` | Full STT profile form with hold-to-speak |
| `frontend/src/features/f15/f15.css` | Pulsing mic button + all styles |
| `backend/routes/f15-routes.js` | `POST /api/profile` |
| `backend/controllers/f15.js` | Update candidate record in candidates.json |

---
