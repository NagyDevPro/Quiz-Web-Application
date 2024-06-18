<?php

namespace App\Http\Controllers;

use App\Models\StudentExam;
use Illuminate\Http\Request;

class StudentExamController extends Controller
{
    public function index(){
        return StudentExam::all();
    }
    public function show($studentId,$examId){
        StudentExam::where('student_id',$studentId ,'exam_id',$examId)->first();
    }
}
