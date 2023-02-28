<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PublicApiController;

Route::middleware('auth:sanctum')->group(function(){
    Route::resource('category',CategoryController::class);
    Route::resource('product', ProductController::class);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/user', [AuthController::class,'update_user']);
});
Route::get('products', [PublicApiController::class,'products']);
Route::get('products/{slug}', [PublicApiController::class,'productDetails']);
