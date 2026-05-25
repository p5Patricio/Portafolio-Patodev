# Prompts para generar el fondo mobile (4 secciones 9:16)

> **Instrucciones generales para cada prompt:**
> 1. Abre un nuevo chat en ChatGPT (para mantener contexto limpio entre secciones)
> 2. Adjunta la imagen `scroll-full.webp`
> 3. Pega el prompt correspondiente
> 4. Cuando termine, guarda la imagen como `section1.webp`, `section2.webp`, etc.
> 5. Si no te gusta el resultado, pide una regeneración antes de pasar a la siguiente sección

---

## 🌸 SECTION 1 of 4 — Top portion (Cielo, Fuji, Sakura, Farolitos)

```
Attached is my website's full background image. I need you to create SECTION 1 of a 4-section vertical panorama for mobile.

This section represents the TOP portion of the scene. Recreate it as a standalone tall portrait image (9:16 aspect ratio, maximum resolution ~1024×1792).

**MANDATORY STYLE (use exactly for all 4 sections):**
- Soft watercolor Japanese illustration style
- Warm cream paper background (#f4eee0 tone)
- Delicate sakura pink accents (#c95b64 tones)
- Soft, diffused golden-hour lighting
- Gentle brush strokes, ethereal and peaceful mood
- No hard edges, everything blends softly

**ELEMENTS for this section (from top to bottom):**
- Top: soft gradient sky in warm peachy-pink tones
- Upper area: Mount Fuji silhouette in the far distance, misty and subtle
- Small birds flying in the distance
- Cherry blossom branches with full pink blooms cascading from the top and left side
- Hanging furin wind chimes (glass bells with patterned paper strips) visible among the branches
- Lower area: the very tops of food elements just beginning to appear (only hints, no full dishes yet)

**CRITICAL — Bottom transition zone:**
The bottom 15% of the image must be a soft, clean transition. Use falling sakura petals and a gentle mist/fade into the warm cream background. Do NOT put any hard horizontal lines or distinct objects at the very bottom edge. The bottom should feel like it naturally continues downward into empty space.

Generate ONLY Section 1. Do not include any text, watermarks, or UI elements.
```

---

## 🍜 SECTION 2 of 4 — Upper-Middle portion (Comida completa, Farolitos)

```
Attached is my website's full background image. I need you to create SECTION 2 of a 4-section vertical panorama for mobile.

This section represents the UPPER-MIDDLE portion where all the food elements are. Recreate it as a standalone tall portrait image (9:16 aspect ratio, maximum resolution ~1024×1792).

**MANDATORY STYLE (use exactly for all 4 sections):**
- Soft watercolor Japanese illustration style
- Warm cream paper background (#f4eee0 tone)
- Delicate sakura pink accents (#c95b64 tones)
- Soft, diffused golden-hour lighting
- Gentle brush strokes, ethereal and peaceful mood
- No hard edges, everything blends softly

**ELEMENTS for this section (arranged vertically in the narrow frame):**
- Top area: continue falling sakura petals from above, very soft and sparse
- Upper-left: hanging furin wind chimes (complete, with patterned paper strips)
- Left side: a bowl of ramen with narutomaki, soft-boiled egg, green onions — painted in soft watercolor
- Below the ramen: dango (three colored dumplings) on a small wooden plate
- Right side: a platter with tempura shrimp and vegetables
- Below the tempura: sushi pieces (nigiri) on a ceramic plate
- Near the sushi: a small sake bottle (tokkuri) and matching cup (ochoko) with subtle blue patterns
- Scattered sakura petals around all the food items

**CRITICAL — Transitions:**
- Top 10%: continue the soft falling petals and mist from Section 1 above. Keep it light and airy.
- Bottom 15%: fade into a clean cream background with only a few scattered petals. No distinct objects near the bottom edge.

Generate ONLY Section 2. Do not include any text, watermarks, or UI elements.
```

---

## 🌸 SECTION 3 of 4 — Lower-Middle portion (Transición, pétalos, textura)

