# Cuts the 4.0 s hero preview from Burak's raw intro takes (30 fps conforms of
# the original .mov, never the captioned renders), applies the film's colour
# match + grade (scripts/*/build-edit.py), crops 1:1 on the face, B/W, tone to
# the site portrait, 640x640 25 fps, no audio. Writes MP4 (H.264 high), WebM
# (VP9) and the first frame as JPG.
import sys, subprocess, os, json
ff, out = sys.argv[1], sys.argv[2]
CRF = {'tr': (24, 36), 'en': (26, 40)}

M = '/Users/m.burakdikmen/Projects/fspark9-motion/projects'
GRADE = 'eq=contrast=1.05:saturation=1.04:gamma=0.985,colorbalance=rs=0.03:gs=0.004:bs=-0.03:rm=0.02:bm=-0.02:rh=0.008:bh=-0.012'
CLIPS = {
    # take, colour-match gain (TR take 1 is the reference; EN intro is lifted 1.10 like the film), face centre x, first frame, tone curve
    'tr': (f'{M}/TRmbdvideofinal/work/01_giris.cfr.mp4', 1.0, 585, 28, '0/0 0.157/0.086 0.549/0.588 0.902/0.973 1/1'),
    'en': (f'{M}/ENMBDvideofinal/work/01_intro.cfr.mp4', 1.10, 512, 28, '0/0 0.176/0.086 0.6/0.588 1/1'),
}
os.makedirs(out, exist_ok=True)
for lang, (src, gain, cx, f0, curve) in CLIPS.items():
    lut = f"lutrgb=r='clip(val*{gain:.4f},0,255)':g='clip(val*{gain:.4f},0,255)':b='clip(val*{gain:.4f},0,255)'"
    vf = (f"trim=start_frame={f0}:end_frame={f0 + 122},setpts=PTS-STARTPTS,format=rgb24,{lut},{GRADE},"
          f"crop=720:720:{cx - 360}:0,scale=640:640:flags=lanczos,hue=s=0,curves=all='{curve}',fps=25")
    master = f'{out}/_{lang}.mkv'
    subprocess.run([ff, '-v', 'error', '-y', '-i', src, '-an', '-vf', vf, '-frames:v', '100', '-c:v', 'ffv1', '-pix_fmt', 'yuv444p', master], check=True)
    base = f'{out}/hero-preview-{lang}'
    subprocess.run([ff, '-v', 'error', '-y', '-i', master, '-an', '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
                    '-preset', 'veryslow', '-crf', str(CRF[lang][0]), '-tune', 'film', '-g', '100', '-movflags', '+faststart', f'{base}.mp4'], check=True)
    subprocess.run([ff, '-v', 'error', '-y', '-i', master, '-an', '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuv420p', '-b:v', '0', '-crf', str(CRF[lang][1]),
                    '-row-mt', '1', '-deadline', 'good', '-cpu-used', '1', '-g', '100', f'{base}.webm'], check=True)
    subprocess.run([ff, '-v', 'error', '-y', '-i', master, '-frames:v', '1', '-q:v', '4', f'{base}.jpg'], check=True)
    subprocess.run([ff, '-v', 'error', '-y', '-sseof', '-0.04', '-i', master, '-frames:v', '1', f'{out}/_{lang}_last.png'], check=True)
    for ext in ('mp4', 'webm', 'jpg'):
        print(lang, ext, os.path.getsize(f'{base}.{ext}') // 1024, 'KB')
