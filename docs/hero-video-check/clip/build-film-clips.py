# Cuts the 4.0 s home hero preview from the fspark9 image film (15-imaj in
# fspark9-motion): the opening montage before the question card (film frames
# 6 to 73, identical in TR and EN), slowed 1.75x, square crop inside the 2.39
# frame, B/W with the tone of the site portrait, 640x640 25 fps, no audio.
# One clip for both languages (only the caption differs, it comes from Sanity).
# Writes MP4 (H.264 high), WebM (VP9) and the first frame as JPG.
# Usage: python3 build-film-clips.py <ffmpeg> <out dir>
import sys, subprocess, os
ff, out = sys.argv[1], sys.argv[2]
SRC = '/Users/m.burakdikmen/Projects/fspark9-motion/projects/TRmbdvideofinal/out/imaj/fspark9-imaj_youtube_16x9.mp4'
CURVE = '0/0 0.157/0.086 0.549/0.588 0.902/0.973 1/1'
os.makedirs(out, exist_ok=True)
# (first frame, end frame, crop x): the Gherkin shot (frames 21 to 32) sits right of centre.
SEGMENTS = [(6, 21, 560), (21, 33, 1060), (33, 74, 560)]
parts = ''.join(f"[0:v]trim=start_frame={a}:end_frame={b},setpts=PTS-STARTPTS,crop=800:800:{x}:140[s{i}];" for i, (a, b, x) in enumerate(SEGMENTS))
vf = (parts + ''.join(f"[s{i}]" for i in range(len(SEGMENTS))) + f"concat=n={len(SEGMENTS)}:v=1:a=0,setpts=1.75*PTS,"
      f"scale=640:640:flags=lanczos,hue=s=0,curves=all='{CURVE}',fps=25")
master = f'{out}/_film.mkv'
subprocess.run([ff, '-v', 'error', '-y', '-i', SRC, '-an', '-filter_complex', vf, '-frames:v', '100', '-c:v', 'ffv1', '-pix_fmt', 'yuv444p', master], check=True)
base = f'{out}/home-film-preview'
subprocess.run([ff, '-v', 'error', '-y', '-i', master, '-an', '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
                '-preset', 'veryslow', '-crf', '26', '-tune', 'film', '-g', '100', '-movflags', '+faststart', f'{base}.mp4'], check=True)
subprocess.run([ff, '-v', 'error', '-y', '-i', master, '-an', '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuv420p', '-b:v', '0', '-crf', '38',
                '-row-mt', '1', '-deadline', 'good', '-cpu-used', '1', '-g', '100', f'{base}.webm'], check=True)
subprocess.run([ff, '-v', 'error', '-y', '-i', master, '-frames:v', '1', '-q:v', '4', f'{base}.jpg'], check=True)
subprocess.run([ff, '-v', 'error', '-y', '-i', master, '-vf', 'fps=2.5,scale=200:-1,tile=5x2', '-frames:v', '1', f'{out}/_sheet.jpg'], check=True)
for ext in ('mp4', 'webm', 'jpg'):
    print(ext, os.path.getsize(f'{base}.{ext}') // 1024, 'KB')
