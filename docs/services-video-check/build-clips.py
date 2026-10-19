"""Hizmetler halka videosunun 4 saniyelik önizlemesi ve posteri.

Kaynak: fspark9-motion ServicesOverview (video 11), videonun açılışı
(açılış filmindeki portre önizlemesi gibi): "Four problems that cost you
months." / TR karşılığı, kare 0 ile 83 (2,8 sn; 84'te video Paper zemine
geçiyor ve ortak kartları daireye sığmıyor). Son kare 36 kare tutulur,
klip 4,0 sn. Kare 1x PNG olarak Remotion'dan çizilir (orijinal dosyalara
dokunulmaz):

  npx remotion render ServicesOverview <out>/open-en --sequence --frames=0-179 --image-format=png
  npx remotion render ServicesOverview <out>/open-tr --sequence --frames=0-179 --image-format=png --props='{"locale":"tr"}'

Kullanım: python build-clips.py <ffmpeg> <render-kökü> <public/video>
"""
import os, shutil, subprocess, sys, tempfile
from PIL import Image

ff, root, out = sys.argv[1:4]
FIRST, LAST = 0, 83            # açılış başlığı; 84'te Paper'a geçiş başlıyor
FRAMES = 120                   # 4,0 s @ 30 fps; 0..83 = 84 kare, son kare 36 kez tutulur (başlık okunur)
CROP = (4, 158, 960)           # başlığın en küçük çevre dairesi (EN r 459, TR r 378) iki dilde de içeride, en az 18 px pay; üstteki etiket (r 508+) dışarıda
SIZE = 720
CRF = {"x264": 16, "vp9": 28}

for lang in ("en", "tr"):
    src = os.path.join(root, f"open-{lang}")
    tmp = tempfile.mkdtemp()
    seq = list(range(FIRST, LAST + 1)) + [LAST] * (FRAMES - (LAST - FIRST + 1))
    for i, n in enumerate(seq):
        os.symlink(os.path.join(src, f"element-{n:03d}.png"), os.path.join(tmp, f"f{i:04d}.png"))
    x, y, s = CROP
    vf = f"crop={s}:{s}:{x}:{y},scale={SIZE}:{SIZE}:flags=lanczos"
    master = os.path.join(tmp, "master.mkv")
    subprocess.run([ff, "-v", "error", "-y", "-framerate", "30", "-i", os.path.join(tmp, "f%04d.png"), "-vf", vf,
                    "-c:v", "ffv1", "-pix_fmt", "yuv444p", master], check=True)
    base = os.path.join(out, f"services-preview-{lang}")
    common = ["-an", "-map_metadata", "-1", "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709"]
    subprocess.run([ff, "-v", "error", "-y", "-i", master, *common, "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
                    "-preset", "veryslow", "-crf", str(CRF["x264"]), "-tune", "animation", "-g", "120", "-movflags", "+faststart",
                    f"{base}.mp4"], check=True)
    subprocess.run([ff, "-v", "error", "-y", "-i", master, *common, "-c:v", "libvpx-vp9", "-pix_fmt", "yuv420p", "-b:v", "0",
                    "-crf", str(CRF["vp9"]), "-row-mt", "1", "-deadline", "good", "-cpu-used", "1", "-g", "120", f"{base}.webm"], check=True)
    # Poster = klibin son karesi (aynı kırpma): son kareden postere geçiş görünmez.
    im = Image.open(os.path.join(src, f"element-{LAST:03d}.png")).convert("RGB").crop((x, y, x + s, y + s)).resize((SIZE, SIZE), Image.LANCZOS)
    poster = os.path.join(out, f"services-poster-{lang}")
    im.save(f"{poster}.avif", quality=70)
    im.save(f"{poster}.webp", quality=86, method=6)
    shutil.rmtree(tmp)
    for ext in ("mp4", "webm"):
        print(f"{base}.{ext}", os.path.getsize(f"{base}.{ext}"))
    for ext in ("avif", "webp"):
        print(f"{poster}.{ext}", os.path.getsize(f"{poster}.{ext}"))
