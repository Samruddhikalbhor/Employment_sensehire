# F14 — Text-to-Speech Reader

## What is this feature?
A page where users type or paste any text and have it read aloud via the browser's Web Speech API. A floating control bar appears at the bottom with pause, stop, and speed controls.

---

## What you need to build

### Main page at `/accessibility/tts`
- Large textarea for typing or pasting text
- Character count below the textarea
- "Listen" button to start reading
- Clear button to empty the textarea

### Web Speech API

```js
const utterance = new SpeechSynthesisUtterance(text)
utterance.rate = speed          // 0.5 to 2.0
utterance.voice = selectedVoice
window.speechSynthesis.speak(utterance)

// Events to handle:
utterance.onstart  → show floating bar
utterance.onend    → hide floating bar
utterance.onpause  → update button state
utterance.onresume → update button state
```

### Floating control bar (fixed bottom, visible while reading)

```
🔊 Reading aloud...   [⏸ Pause]  [⏹ Stop]   0.5× 1× 1.5× 2×
```

- Fixed position at bottom of viewport
- Dark background, clearly visible
- Pause toggles to Resume when paused


### Browser check
```js
if (!('speechSynthesis' in window)) {
  // Show: "Your browser doesn't support text-to-speech. Please use Chrome or Edge."
}
```

---

## Expected output
- Textarea + Listen button at `/accessibility/tts`
- Floating bar appears on play, disappears on end/stop
- Pause / Resume / Stop all working
- Browser compatibility warning if unsupported

---


## Files to change

| File | What to do |
|------|-----------|
| `frontend/src/features/f14/f14.jsx` | Textarea, Listen button, floating control bar |
| `frontend/src/features/f14/f14.css` | Floating bar position + all styles |

*This feature is frontend-only — no backend changes needed.*

---
