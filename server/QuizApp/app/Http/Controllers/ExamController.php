<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function index()
    {
        $exams=Exam::where('availablity','available')->get();
        return response()->json($exams,200);
    }
  
}
