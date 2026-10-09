# Nomadic Traveler — Full Platform Roadmap

This repository is the source of truth for the Nomadic Traveler travel platform.

## Product goal
Build an original travel discovery and travel-history platform inspired by the broad interaction patterns of travel atlas/community sites, without copying third-party source code, branding, or protected assets.

## Delivery phases

### Phase 1 — Interactive travel atlas
- [x] Bangladesh 64-district reference list
- [x] World-country reference dataset
- [ ] Real geographic boundary maps (district polygons and country polygons)
- [ ] Click a shape to toggle visited state
- [ ] Search, filters, progress counters, mobile interaction
- [ ] Export a travel map as PNG/JPG/PDF
- [ ] Persist selections locally for anonymous users

### Phase 2 — Destination content
- [ ] District and country detail pages
- [ ] Destination, attraction, food, culture and travel-safety content model
- [ ] Images with source/usage records
- [ ] Community tips and reviews

### Phase 3 — Accounts and profiles
- [ ] Laravel API and database migrations
- [ ] Registration, login, password reset and profile management
- [ ] Sync visited places and trip history across devices
- [ ] Public/private travel profile and shareable profile URL

### Phase 4 — Trip planning
- [ ] Multi-stop itinerary builder
- [ ] Transport, duration, budget and accommodation fields
- [ ] Editable day-by-day itinerary
- [ ] Save, duplicate, share and export trip plans

### Phase 5 — Community and moderation
- [ ] Hidden Gems submissions with optional photos and map coordinates
- [ ] Admin review queue and approve/reject workflow
- [ ] Reviews, reports, anti-spam controls and community guidelines
- [ ] Points, badges, achievements and leaderboard

### Phase 6 — Operations and launch
- [ ] Admin dashboard and role-based permissions
- [ ] Automated tests, CI, deployment checks and backups
- [ ] Accessibility, privacy, security and performance review
- [ ] Production hosting for Next.js + Laravel + database
- [ ] Monitoring, analytics and incident procedures

## Architecture target
- Frontend: Next.js + TypeScript
- API: Laravel
- Database: PostgreSQL (or MySQL where hosting requires it)
- Map: GeoJSON boundary data with an interactive map renderer
- Exports: browser-side image/PDF generation, validated before release
- CI: GitHub Actions

## Important status note
The current frontend is an MVP/prototype. Until the corresponding phases are implemented and tested, authentication, database persistence, admin moderation, server-backed community submissions, and exports must not be represented as production-ready features.

## Geographic data
Boundary datasets must be reviewed for accuracy and licensing before bundling. Keep source attribution and license information alongside every imported dataset. Never use a dataset with unclear usage rights for production.
