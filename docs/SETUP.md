# Local Setup

## Web
cd apps/web
npm install
npm run dev

## API
Install Laravel dependencies in `apps/api`, copy `.env.example` to `.env`, configure DB, then run migrations and `php artisan serve`.

## Docker
From repository root: `docker compose up --build`.

## GitHub
Create or use the existing `nomadictraveler` repository, copy this repository contents into it, then:
`git add . && git commit -m "Initialize Nomadic Traveler production architecture" && git push`.
