<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\BooksController;

// Protected with Sanctum session middleware
Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/book', [BooksController::class, 'store']);
    Route::get('/book', [BooksController::class, 'index']);
    Route::put('/book/{id}', [BooksController::class, 'update']);
    Route::delete('/book/{id}', [BooksController::class, 'destroy']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
