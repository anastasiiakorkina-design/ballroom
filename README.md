# Ballroom Dance Studio Aberdeen — Website

A fully self-contained, production-ready static website. No build step. No frameworks.

## Files
```
ballroom-aberdeen/
├── index.html       # All page sections
├── styles.css       # Design system + responsive layout
├── script.js        # Animations, modal, form, particles
└── images/          # AI-generated premium ballroom imagery
    ├── hero.jpg     # Hero background (1920×1080)
    ├── kids.jpg
    ├── adults.jpg
    ├── advanced.jpg
    ├── heels.jpg
    ├── studio.jpg   # Showreel parallax background
    └── cta.jpg      # Offer section background
```

## Run locally
Just open `index.html` in any browser, or serve the folder:
```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy
Upload the entire folder to any static host: **Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, or your existing host**. No configuration required.

## Customise

| Want to change… | Edit |
|---|---|
| Phone, email, address | `index.html` (footer + Location section) |
| Class times | `index.html` `<table class="schedule">` |
| Showreel video | `script.js` → `VIDEO_URL` constant |
| Brand colours | `styles.css` `:root { --gold: … }` |
| Booking form destination | `script.js` `form.addEventListener('submit', …)` — POST to your backend or a service like Formspree |

## Tech notes
- **Fonts:** Cormorant Garamond (serif headings) + Inter (sans body) via Google Fonts
- **Map:** OpenStreetMap embed — no API key needed. Swap for Google Maps if preferred.
- **Animations:** IntersectionObserver reveal-on-scroll, CSS keyframes, lightweight JS particle field
- **Performance:** No JS frameworks, no dependencies, all images preloaded by browser, sticky CTA on mobile
- **Accessibility:** Honours `prefers-reduced-motion`, semantic HTML, focus states, alt-equivalent backgrounds
