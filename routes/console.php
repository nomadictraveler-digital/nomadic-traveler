<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('platform:status', function () {
    $this->info('Nomadic Traveler foundation is ready for module development.');
})->purpose('Show platform status');
