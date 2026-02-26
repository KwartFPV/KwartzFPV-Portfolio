# KWARTZ FPV — Cinematic Portfolio

> *"Sky is our limit."*

Live: **https://kwartzfpv.netlify.app/**

---

## Overview

Personal portfolio for Kwartz FPV — cinematic drone pilot specializing in mountain surfing and long range FPV, based in France. The site showcases flights, gear and the journey from first quad to mountain surfing specialist.

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| Hero | Magazine Cover | Full-screen video background with large Bebas Neue title and parallax dive effect |
| 01 | Pilot | Bio, portrait and style tags |
| — | Philosophy | Scrolling ticker + 3 philosophy cards |
| 02 | Numbers | Animated stats counters (flight hours, videos, mountains, km) |
| 03 | Hangar | Drone builds — Jeno 7" long range, 5" freestyle, gear |
| 04 | Journey | Timeline from 2023 to present |
| 05 | Cinema | YouTube video grid with lazy-load thumbnails |
| 06 | Contact | Formspree form + social links |

---

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flexbox, clip-path, scroll animations
- **JavaScript (Vanilla)** — no frameworks, single RAF scroll loop
- **[Lenis](https://github.com/studio-freight/lenis)** — smooth scroll (desktop only)
- **[Boxicons](https://boxicons.com/)** — icon set
- **[Formspree](https://formspree.io/)** — contact form backend

---

## Performance

- Single `requestAnimationFrame` loop for all scroll effects (no duplicate listeners)
- `content-visibility: auto` on off-screen sections
- `loading="lazy"` + `decoding="async"` on all images below the fold
- `fetchpriority="high"` on hero poster image
- `dns-prefetch` for all third-party origins
- Scripts loaded with `defer`
- Video served in `.webm` with mobile-optimised source variant

---

## SEO

- Full Open Graph + Twitter Card meta tags
- 3 Schema.org JSON-LD blocks: `Person`, `WebSite`, `VideoObject`
- `sitemap.xml` with image and video extensions
- `robots.txt` allowing all major crawlers
- `rel="canonical"` set to production URL

---

## Project Structure

```
├── index.html          # Main page
├── style.css           # All styles
├── script.js           # UI logic & scroll effects
├── sitemap.xml         # Search engine sitemap
├── robots.txt          # Crawler rules
├── README.md
│
└── assets/
    ├── header-video.webm       # Hero background video (desktop)
    ├── header-video-osd.webm   # Hero background video (mobile)
    ├── background2.webp        # Hero poster / fallback
    ├── image.webp              # Pilot portrait
    ├── drone-7.webp            # Jeno 7" build photo
    ├── drone-5.webp            # 5" freestyle build photo
    └── gear.webp               # Gear photo
```

---

## Contact

- Instagram: [@kwartz_fpv](https://www.instagram.com/kwartz_fpv)
- YouTube: [Kwartz_fpv](https://www.youtube.com/@Kwartz_fpv)
- Email: thomfpv@gmail.com

---

© 2025 Kwartz FPV — All Rights Reserved
