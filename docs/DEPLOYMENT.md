# Deployment requirements

This application uses Laravel/PHP and cannot be hosted as a running app on GitHub Pages. Production requires a PHP 8.3+ host, Composer, document root pointed to `public/`, HTTPS, and a MySQL database. Configure environment variables securely on the host; never commit `.env` or production credentials.

Initial setup after the full Laravel 12 skeleton and dependencies are installed:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --force
```

Set `APP_DEBUG=false` in production and configure scheduled jobs, queue workers, private storage and backups before accepting real traveller documents.
