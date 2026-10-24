"""Write docs/VIDEO_SCRIPT.md from scenes.json + work/timed.json (run from video/ after tts.py)."""
import json
sc = json.load(open('work/timed.json'))
CAP = {'postal-service dot com': 'postal-service.com', 'help-center dot top': 'help-center.top'}
mmss = lambda x: f"{int(x // 60)}:{int(x % 60):02d}"
total = sum(s['total'] for s in sc)
out = ["# Second Look — demo video script", "",
       f"Length: **{mmss(total)}** (the limit is under 3:00). English narration, burned-in captions, **no music**.",
       "Voice: the free `edge-tts` neural voice `en-US-GuyNeural`. The author can record their own voice over the same timings instead.",
       "A draft render is produced locally at `video/demo.mp4` by the scripts in `video/` (see `video/README.md`); captions are in `video/demo.srt`.", "",
       "Upload to YouTube or Vimeo as **public** (not unlisted or private). Suggested title: “Second Look — a calm second opinion for suspicious messages”.", "",
       "| # | Time | Shot (what is on screen) | Narration |", "|---|---|---|---|"]
t = 0
for n, s in enumerate(sc, 1):
    nar = ' '.join(s['lines'])
    for k, v in CAP.items(): nar = nar.replace(k, v)
    out.append(f"| {n} | {mmss(t)}–{mmss(t + s['total'])} | {s['shot']} | {nar} |"); t += s['total']
out += ["", "## Notes", "",
        "- All sample messages are invented, use no real company names, and point to made-up domains. No real person, phone number or account appears. (The rules say the video must not include third-party trademarks.)",
        "- Every claim in the narration is visible on screen: the verdict, the four signs in the package text, the real site `help-center.top`, the tactic cards, the steps ending with the already-paid step, the copy-a-note button, larger text, and the phone layout.",
        "- The “how it was built” card lists the four Skill Pack docs in `devpost/` and real test names from `tests/rules.test.js`.",
        "- “Live on GitHub Pages” in the last scene is only true once the repo is published and Pages is on. Publish before uploading the video.",
        "- To rebuild after a UI change: `python3 tts.py && node slides.mjs && node record.mjs && python3 build_video.py && python3 make_script.py`. Timings come from the narration audio, so picture and sound stay in sync.",
        "- Watch it once end to end before uploading.", ""]
open('../docs/VIDEO_SCRIPT.md', 'w').write('\n'.join(out))
print(mmss(total))
