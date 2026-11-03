# Workout Assistant

Build #2 in the public build series. Answer 5 questions — goal, days per week, equipment, experience, limitations — and get a full 7-day workout plan with exercises, sets × reps, warm-ups, and cool-downs.

Live: https://tanush-7.github.io/workout-assistant/

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Vitest for engine tests
- No backend, no API keys, no database. Everything runs in the browser.
- Hosting: GitHub Pages, ₹0/month. Deploys automatically from `main` via `.github/workflows/deploy.yml`.

## How the plan engine works

`src/engine/` is a pure TypeScript module with no UI dependencies:

1. **Exercise database** (`exercises.ts`) — ~45 movements across push / pull / legs / core / cardio. Each exercise is tagged with every equipment tier that can perform it (`gym` / `dumbbell` / `bodyweight`) and a minimum experience level, plus default sets and rep ranges.
2. **Session templates** (`plan.ts`) — each goal (fat loss, muscle gain, running, general fitness) has an ordered list of up to 6 session templates. Lift slots are preference-ordered exercise ids; the engine picks the first one the user's equipment supports, so a home-dumbbell user automatically gets floor press instead of incline bench press, never an empty slot.
3. **Rules** — at least 1 rest day per 3 training days (requesting 6 days yields 5 training + 2 rest); Sunday is always a rest day; running goal always includes 3 runs with the long run last; push and pull sessions stay balanced across the week; beginners get fewer sets; sessions estimate 45–75 minutes.
4. **Reference template** — the running track for 5–6 days with full gym access and intermediate experience approximates a real-world template: Lower Body A, Easy Run + Mechanics, Upper Body, Easy Run + Hip/Core, Lower Body B, Long Easy Run, Sunday off.

The `limitations` field is surfaced back as a safety note — the engine never diagnoses or adjusts programming for it. The app carries a general-fitness disclaimer, not medical advice.

## Local development

```bash
npm install
npm run dev      # dev server
npm test         # vitest, engine rule tests
npm run build    # static build to dist/
```

## Roadmap

- Save / share plan as a link (encode inputs in the URL)
- Printable plan view
- More goals (strength / powerlifting, HYROX-style conditioning)
- Progression tracking across weeks
- Video links per exercise
