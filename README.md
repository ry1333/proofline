# ProofLine

Conversion-first web studio. Evidence-based design that turns visitors into customers.

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Backend:** Supabase (booking system)

## Local Development

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The site will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm run preview  # Preview the build locally
```

## Deployment

The site is hosted on **GitHub Pages** and deploys automatically via GitHub Actions on push to `main`.

**Live URL:** https://ry1333.github.io/proofline/

### How It Works

- Vite builds to `/dist` with `base: '/proofline/'`
- GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys on push
- SPA routing is handled via `404.html` redirect pattern
- React Router uses `basename={import.meta.env.BASE_URL}` for proper path handling

### Troubleshooting

If you see a black screen on GitHub Pages:
1. Open browser DevTools → Console tab for errors
2. Check Network tab for 404s on assets
3. Ensure the Actions workflow completed successfully
4. Hard refresh (Cmd+Shift+R / Ctrl+Shift+R) to clear cache

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Supabase (for booking system)
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# Formspree (for contact form)
VITE_FORMSPREE_ID=your-formspree-id
```

**Note:** The site works without these - booking and forms will show demo mode.

## Project Structure

```
proofline/
├── components/       # React components
│   ├── booking/      # Booking widget
│   ├── evidence/     # Blog/evidence components
│   ├── pricing/      # Pricing components
│   └── ui/           # Shared UI components
├── content/          # Page content data
├── data/             # Static data (pricing, case studies)
├── lib/              # Utilities (Supabase client, booking API)
├── public/           # Static assets
└── supabase/         # Edge functions & migrations
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/process` | Our process |
| `/pricing` | Pricing tiers |
| `/evidence` | Blog/evidence hub |
| `/evidence/:slug` | Individual articles |
| `/contact` | Contact + booking |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## License

Proprietary - ProofLine Studio
