#!/usr/bin/env python3
"""Remove baked-in letterbox bars and center-crop card thumbnails to 16:9."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

TARGET_SIZE = (1920, 1080)
BAR_THRESHOLD = 25
BAR_ROW_RATIO = 0.95
MIN_BAR_HEIGHT = 20


def is_black(pixel: tuple[int, ...]) -> bool:
    return sum(pixel[:3]) < BAR_THRESHOLD


def detect_letterbox(img: Image.Image) -> tuple[int, int]:
    rgb = img.convert("RGB")
    width, height = rgb.size
    pixels = rgb.load()

    top = 0
    for y in range(height):
        samples = [pixels[x, y] for x in range(0, width, max(1, width // 100))]
        if sum(is_black(sample) for sample in samples) / len(samples) > BAR_ROW_RATIO:
            top += 1
        else:
            break

    bottom = 0
    for y in range(height - 1, -1, -1):
        samples = [pixels[x, y] for x in range(0, width, max(1, width // 100))]
        if sum(is_black(sample) for sample in samples) / len(samples) > BAR_ROW_RATIO:
            bottom += 1
        else:
            break

    return top, bottom


def crop_to_card(img: Image.Image) -> Image.Image | None:
    top, bottom = detect_letterbox(img)
    if top < MIN_BAR_HEIGHT and bottom < MIN_BAR_HEIGHT:
        return None

    width, height = img.size
    content = img.crop((0, top, width, height - bottom))
    content_w, content_h = content.size
    target_ratio = 16 / 9
    content_ratio = content_w / content_h

    if content_ratio > target_ratio:
        crop_w = int(content_h * target_ratio)
        left = (content_w - crop_w) // 2
        content = content.crop((left, 0, left + crop_w, content_h))
    elif content_ratio < target_ratio:
        crop_h = int(content_w / target_ratio)
        top_crop = (content_h - crop_h) // 2
        content = content.crop((0, top_crop, content_w, top_crop + crop_h))

    return content.resize(TARGET_SIZE, Image.Resampling.LANCZOS)


def process(path: Path, output: Path | None = None) -> bool:
    output = output or path
    with Image.open(path) as img:
        cropped = crop_to_card(img)
        if cropped is None:
            print(f"skip {path} (no letterbox)")
            return False

        save_kwargs: dict = {"quality": 92, "optimize": True}
        if output.suffix.lower() in {".jpg", ".jpeg"}:
            cropped = cropped.convert("RGB")
        elif output.suffix.lower() == ".webp":
            save_kwargs["lossless"] = False

        cropped.save(output, **save_kwargs)
        print(f"cropped {path} -> {output}")
        return True


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("Usage: crop-card-thumbnail.py <image> [output]")
        return 1

    source = Path(argv[1])
    dest = Path(argv[2]) if len(argv) > 2 else source
    process(source, dest)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
