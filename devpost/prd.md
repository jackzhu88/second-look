---
doc: prd
status: draft
---

# Second Look — Product Requirements

A one-page, private web tool that helps a non-technical person check a suspicious message before acting on it. Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

## The Core Journey
1. The person opens the Second Look link on a phone or computer. They see a one-line promise ("Paste a message. See the warning signs. Nothing leaves your device.") and a large text box.
2. They paste the message (or tap one of three sample messages to see how it works).
3. They press **Check this message**.
4. A verdict appears at the top: a colored level (Low / Caution / High risk), the number of warning signs, and one plain sentence of advice.
5. Below, their message is reprinted with each suspicious phrase highlighted in the color of its tactic. Tapping a highlight scrolls to its explanation card.
6. Explanation cards list every tactic found: name, the exact words, and one sentence on why scammers use it.
7. Any links are inspected and explained ("you would really be visiting *help-center.top*, not usps.com").
8. A **What to do in the next 5 minutes** list is tailored to what was found (e.g. "Don't buy gift cards — no real company or agency asks for them").
9. **Ask someone I trust** copies a short note + the message so they can paste it to a family member.
10. Success: the person knows whether to ignore, verify through an official channel, or ask for help — without anyone else's involvement and without their message being uploaded.
Source: `scope.md > The Core Loop`.

## Screens and Layout
A single page, top to bottom: header with name, privacy badge and "Larger text" toggle → input card (textarea, sample buttons, Check / Clear buttons) → results (hidden until a check runs): verdict banner, highlighted message, tactic cards, link cards, next-steps list, ask-someone button, caveat → short "How it works" footer. On wide screens the highlighted message and the tactic cards sit side by side; on phones everything stacks.

## Look and Feel
Calm and friendly (`scope.md > Inspiration & Identity`). Warm off-white paper background, deep teal primary, amber for caution, brick red for high risk, green for low. Generous spacing, base font ≥ 18px, a serif for headings and a system sans for body. Highlights look like marker strokes. Copy is short, second-person, never shaming ("Good instinct to check.").

## Features and Behavior

### Checking a message
- As a person who got a strange text, I want to paste it and get a clear verdict so that I know whether to worry.
  - [ ] Pressing Check on a non-empty message shows a verdict level, sign count and advice sentence.
  - [ ] Pressing Check on an empty box shows a friendly prompt instead of results.
  - [ ] The analysis makes no network request.

### Seeing why
- As a cautious reader, I want to see which exact words are suspicious so that I learn to spot them myself.
  - [ ] Every detected phrase is highlighted inline in the reprinted message with its tactic color.
  - [ ] Each tactic found has a card with its name, the matched words and a one-sentence explanation.
  - [ ] Tapping a highlight brings its card into view.
  - [ ] User text is displayed safely (never interpreted as HTML).

### Checking links
- As a person who sees a link, I want to know where it really goes so that I don't open a fake site.
  - [ ] Detects: lookalike brand spelling (paypa1, amaz0n), brand name placed in front of a different real domain, punycode, raw IP addresses, URL shorteners, unusual top-level domains, `@` tricks, plain http.
  - [ ] Each flagged link card states the actual site you would visit.

### Next steps and help
- As someone unsure what to do, I want concrete next steps so that I don't freeze or panic.
  - [ ] Steps are tailored to tactics found (payment → don't pay; code request → never share codes; impersonation → contact the company via the official app/number you already have; links → don't tap).
  - [ ] "Ask someone I trust" copies a note + message to the clipboard and confirms "Copied".

### Accessibility
- [ ] "Larger text" toggle enlarges all text and is remembered on the device.
- [ ] Works with keyboard only; verdict is announced to screen readers (live region).

## States and Boundaries
- **First use / empty** — input card with samples; results hidden.
- **Empty submit** — gentle message "Paste a message first, or try a sample."
- **No signs found** — Low verdict with honest caveat: "No common warning signs found. That doesn't guarantee it's safe — if it asks for money or codes, verify another way."
- **Persistence** — only the larger-text preference (localStorage). Messages are never stored.

## Product Decisions
- Rule-based, explainable analysis instead of AI — free, offline, private, and shows its reasoning (`scope.md > Explicitly Cut`).
- English only for the PoC — rules are phrase-based.
- Static site, no backend — anyone can open it from a link (GitHub Pages).

## What We're Building
Single static page with the checker, highlighter, tactic cards, link inspector, verdict, tailored next steps, ask-someone copy, larger-text toggle, three samples, and automated tests for the rules.

## Deferred From the POC
- Screenshot input (OCR) — needs an on-device OCR library; big download.
- Multi-language rules — needs translated phrase lists reviewed by native speakers.

## Possible Later Enhancements
Share-target / PWA install; a "teach me" quiz mode built from the same rules; community-contributed rule packs.

## Non-Goals
- Not a spam filter or inbox integration — we never read anyone's messages automatically.
- Not a guarantee — always pairs verdicts with "verify through an official channel".
- No data collection or analytics.

## Open Questions
- None blocking `4-spec`.
