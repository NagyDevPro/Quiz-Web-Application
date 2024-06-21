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
        $exams=Exam::where('availablity','available')->get();
        return response()->json($exams,200);
    }
    
    public function show($id){
        $exam = Exam::with('questions.choices')->find($id);
        if(!$exam){
            return response()->json(['message' => 'Exam not found'], 500);
        }
        return $exam;
    }
    public function store(CreateExamRequest $request)
    {
        $exam = Exam::create($request->validated());
        return response()->json($exam, 200);
    }
    public function update(UpdateExamRequest $request, string $id)
    {
        $exam = Exam::findOrFail($id);
        if(!$exam){
            return response()->json(['message' => 'Exam not found'], 500);
        }
        $exam->update($request->validated());
        return response()->json($exam, 200);
    }
    public function destroy(string $id)
    {
        $exam = Exam::find($id);
        if(!$exam){
            return response()->json(['message' => 'Exam not found'], 500);
        }
        $exam->delete();
        return response()->json(['message' => 'Exam deleted successfully'], 200);
    }
}
