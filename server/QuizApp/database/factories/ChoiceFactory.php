<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Choice>
 */
class ChoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'choice' => $this->faker->sentence(4),
            'correctness' => $this->faker->randomElement(['correct', 'wrong']),
            'question_id' => Question::pluck('id')->random(),
        ];
    }
}
