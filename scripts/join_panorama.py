#!/usr/bin/env python3
"""
Une 4 imágenes verticales (secciones de un panorama) en una sola imagen larga.

Uso:
    python3 scripts/join_panorama.py section1.webp section2.webp section3.webp section4.webp output.webp

La unión usa blending lineal en la zona de solapamiento para suavizar transiciones.
"""
import sys
from PIL import Image


def blend_vertical(img_top: Image.Image, img_bottom: Image.Image, overlap_px: int = 200) -> Image.Image:
    """
    Une dos imágenes verticalmente con un gradiente de transición en la zona de solapamiento.
    """
    if img_top.width != img_bottom.width:
        # Redimensionar la segunda al ancho de la primera
        ratio = img_top.width / img_bottom.width
        new_h = int(img_bottom.height * ratio)
        img_bottom = img_bottom.resize((img_top.width, new_h), Image.Resampling.LANCZOS)

    w = img_top.width
    h_top = img_top.height
    h_bottom = img_bottom.height

    # Altura final: suma menos el solapamiento
    final_h = h_top + h_bottom - overlap_px
    result = Image.new('RGB', (w, final_h))

    # Zona sin solapamiento de la imagen superior
    result.paste(img_top.crop((0, 0, w, h_top - overlap_px)), (0, 0))

    # Zona de blending
    for y in range(overlap_px):
        alpha = y / overlap_px  # 0.0 -> imagen top, 1.0 -> imagen bottom
        row_top = img_top.crop((0, h_top - overlap_px + y, w, h_top - overlap_px + y + 1))
        row_bottom = img_bottom.crop((0, y, w, y + 1))

        blended = Image.blend(row_top, row_bottom, alpha)
        result.paste(blended, (0, h_top - overlap_px + y))

    # Resto de la imagen inferior
    result.paste(img_bottom.crop((0, overlap_px, w, h_bottom)), (0, h_top))

    return result


def main():
    if len(sys.argv) < 6:
        print("Uso: python3 join_panorama.py s1.webp s2.webp s3.webp s4.webp output.webp [overlap_px]")
        sys.exit(1)

    paths = sys.argv[1:5]
    output_path = sys.argv[5]
    overlap = int(sys.argv[6]) if len(sys.argv) > 6 else 200

    images = [Image.open(p).convert('RGB') for p in paths]

    result = images[0]
    for i, img in enumerate(images[1:], start=2):
        print(f"Uniendo sección {i}...")
        result = blend_vertical(result, img, overlap)

    result.save(output_path, 'WEBP', quality=85, method=6)
    print(f"✅ Guardado: {output_path} ({result.width}×{result.height}px)")


if __name__ == '__main__':
    main()
