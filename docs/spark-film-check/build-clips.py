"""Spark sayfası açılış kartının 4 saniyelik önizlemesi ve posteri.

Kaynak: fspark9-motion SparkPromo (video 07, 1080x1350, 4:5, 30 fps). Aralık:
kare 88 (kesim kıvılcımı sayfanın üstünde, sayfa henüz bütün) ile 135 ("No more
boring blogs." / "Sıkıcı bloglar bitti." yazısı tam oturdu; 135'te kare bir
önceki kareyle aynı, sonra sadece ince iplik kıpırtısı var). 48 kare (1,6 sn),
son kare 72 kare tutulur, klip 4,0 sn. Kareler 1x PNG olarak Remotion'dan
çizilir (orijinal dosyalara dokunulmaz):

  npx remotion render SparkPromo <out>/en --sequence --frames=60-185 --image-format=png
  npx remotion render SparkPromo <out>/tr --sequence --frames=60-185 --image-format=png --props='{"locale":"tr"}'

Kullanım: python build-clips.py <ffmpeg> <render-kökü> <public/video>
"""
import os, shutil, subprocess, sys, tempfile
from PIL import Image

ff, root, out = sys.argv[1:4]
FIRST, LAST = 88, 135
FRAMES = 120                   # 4,0 s @ 30 fps
SIZE = (544, 680)              # tam 4:5 (540x675'in yüksekliği tek, yuv420p kodlanamaz); sitede 400x500, retina için yeterli; kırpma yok
CRF = {"x264": 18, "vp9": 30}

for lang in ("en", "tr"):
    src = os.path.join(root, lang)
    tmp = tempfile.mkdtemp()
    seq = list(range(FIRST, LAST + 1)) + [LAST] * (FRAMES - (LAST - FIRST + 1))
    for i, n in enumerate(seq):
        im = Image.open(os.path.join(src, f"element-{n:03d}.png")).convert("RGB").resize(SIZE, Image.LANCZOS)
        im.save(os.path.join(tmp, f"f{i:04d}.png"))
    base = os.path.join(out, f"spark-preview-{lang}")
    common = ["-an", "-map_metadata", "-1", "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709"]
    vf = "scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p"
    subprocess.run([ff, "-v", "error", "-y", "-framerate", "30", "-i", os.path.join(tmp, "f%04d.png"), "-vf", vf, *common,
                    "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-preset", "veryslow", "-crf", str(CRF["x264"]),
                    "-tune", "animation", "-g", "120", "-movflags", "+faststart", f"{base}.mp4"], check=True)
    subprocess.run([ff, "-v", "error", "-y", "-framerate", "30", "-i", os.path.join(tmp, "f%04d.png"), "-vf", vf, *common,
                    "-c:v", "libvpx-vp9", "-pix_fmt", "yuv420p", "-b:v", "0", "-crf", str(CRF["vp9"]), "-row-mt", "1",
                    "-deadline", "good", "-cpu-used", "1", "-g", "120", f"{base}.webm"], check=True)
    # Poster = klibin son karesi, aynı ölçekleme: son kareden postere geçişte görüntü değişmez.
    last = Image.open(os.path.join(tmp, f"f{FRAMES - 1:04d}.png"))
    poster = os.path.join(out, f"spark-poster-{lang}")
    last.save(f"{poster}.avif", quality=85, subsampling="4:4:4")
    last.save(f"{poster}.webp", quality=86, method=6)
    shutil.rmtree(tmp)
    for ext in ("mp4", "webm"):
        print(f"{base}.{ext}", os.path.getsize(f"{base}.{ext}"))
    for ext in ("avif", "webp"):
        print(f"{poster}.{ext}", os.path.getsize(f"{poster}.{ext}"))
