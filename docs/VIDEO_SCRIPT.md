# Second Look — demo video script

Length: **2:35** (the limit is under 3:00). English narration, burned-in captions, **no music**.
Voice: the free `edge-tts` neural voice `en-US-GuyNeural`. The author can record their own voice over the same timings instead.
A draft render is produced locally at `video/demo.mp4` by the scripts in `video/` (see `video/README.md`); captions are in `video/demo.srt`.

Upload to YouTube or Vimeo as **public** (not unlisted or private). Suggested title: “Second Look — a calm second opinion for suspicious messages”.

| # | Time | Shot (what is on screen) | Narration |
|---|---|---|---|
| 1 | 0:00–0:05 | Title card: Second Look logo, tagline, 'Build With AI: Basics'. | This is Second Look: a calm second opinion for messages that feel off. |
| 2 | 0:05–0:25 | Card with two example scam texts (fake delivery fee, 'Grandma, it's me'). | Scam texts and emails are built to make you act before you think. A fake delivery fee. A grandchild in trouble. The usual advice, be careful, doesn't help in the moment. What helps is someone who reads the message with you, and points at the tricks. |
| 3 | 0:25–0:36 | Live app home page; cursor moves to the message box and the privacy badge. | So you paste the message into Second Look. It runs entirely in your browser. There's no account, no server, and nothing is uploaded. |
| 4 | 0:36–1:01 | Click 'Package delivery text' sample; verdict High risk; hover highlights; scroll to the link card. | Here's a typical package delivery text. Second Look says High risk, with four warning signs. It marks the exact words: a redelivery fee, within 24 hours, will be returned to sender. And it checks the link. The address starts with postal-service.com, but the site you'd actually visit is help-center.top. |
| 5 | 1:01–1:20 | Click the grandparent sample; tap 'don't tell Mom' highlight, card flashes; tap 'gift cards'. | Now, the grandparent scam. Tap any marked phrase to see why it matters. Don't tell Mom. Scammers isolate you, because a relative would spot the trick. Gift cards, and send me the codes: money you can never get back. |
| 6 | 1:20–1:35 | Scroll to 'What to do in the next 5 minutes'; click 'Ask someone I trust'; 'Copied' confirmation appears. | Then it tells you what to do in the next five minutes, tailored to what it found, and always ending with what to do if you already paid. Ask someone I trust copies a ready-to-send note, with the verdict and the message, so a family member can take a look. |
| 7 | 1:35–1:43 | Click 'Normal reminder' sample; green Low risk verdict. | A normal message stays calm. Low risk, with an honest reminder that no tool is a guarantee. |
| 8 | 1:43–1:51 | Toggle 'A+ Larger text'; then the phone-size layout. | There's a larger text mode for anyone who needs it, and it works on a phone. |
| 9 | 1:51–2:25 | Slides: the devpost/ planning docs (scope, PRD, spec, checklist) and the 20 passing tests. | I built Second Look for Build With AI: Basics, using the Devpost Skill Pack with an AI coding agent. Scope came first, and it cut the obvious idea of plugging in an AI model. That would cost money, send private messages to a third party, and couldn't show why. Instead: clear rules that point at the exact words. Then a PRD with acceptance criteria, a technical spec, and four thin slices, each tested and committed. Twenty automated tests include the messages that must stay calm. |
| 10 | 2:25–2:35 | Closing card: live URL, GitHub repo, MIT license. | Second Look is free, open source under the MIT license, and live on GitHub Pages. Take a second look, before you act. |

## Notes

- All sample messages are invented, use no real company names, and point to made-up domains. No real person, phone number or account appears. (The rules say the video must not include third-party trademarks.)
- Every claim in the narration is visible on screen: the verdict, the four signs in the package text, the real site `help-center.top`, the tactic cards, the steps ending with the already-paid step, the copy-a-note button, larger text, and the phone layout.
- The “how it was built” card lists the four Skill Pack docs in `devpost/` and real test names from `tests/rules.test.js`.
- “Live on GitHub Pages” in the last scene is only true once the repo is published and Pages is on. Publish before uploading the video.
- To rebuild after a UI change: `python3 tts.py && node slides.mjs && node record.mjs && python3 build_video.py && python3 make_script.py`. Timings come from the narration audio, so picture and sound stay in sync.
- Watch it once end to end before uploading.
