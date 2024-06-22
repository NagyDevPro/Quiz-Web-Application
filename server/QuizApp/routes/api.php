<?php

use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\StudentExamController;
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

Route::prefix('exams')->group(function () {
    Route::get('/', [ExamController::class, 'index']);
    Route::get('/available',[ExamController::class,'showavailableExams']);
    Route::get('/{id}', [ExamController::class, 'show']);
    Route::post('/', [ExamController::class, 'store']);
    Route::put('/{id}', [ExamController::class, 'update']);
    Route::delete('/{id}', [ExamController::class, 'destroy']);
});

Route::prefix('questions')->group(function () {
    Route::post('/{examId}', [QuestionController::class, 'store']);
    Route::put('/{id}', [QuestionController::class, 'update']);
    Route::delete('/{id}', [QuestionController::class, 'destroy']);
    Route::get('/{id}', [QuestionController::class, 'getbyid']);

});

Route::prefix('results')->group(function () {
    Route::get('/', [StudentExamController::class, 'index']);
    Route::get('/my-results/', [StudentExamController::class, 'showAllResultofStudent']);
    Route::get('/{examId}', [StudentExamController::class, 'show']);
    Route::post('/', [StudentExamController::class, 'store']);
});