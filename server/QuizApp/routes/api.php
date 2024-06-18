<?php

use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RoleMiddleware;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/exam',[ExamController::class,'index'])->middleware('auth:sanctum', 'role:student');
Route::post('/exam',[ExamController::class,'store'])->middleware('auth:sanctum', 'role:teacher');
Route::put('/exam/{id}',[ExamController::class,'update'])->middleware('auth:sanctum', 'role:teacher');
Route::delete('/exam/{id}',[ExamController::class,'destroy'])->middleware('auth:sanctum', 'role:teacher');


Route::post('/question/{examId}',[QuestionController::class,'store'])->middleware('auth:sanctum', 'role:teacher');
Route::put('/question/{id}',[QuestionController::class,'update'])->middleware('auth:sanctum', 'role:teacher');
Route::delete('/question/{id}',[QuestionController::class,'destroy'])->middleware('auth:sanctum', 'role:teacher');