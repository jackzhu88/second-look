---
doc: checklist
status: draft
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. You can paste a message and see a verdict with suspicious phrases highlighted**
  Becomes usable: A page where pasting a message (or picking a sample) and pressing Check shows a Low/Caution/High verdict and the message reprinted with tactic phrases highlighted.
  Why now: Proves the unique kernel end to end — scaffold, rule book, analysis, safe rendering — on the first slice.
  PRD ref: `prd.md > The Core Journey` (steps 1-5), `prd.md > Checking a message`
  Spec ref: `spec.md > Rule book`, `spec.md > Renderer`, `spec.md > File Structure`
  Build: Create index.html, styles.css, src/rules.js (tactics + analyze), src/samples.js, src/app.js (verdict + highlighted message), package.json and tests/rules.test.js.
  Verify (mechanical): `node --test` passes; serve the folder, load a sample, press Check, confirm verdict and highlights render with no console errors.
  Learner check: Try the "Package delivery" sample and say whether the verdict and highlights make sense at a glance.
  Commit: `Add message checker with verdict and highlights`

- [x] **2. Each warning sign explains itself**
  Becomes usable: A card for every tactic found, with the matched words and why scammers use it; tapping a highlight scrolls to its card.
  Why now: The explanation is what makes this teach rather than just judge.
  PRD ref: `prd.md > Seeing why`
  Spec ref: `spec.md > Renderer`
  Build: Render tactic cards from findings, link highlights to cards by id, add focus/scroll behavior.
  Verify (mechanical): Tests assert each tactic has an explanation; in the browser, clicking a highlight focuses its card.
  Learner check: Tap a highlighted phrase and read its card — is the explanation clear to a non-technical relative?
  Commit: `Explain each warning sign with tactic cards`

- [x] **3. Links are checked and their real destination is spelled out**
  Becomes usable: Links in the message get a card saying which site you would really visit and what looks wrong.
  Why now: Fake links are the most common way these messages cause harm.
  PRD ref: `prd.md > Checking links`
  Spec ref: `spec.md > Link checker`
  Build: Implement extractLinks/inspectLink in rules.js, fold link issues into the score, render link cards.
  Verify (mechanical): Unit tests for lookalike, brand-in-subdomain, punycode, IP, shortener, odd TLD, @-trick; a genuine https://www.usps.com link has no issues.
  Learner check: Paste a message with a fake delivery link and confirm the card names the real site.
  Commit: `Inspect links and show their real destination`

- [x] **4. You know what to do next and can ask for help**
  Becomes usable: Tailored "next 5 minutes" steps, an "Ask someone I trust" copy button, a larger-text toggle that is remembered, and an honest caveat.
  Why now: Completes the core journey from "is this bad?" to "what do I do?".
  PRD ref: `prd.md > Next steps and help`, `prd.md > Accessibility`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Renderer`, `spec.md > Data Model`
  Build: Steps from tactics, buildTrustedNote(), clipboard + fallback, larger-text toggle in localStorage, empty-state message.
  Verify (mechanical): Tests for steps and trusted note; in the browser, copy shows "Copied", larger text persists after reload, empty submit shows prompt.
  Learner check: Run the grandparent sample, press "Ask someone I trust", paste the note somewhere and see if you'd send it.
  Commit: `Add next steps, trusted-person note and larger text`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after slice 1 (screenshots shared with owner)
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Not yet done with the owner. Prepared a reference route from the finished code; the guided activity is offered to the owner at final review.
Route and stops: Reference route only — `src/app.js` `runCheck` → `src/rules.js` `analyze` / `levelFor` → `src/app.js` `renderHighlighted`, `renderFindings`, `renderLinks`, `renderSteps`.
Edit outcome: Not applicable yet.
Reflection: Not yet offered.
Activity mode: Pending (reference map generated; app map checked in headless Chrome).

## Revisions

- Words inside a link are explained by the link card, not by tactic cards — the first link-check run flagged "usps" inside the fake address as impersonation as well, which double-counted one clue.
- The next-steps list always ends with "Already paid or shared something?" — capping the list at six steps cut that step off for messages with many tactics, and it is the most important one if harm already happened.
- Desktop keeps the marked message in view (sticky) while scrolling the explanation cards — with many tactics the card column was much taller and the highlights scrolled away.
- Results scroll into place below the sticky header — recording the demo showed the verdict title hidden under the header after a check (fixed with `scroll-padding-top`).
- Demo samples use no real company names, and a new link rule explains any fake website name glued to the front of a real address ("It starts with postal-service.com, but the site you would actually visit is help-center.top") — the hackathon rules ask that the video not show third-party trademarks, and the rule is more general than the brand list.
