<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BooksController;
use Illuminate\Http\Request;

Route::middleware('web')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/signup', [AuthController::class, 'signup']);

    Route::post('/logout', function (Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out']);
    });

    Route::post('/book', [BooksController::class, 'store']);
    Route::get('/book', [BooksController::class, 'index']);
    Route::put('/book/{id}', [BooksController::class, 'update']);
    Route::delete('/book/{id}', [BooksController::class, 'destroy']);


    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    })->middleware('auth');


});
