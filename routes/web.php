<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HomeController;


// Route::get('/', function () {
//     return view('app');
// });

//app page route (frontend)
Route::get('/{all}', function () {
    return view('app');
})->where("all", ".*");

// auth login and register route
Auth::routes();
// dashboard home route
Route::get('/home',[HomeController::class, 'index'])->name('home');
