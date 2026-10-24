# How the Devpost Skill Pack was used

Skill Pack: [`challengepost/learn-ai-basics`](https://github.com/challengepost/learn-ai-basics), installed into this repo with the `skills` CLI
(see `.agents/skills/` and `skills-lock.json`).

This project was built by **jackzhu88 working with an AI coding agent**. The agent read each `SKILL.md` and
followed it step by step; the owner set the goals and constraints and reviews the results. This log is
written to be honest about that split.

| Skill | What it did here | Artifact |
|---|---|---|
| `1-start` | Captured the owner's context (goal: a small, genuinely useful, zero-cost project; deadline; preference for concise async updates). Set up `.gitignore` so the personal profile never reaches the public repo. | `devpost/learner-profile.md` (git-ignored by design), `.gitignore` |
| `2-scope` | Found the **unique kernel**: not just "scam / not scam", but highlighting the exact words and explaining each tactic, all on-device. Named who it's for (an older adult who just got a strange text), the core loop, the POC boundary, and what was **explicitly cut** (AI/LLM classification, live URL reputation lookups, accounts). | [`devpost/scope.md`](../devpost/scope.md) |
| `3-prd` | Turned the scope into a 10-step core journey, screen layout, look & feel and testable acceptance criteria (e.g. "user text is never interpreted as HTML", "a genuine usps.com link has no issues"). | [`devpost/prd.md`](../devpost/prd.md) |
| `4-spec` | Chose the smallest stack that works (plain HTML/CSS/JS modules, Node's built-in test runner, GitHub Pages), defined the `analyze()` result shape, file tree and failure modes. | [`devpost/spec.md`](../devpost/spec.md) |
| `5-build` | Wrote the checklist of 4 vertical slices with the Skill Pack's exact fields, then built one slice at a time — each with mechanical verification (`node --test` + a headless-browser check) and its own commit. Plan changes discovered during the build are recorded under **Revisions**. Generated the app map at the end. | [`devpost/checklist.md`](../devpost/checklist.md), git history, [`devpost/app-map.html`](../devpost/app-map.html) |
| `6-ship` | Ran the submission readiness checks (public repo, license, README, run instructions, demo script). Per the skill, final Devpost answers are written/approved by the owner, not generated. | `README.md`, `docs/VIDEO_SCRIPT.md` |

## What the Skill Pack changed about the result
- **Scope before code** stopped the obvious first idea ("plug in an AI model to classify scams") — that would have needed a paid key, sent private messages to a third party, and couldn't show *why*. The scope step pushed toward transparent rules that point at exact words, which became the core feature.
- **Acceptance criteria → tests**: every PRD criterion maps to a test in `tests/rules.test.js` (19 tests), including a benign pharmacy reminder that must stay "Low risk" and everyday phrases like "I'm fine" that must not trigger.
- **Thin slices with commits**: the app was usable after slice 1 and every later commit added one visible behavior.

## Commit trail
```
Add Devpost Skill Pack and planning docs (scope, PRD, spec, checklist)
Add message checker with verdict and highlights                 # slice 1
Explain each warning sign with tactic cards                     # slice 2
Inspect links and show their real destination                   # slice 3
Add next steps, trusted-person note and larger text             # slice 4
```