```
Attached is my website's full background image. I need you to create SECTION 3 of a 4-section vertical panorama for mobile.

This section is a TRANSITION piece. It connects the detailed food scene above with the clean background below. Recreate it as a standalone tall portrait image (9:16 aspect ratio, maximum resolution ~1024×1792).

**MANDATORY STYLE (use exactly for all 4 sections):**
- Soft watercolor Japanese illustration style
- Warm cream paper background (#f4eee0 tone)
- Delicate sakura pink accents (#c95b64 tones)
- Soft, diffused golden-hour lighting
- Gentle brush strokes, ethereal and peaceful mood
- No hard edges, everything blends softly

**ELEMENTS for this section:**
- Top 15%: a few lingering sakura petals falling from above, very sparse and soft
- Middle area: mostly clean warm cream background with subtle washi paper texture
- Occasional soft shadows suggesting sakura branches above (very faint, almost imperceptible)
- A handful of petals gently resting on the "ground" or floating mid-air
- Keep this section MINIMAL and peaceful — it's the breathing space of the panorama

**CRITICAL — Transitions:**
- Top 10%: continue the scattered petals from Section 2. Very soft, no distinct edges.
- Bottom 15%: transition to completely clean, uniform warm cream. Zero objects, just the paper texture.

Generate ONLY Section 3. Do not include any text, watermarks, or UI elements.
```

---

## 🌸 SECTION 4 of 4 — Bottom portion (Cierre elegante, fondo limpio)

```
Attached is my website's full background image. I need you to create SECTION 4 of a 4-section vertical panorama for mobile.

This is the FINAL section at the bottom. It should feel like a calm, elegant closing to the scene. Recreate it as a standalone tall portrait image (9:16 aspect ratio, maximum resolution ~1024×1792).

**MANDATORY STYLE (use exactly for all 4 sections):**
- Soft watercolor Japanese illustration style
- Warm cream paper background (#f4eee0 tone)
- Delicate sakura pink accents (#c95b64 tones)
- Soft, diffused golden-hour lighting
- Gentle brush strokes, ethereal and peaceful mood
- No hard edges, everything blends softly

**ELEMENTS for this section:**
- Top 15%: continue the clean warm cream background from Section 3 above. Perfectly seamless.
- Upper area: a single delicate sakura branch entering from the top-left corner with just a few petals
- A small cluster of fallen petals resting gently near the bottom
- The rest of the image: clean, serene warm cream with subtle washi paper texture
- The very bottom should feel "grounded" — like the end of a scroll painting

**CRITICAL:**
- This section must be the most minimal of all four.
- The top 20% MUST match the clean cream tone of Section 3's bottom — no visible seams when joined.
- No new colors or objects introduced. Stay within the established palette.

Generate ONLY Section 4. Do not include any text, watermarks, or UI elements.
```

---

## 🔧 Unión de las 4 secciones

Cuando tengas las 4 imágenes, corre:

```bash
python3 scripts/join_panorama.py section1.webp section2.webp section3.webp section4.webp scroll-mobile.webp 250
```

El valor `250` aumenta la zona de blending a 250px para uniones aún más suaves.

**Si una unión se ve rara**, puedes ajustar el overlap:
```bash
python3 scripts/join_panorama.py s1.webp s2.webp s3.webp s4.webp scroll-mobile.webp 400
```

---

## ⚠️ Tips para mejores resultados con ChatGPT

1. **Genera las secciones en orden** (1 → 2 → 3 → 4) para que el contexto se acumule
2. **Si una sección sale mal**, dile: *"Regenerate Section X with the same prompt but [corrección específica]"*
3. **Si los colores no coinciden** entre secciones, pídele a ChatGPT que ajuste: *"The cream background is too yellow compared to Section 1. Make it warmer and closer to #f4eee0"*
4. **Guarda cada imagen en formato PNG o WebP** lo antes posible, ya que las imágenes generadas expiran en ChatGPT
