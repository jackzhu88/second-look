"""Step 1: synthesize each narration line with free edge-tts and write work/timed.json with durations."""
import json, os, subprocess
EDGE = os.environ.get('EDGE_TTS', 'edge-tts')
os.makedirs('work', exist_ok=True)
sc = json.load(open('scenes.json'))
PAD = {'s8': 1.8}  # extra hold so the phone view is visible
for s in sc:
    s['durs'] = []
    for i, t in enumerate(s['lines']):
        fn = f"work/{s['id']}_{i}.mp3"
        if not os.path.exists(fn):
            subprocess.run([EDGE, '--voice', 'en-US-GuyNeural', '--text', t, '--write-media', fn], check=True, capture_output=True)
        s['durs'].append(float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', fn])))
    s['total'] = round(sum(s['durs']) + 0.35 * len(s['durs']) + 0.6 + PAD.get(s['id'], 0), 2)
json.dump(sc, open('work/timed.json', 'w'), indent=1)
print('total seconds:', round(sum(s['total'] for s in sc), 1))
