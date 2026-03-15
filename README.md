# PageForge

Deine persönliche Web-Agency Website — dark, minimalistisch, grünes Farbschema.

## Dateien

```
pageforge/
├── index.html      ← Hauptseite
├── style.css       ← Alle Styles
├── main.js         ← Cursor, Animationen, FAQ, Menü
├── vercel.json     ← Vercel Konfiguration
└── README.md
```

## Deployment auf Vercel (kostenlos)

### Option A — über GitHub (empfohlen)

1. Geh auf [github.com](https://github.com) → **New repository**
2. Name z.B. `pageforge` → **Create repository**
3. Lade alle 4 Dateien hoch (drag & drop im Browser)
4. Geh auf [vercel.com](https://vercel.com) → **Add New Project**
5. GitHub-Repo auswählen → **Deploy**
6. Fertig — deine Seite ist live!

### Option B — direkt via Vercel CLI

```bash
npm install -g vercel
cd pageforge
vercel
```

## Anpassen

### Deine Infos eintragen
In `index.html` folgendes ersetzen:
- `hallo@pageforge.at` → deine echte E-Mail
- `Web Design Studio — Innsbruck` → dein Standort
- Preise (490€ / 1.290€ / 2.490€) → deine echten Preise
- Kundenstimmen → echte Bewertungen

### Farbe ändern
In `style.css` die Zeile:
```css
--green: #34d378;
```
auf eine andere Farbe setzen — alles passt sich automatisch an.

## Custom Domain auf Vercel

1. Vercel Dashboard → dein Projekt → **Settings → Domains**
2. Deine Domain eingeben (z.B. `pageforge.at`)
3. DNS-Einträge beim Domain-Anbieter setzen (Vercel zeigt dir genau was)
