# Nomadic Traveler — Blueprint-driven rebuild

This repository is being restarted from the uploaded **Nomadic Traveler Website Project Blueprint v1.0 (2026)**.

## Architecture
- Laravel 12 / PHP 8.3+
- MySQL
- Blade + Bootstrap 5 / AdminLTE
- Laravel Breeze authentication and role/permission system
- REST API + Sanctum
- Modular service/repository architecture
- Future Flutter client

## Roadmap
1. Core app, authentication, traveller profile, roles and admin dashboard.
2. Country database, visa CMS, visa search and visa-service applications.
3. Membership, payments, invoices, private documents and support tickets.
4. Manual flight CRM and hotel booking requests.
5. Supplier integrations, only where credentials and commercial access are available.
6. Community posts, groups, events, travel buddy and moderation.
7. Travel map and shareable traveller portfolio.

## Hosting
GitHub Pages cannot run PHP. Deploy to PHP-capable hosting with MySQL before switching the live site to this Laravel app.

## Security
Passport, NID and financial documents must remain private. Use authorization policies, validation, HTTPS, audit logs, backups and explicit consent.
