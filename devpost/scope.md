---
doc: scope
status: draft
---

# Second Look

A calm, private "second opinion" for a suspicious text message or email: paste it in, and it shows exactly which words are classic scam tactics, why, and what to do next.

## The Unique Kernel
It doesn't just say "scam / not scam". It **highlights the exact phrases** in the message that match known scam tactics (urgency, gift-card or crypto payment, code/password requests, impersonation, threats, secrecy, lookalike links) and explains each one in one plain sentence, then turns what it found into a short **"what to do in the next 5 minutes"** plan and a ready-to-send note to a trusted person. Everything runs in the browser — the message never leaves the device.

## Who It's For
An older adult (or anyone who isn't tech-confident) who just got a text like "Your package is held, pay a $1.99 fee here" or "Grandma, it's me, I'm in trouble, don't tell Mom". Today they either panic and act, or phone a relative who has to read the message over the phone and explain it. Secondary user: the relative or caregiver who wants a tool they can point a parent to.

## The Core Loop
Get a weird message → copy it → paste into Second Look → read the highlighted tactics and the verdict → follow the next-steps card (or tap "Ask someone I trust" to copy a note) → close. They come back the next time something feels off.

## Inspiration & Identity
Calm, not alarmist. Warm paper-like background, big readable type, one clear verdict sentence, color-coded highlights like a teacher's marker on a printout. Feels like a patient friend, not a security dashboard. No logins, no ads, no tracking.

## Why This Matters to the Learner
Wants a project with clear, everyday impact that costs nothing to run and that anyone can open from a link.

## What "Working" Looks Like
Open the page, tap the "Package delivery" sample (or paste a real message), press **Check this message**. The verdict says "High risk — this has 4 classic scam signs". The message is shown with phrases like "within 24 hours", "$1.99 redelivery fee" and the lookalike link "usps-redelivery.help-center.top" highlighted; each has a card explaining why. The "oh, that's cool" beat: hovering/tapping a highlight jumps to its explanation, and the link check spells out *why* the link is fake ("the real company name is in front, but the site you'd actually visit is help-center.top").

## The POC Boundary
- Paste text (or pick one of 3 samples) and analyze it in the browser.
- Rule-based detection of 7 tactic categories + link inspection, with highlighted phrases and one-sentence explanations.
- Overall verdict (Low / Caution / High) with an honest caveat.
- Tailored "next 5 minutes" steps and "Ask someone I trust" copy-to-clipboard note.
- Large-text toggle.

## Later
- Screenshot/photo input (on-device OCR).
- Other languages.
- Browser share-target so you can "share to Second Look" from the messages app.

## Explicitly Cut
- **AI/LLM classification** — would need a paid API or key, send private messages to a third party, and be harder to explain; transparent rules are free, offline and show their reasoning.
- **Live URL reputation lookups** (Safe Browsing etc.) — need keys and network calls with the user's data; the PoC inspects the link text locally instead.
- **Accounts, history, reporting to authorities** — not needed to prove the kernel; adds privacy risk.
