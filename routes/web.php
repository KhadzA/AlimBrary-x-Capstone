<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;

Route::middleware('web')->group(function () {

    //Auth
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/signup', [AuthController::class, 'signup']);

Route::post('/logout', [AuthController::class, 'logout']);

    //Book Management
    Route::get('/book', [BooksController::class, 'index']);
    Route::post('/book', [BooksController::class, 'store']);
    Route::put('/book/{id}', [BooksController::class, 'update']);
    Route::delete('/book/{id}', [BooksController::class, 'destroy']);

    //User Management
    Route::get('/users', [UserController::class, 'index']);  
    Route::post('/user', [UserController::class, 'store']); 
    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);


    //I don't even knwo, I forgor
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    })->middleware('auth');


});
