# Blueprint implementation checklist

Source: Nomadic Traveler Website Project Blueprint, Version 1.0 (2026).

## Phase 1 — MUST
- [ ] Laravel 12 application foundation
- [ ] Authentication, verification and password reset
- [ ] Digital traveller profile and privacy controls
- [ ] Roles, permissions and protected admin dashboard
- [ ] Audit logging and backups

## Phase 2 — MUST
- [ ] Countries and visa types
- [ ] Admin-managed visa guides, requirements, fees, process, embassy and official sources
- [ ] Nationality/destination/purpose/visa-category search
- [ ] Visa-service application workflow and statuses

## Phase 3 — MUST
- [ ] Free, Explorer, Premium and VIP plans
- [ ] Subscription entitlements, invoices and payment records
- [ ] Private document storage with role-based access
- [ ] Support tickets

## Phase 4 — HIGH
- [ ] Manual flight request, quotations, approval and ticket records
- [ ] Hotel booking requests and confirmations

## Phase 5 — HIGH
- [ ] Supplier-neutral hotel/flight adapters when provider access is approved

## Phase 6 — HIGH
- [ ] Posts, comments, likes, saves, groups, events, travel buddy and moderation

## Phase 7 — MEDIUM
- [ ] Interactive world map, visited/planned/wishlist destinations, trip timeline and shareable traveller card

## Later
Packages, insurance, eSIM, marketplace, Flutter client and B2B agent portal.

## Security baseline
Passport, NID and financial documents are private by default. Enforce policies, validation, HTTPS, explicit consent, short-lived downloads, audit logs, retention/deletion rules and backups.
