# Phase 1 implementation status

## Included in this commit
- Laravel 12 / PHP 8.3 project configuration defaults suited to cPanel shared hosting.
- Registration and login routes with request validation and rate limits.
- Session regeneration after login and logout invalidation.
- Member dashboard and restricted super-admin dashboard.
- Initial Terms and Privacy draft pages.
- GitHub Actions workflow to install Composer dependencies and run migration/tests.

## Important setup notes
- The super-admin flag defaults to false for every account. Do not make a user super admin by accepting a public registration field. Designate the initial super administrator only through a trusted database/CLI operation after deployment.
- Run `composer install`, `php artisan key:generate`, `php artisan migrate --seed` in a secure environment before testing.
- CI has been configured but must run on GitHub before this phase can be called verified.
- Legal pages are placeholders and require review before production.
- Do not point the live domain at this code until staging deployment, migrations, login/register, and HTTPS have been checked.
