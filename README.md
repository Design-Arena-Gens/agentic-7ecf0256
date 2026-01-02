# Voyage Curator – Intelligent Vacation Agent

Voyage Curator is a production-ready Next.js application that securely captures traveler preferences and instantly produces curated vacation matches complete with bookable supplier leads, itineraries, and planning guidance.

## Features

- **Adaptive intake wizard** – Multi-step flow collects traveler identity, dates, companions, accessibility notes, and nuanced interests.
- **Recommendation engine** – Scores a destination library against the provided profile using climate, activity, budget, and pacing signals.
- **Booking-ready output** – Returns destinations with pricing ranges, supplier URLs, daily cadence suggestions, and insider tips.
- **Transparent data handling** – Explains how personal information is used and encourages traveler consent before planning.

## Tech Stack

- Next.js 16 (App Router) with React 19
- TypeScript for type safety
- Tailwind CSS v4 for styling
- Zod for request validation

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the planner.

### Production Build

```bash
npm run build
npm start
```

## Key Files

- `src/app/page.tsx` – Intake wizard UI and plan renderer.
- `src/app/api/plan/route.ts` – API endpoint that validates traveler data and generates itineraries.
- `src/lib/destinations.ts` – Curated destination dataset with supplier pathways and tips.
- `src/lib/planGenerator.ts` – Scoring engine that personalizes recommendations.
- `src/lib/types.ts` – Shared TypeScript interfaces.

## Deployment

Build locally before shipping to Vercel:

```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-7ecf0256
```

## License

MIT License. Adapt the agent to integrate real booking APIs or extend the destination library as needed. Contributions welcome!
