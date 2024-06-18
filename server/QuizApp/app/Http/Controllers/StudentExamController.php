<?php

namespace App\Http\Controllers;

use App\Models\StudentExam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentExamController extends Controller
{
    public function index(){
        return StudentExam::all();
    }
    public function showAllResultofStudent(){
        $studentExams = StudentExam::where('student_id', Auth::id())->get();

        if ($studentExams->isEmpty()) {
            return response()->json(['message' => 'No student exams found'], 404);
        }
    
        return response()->json($studentExams, 200);
    }
    public function show($examId){
        $studentExam=StudentExam::where('student_id',Auth::id())->where('exam_id', $examId)->first();
        if (!$studentExam) {
            return response()->json(['message' => 'Student exam not found'], 404);
        }
    
        return response()->json($studentExam, 200);
    }
}
