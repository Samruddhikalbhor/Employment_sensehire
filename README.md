# SenseHire — Open Source Competition

<div align="center">

![SenseHire Banner](https://img.shields.io/badge/SenseHire-Open%20Source%20Competition-0d9488?style=for-the-badge&logo=github&logoColor=white)

**Build the hiring platform the world actually needs.**

SenseHire flips the traditional hiring model — using adaptive AI to bridge the accessibility gap before the first interview even happens. Instead of forcing candidates with disabilities to navigate a world built for the able-bodied, it uses technology to match people to roles based on functional ability vectors and job demand vectors.

[![Day 1](https://img.shields.io/badge/Day%201-15%20Features%20Open-10b981?style=flat-square)](./contest-platform/index.html)
[![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Node.js-3b82f6?style=flat-square)]()
[![License](https://img.shields.io/badge/License-MIT-8b5cf6?style=flat-square)]()

</div>

---

## Table of Contents

- [What is SenseHire?](#what-is-sensehire)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Feature Overview](#feature-overview)
- [How to Participate](#how-to-participate)
- [Dummy Data](#dummy-data)
- [Vector System Explained](#vector-system-explained)
- [API Routes Reference](#api-routes-reference)
- [Contribution Rules](#contribution-rules)
- [Code of Conduct](#code-of-conduct)

---

## What is SenseHire?

SenseHire is a paradigm-shifting hiring platform built for candidates with disabilities. It replaces subjective screening with a mathematical matching engine that compares a candidate's **Ability Vector** against a job's **Demand Vector** using cosine similarity — producing a human-readable compatibility score, ranked gap analysis, and AI-powered accommodation suggestions.

### The Core Idea

```
Candidate fills ability sliders  →  Ability Vector  [3, 4, 4, 5, 3]
                                                            ↕ cosine similarity
Employer posts task requirements →   Job Vector     [2, 1, 4, 4, 2]
                                                            ↓
                                    Compatibility Score: 89% (Good Match)
                                                            ↓
                                    Gap Analysis: "Auditory demand exceeds your profile"
                                                            ↓
                                    AI Suggestions: "Enable live captioning in Zoom"
```

### Why It Matters

Traditional hiring discriminates at every stage — from inaccessible application forms to phone-heavy interviews. SenseHire bakes accessibility into the infrastructure itself, not as an afterthought.

---


## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### 1. Fork and clone

```bash
git clone https://github.com/commitverse2026/Employment_sensehire
cd sensehire
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```
> ⚠️ Never commit `.env`. It is already in `.gitignore`.

### 5. Start the development servers

In two separate terminals:

```bash
# Terminal 1 — backend (runs on port 3001)
cd backend
node server.js

# Terminal 2 — frontend (runs on port 5173)
cd frontend
npm run dev
```
---

## Feature Overview

### Day 1 Features (F01–F15)

| ID | Feature | Category | Difficulty |
|----|---------|----------|-----------|
| F01 | Onboarding Form | Core UX | Beginner |
| F02 | Disability Profiler | Core UX | Beginner |
| F03 | Ability Input Module | Core UX | Intermediate |
| F04 | Job Posting Creator | Employer Tools | Intermediate |
| F05 | Ability Vector Generator | AI Engine | Intermediate |
| F06 | Job Vector Generator | AI Engine | Intermediate |
| F07 | Cosine Similarity Engine | AI Engine | Advanced |
| F08 | Compatibility Score Display | AI Engine | Intermediate |
| F09 | Gap Identification Engine | AI Engine | Advanced |
| F10 | AI Recommendation Engine | AI Engine | Advanced |
| F11 | Candidate Dashboard | Dashboards | Intermediate |
| F12 | Employer Dashboard | Dashboards | Intermediate |
| F13 | Search & Accessibility Filter | Core UX | Intermediate |
| F14 | Text-to-Speech Reader | Accessibility | Beginner |
| F15 | Speech-to-Text Profile Builder | Accessibility | Intermediate |



Read the full spec for any feature by opening `contest-platform/index.html` or reading the `FEATURE.md` inside each feature folder.

---

## How to Participate

### Step 1 — Pick a feature

Browse the feature cards at `contest-platform/index.html`. Click any card to read the full specification — what to build, expected output, what NOT to do, and exact files to change.


### Step 3 — Create your branch

```bash
git checkout -b feature/f01-your-name
# Replace f01 with your feature number
# Replace your-name with your actual name
```

### Step 4 — Build your feature

- Read the `FEATURE.md` inside your feature folder before writing any code
- Edit **only** the files listed in the FEATURE.md
- Do not modify other participants' files
- Keep existing dummy data intact — only append, never delete entries

### Step 5 — Open a Pull Request

```
PR title format:  [F01] Onboarding Form — Your Name
Branch format:    feature/f01-your-name
```

Your PR must pass the CI checks (lint + build) before it can be merged.

---

## Dummy Data

All pre-filled data lives in `backend/data/`. Do not delete existing entries — only append new ones.

### Test login credentials

| Username | Password | Role | Notes |
|----------|----------|------|-------|
| `priya.mehta` | `priya123` | Candidate | Visual disability, Frontend Dev |
| `arjun.sharma` | `arjun123` | Candidate | Hearing disability, Backend Dev |
| `sara.rashidi` | `sara123` | Candidate | Motor disability, Data Analyst |
| `james.okafor` | `james123` | Candidate | Cognitive disability, UX Researcher |
| `mei.lin` | `mei123` | Candidate | Visual disability (Blind), Java Dev |
| `tomas.rivera` | `tomas123` | Candidate | Hearing disability, Mobile Dev |
| `employer.admin` | `employer123` | Employer | Access to F12 employer dashboard |

### Data files summary

| File | Contents | Features that use it |
|------|----------|---------------------|
| `candidates.json` | 8 candidate profiles | F01, F11, F12 |
| `users.json` | 9 login accounts | F11, F12 |
| `jobs.json` | 6 job postings | F04, F11, F12, F13 |
| `disability-types.json` | 4 categories, 19 sub-types | F02 |
| `ability-vectors.json` | 5-dim vectors for all candidates | F05, F07, F08, F09 |
| `job-vectors.json` | 5-dim vectors for all jobs | F06, F07, F08, F09 |
| `stories.json` | 5 community stories | F16 (Day 2) |

---

## Vector System Explained

The matching engine is built around 5-dimensional vectors. Both candidate ability and job demands are expressed in the same dimensions so they can be directly compared.

### The 5 Dimensions (fixed order — never change this)

| Index | Key | What it measures |
|-------|-----|-----------------|
| 0 | `visual` | Visual processing — reading text, monitoring screens |
| 1 | `auditory` | Hearing — phone calls, verbal instructions, audio alerts |
| 2 | `fineMotor` | Typing, mouse, keyboard input |
| 3 | `cognitiveLoad` | Focus, multitasking, complex reasoning |
| 4 | `verbalComm` | Speaking — meetings, presentations, calls |

**Scale:** 1 = very low ability or demand, 5 = very high

### Example match

```
Mei Lin (Blind Java Dev):     [1, 5, 5, 5, 3]
Java Backend Job (F06):       [2, 1, 4, 5, 1]

cosineSimilarity([1,5,5,5,3], [2,1,4,5,1]) = ~0.84  →  84% Good Match

Gaps identified:
  visual: job demands 2, Mei scores 1  →  Minor gap
  (all other dimensions: Mei meets or exceeds demand)

AI suggestion:
  "Screen reader compatible IDE provided — visual gap is accommodated by the employer."
```

### Mapping F04 sliders → Job Vector

When an employer fills in task requirements in F04, each slider maps directly to a vector dimension:

| F04 Slider | Vector Dimension | Index |
|-----------|-----------------|-------|
| `visualMonitoring` | visual | 0 |
| `phoneCalls` | auditory | 1 |
| `fineMotorInput` | fineMotor | 2 |
| `sustainedFocus` | cognitiveLoad | 3 |
| `verbalCommunication` | verbalComm | 4 |

---

## API Routes Reference

All backend routes are prefixed with `/api`. The backend runs on port 3001 by default. The Vite dev server proxies `/api` requests automatically.

### Implemented by participants

| Method | Route | Feature | Description |
|--------|-------|---------|-------------|
| POST | `/api/onboarding` | F01 | Save new candidate profile |
| GET | `/api/disability-types` | F02 | Return all 4 categories + sub-types |
| POST | `/api/disability` | F02 | Update candidate disability selection |
| POST | `/api/ability` | F03 | Save ability slider values as vector |
| GET | `/api/jobs` | F04, F13 | Return all job postings |
| POST | `/api/jobs` | F04 | Create a new job posting |
| GET | `/api/ability-vector/:candidateId` | F05 | Return candidate's ability vector |
| POST | `/api/job-vector` | F06 | Generate and save job vector |
| POST | `/api/similarity` | F07 | Calculate cosine similarity between two vectors |
| GET | `/api/compatibility/:candidateId/:jobId` | F08 | Return compatibility score |
| GET | `/api/gaps/:candidateId/:jobId` | F09 | Return ranked gap analysis |
| POST | `/api/recommendations` | F10 | Get AI accommodation suggestions |
| POST | `/api/login` | F11, F12 | Authenticate user against users.json |
| GET | `/api/candidate/:id` | F11 | Return candidate profile |
| GET | `/api/employer/applicants/:jobId` | F12 | Return applicants for a job with scores |
| POST | `/api/profile` | F15 | Save voice-filled profile data |

### Reading and writing JSON files

All data is stored in flat JSON files. Basic pattern for reading and appending:

```js
// backend/controllers/f01.js
const fs   = require('fs')
const path = require('path')

const DATA_PATH = path.join(__dirname, '../data/candidates.json')

function readCandidates() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'))
}

function writeCandidates(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
}

exports.createCandidate = (req, res) => {
  const candidates = readCandidates()
  const newId = 'c' + String(candidates.length + 1).padStart(3, '0')
  const newCandidate = { id: newId, ...req.body }
  candidates.push(newCandidate)
  writeCandidates(candidates)
  res.json({ success: true, candidate: newCandidate })
}
```

---

## Contribution Rules

### Branch naming

```
feature/f01-your-name
```

### PR title format

```
[F01] Onboarding Form — Your Name
```

### What you may change

- Your feature's `.jsx` file: `frontend/src/features/f01/f01.jsx`
- Your feature's `.css` file: `frontend/src/features/f01/f01.css`
- Your feature's backend route: `backend/routes/f01-routes.js`
- Your feature's controller: `backend/controllers/f01.js`
- The relevant data files (append only — never delete existing entries)

### What you must NOT change

- Other participants' feature files
- `backend/data/*.json` (except appending your own entries)
- `features.config.js`
- `frontend/src/App.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/components/FeatureCard.jsx`
- Any file outside your feature's listed scope

### API key rules (F10 only)

1. **Never commit your API key** — PR will be rejected immediately
2. Store in `backend/.env` only — this file is in `.gitignore`
3. Your feature must show a graceful error card if the key is missing
4. The error must be isolated to F10 only — no other pages should be affected
5. Before opening your PR, run:
   ```bash
   git grep -r "AI_API_KEY" --include="*.js" --include="*.jsx"
   ```
   If anything prints other than `.env`, your key is exposed.

### JSON data rules

- Do not delete any existing entries from data files
- Do not modify existing entries — append only
- Always validate your JSON before committing (use `node -e "JSON.parse(require('fs').readFileSync('file.json'))"`)
- Generate IDs sequentially: `"c009"`, `"j007"`, `"av009"`, etc.

### CI checks

Every PR must pass:
- ESLint (no errors)
- Vite build (no build failures)

Run locally before pushing:
```bash
cd frontend && npm run lint && npm run build
```

---

## Code of Conduct

This competition is built around accessibility — a cause that matters deeply to many people. We expect all participants to reflect that in how they engage.

- Be respectful and constructive in all PR reviews and issue comments
- Do not claim features you are not actively working on
- If you get stuck, ask for help in the issue thread — don't abandon a claimed feature silently
- Credit others when you reference their code or approach
- This project is for learning — there are no wrong questions

---

## Day 2 Unlock

On Day 2, the organiser will flip one line in `features.config.js`:

```js
// features.config.js
const config = {
  day2Enabled: true,   // ← changed from false
}
export default config
```

This automatically enables:
- The Day 2 feature cards on the landing page
- The `/day2` route in App.jsx
- F16–F21 feature folders become active

Participants do not need to do anything — pull the latest main branch and the new features will appear.

---


<div align="center">

Built with purpose. Every line of code makes hiring more human.

**SenseHire Open Source Competition**

</div>