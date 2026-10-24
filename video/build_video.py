"""Assemble video/demo.mp4 from recorded scenes, slide PNGs and edge-tts narration. Run after record.mjs."""
import json, subprocess
W = 'work'
sc = json.load(open(f'{W}/timed.json'))
CAP = {'postal-service dot com': 'postal\u2011service.com', 'help-center dot top': 'help\u2011center.top'}  # non-breaking hyphens keep domains on one caption line
def run(a): subprocess.run(a, check=True)
segs, lines, off = [], [], 0.0
for s in sc:
    D = s['total']; out = f"{W}/seg_{s['id']}.mp4"
    vf = 'fps=30,format=yuv420p,setsar=1'
    if s['kind'] == 'slide':
        run(['ffmpeg','-v','error','-y','-loop','1','-t',str(D),'-i',f"{W}/{s['slide']}.png",'-vf',vf,'-c:v','libx264','-preset','medium','-crf','18',out])
    else:
        run(['ffmpeg','-v','error','-y','-ss','0.5','-i',f"{W}/{s['id']}.webm",'-t',str(D),'-vf',vf+',tpad=stop_mode=clone:stop_duration=2','-t',str(D),'-c:v','libx264','-preset','medium','-crf','18',out])
    segs.append(out)
    t = 0.3
    for i, (txt, d) in enumerate(zip(s['lines'], s['durs'])):
        c = txt
        for k, v in CAP.items(): c = c.replace(k, v)
        lines.append((off + t, off + t + d, c, f"{W}/{s['id']}_{i}.mp3")); t += d + 0.35
    off += D
open(f'{W}/list.txt','w').write(''.join(f"file '{p.split('/')[-1]}'\n" for p in segs))
run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i',f'{W}/list.txt','-c','copy',f'{W}/video_only.mp4'])
ins, flt = [], []
for i, (a, b, c, f) in enumerate(lines):
    ins += ['-i', f]; ms = int(a * 1000); flt.append(f'[{i}:a]adelay={ms}|{ms}[a{i}]')
flt.append(''.join(f'[a{i}]' for i in range(len(lines))) + f'amix=inputs={len(lines)}:normalize=0,apad,atrim=0:{off:.2f}[out]')
run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',';'.join(flt),'-map','[out]','-ar','48000','-ac','2',f'{W}/narration.wav'])
def ts(x): h=int(x//3600); m=int(x%3600//60); s=x%60; return f'{h:02}:{m:02}:{s:06.3f}'.replace('.',',')
open('demo.srt','w').write('\n'.join(f'{i+1}\n{ts(a)} --> {ts(b)}\n{c}\n' for i,(a,b,c,_) in enumerate(lines)))
style = 'FontName=DejaVu Sans,FontSize=11,PrimaryColour=&H00FFFFFF,BackColour=&H99000000,BorderStyle=4,Outline=0,Shadow=0,MarginV=10,MarginL=30,MarginR=30'
run(['ffmpeg','-v','error','-y','-i',f'{W}/video_only.mp4','-i',f'{W}/narration.wav','-vf',f"subtitles=demo.srt:force_style='{style}',fade=in:0:15,fade=out:st={off-0.6:.2f}:d=0.6",
     '-c:v','libx264','-preset','medium','-crf','20','-af','loudnorm=I=-16:TP=-1.5','-c:a','aac','-b:a','160k','-movflags','+faststart','-shortest','demo.mp4'])
print('duration', round(off, 2), 'captions', len(lines))
