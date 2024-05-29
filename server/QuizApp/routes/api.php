<?php

use App\Http\Controllers\ExamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/exams',[ExamController::class,'index']);
Route::post('/exams',[ExamController::class,'store']);
Route::put('/exams/{id}',[ExamController::class,'update']);
Route::delete('/exams/{id}',[ExamController::class,'destroy']);