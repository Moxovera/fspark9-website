"""Hizmetler halka videosunun 4 saniyelik önizlemesi ve posteri.

Kaynak: fspark9-motion ServicesOverview (video 11), kapanıştaki kadranın
çizilip dolduğu ve kesimin 9. dilim olarak oturduğu an. Teslim edilen MP4
1080x1350; kırpma 440 piksel olduğu için aralık Remotion'dan 2x çizilir
(PNG dizisi, orijinal dosyalara dokunulmaz):

  npx remotion render ServicesOverview <out>/r2x-en --sequence --frames=700-889 --scale=2 --image-format=png
  npx remotion render ServicesOverview <out>/r2x-tr --sequence --frames=700-889 --scale=2 --image-format=png --props='{"locale":"tr"}'

Kullanım: python build-clips.py <ffmpeg> <render-kökü> <public/video>
"""
import os, shutil, subprocess, sys, tempfile
from PIL import Image

ff, root, out = sys.argv[1:4]
FIRST, LAST = 776, 889          # metin kadrajdan çıktıktan sonra; videonun son karesi
FRAMES = 120                    # 4,0 s @ 30 fps; 776..889 = 114 kare, son kare 6 kez tutulur (kadran zaten durgun)
CROP = (640, 151, 880)          # 2x karede kadranın merkezi (1079, 591), kare 880; altındaki etiket (y 1060) dışarıda
SIZE = 720
CRF = {"x264": 16, "vp9": 28}

for lang in ("en", "tr"):
    src = os.path.join(root, f"r2x-{lang}")
    tmp = tempfile.mkdtemp()
    seq = list(range(FIRST, LAST + 1)) + [LAST] * (FRAMES - (LAST - FIRST + 1))
    for i, n in enumerate(seq):
        os.symlink(os.path.join(src, f"element-{n}.png"), os.path.join(tmp, f"f{i:04d}.png"))
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
    im = Image.open(os.path.join(src, f"element-{LAST}.png")).convert("RGB").crop((x, y, x + s, y + s)).resize((SIZE, SIZE), Image.LANCZOS)
    poster = os.path.join(out, f"services-poster-{lang}")
    im.save(f"{poster}.avif", quality=70)
    im.save(f"{poster}.webp", quality=86, method=6)
    shutil.rmtree(tmp)
    for ext in ("mp4", "webm"):
        print(f"{base}.{ext}", os.path.getsize(f"{base}.{ext}"))
    for ext in ("avif", "webp"):
        print(f"{poster}.{ext}", os.path.getsize(f"{poster}.{ext}"))
