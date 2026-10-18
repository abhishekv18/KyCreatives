"""
Prepares portfolio imagery for the site.

Sources (not committed, paths passed on the command line):
  --mockups  folder of KY Creatives' own portfolio images from kycreatives.com
             (tablet mockups, 800x1020 or 1205x1536). We crop the tablet screen.
  --shots    folder of 1440px-wide screenshots of client sites that are live
             and credit KY Creatives (captured with headless Chrome).
  --brand    folder holding the official logo and flame icon from kycreatives.com

Output: public/images/work/*.webp and public/brand/*
Run: python scripts/prepare-images.py --mockups <dir> --shots <dir> --brand <dir>
"""
import argparse
import os
from PIL import Image

OUT = os.path.join(os.path.dirname(__file__), "..", "public")

# Portfolio image filename -> project slug. Domains are printed on each mockup.
MOCKUPS = {
    "2023_04_3.jpg": "banglarjalapath",
    "2023_04_9.jpg": "sarvdharamsewasangh",
    "2023_12_Botinherbs.jpg": "botinherbs",
    "2024_07_13.jpg": "rudrapolyplast",
    "2024_07_14.jpg": "unlikelifestyle",
    "2024_07_15.jpg": "couponvolume",
    "2024_07_Website-Portfolio-1.jpg": "maapitambara",
    "2024_07_Website-Portfolio-2.jpg": "asrithms",
    "2024_08_Best-Website-Development-company-in-India-1.jpg": "mksct",
    "2024_11_Best-Website-Development-company-in-India-1.jpg": "notahoax",
    "2024_11_Best-Website-Development-company-in-India-2.jpg": "newindia",
    "2024_11_Best-Website-Development-company-in-India-4.jpg": "nirmaltrends",
    "2024_11_Best-Website-Development-company-in-India.jpg": "australglazing",
    "2025_01_Best-Website-Development-company-in-India-1.jpg": "pinkdinosaur",
    "2025_01_Best-Website-Development-company-in-India.jpg": "property-box",
    "2025_06_Best-Website-Development-company-in-India.jpg": "healeroftheages",
    "2025_06_Best-Website-Development-company-in-gurugram.jpg": "petsway",
    "2025_10_Best-Website-Development-company-in-India-1.jpg": "globalayurveda",
    "2025_10_Best-Website-Development-company-in-India-2.jpg": "primeexpertsolution",
    "2025_10_Best-Website-Development-company-in-India-3.jpg": "thedecorshed",
    "2025_10_Best-Website-Development-company-in-India.jpg": "vibhadesigns",
}

# Screen area inside the tablet mockup, as fractions of the image.
SCREEN = (0.1225, 0.1285, 0.7835, 0.8725)

SHOTS = {
    "thedecorshed.png": "thedecorshed",
    "vibhadesigns.png": "vibhadesigns",
    "petsway.png": "petsway",
    "notahoax.png": "notahoax",
    "pinkdinosaur.png": "pinkdinosaur",
}


def save(im, name, width):
    h = round(im.height * width / im.width)
    im.resize((width, h), Image.LANCZOS).save(
        os.path.join(OUT, "images", "work", name), "WEBP", quality=80, method=6
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mockups", required=True)
    ap.add_argument("--shots", required=True)
    ap.add_argument("--brand", required=True)
    a = ap.parse_args()
    os.makedirs(os.path.join(OUT, "images", "work"), exist_ok=True)
    os.makedirs(os.path.join(OUT, "brand"), exist_ok=True)

    for fn, slug in MOCKUPS.items():
        im = Image.open(os.path.join(a.mockups, fn)).convert("RGB")
        w, h = im.size
        x0, y0, x1, y1 = SCREEN
        screen = im.crop((round(w * x0), round(h * y0), round(w * x1), round(h * y1)))
        # Portrait 4:5 crop from the top of the screen.
        sw = screen.width
        screen = screen.crop((0, 0, sw, min(screen.height, round(sw * 1.25))))
        save(screen, f"{slug}-portfolio.webp", min(720, sw))

    for fn, slug in SHOTS.items():
        im = Image.open(os.path.join(a.shots, fn)).convert("RGB")
        # Portrait 4:5 from the top of the page, used in browser frames.
        tall = im.crop((0, 0, 1440, 1800))
        save(tall, f"{slug}-site.webp", 1200)
        save(tall, f"{slug}-site-sm.webp", 640)
        # Landscape 16:10 for wide frames.
        wide = im.crop((0, 0, 1440, 900))
        save(wide, f"{slug}-wide.webp", 1440)
        save(wide, f"{slug}-wide-sm.webp", 720)
        # Long scroll for in-frame scrolling previews.
        long_ = im.crop((0, 0, 1440, min(im.height, 2400)))
        save(long_, f"{slug}-long.webp", 960)

    # Brand files are copied untouched (logo must never be altered).
    for src, dst in (("logo-site.png", "ky-creatives-logo.png"), ("icon-full.png", "ky-flame-icon.png")):
        with open(os.path.join(a.brand, src), "rb") as f, open(os.path.join(OUT, "brand", dst), "wb") as g:
            g.write(f.read())
    print("done")


if __name__ == "__main__":
    main()
