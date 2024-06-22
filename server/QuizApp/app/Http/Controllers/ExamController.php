<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateExamRequest;
use App\Http\Requests\UpdateExamRequest;
use App\Models\Exam;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function index()
    {
        $exams = Exam::with('user')->get();
        return response()->json($exams, 200);
    }
    public function showavailableExams()
    {
        $exams = Exam::where('availablity', 'available')->with('user')->get();
        return response()->json($exams, 200);
    }

    public function show($id)
    {
        $exam = Exam::with('questions.choices')->find($id);
        if (!$exam) {
            return response()->json(['message' => 'Exam not found'], 500);
        }
        return $exam;
    }
    public function store(CreateExamRequest $request)
    {
        $validatedData = $request->validated();
        $exam = Exam::create([
            'subject' => $validatedData['subject'],
            'teacher_id' => $validatedData['teacher_id'],
            'availablity' => $validatedData['availablity'],
        ]);

        return response()->json([
            'message' => 'Exam created successfully',
            'exam' => $exam
        ], 201);
    }

    public function update(UpdateExamRequest $request, $id)
    {
        try {
            $exam = Exam::findOrFail($id);

            $exam->subject = $request->input('subject');
            $exam->teacher_id = $request->input('teacher_id');
            $exam->availablity = $request->input('availablity');

            $exam->save();

            return response()->json(['message' => 'Exam updated successfully', 'exam' => $exam], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update exam: ' . $e->getMessage()], 500);
        }
    }
    public function destroy(string $id)
    {
        $exam = Exam::find($id);
        if (!$exam) {
            return response()->json(['message' => 'Exam not found'], 500);
        }
        $exam->delete();
        return response()->json(['message' => 'Exam deleted successfully'], 200);
    }
}
