<?php

use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/exam',[ExamController::class,'index']);
Route::post('/exam',[ExamController::class,'store']);
Route::put('/exam/{id}',[ExamController::class,'update']);
Route::delete('/exam/{id}',[ExamController::class,'destroy']);


Route::post('/question/{examId}',[QuestionController::class,'store']);
Route::put('/question/{id}',[QuestionController::class,'update']);
Route::delete('/question/{id}',[QuestionController::class,'destroy']);