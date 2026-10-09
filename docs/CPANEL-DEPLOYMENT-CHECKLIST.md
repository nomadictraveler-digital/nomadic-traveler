# cPanel deployment checklist

1. Use PHP 8.3+ and enable required extensions (`ctype`, `curl`, `dom`, `fileinfo`, `mbstring`, `openssl`, `pdo`, `pdo_mysql`, `tokenizer`, `xml`, `filter`, `hash`, `session` and `bcmath` where available).
2. Create a MySQL database and a database user; grant the user access to the database.
3. Upload the complete Laravel project outside `public_html` where possible. Point the domain document root to the Laravel project's `public/` directory. Do not expose `.env`, `vendor/`, `storage/` or source files publicly.
4. Install Composer dependencies (`composer install --no-dev --optimize-autoloader`) using SSH/Terminal or the host's Composer tool.
5. Create `.env` on the server with production values: `APP_ENV=production`, `APP_DEBUG=false`, correct `APP_URL`, database credentials and a generated `APP_KEY`.
6. Ensure `storage/` and `bootstrap/cache/` are writable by the PHP process. Create required framework directories if they do not exist.
7. Run `php artisan key:generate`, `php artisan migrate --force`, then `php artisan db:seed --class=DatabaseSeeder --force`.
8. Enable HTTPS, configure backups, mail delivery and error logging. Test registration/login/logout before opening signups.

Do not share cPanel passwords, database passwords or APP_KEY in chat. Keep a backup of the current live site before changing the domain document root.
