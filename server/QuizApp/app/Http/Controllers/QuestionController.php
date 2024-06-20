<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Models\Choice;
use App\Models\Exam;
use App\Models\Question;
use Dotenv\Validator;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function store(StoreQuestionRequest $request, string $id)
    {
        $exam = Exam::find($id);

        $question = new Question([
            'mark' => $request->mark,
            'question' => $request->question,
        ]);

        $exam->questions()->save($question);

        foreach ($request->choices as $choiceData) {
            $choice = new Choice([
                'choice' => $choiceData['choice'],
                'correctness' => $choiceData['correctness'],
            ]);
            $question->choices()->save($choice);
        }

        return response()->json($question->toArray(), 201);
    }

    public function update(UpdateQuestionRequest $request, string $id)
    {
        $question = Question::findOrFail($id);

        $question->update([
            'mark' => $request->mark,
            'question' => $request->question,
        ]);

        // Delete old choices
        $question->choices()->delete();

        // Add new choices
        foreach ($request->choices as $choiceData) {
            $choice = new Choice([
                'choice' => $choiceData['choice'],
                'correctness' => $choiceData['correctness'],
            ]);
            $question->choices()->save($choice);
        }

        return response()->json($question->toArray(), 200);
    }
    public function destroy(string $id)
    {
        $question=Question::find($id);
        if(!$question){
            return response()->json(['message' => 'question not found'], 500);
        }
        $question->delete();
        return response()->json(['message' => 'Question deleted successfully'], 200);   
    }

    public function getbyid($id){
        $question=Question::find($id);
        if(!$question){
            return response()->json(['message' => 'question not found'], 500);
        }
        return $question;
    }
}
