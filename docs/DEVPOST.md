# Devpost submission: field-by-field notes

**Read this first.** The Skill Pack's `6-ship` skill says the submission answers must be written by the entrant, not by the coding agent. So this file is **not** submission copy. Each field has a **fact sheet** to write from, plus a question to answer in your own words. Paste your own text into Devpost. The agent can then fix spelling and grammar only.

Submission page: https://learn-ai-basics.devpost.com/ → "Enter a Submission". Deadline: **Oct 26, 2026, 5:00 pm ET**.

## Links (fill in once live)

| Field | Value |
|---|---|
| Code repository (required, public, license visible in About) | `https://github.com/jackzhu88/second-look` ← *placeholder until the repo is published* |
| Demo video (required, public on YouTube or Vimeo, under 3:00) | `<VIDEO_URL>` ← *upload `video/demo.mp4` (2:35), then paste the link here and in README.md* |
| Try it out (optional) | `https://jackzhu88.github.io/second-look/` ← *placeholder until GitHub Pages is on* |
| Image gallery | `docs/screenshots/package-desktop.png`, `grandchild-desktop.png`, `low-risk.png`, `mobile.png`, `home.png` |

## Project name
Facts: "Second Look" is the name chosen in `devpost/scope.md`. It is used in the app header, the README and the video.

## Tagline / elevator pitch (short)
Facts to choose from:
- You paste a suspicious text or email. It marks the exact scam-tactic words, explains each one in plain language, and gives next steps.
- Runs fully in the browser. No account, no server, no AI API, nothing uploaded.
- Built for older adults, and for the family members they would otherwise phone.

*Question: in one sentence, what does it do, and for whom?*

## Inspiration
Facts:
- Common scam texts: fake delivery fees, the "grandparent" emergency, account-suspension threats.
- The usual help is a relative reading the message over the phone and pointing at the tricks. The app copies that.
- General advice like "be careful" doesn't help in the moment.

*Question: why did this problem matter to you? Is there a real moment that started it? (Only share what you're happy to make public.)*

## What it does
Facts (all visible in the app and the video):
- **Verdict**: High / Medium / Low risk, with a count of warning signs and one plain sentence of advice.
- **Highlights**: reprints the message with color-coded marks on the exact phrases (rush and pressure, unusual way to pay, asks for codes or private details, pretends to be someone you trust, keep it secret, threats and fear, too good to be true).
- **Tactic cards**: one plain sentence per tactic on why scammers use it. Tapping a highlight jumps to its card.
- **Link check**: shows the site you would really visit and why it looks fake: a fake name glued to the front (`postal-service.com-…help-center.top`), look-alike spelling, special characters that imitate letters, bare number addresses, shortened links, the "@" trick, unusual endings like `.top`.
- **What to do in the next 5 minutes**: steps tailored to what was found. They always end with what to do if you already paid or shared something (call your bank or card company; in the US, ReportFraud.ftc.gov).
- **Ask someone I trust**: copies a ready-to-send note with the verdict, the reasons and the message.
- **Larger text** toggle (remembered), keyboard-friendly, works on phones.
- **Private by design**: zero network requests after the page loads. Verified in a headless browser.
- **Honest limits**: a "Low risk" result still says that no tool is a guarantee.

## How we built it
Facts:
- Used the Devpost Skill Pack (`challengepost/learn-ai-basics`) with an AI coding agent, one skill after another: 1-start → 2-scope → 3-prd → 4-spec → 5-build → 6-ship. The planning docs are in `devpost/`, and `docs/SKILL_PACK_LOG.md` is an honest log of the process.
- Stack: plain HTML, CSS and JavaScript modules. No framework, no build step, no dependencies. Hosted on GitHub Pages.
- Rules engine in `src/rules.js`: tactic patterns with weights, link parsing (handles two-part endings like `.co.uk`), next-steps builder.
- Built as 4 thin vertical slices, each checked by `node --test` and a headless-browser check, each with its own commit.
- 20 unit tests, including messages that must stay "Low risk" and everyday phrases that must not trigger.
- Demo video: generated from the live app with a scripted browser (puppeteer), a free neural TTS voice and ffmpeg. Captions are burned in, and there is no music.

*Question: what was your part versus the agent's? Judges and the rules care about this (see Risks below).*

## Challenges we ran into
Facts (from `devpost/checklist.md` → Revisions, and the git history; only list what really happened):
- Double counting: a brand name inside a fake link was flagged as impersonation and also on the link card. Link words are now explained only by the link card.
- The most important step ("Already paid or shared something?") was cut off when the next-steps list was capped at six. It now always stays.
- With many tactics, the highlighted message scrolled out of view on desktop. It is now sticky.
- While recording the demo, the verdict was hidden under the sticky header after a check. Fixed with `scroll-padding-top`.
- The hackathon rules say no third-party trademarks in the video. The samples became brand-free, and a general "fake name glued to the front of a different site" link rule was added.
- Ongoing: avoiding false alarms on everyday messages. Tests make sure messages like "I'm fine, see you at dinner!" stay Low risk.

## Accomplishments that we're proud of
Facts:
- Every warning points at the exact words. Nothing is a black box.
- No API key, no cost, no data collection. It works offline once loaded.
- Accessible: 18px base text, a larger-text mode, keyboard support, user text is never treated as HTML (XSS-safe).
- A planning trail that matches the code: scope → PRD acceptance criteria → tests.

*Question: which of these do you actually care about most?*

## What we learned
*This one has to be yours. Prompts: What did scope-first planning change? What surprised you about how scam messages are built? What would you do differently with the agent next time?*

## What's next
Facts (from `devpost/prd.md` → Possible Later Enhancements, and the README roadmap):
- Screenshot input with on-device text recognition (OCR).
- More languages (the rules are English-only today).
- "Share to Second Look" from the phone's share sheet / installable app (PWA).
- A practice ("teach me") mode built from the same rules.
- Community-contributed rule packs.

*Question: which of these would you really build first, and why?*

## Built with (tags)
`html` · `css` · `javascript` · `node.js` · `github-pages` · `devpost-skill-pack`
(Optional, for the video tooling: `puppeteer` · `ffmpeg` · `edge-tts`)

## Disclosures to include somewhere in the text
- Built with an AI coding agent following the Devpost Skill Pack. The rules allow AI coding assistants.
- No pre-existing code; no third-party APIs or data. The samples are invented.
- The demo video's voice is a free text-to-speech voice reading a script written with the agent. Re-record it in your own voice if you prefer (see `docs/VIDEO_SCRIPT.md`).

## Before you press Submit
- [ ] Repo is public, the MIT license shows in the About section, and `devpost/scope.md`, `prd.md`, `spec.md` are in it.
- [ ] Video is **public** (not unlisted) on YouTube or Vimeo, and under 3:00.
- [ ] README video link updated (it says "coming soon" now).
- [ ] All text fields are in your own words.
- [ ] Your Devpost profile shows nothing you don't want public. Rule 10 lets Devpost publicize your name, hometown and country.
