<?php

use App\Http\Controllers\Api\loginController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\UserController;
use CloudCreativity\LaravelJsonApi\Facades\JsonApi;
use Illuminate\Support\Facades\Route;

// Route::get('articles/{article}', 'ArticleController@show')->name('api.v1.articles.read');
// Route::get('articles', 'ArticleController@index')->name('api.v1.articles.index');

JsonApi::register('v1')->routes(function ($api) {
  $api->resource('articles')->relationships(function ($api) {
    $api->hasOne('authors');
    $api->hasOne('categories');
  });

  $api->resource('authors')->only('index', 'read')
    ->relationships(function ($api) {
      $api->hasMany('articles')->except('replace', 'add', 'remove');
    });

  $api->resource('categories')->relationships(function ($api) {
    $api->hasMany('articles')->except('replace', 'add', 'remove');
  });

  Route::post('login', [loginController::class, 'login'])->name('login')
    ->middleware('guest:sanctum');

  Route::post('register', [RegisterController::class, 'register'])
    ->middleware('guest:sanctum')
    ->name('register');

  Route::post('logout', [loginController::class, 'logout'])->name('logout')
    ->middleware('auth:sanctum');

  Route::get('user', UserController::class)->name('user')
    ->middleware('auth:sanctum');
});
