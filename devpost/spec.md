---
doc: spec
status: draft
---

# Second Look — Technical Spec

## How This Works, In Plain Language
Second Look is one web page made of three small pieces:
- **The rule book (`src/rules.js`)** — lists of phrases scammers use, grouped into tactics, each with a one-sentence explanation. It also contains a small link checker. Given a message, it returns what it found and where.
- **The page (`index.html` + `styles.css`)** — the text box, buttons and the empty spots where results go.
- **The glue (`src/app.js`)** — when you press Check, it hands your message to the rule book and paints the results: the verdict, the highlighted message, cards and next steps.
There is no server and no AI service: the whole thing is files the browser downloads once, so it's free to host, works offline after loading, and your message never leaves the device. Rules were chosen over AI so every warning can point to the exact words that triggered it.

## The Core Journey Through the System
PRD ref: `prd.md > The Core Journey`.
User pastes text → presses Check → `app.js` calls `analyze(text)` in `rules.js` → it returns `{ level, score, findings[], links[], steps[] }` → `app.js` renders the verdict banner, builds the highlighted message from finding positions (escaping text, wrapping matches in `<mark>`), renders tactic and link cards and the steps list → user taps a highlight → the page scrolls to the matching card → user taps "Ask someone I trust" → `buildTrustedNote()` text is copied to the clipboard.

## Stack
- Plain HTML, CSS and JavaScript ES modules — no framework, no build step, no dependencies. Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- Tests: Node.js ≥ 18 built-in test runner (`node --test`). Docs: https://nodejs.org/api/test.html
- Rationale: smallest thing that works; anyone can read and fork it.

## Where It Runs and How Someone Tries It
- Runs in any modern browser. Local: `python3 -m http.server 8000` (or `npx serve .`) in the repo root, open http://localhost:8000. (ES modules need http://, not file://.)
- Tests: `node --test`.
- Deploy: GitHub Pages from the `main` branch root. Demo video: open the live page, run the three samples, paste a custom message.

## Look and Feel
From `prd.md > Look and Feel`: background #FBF7F0, ink #1F2A2E, teal #0F6B6B, amber #B7791F, red #B23A3A, green #2F7D4F. Headings: Georgia/serif; body: system-ui sans, 18px base, 1.6 line height. Rounded 14px cards, soft shadows. Highlights: translucent marker colors per tactic with a bottom border. Copy short, kind, second person.

## Components

### Rule book
`TACTICS` array: `{ id, name, color, why, patterns: RegExp[], weight, step }`. `analyze(text)` runs every pattern, merges overlapping matches, scores (sum of tactic weights found, + link penalties), maps score to level (0–1 low, 2–4 caution, ≥5 high; any payment + urgency/threat combo forces high).
PRD ref: `prd.md > Checking a message`, `prd.md > Seeing why`.

### Link checker
`extractLinks(text)` finds URLs and bare domains; `inspectLink(url)` returns `{ host, site, issues[] }` where `site` is the registrable domain (last two labels, three for known second-level suffixes like co.uk). Checks: known brand lookalikes (digit swaps, brand inside a host whose site is not the brand's), punycode `xn--`, IPv4 host, shorteners list, unusual TLD list, `@` in URL, http.
PRD ref: `prd.md > Checking links`.

### Renderer
`app.js`: `renderHighlighted(text, findings)` builds DOM nodes with `textContent` (never `innerHTML` for user text); verdict live region; cards; steps; copy note via `navigator.clipboard.writeText` with a textarea fallback; larger-text toggle stored in `localStorage['sl-large']`.
PRD ref: `prd.md > Next steps and help`, `prd.md > Accessibility`.

## Data Model
In-memory only: the analysis result object above. `localStorage['sl-large'] = '1'|'0'` is the only persisted value.

## File Structure
```
second-look/
├── index.html          # single page
├── styles.css          # look and feel
├── src/
│   ├── rules.js        # tactics, link checker, analyze()
│   ├── samples.js      # three demo messages
│   └── app.js          # DOM wiring and rendering
├── tests/
│   └── rules.test.js   # node --test
├── docs/               # README assets, video script, Devpost notes
├── devpost/            # Devpost learning workspace (planning docs)
├── package.json        # "type": "module", test script
├── LICENSE             # MIT
└── README.md
```

## External Services and Dependencies
None at runtime. Hosting: GitHub Pages (free). No API keys.

## Important Failure Modes
- **A new scam wording isn't in the rule book** → Low verdict, but the caveat always tells the person to verify requests for money or codes another way.
- **Clipboard API blocked** → fallback copies via a hidden textarea; if that fails, the note is shown selected for manual copy.
- **Highlights overlap** → overlapping matches are merged and the first tactic wins the color; all tactics still get cards.

## What Was Simplified and Why
- **Phrase rules** instead of a trained/AI classifier — explainable, free, private. The fuller version would add an on-device model as a second opinion.
- **Approximate registrable domain** instead of the full Public Suffix List — covers common cases at a fraction of the size.

## Decisions and Open Issues
- No framework / no build (agent recommendation, accepted by owner brief "small, polished, no paid API").
- Learner uncertainty discussed: whether rules can be "good enough" without AI. Clarified by tests on real-world-style samples (`tests/rules.test.js`) including a benign message that must stay Low.
- Open: none blocking.
