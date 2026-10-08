# Nomadic Traveler

Global travel community and travel-tracking platform for Bangladesh districts and worldwide destinations.

## Current MVP

The frontend now includes a multi-section interactive travel platform experience:

- Bangladesh 64-district and 195-country travel tracker
- Search, select-all, clear-all and progress tracking
- Explore / destination-guide cards
- Trip Planner with days, destinations and budget
- Hidden Gems submission workflow and community guidelines
- Quiz and leaderboard UI
- Personal travel profile and achievement UI
- Responsive navigation for desktop and mobile
- CI TypeScript check and production build

The next backend phase will connect persistent accounts, database-backed travel history, moderation, real GeoJSON layers and server-side exports.

## Architecture

- `apps/web` — Next.js + TypeScript frontend
- `apps/api` — Laravel 12 backend scaffold and database reference schema
- `packages/types` — shared TypeScript types
- `data/maps` — licensed GeoJSON/SVG map assets
- `docs` — setup and map-data documentation

## Product roadmap

1. Authentication and persistent travel history
2. Real GeoJSON interactive maps
3. Public travel profiles and timelines
4. Trip Planner
5. Hidden Gems, local food and reviews
6. Travel Quiz, achievements and leaderboard
7. Admin/moderation dashboard
8. PNG/JPG/PDF travel-map exports
9. Production deployment and mobile app

## Local frontend

`cd apps/web && npm install && npm run dev`

Build: `npm run lint && npm run build`

## Repository

Nomadic Traveler is maintained as a community platform project.

<!-- GitHub Pages deployment verification trigger -->
