<?php

namespace Database\Factories;

use App\Models\Exam;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StudentExam>
 */
class StudentExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_id' => User::pluck('id')->random(),
            'exam_id' => Exam::pluck('id')->random(),
            'result' => $this->faker->numberBetween(0, 100),
        ];
    }
}
