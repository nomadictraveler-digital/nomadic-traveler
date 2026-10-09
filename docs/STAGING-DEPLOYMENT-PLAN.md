# Staging deployment plan

## Goal
Validate the Laravel application on a separate subdomain before touching the live Nomadic Traveler website.

Suggested staging host: `staging.nomadictraveler.org` (create it in cPanel; this file does not create DNS or hosting resources).

## 1. Create isolated staging resources
- In cPanel, create the `staging.nomadictraveler.org` subdomain and set its document root to a separate staging folder.
- Create a separate MySQL database and database user for staging. Do not reuse production credentials or data.
- Enable AutoSSL/HTTPS for the staging subdomain.
- Keep the existing live site's document root and DNS records unchanged.

## 2. Deploy the code
- Upload/clone the repository into a folder outside the public document root if the host supports it.
- Point the staging document root to that project's `public/` directory.
- Install dependencies with `composer install --no-dev --optimize-autoloader`.
- Create a staging-only `.env` with `APP_ENV=staging`, `APP_DEBUG=false`, `APP_URL=https://staging.nomadictraveler.org`, and the staging database credentials.
- Generate a unique staging `APP_KEY`; never copy the production key or put secrets in GitHub.
- Ensure `storage/` and `bootstrap/cache/` are writable by PHP.

## 3. Run setup
From the project root:
```sh
php artisan key:generate
php artisan migrate --force
php artisan config:clear
php artisan route:clear
php artisan view:clear
```
Only seed roles/data after reviewing the seeders. Do not create an administrator by exposing a public registration field. The current super-admin flag defaults to false; designate the first administrator through a trusted, authenticated server-side process.

## 4. Acceptance checks
- Homepage loads over HTTPS.
- Registration rejects invalid input and duplicate email addresses.
- Valid registration creates a user and redirects to the member dashboard.
- Login, remember-me, logout, and session invalidation work.
- Guests cannot access the dashboard.
- Ordinary members receive HTTP 403 from `/admin`.
- The designated super administrator can access `/admin`.
- Test mobile layout, validation messages, CSRF protection, logs, backups, and email configuration.
- Confirm no `.env`, `vendor/`, or private storage is web-accessible.

## 5. Go-live gate
Do not change the production document root or DNS until staging checks pass, a production backup exists, HTTPS is working, and production environment variables/database are configured separately. This checklist is guidance only; staging has not been deployed by this repository commit.
