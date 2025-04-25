<?php

//This is also not provided when isntalled, I used php artisan "config:publish cors" to create this
return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // 'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'paths' => ['*', 'api/*', 'web/*', 'sanctum/csrf-cookie', 'login', 'logout', 'signup', 'book', 'book*', 'user'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://127.0.0.1:3000', 'http://localhost:3000'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
