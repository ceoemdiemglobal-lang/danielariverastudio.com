"""Crop bottom of logo to remove '80 x 50cm' and enhance gold metallic look."""
from PIL import Image, ImageEnhance, ImageFilter

src = r'C:\Users\xtremo\Desktop\daniela-rivero-salon\logo.jpg'
out = r'C:\Users\xtremo\Desktop\daniela-rivero-salon\logo.png'

img = Image.open(src).convert('RGBA')
w, h = img.size

# Crop bottom 22% to remove "80 x 50cm" but keep "Studio de Belleza"
crop_y = int(h * 0.78)
img = img.crop((0, 0, w, crop_y))

# Boost saturation on gold tones — strong metallic feel
sat = ImageEnhance.Color(img.convert('RGB'))
img = sat.enhance(1.45)

# Slight contrast lift for metallic depth
con = ImageEnhance.Contrast(img)
img = con.enhance(1.15)

# Slight sharpening for metallic crispness
img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=130, threshold=3))

# Apply a warm gold tint overlay (multiplicative) only on bright/gold pixels
img = img.convert('RGBA')
px = img.load()
W, H = img.size
for y in range(H):
    for x in range(W):
        r, g, b, a = px[x, y]
        # Detect grey background pixels (R~G~B and mid-tone) and make transparent
        max_c = max(r, g, b)
        min_c = min(r, g, b)
        is_grey = (max_c - min_c) < 22 and 55 < max_c < 130
        if is_grey:
            px[x, y] = (0, 0, 0, 0)
            continue
        # Boost gold metallic tones
        if r > 110 and g > 80 and b < r and (r + g) > (b * 2.1):
            nr = min(255, int(r * 1.05 + 8))
            ng = min(255, int(g * 0.98 + 4))
            nb = max(0, int(b * 0.78))
            px[x, y] = (nr, ng, nb, a)

img.save(out, 'PNG', optimize=True)
print(f'Saved: {out}  size={img.size}')
