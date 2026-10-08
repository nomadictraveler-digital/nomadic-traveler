# Nomadic Traveler

Global travel community and travel-tracking platform for Bangladesh districts and worldwide destinations.

## Current MVP

The repository currently includes a working Next.js travel-tracker frontend with:

- Bangladesh 64-district tracker
- 195-country tracker (193 UN Member States + Holy See + State of Palestine)
- Search and visited-place selection
- Travel progress statistics
- Responsive mobile/desktop UI
- CI build + TypeScript check

The 195-country convention follows the United Nations description of 193 Member States plus the two non-member observer States, the Holy See and State of Palestine.

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