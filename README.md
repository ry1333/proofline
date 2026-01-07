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
