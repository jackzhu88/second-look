# Demo video tooling

The demo video is generated, not hand-edited, so it can be rebuilt after UI changes.

- `scenes.json`: shot list and narration lines (also the caption source).
- `slides/`: title, problem, "how it was built" and closing cards (plain HTML).
- `slides.mjs`: renders the cards to PNG. `record.mjs`: drives the live app with a scripted cursor and records each scene. Both need `puppeteer-core` and Chrome, plus a local server on port 8931 (`python3 -m http.server 8931` from the repo root).
- `tts.py`: synthesizes each line with the free `edge-tts` voice `en-US-GuyNeural` and writes `work/timed.json`.
- `build_video.py`: joins the scenes, narration and burned-in captions with ffmpeg into `demo.mp4`.

Order: `python3 tts.py`, `node slides.mjs`, `node record.mjs`, `python3 build_video.py`, then `python3 make_script.py` to refresh `docs/VIDEO_SCRIPT.md`.
- `demo.srt`: captions, also uploadable as a separate subtitle track.

No music. `work/` and the rendered `demo.mp4` are not committed.
