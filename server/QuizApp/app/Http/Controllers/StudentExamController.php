<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentExamRequest;
use App\Models\StudentExam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentExamController extends Controller
{
    public function index()
    {
        $studentExams = StudentExam::with(['student', 'exam'])->get();
        return response()->json($studentExams);
    }
    public function showAllResultofStudent()
    {
        $studentExams = StudentExam::where('student_id', Auth::id())->get();

        if ($studentExams->isEmpty()) {
            return response()->json(['message' => 'No student exams found'], 404);
        }

        return response()->json($studentExams, 200);
    }
    public function show($examId)
    {
        $studentExam = StudentExam::where('student_id', Auth::id())->where('exam_id', $examId)->first();
        if (!$studentExam) {
            return response()->json(['message' => 'Student exam not found'], 404);
        }

        return response()->json($studentExam, 200);
    }
    public function store(StoreStudentExamRequest $request)
    {
        $student_id = $request->input('student_id');
        $exam_id = $request->input('exam_id');

        $existingStudentExam = StudentExam::where('student_id', $student_id)
            ->where('exam_id', $exam_id)
            ->first();

        if ($existingStudentExam) {
            return response()->json(['error' => 'Result for this student and exam already exists'], 400);
        }

        $studentExam = StudentExam::create([
            'student_id' => $student_id,
            'exam_id' => $exam_id,
            'result' => $request->input('result')
        ]);

        return response()->json(['message' => 'Result stored successfully','Data'=> $studentExam], 201);
    }
}
